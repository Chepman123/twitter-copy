import { Request, Response } from "express";
import MainService, { Info } from "../Services/MainSevice";

export default class MainController{
    constructor(private service:MainService){}
    async GetInfo(req:Request,res:Response){
        try{
            const info:Info = await this.service.GetInfo(req.body.token);
        res.json(info);
    }
    catch(error){
        console.error(error);
        res.status(500).json(error);
    }
    }
}