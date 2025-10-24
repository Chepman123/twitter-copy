import { Response,Request, Router, NextFunction  } from "express";
import RegLogController from "../Controllers/RegLog";
import RegLogService from "../Services/RegLog";
export default ()=>{
    const router = Router();

    const service:RegLogService = new RegLogService();
    const controller:RegLogController = new RegLogController(service);
   
     router.post('/registration',(req:Request,res:Response,next:NextFunction)=>{controller.Reg(req,res,next)});

    router.post('/login',(req:Request,res:Response,next:NextFunction)=>{controller.Log(req,res,next)});


    return router;
}