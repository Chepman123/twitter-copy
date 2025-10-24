import {Request ,Response, NextFunction } from "express";
import RegLogService from "../Services/RegLog";


export default class RegLogController{
    constructor(private service:RegLogService){}

    async Reg(req:Request,res:Response, next: NextFunction){
        try{
         res.json(await this.service.Reg(req.body.login,req.body.password,req.body.username));
        }     
        catch(error){
            next(error);
        }
    }
    async Log(req:Request,res:Response, next: NextFunction){
      try{
         res.json(await this.service.Log(req.body.login,req.body.password));
        }     
        catch(error){
            next(error);
        }
    }
}