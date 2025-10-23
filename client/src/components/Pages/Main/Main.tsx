import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PostComponent from '../../Post/PostComponent'
import type{Comment} from '../../Comment/Comment'
export interface Post{
    id:number,
    content:string,
    created_by:string,
    created_at:string,
    created_byUser:boolean,
    likes:string,
    comments:Comment[]
}
interface Info{
    profile:string,users:{username:string}[],
    posts:Post[]
}

export default function Main(){
    const navigator = useNavigate();
    const [info,setInfo]=useState<Info>();
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
    return <>
    <ul>
        {info?.users.map((user)=>{
            return <li>
                <Link to={`/profile/${user.username}`}>{user.username}</Link>
            </li>
        })}
    </ul>
    {info?.posts.map((post)=>{
        return <PostComponent data={post}/>
    })}
    <Link to={`/profile/${info?.profile}`}>Profile</Link>
    </>
}