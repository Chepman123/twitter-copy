import { PoolClient, QueryResult } from "pg";
import { Post } from "../Services/Post";
import Pfunctions from "./Post.Functions";
import jwt from 'jsonwebtoken'
export default class functions{
     static async isFollowed(client:PoolClient,follower:string,following:string):Promise<boolean>{
           const following_id:string = await this.getId(client,following);
           const follower_id:string = await this.getId(client,follower);
    
           return await this.followingExists(client,follower_id,following_id);
        }
     static async getLogin(client:PoolClient,username:string):Promise<string>{
        const sql:string = 'SELECT login FROM users WHERE username = $1';
        return (await client.query(sql,[username])).rows[0].login as string;
    }
    static async getUsername(client:PoolClient,login:string):Promise<string>{
        const sql:string = 'SELECT username FROM users WHERE login = $1';
        return (await client.query(sql,[login])).rows[0].username as string;
    }
    static async getId(client:PoolClient,username:string):Promise<string>{
        const sql:string = 'SELECT id FROM users WHERE username = $1';
        const id:string = (await client.query(sql,[username])).rows[0].id;
        return id;
    }
    static async getCountFollows(client:PoolClient,username:string, follower:boolean):Promise<number>{
        const sql:string = `SELECT COUNT(*) FROM follows f
  JOIN users u ON u.id=f.${follower?'following_id':'follower_id'}
  where u.username = $1`;
        return (await client.query(sql,[username])).rows[0].count;
    }
    static async followingExists(client:PoolClient,follower_id:string,following_id:string):Promise<boolean>{
        const sql:string = `SELECT * FROM follows WHERE follower_id=$1 AND following_id=$2`
        return (await client.query(sql,[follower_id,following_id])).rowCount!=0; 
    }
    static async getPosts(client:PoolClient,all:boolean,username:string):Promise<Post[]>{
        let sql: string;
let params: any[] = [];

if (all) {
  sql = `
    SELECT p.id, p.content, u.username AS created_by, p.created_at
    FROM posts p
    JOIN users u ON u.id = p.created_by
  `;
} else {
  sql = `
    SELECT p.id, p.content, u.username AS created_by, p.created_at
    FROM posts p
    JOIN users u ON u.id = p.created_by
    WHERE u.username = $1
  `;
  params = [username];
}

const result = await client.query(sql, params);

      for(let i=0;i<result.rowCount!;i++){
        result.rows[i].created_byUser = username==result.rows[i].created_by;
        result.rows[i].likes = await Pfunctions.GetLikes(client,result.rows[i].id);
      }
      return result.rows;
    }
    static async DecodeToken(token:string):Promise<string>
    {
        return  (jwt.decode(token) as {login:string}).login;
    }
    
}