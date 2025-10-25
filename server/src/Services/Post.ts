import functions from "../utils/Profile.Functions";
import Pfunctions from "../utils/Post.Functions";
import db from '../db'
import { PoolClient, QueryResult } from "pg";
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
    comments:Comment[],
    isLiked:boolean
}
export default class PostService{
  //#region post
    async CreatePost(token:string,content:string){
      const client:PoolClient = await db.connect();
        const login:string = await functions.DecodeToken(token);
        const username:string = await functions.getUsername(client,login);
        const id:string = await functions.getId(client,username);

        const sql:string = `INSERT INTO posts(created_by,content) VALUES($1,$2)`;
      
        await client.query(sql,[id,content]);
      
        client.release();
    }

    async DeletePost(id:number){
        const client:PoolClient = await db.connect();
        const sql:string = `DELETE FROM posts WHERE id = $1`;

        await client.query(sql,[id]);
      
        client.release();
    }
    async ChangePost(id:number,content:string){
        const client:PoolClient = await db.connect();
        const sql:string = `UPDATE posts 
        SET content = $2
        WHERE id = $1`;
        
        await client.query(sql,[id,content]);

        client.release();
    }
    async GetPost(id:string,token:string):Promise<Post>{
      const client:PoolClient = await db.connect();
      const login:string = await functions.DecodeToken(token);
      const username:string = await functions.getUsername(client,login);
        const sql:string = `SELECT p.id,p.content,u.username AS created_by,p.created_at FROM posts p
      JOIN users u ON u.id = p.created_by
      WHERE p.id = $1`;

        const result:QueryResult = await client.query(sql,[id]);
          result.rows[0].created_byUser = result.rows[0].created_by == username;
          result.rows[0].likes = await Pfunctions.GetLikes(client,result.rows[0].id);
          result.rows[0].comments = await Pfunctions.GetComments(client,id,username);
          result.rows[0].isLiked = await Pfunctions.IsLiked(client,username,result.rows[0].id);

      client.release();

      return result.rows[0];
    }
    //#endregion
    async Like(token:string,post_id:string){
      const client:PoolClient = await db.connect();

       const login:string = await functions.DecodeToken(token);
       const username:string = await functions.getUsername(client,login);
       const id:string = await functions.getId(client,username);
       let sql:string;
       if(!await Pfunctions.LikeExists(client,id,post_id)){
        sql = `INSERT INTO likes(post_id,user_id) VALUES($1,$2)`
       }
       else{
        sql ='DELETE FROM likes WHERE post_id = $1 AND user_id = $2';
       }
       client.query(sql,[post_id,id]);
      
        client.release();
      
    }
    //#region comment
    async Comment(token:string,post_id:string,content:string) {
      const client:PoolClient = await db.connect();
      const login:string = await functions.DecodeToken(token);
      const username:string = await functions.getUsername(client,login);
      const id:string = await functions.getId(client,username);

      const sql:string=`INSERT INTO comments(post_id,user_id,content) VALUES($1,$2,$3)`;

      client.query(sql,[post_id,id,content]);

      client.release();
    }
    async DeleteComment(id:string){
      const client:PoolClient = await db.connect();
      const sql:string = `DELETE FROM comments WHERE id = $1`
      client.query(sql,[id]);

      client.release();
    }
    async EditComment(id:string,content:string){
      const client:PoolClient = await db.connect();
      const sql:string = `UPDATE comments SET content = $1 WHERE id = $2`
      client.query(sql,[content,id]);

      client.release();
    }
    //#endregion
}