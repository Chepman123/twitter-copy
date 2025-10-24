import { Request, Response, Router, NextFunction  } from "express"
import MainService from "../Services/MainSevice";
import MainController from "../Controllers/MainController";

export default ()=>{
    const router:Router = Router();
    
    const service:MainService = new MainService();
    const controller:MainController = new MainController(service);

    router.get('/',(req:Request,res:Response,next:NextFunction)=>{controller.GetProfile(req,res,next)});
    router.post('/',(req:Request,res:Response,next:NextFunction)=>{controller.GetInfo(req,res,next)});

    return router;
}