import { Response,Request, Router } from "express";
import RegLogController from "../Controllers/RegLog";
import RegLogService from "../Services/RegLog";
export default ()=>{
    const router = Router();

    const service:RegLogService = new RegLogService();
    const controller:RegLogController = new RegLogController(service);
   
     router.post('/registration',(req:Request,res:Response)=>{controller.Reg(req,res)});

    router.post('/login',(req:Request,res:Response)=>{controller.Log(req,res)});


    return router;
}