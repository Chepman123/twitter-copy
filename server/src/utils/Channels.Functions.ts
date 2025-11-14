import { PoolClient, QueryResult } from "pg";
import Pfunctions from '../utils/Post.Functions'
import { Post } from "../Interfaces/Post";
export default class functions{
    static async getFollowers(client:PoolClient,channel_name:string):Promise<string[]> {
        const sql:string = `SELECT u.username FROM follows f
        JOIN channels c  ON c.id = f.channel_id
        JOIN users u ON u.id = follower_id
        WHERE c.name = $1`
        const result:QueryResult<{ username: string }> = await client.query(sql, [channel_name]);
        return result.rows.map(row=>row.username);
    }
    static async GetAdmins(client:PoolClient,channel_name:string):Promise<string[]> {
        const sql:string = `SELECT u.username FROM channels c
        JOIN channel_admins a ON a.channel_id = c.id
        JOIN users u ON u.id = a.admin_id
        WHERE c.name = $1`
        const result:QueryResult<{ username: string }> = await client.query(sql,[channel_name]);
        return result.rows.map(row=>row.username);
    }
    static async getPosts(client:PoolClient,channel_name:string,username:string):Promise<Post[]>{
        const sql:string = `SELECT p.id FROM posts p
        JOIN channels c ON c.id = p.channel
        WHERE c.name = $1`;
        const result:QueryResult<{id:string}> = await client.query(sql,[channel_name]);
        
        const ids:string[] = result.rows.map(row=>row.id)
        const posts: Post[] = [];

    for (const id of ids) {
      const post = await this.getPost(client, id,username);
      posts.push(post);
    }
        return posts;
    }
    static async getPost(client:PoolClient,id:string,username:string):Promise<Post>{
       const sql:string = ` SELECT p.id, p.content,c.name AS channel, u.username AS created_by, p.created_at
    FROM posts p
    JOIN users u ON u.id = p.created_by
    LEFT JOIN channels c ON c.id = p.channel
    WHERE p.id = $1`
    const result:Post = (await client.query(sql, [id])).rows[0];

            result.created_byUser = username==result.created_by;
            result.likes = await Pfunctions.GetLikes(client,result.id.toString());
            result.isLiked = await Pfunctions.IsLiked(client,username,result.id.toString());
    return result;
    }
    static async isFollowed(client:PoolClient,channel_name:string,username:string):Promise<boolean>{
        const sql:string = `SELECT * FROM follows f 
        JOIN channels c ON c.id = f.channel_id
        JOIN users u ON u.id = f.follower_id
        WHERE c.name = $1 and u.username = $2`;
        const result:QueryResult = await client.query(sql,[channel_name,username]);
        return result.rowCount!=0;
    }
}