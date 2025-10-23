import { Post } from "../Services/MainSevice";
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
    async GetPostPage(req:Request,res:Response){
        try{
            const token:string = req.headers.token as string;

            const result:Post = await this.service.GetPost(req.params.id.toString(),token)
            res.status(200);
        res.json(result);
         }
        catch(error){
            res.status(500).json({error:error});
        }
    }
    async Like(req:Request,res:Response){
        try{
         await this.service.Like(req.body.token,req.params.id.toString());
         res.status(200);
         }
        catch(error){
            res.status(500).json({error:error});
        }
    }
    async Comment(req:Request,res:Response){
        this.service.Comment(req.body.token,req.params.id,req.body.content);
    }
    async DeleteComment(req:Request,res:Response){
        this.service.DeleteComment(req.params.id);
    }
    async EditComment(req:Request,res:Response){
        this.service.EditComment(req.params.id,req.body.content);
    }
}
