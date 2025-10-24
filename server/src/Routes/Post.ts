import { Router,Request,Response, NextFunction  } from "express";
import PostService from "../Services/Post";
import PostController from "../Controllers/Post";

export default()=>{
    const router:Router = Router();

    const service:PostService = new PostService();
    const controller:PostController = new PostController(service);

    router.post('/',(req:Request,res:Response,next:NextFunction)=>{controller.CreatePost(req,res,next)});
    router.delete('/',(req:Request,res:Response,next:NextFunction)=>{controller.DeletePost(req,res,next)});
    router.put('/',(req:Request,res:Response,next:NextFunction)=>{controller.ChangePost(req,res,next)});

    return router;
}