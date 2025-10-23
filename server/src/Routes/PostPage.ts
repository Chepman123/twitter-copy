import { Router,Request,Response } from "express";
import PostService from "../Services/Post";
import PostController from "../Controllers/Post";

export default()=>{
    const router:Router = Router();

    const service:PostService = new PostService();
    const controller:PostController = new PostController(service);
    router.get('/:id',(req:Request,res:Response)=>{controller.GetPostPage(req,res)});
    router.post('/:id/like',(req:Request,res:Response)=>{controller.Like(req,res)});
    router.post('/:id/comment',(req:Request,res:Response)=>{controller.Comment(req,res)});
    router.delete('/:id/comment',(req:Request,res:Response)=>{controller.DeleteComment(req,res)});
    router.put('/:id/comment',(req:Request,res:Response)=>{controller.EditComment(req,res)});
    return router;
}