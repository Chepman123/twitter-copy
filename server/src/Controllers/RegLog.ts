import {Request ,Response } from "express";
import RegLogService from "../Services/RegLog";


export default class RegLogController{
    constructor(private service:RegLogService){}

    async Reg(req:Request,res:Response,){
        try{
         res.json(await this.service.Reg(req.body.login,req.body.password,req.body.username));
        }     
        catch(error){
            res.status(500).json({error:'Registration failed'});
            console.error(error);
        }
    }
    async Log(req:Request,res:Response){
      try{
         res.json(await this.service.Log(req.body.login,req.body.password));
        }     
        catch(error){
            console.error(error);
            res.status(500).json({error:'Login failed'});
        }
    }
}