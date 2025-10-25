import classes from './Main.module.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PostComponent from '../../Post/PostComponent'
import type{Comment} from '../../Comment/Comment'
import Nav from "../../Nav/Nav"
import Footer from "../../Footer/Footer"
export interface Post{
    id:number,
    content:string,
    created_by:string,
    created_at:string,
    created_byUser:boolean,
    likes:string,
    comments:Comment[],
    isLiked:boolean
}


export default function Main(){
    const navigator = useNavigate();
    const [info,setInfo]=useState<Post[]>();
    async function getProfile(){
        try{
       const response = await fetch('http://localhost:5000',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token:localStorage.getItem('token')})
       })
       const result = (await response.json());
       setInfo(result);
       }
       catch(error){
        console.error(error);
       }
    }
    useEffect(()=>{
        if(!localStorage.getItem('token'))navigator('/login');

        getProfile();
    },[])
    return <div className="page">
  <Nav/>
  <main className={classes.content}>
    {info?.map(post => <PostComponent data={post} />)}
  </main>
  <Footer/>
</div>

}