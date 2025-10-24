import { Router,Request,Response, NextFunction  } from "express";
import PostService from "../Services/Post";
import PostController from "../Controllers/Post";

export default()=>{
    const router:Router = Router();

    const service:PostService = new PostService();
    const controller:PostController = new PostController(service);
    router.get('/:id',(req:Request,res:Response,next:NextFunction)=>{controller.GetPostPage(req,res,next)});
    router.post('/:id/like',(req:Request,res:Response,next:NextFunction)=>{controller.Like(req,res,next)});
    router.post('/:id/comment',(req:Request,res:Response,next:NextFunction)=>{controller.Comment(req,res,next)});
    router.delete('/:id/comment',(req:Request,res:Response,next:NextFunction)=>{controller.DeleteComment(req,res,next)});
    router.put('/:id/comment',(req:Request,res:Response,next:NextFunction)=>{controller.EditComment(req,res,next)});
    return router;
}