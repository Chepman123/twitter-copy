import { Request, Response, Router } from "express"
import ProfileController from "../Controllers/Profile";
import ProfileService from "../Services/Profile";

export default ()=>{
  const router:Router = Router();
  const service:ProfileService = new ProfileService();
  const controller:ProfileController = new ProfileController(service);
  router.get('/',(req:Request,res:Response)=>{controller.GetProfile(req,res)});
  router.put('/',(req:Request,res:Response)=>{controller.ChangeProfile(req,res)});
  router.post('/',(req:Request,res:Response)=>{controller.Follow(req,res)});
  router.get('/:username/followers',(req:Request,res:Response)=>{controller.getFollowers(req,res)});
  router.get('/:username/followings',(req:Request,res:Response)=>{controller.getFollowings(req,res)});

  return router;
}