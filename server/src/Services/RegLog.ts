import {PoolClient } from 'pg';
import db from '../db'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
type Status={status:'success',token:string}|{status:'login'|'password'|'database'}

    dotenv.config();
    const secret:string=process.env.SECRET!;

export default class RegLogService{
     
    

    async Reg(login:string,password:string,username:string):Promise<Status>{
        const client:PoolClient = await db.connect();

     if(await this.LoginIsUsed(login,client)){
       return {status:'login'};
     }
     if(!this.PasswordIsValidate(password)){
        return {status:'password'}
     }
     try{
        const hashedPassword = await bcrypt.hash(password,10);
        const sql:string = `INSERT INTO users(login,password,username) VALUES($1,$2,$3)`;
        await client.query(sql,[login,hashedPassword,username]);

       const token:string=jwt.sign({login},secret);

       return {token:token,status:'success'}
     }
     catch(error){
        console.error(error);
        return {status:'database'};
     }
     finally{ 
        client.release();
     }
    }
    async Log(login:string,password:string):Promise<Status>{
        
        const client = await db.connect();
        const sql:string = `SELECT password FROM users WHERE login = $1`
        try{
          const result = (await client.query<{password:string}>(sql,[login])).rows;
  
          if(result.length==0) return {status:'login'};

          if(await bcrypt.compare(password,result[0].password)){
            const token:string=jwt.sign({login},secret);

            return {token:token,status:'success'};
          }
          else return {status:'password'};
        }
        catch(error){
            console.log(error)
            return {status:'database'};   
        }
        finally{
            client.release();
        }
    }
    async LoginIsUsed(login:string,client:PoolClient):Promise<boolean>{
      const sql:string = `SELECT * FROM users WHERE login = $1`
      const result:number = (await client.query(sql,[login])).rowCount||0;
      return result>0;
    }
    PasswordIsValidate(password:string):boolean{
        return password.length>=8;
    }
}