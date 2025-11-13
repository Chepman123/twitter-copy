import classes from './Main.module.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PostComponent from '../../Post/PostComponent'
import type{Comment} from '../../Comment/Comment'
import Nav from "../../Nav/Nav"
import Footer from "../../Footer/Footer"
import service from '../../../services/Main'
export interface Post{
    id:number,
    content:string,
    created_by:string,
    created_at:string,
    created_byUser:boolean,
    likes:string,
    comments:Comment[],
    isLiked:boolean,
    channel:string
}


export default function Main(){
  //#region hooks
    const navigator = useNavigate();
    const [info,setInfo]=useState<Post[]>();
    useEffect(()=>{
        if(!localStorage.getItem('token'))navigator('/login');

        getProfile();
    },[])
    //#endregion
    async function getProfile(){
       setInfo(await service.getProfile());
    }
    
    return <div className="page">
  <Nav/>
  <main className={classes.content}>
    {info?.map(post => <PostComponent data={post} />)}
  </main>
  <Footer/>
</div>

}