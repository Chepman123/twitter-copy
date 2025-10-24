import { Pool, PoolClient, QueryResult } from "pg";
import { Comment } from "../Services/Post";

export default class functions{
    static async LikeExists(client:PoolClient,user_id:string,post_id:string):Promise<boolean>{
        const sql = `SELECT * FROM likes WHERE user_id = $1 AND post_id = $2 `;
        const result:QueryResult = await client.query(sql,[user_id,post_id]);
        return result.rowCount != 0;
    }
    static async GetLikes(client:PoolClient,post_id:string):Promise<string>{
       const sql:string = `SELECT COUNT(*) FROM likes 
       WHERE post_id = $1 `;
       const result:QueryResult = await client.query(sql,[post_id]);
       return result.rows[0].count;
    }
    static async GetComments(client:PoolClient,post_id:string,username:string):Promise<Comment[]>{
       const sql:string = `SELECT c.id, u.username, c.content,c.created_at AS date FROM comments c
       JOIN users u ON u.id = c.user_id
       WHERE c.post_id = $1`;
       const result:QueryResult = await client.query(sql,[post_id]);
       const comments:Comment[] = result.rows;
       for(let i=0;i<comments.length;i++){
        comments[i].createdByUser = username == comments[i].username;
       }
       return comments;
    }
}