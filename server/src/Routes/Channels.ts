import { NextFunction, Request, Response, Router } from "express"
import ChannelsService from "../Services/Channels";
import ChannelsController from "../Controllers/Channel";

export default ()=>{
    const router:Router = Router();
    const service:ChannelsService = new ChannelsService();
    const controller:ChannelsController = new ChannelsController(service);

    router.post('/',(req:Request,res:Response,next:NextFunction)=>{controller.CreateChannel(req,res,next)});
    router.post('/follow',(req:Request,res:Response,next:NextFunction)=>{controller.Follow(req,res,next)});
    router.get('/',(req:Request,res:Response,next:NextFunction)=>{controller.GetFollowedChannels(req,res,next)});
     router.get('/:name',(req:Request,res:Response,next:NextFunction)=>{controller.GetChannel(req,res,next)});
     router.put('/:name',(req:Request,res:Response,next:NextFunction)=>{controller.Edit(req,res,next)});
     router.delete('/:name',(req:Request,res:Response,next:NextFunction)=>{controller.DeleteAdmin(req,res,next)});
     router.post('/:name/newAdmin',(req:Request,res:Response,next:NextFunction)=>{controller.AddAdmin(req,res,next)});

    return router;
}