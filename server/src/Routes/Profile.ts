import { Request, Response, Router, NextFunction  } from "express"
import ProfileController from "../Controllers/Profile";
import ProfileService from "../Services/Profile";
import multer from "multer";

export default ()=>{
  const upload = multer({ storage: multer.memoryStorage() });
  const router:Router = Router();
  const service:ProfileService = new ProfileService();
  const controller:ProfileController = new ProfileController(service);
  router.get('/',(req:Request,res:Response,next:NextFunction)=>{controller.GetProfile(req,res,next)});
  
  router.put('/', (req, res, next) => {
  controller.ChangeProfile(req, res, next);
});
  router.post('/',(req:Request,res:Response,next:NextFunction)=>{controller.Follow(req,res,next)});
  router.get('/:username/followers',(req:Request,res:Response,next:NextFunction)=>{controller.getFollowers(req,res,next)});
  router.get('/:username/followings',(req:Request,res:Response,next:NextFunction)=>{controller.getFollowings(req,res,next)});

  return router;
}