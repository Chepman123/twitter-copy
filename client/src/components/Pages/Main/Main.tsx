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
    const [info,setInfo]=useState<Post[]>([]);
    const[currentPage,setPage]=useState<number>(1);
    useEffect(()=>{
        if(!localStorage.getItem('token'))navigator('/login');
         document.addEventListener("scroll",ScrollHandler);
        return ()=>document.removeEventListener("scroll",ScrollHandler);
    },[])
    function ScrollHandler(){
 if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200
  ) {
    setPage(prev => prev + 1);
  }
    }
    //#endregion
    async function getProfile(){
      const result = await service.getProfile(currentPage);
      setInfo(prev => [...prev, ...(result ?? [])]);
    }
    useEffect(()=>{getProfile()},[currentPage])
    
    return <div className="page">
  <Nav/>
  <main className={classes.content}>
    {info?.map(post => <PostComponent data={post} />)}
  </main>
  <Footer/>
</div>

}