import { Request, Response, NextFunction } from "express";
import MainService from "../Services/MainSevice";
import { Post } from "../Services/Post";

export default class MainController{
    constructor(private service:MainService){}
    async GetInfo(req:Request,res:Response, next: NextFunction){
    try{
            const info:Post[] = await this.service.GetInfo(req.body.token);
        res.json(info);
    }
    catch(error){
        next(error);
    }
    }
    async GetProfile(req:Request,res:Response, next: NextFunction){
    try{
         const authHeader = req.headers['authorization']; 
         if (!authHeader) return res.status(401).json({ success: false, message: 'No token' });

         let token = authHeader.split(' ')[1];
         token = token.replace(/[^\w.-]/g, '');
            const username:string = await this.service.GetProfile(token);
        res.json(username);
    }
    catch(error){
        next(error);
    }
    }
}