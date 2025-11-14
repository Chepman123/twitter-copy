import classes from './Main.module.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PostComponent from '../../Post/PostComponent'
import Nav from "../../Nav/Nav"
import Footer from "../../Footer/Footer"
import service from '../../../services/Main'
import type { Post } from '../../../interfaces/Post'


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