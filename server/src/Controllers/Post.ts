import PostService from "../Services/Post";
import { Request, Response } from "express";

export default class PostController{
    constructor(private service:PostService){}

    async CreatePost(req:Request,res:Response){
        try{
         await this.service.CreatePost(req.body.token,req.body.content);
         res.status(200);
        }
        catch(error){
            res.status(500).json({error:error});
        }
    }
    async DeletePost(req:Request,res:Response){
        try{
        await this.service.DeletePost(req.body.id);
        res.status(200);
        }
        catch(error){
            res.status(500).json({error:error});
        }
    }
    async ChangePost(req:Request,res:Response){
        try{
        await this.service.ChangePost(req.body.id,req.body.content);
        res.status(200);
        }
        catch(error){
            res.status(500).json({error:error});
        }
    }
}
