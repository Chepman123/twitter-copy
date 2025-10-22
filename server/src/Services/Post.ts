import functions from "../utils/Profile.Functions";
import db from '../db'
import { PoolClient } from "pg";
export default class PostService{
    async CreatePost(token:string,content:string){
        const client:PoolClient = await db.connect();
        const login:string = await functions.DecodeToken(token);
        const username:string = await functions.getUsername(client,login);
        const id:string = await functions.getId(client,username);

        const sql:string = `INSERT INTO posts(created_by,content) VALUES($1,$2)`;

        await client.query(sql,[id,content]);
    }
    async DeletePost(id:number){
        const client:PoolClient = await db.connect();
        const sql:string = `DELETE FROM posts WHERE id = $1`;

        await client.query(sql,[id]);
    }
    async ChangePost(id:number,content:string){
        const client:PoolClient = await db.connect();
        const sql:string = `UPDATE posts 
        SET content = $2
        WHERE id = $1`;

        await client.query(sql,[id,content]);
    }
}