import { Request, Response, Router } from "express"
import MainService from "../Services/MainSevice";
import MainController from "../Controllers/MainController";

export default ()=>{
    const router:Router = Router();
    
    const service:MainService = new MainService();
    const controller:MainController = new MainController(service);


    router.post('/',(req:Request,res:Response)=>{controller.GetInfo(req,res)});

    return router;
}