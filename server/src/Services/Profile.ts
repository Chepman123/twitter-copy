import { PoolClient } from "pg";
import db from '../db'
import functions from '../utils/Profile.Functions'
import profile from "../Interfaces/profile";

export default class ProfileService{
    //#region getProfile
    async getProfile(username:string,token:string):Promise<profile>
    {
     const client:PoolClient = await db.connect();
     const sql:string = `SELECT description, avatar AS icon FROM users WHERE username = $1`;
     const login:string = await functions.DecodeToken(token);

        const result:profile = (await client.query(sql,[username])).rows[0];
        const loginPage:string = await functions.getLogin(client,username);
        result.userAccount= loginPage==login;
        result.followersCount=await functions.getCountFollows(client,username,true);
        result.followingsCount = await functions.getCountFollows(client,username,false);
        result.isFollowed=await functions.isFollowed(client,await functions.getUsername(client,login),username);
        result.posts = await functions.getPosts(client,false,username);
        client.release();
        return result;
    }
   //#endregion
    //#region change profile
    async changeProfile(login:string,description:string,icon:string){
        const client:PoolClient = await db.connect();
        const sql:string = ` UPDATE users
  SET description = $2,
      avatar = $3
  WHERE username = $1`;
            await client.query(sql,[login,description,icon||null]);
    
            client.release();
    }
    //#endregion
    //#region follows
    async Follow(following:string,token:string){
      const client:PoolClient = await db.connect();

      const follower = await functions.getUsername(client, await functions.DecodeToken(token));
      
      const following_id:string = await functions.getId(client,following);
      const follower_id:string = await functions.getId(client,follower);

      if(await functions.followingExists(client,follower_id,following_id)){
      const sql:string=`DELETE FROM follows WHERE follower_id = $1 AND following_id = $2`;
      client.query(sql,[follower_id,following_id]);
      }
     else{
      const sql:string=`INSERT INTO follows(follower_id,following_id) VALUES($1,$2)`;
      client.query(sql,[follower_id,following_id]);
     }

        client.release();
    }

    async GetFollows(username:string,sql:string):Promise<{username:string}[]>{
        const client:PoolClient = await db.connect();
       const id:string = await functions.getId(client,username);
       const result:{username:string}[] = (await (client.query(sql,[id]))).rows;

       client.release();

       return result;
    }
    //#endregion
}