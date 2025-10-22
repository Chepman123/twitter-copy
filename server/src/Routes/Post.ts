import { Router,Request,Response } from "express";
import PostService from "../Services/Post";
import PostController from "../Controllers/Post";

export default()=>{
    const router:Router = Router();

    const service:PostService = new PostService();
    const controller:PostController = new PostController(service);

    router.post('/',(req:Request,res:Response)=>{controller.CreatePost(req,res)});
    router.delete('/',(req:Request,res:Response)=>{controller.DeletePost(req,res)});
    router.put('/',(req:Request,res:Response)=>{controller.ChangePost(req,res)});

    return router;
}