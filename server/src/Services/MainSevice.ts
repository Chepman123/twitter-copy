import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';
import { PoolClient, QueryResult } from "pg";
import db from '../db'
import functions from "../utils/Profile.Functions";
export interface Comment{
    id:string,
    username:string,
    content:string,
    date:string,
    createdByUser:boolean
}
export interface Post{
    id:number,
    content:string,
    created_by:string,
    created_at:string,
    created_byUser:boolean,
    likes:string,
    comments:Comment[]
}
export interface Info{
    profile:string,users:{username:string}[],
    posts:Post[]
}

    dotenv.config();
    const secret:string=process.env.SECRET!;

export default class MainService{
    async GetInfo(token:string):Promise<Info>
    {
        const login =  (jwt.decode(token,) as {login:string}).login;
        
        const client:PoolClient = await db.connect();
        let sql:string = `SELECT username FROM users WHERE login = $1`;

        try{
          const username:string = (await client.query(sql,[login])).rows[0].username;

          sql = `SELECT username FROM users WHERE login != $1`
          const usernames:{username:string}[]= (await client.query(sql,[login])).rows;
          return {profile:username,users:usernames,posts:await functions.getPosts(client,true,username)};
        }
        catch(error){
            console.error(error);
            return{profile:'',users:[],posts:[]}
        }
        finally{
            client.release();
        }
    }
}