import { PoolClient, QueryResult } from "pg";
import db from '../db'
import functions from "../utils/Profile.Functions";
import { Post } from "./Post";
import Cfunctions from '../utils/Channels.Functions'

interface channel{
    name:string,
    description:string,
    followers:string[],
    adminList:string[],
    isAdmin:boolean,
    posts:Post[],
    isFollowed:boolean
}

export default class ChannelsService{
    async CreateChannel(name:string,description:string){
        const client:PoolClient = await db.connect();
        let sql:string = `SELECT * FROM channels WHERE name = $1`;

        if((await client.query(sql,[name])).rowCount!=0) return;


        sql = `INSERT INTO channels(name,description) VALUES($1,$2)`;
        client.query(sql,[name,description]);
    }
    async GetFollowedChannels(token:string):Promise<{name:string}[]>{
        const client:PoolClient = await db.connect();
        const login:string = await functions.DecodeToken(token);
        const username:string = await functions.getUsername(client,login);
        const id:string = await functions.getId(client,username);

        const sql:string = `SELECT c.name FROM follows f 
        JOIN channels c ON f.channel_id = c.id
        WHERE f.follower_id = $1`;

        const result:QueryResult = await client.query(sql,[id]);

        return result.rows;
    }
    async GetChannel(token:string,channel_name:string):Promise<channel>{
        const client:PoolClient = await db.connect();
        const sql:string = `SELECT name, description FROM channels WHERE name = $1`;
        const result:channel = (await client.query(sql,[channel_name])).rows[0];

        const login:string = await functions.DecodeToken(token);
        const username:string = await functions.getUsername(client,login);

        result.followers = await Cfunctions.getFollowers(client,channel_name);
        result.adminList = await Cfunctions.GetAdmins(client,channel_name);
        result.isAdmin = result.adminList.includes(username)
        result.posts = await Cfunctions.getPosts(client,channel_name,username);
        result.isFollowed = await Cfunctions.isFollowed(client,channel_name,username)

        return result;
    }
    async Follow(token:string,channel_name:string){
        const client:PoolClient = await db.connect();
        const login:string = await functions.DecodeToken(token);
        const username:string = await functions.getUsername(client,login);
        const id:string = await functions.getId(client,username);
        let sql:string = `SELECT * FROM follows f
        JOIN channels c ON f.channel_id = c.id
        WHERE f.follower_id = $1 AND c.name = $2`;
        const result:QueryResult = await client.query(sql,[id,channel_name]);

        sql = `SELECT id FROM channels WHERE name = $1`;

        const channel_id:string = (await client.query(sql,[channel_name])).rows[0].id;

        if(result.rowCount==0){
            sql = `INSERT INTO follows(follower_id,channel_id) VALUES($1,$2)`;
        }
        else{
            sql = `DELETE FROM follows WHERE follower_id = $1 AND channel_id = $2`
        }
        await client.query(sql,[id,channel_id]);
    }
}