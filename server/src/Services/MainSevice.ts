import dotenv from 'dotenv';
import { PoolClient, QueryResult } from "pg";
import db from '../db'
import functions from "../utils/Profile.Functions";
import { Post } from "./Post";

    dotenv.config();
    const secret:string=process.env.SECRET!;

export default class MainService{
    async GetInfo(token:string):Promise<Post[]>
    {
        const client:PoolClient = await db.connect();

        const login:string = await functions.DecodeToken(token);
        
        let sql:string = `SELECT username FROM users WHERE login = $1`;

          const username:string = (await client.query(sql,[login])).rows[0].username;

          const result:Post[] = await functions.getPosts(client,true,username);

          client.release();

          return result;   
    }
    async GetProfile(token:string):Promise<string>{
        const client:PoolClient = await db.connect();
        
        const login:string = await functions.DecodeToken(token);
        
        const username:string = await functions.getUsername(client,login);
        client.release();

        return username;
    }
}