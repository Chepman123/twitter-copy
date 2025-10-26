import { Request, Response, NextFunction } from "express";
import ProfileService from "../Services/Profile";

export default class ProfileController {
  constructor(private service: ProfileService) {}

  async GetProfile(req: Request, res: Response, next: NextFunction) {
    try {

      const { username, token } = req.query as { username?: string; token?: string };

      if (!username || !token) {
        return res.status(400).json({ error: "Missing username or token" });
      }

      const result = await this.service.getProfile(username, token);
      res.status(200);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async ChangeProfile(req:Request,res:Response, next: NextFunction){
    try{
        await this.service.changeProfile(req.body.login,req.body.description,req.body.icon);
        res.status(200);
    }
    catch(error){
      next(error);
    }
  }
  async Follow(req:Request,res:Response, next: NextFunction){
     try{
       await this.service.Follow(req.body.loginFollowing,req.body.tokenFollower);
       res.status(200);
    }
    catch(error){
      next(error)
    }
  }
  async getFollowers(req:Request,res:Response, next: NextFunction){
    try{
      const sql:string = `SELECT u.username FROM users u 
       JOIN follows f ON f.follower_id = u.id
       WHERE following_id = $1`;
    const result = await this.service.GetFollows(req.params.username as string,sql); 
    res.status(200);
    res.json(result);
    }
    catch(error){
      next(error);
    }
  }
  async getFollowings(req:Request,res:Response, next: NextFunction){
    try{
      const sql:string=`SELECT u.username FROM users u 
       JOIN follows f ON f.following_id = u.id
       WHERE follower_id = $1 AND following_id IS NOT NULL`;
    const result = await this.service.GetFollows(req.params.username as string,sql); 
    res.status(200);
    res.json(result);
    
    }
    catch(error){
      next(error);
    }
  }
}
