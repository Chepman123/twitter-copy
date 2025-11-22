import { Post } from "../Interfaces/Post";
import PostService from "../Services/Post";
import { Request, Response, NextFunction } from "express";

export default class PostController{
    constructor(private service:PostService){}

    async CreatePost(req:Request,res:Response, next: NextFunction){
        try{
         await this.service.CreatePost(req.body.token,req.body.content,req.body.channelName,req.body.image);
         res.status(200);
        }
        catch(error){
            next(error);
        }
    }
    async DeletePost(req:Request,res:Response, next: NextFunction){
        try{
        await this.service.DeletePost(req.body.id);
        res.status(200);
        }
        catch(error){
             next(error);
        }
    }
    async ChangePost(req:Request,res:Response, next: NextFunction){
        try{
        await this.service.ChangePost(req.body.id,req.body.content);
        res.status(200);
        }
        catch(error){
             next(error);
        }
    }
    async GetPostPage(req:Request,res:Response, next: NextFunction){
        try{
            const token:string = req.headers.token as string;

            const result:Post = await this.service.GetPost(req.params.id.toString(),token)
            res.status(200);
        res.json(result);
         }
        catch(error){
             next(error);
        }
    }
    async Like(req:Request,res:Response, next: NextFunction){
        try{
         await this.service.Like(req.body.token,req.params.id.toString());
         res.status(200);
         }
        catch(error){
             next(error);
        }
    }
    async Comment(req:Request,res:Response, next: NextFunction){
        try{
        this.service.Comment(req.body.token,req.params.id,req.body.content);
        res.status(200);
        }
        catch(error){
             next(error);
        }
    }
    async DeleteComment(req:Request,res:Response, next: NextFunction){
        try{
        this.service.DeleteComment(req.params.id);
        res.status(200);
        }
        catch(error){
             next(error);
        }
    }
    async EditComment(req:Request,res:Response, next: NextFunction){
        try{
        this.service.EditComment(req.params.id,req.body.content);
        res.status(200);
        }
        catch(error){
             next(error);
        }
    }
}
