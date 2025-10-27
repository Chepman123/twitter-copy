import { NextFunction,Request,Response } from "express";
import ChannelsService from "../Services/Channels";

export default class ChannelsController{
    constructor(private service:ChannelsService){}

    async CreateChannel(req:Request,res:Response, next: NextFunction){
        try{
            this.service.CreateChannel(req.body.name,req.body.description);
        }
        catch(error){
            next(error);
        }
    }
     async GetFollowedChannels(req:Request,res:Response, next: NextFunction){
    try{
         const authHeader = req.headers['authorization']; 
         if (!authHeader) return res.status(401).json({ success: false, message: 'No token' });

         let token = authHeader.split(' ')[1];
         token = token.replace(/[^\w.-]/g, '');
            const username:{name:string}[] = await this.service.GetFollowedChannels(token);
        res.json(username);
    }
    catch(error){
        next(error);
    }
    }
    async GetChannel(req:Request,res:Response, next: NextFunction){
    try{
         const authHeader = req.headers['authorization']; 
         if (!authHeader) return res.status(401).json({ success: false, message: 'No token' });

         let token = authHeader.split(' ')[1];
         token = token.replace(/[^\w.-]/g, '');
            const channel = await this.service.GetChannel(token,req.params.name);
        res.json(channel);
    }
    catch(error){
        next(error);
    }
    }
    async Follow(req:Request,res:Response, next: NextFunction){
    try{
         const token = req.body.tokenFollower;
        await this.service.Follow(token,req.body.channelName);
    }
    catch(error){
        next(error);
    }
    }
    async Edit(req:Request,res:Response, next: NextFunction){
    try{
        await this.service.Edit(req.params.name,req.body.description);
    }
    catch(error){
        next(error);
    }
    }
    async DeleteAdmin(req:Request,res:Response, next: NextFunction){
    try{
        await this.service.DeleteAdmin(req.params.name,req.body.admin);
    }
    catch(error){
        next(error);
    }
    }
     async AddAdmin(req:Request,res:Response, next: NextFunction){
    try{
        await this.service.AddAdmin(req.params.name,req.body.admin);
    }
    catch(error){
        next(error);
    }
    }
}