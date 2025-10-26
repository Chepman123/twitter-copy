import { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import classes from './ChannelPage.module.css'
import Nav from "../../Nav/Nav";
import { useParams } from "react-router-dom";
import type { Post } from "../Main/Main";
import PostComponent from "../../Post/PostComponent";

interface channel{
    name:string,
    description:string,
    followers:string[],
    adminList:string[],
    isAdmin:boolean,
    posts:Post[],
    isFollowed:boolean
}

export default function ChannelPage(){
    const {name} = useParams();
    const [data,setData] = useState<channel>();
      async function GetChannels() {
            const response = await fetch(`http://localhost:5000/channels/${name}`,{
          method:'GET',
          headers:{'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}}`}
        });
            const result:channel = await response.json();
            setData(result);
        }
        useEffect(()=>{
            GetChannels();
        },[])
        async function Follow() {
  if (!data) return;

  setData({
    ...data,
    isFollowed: !data.isFollowed
  });
  await fetch('http://localhost:5000/channels/follow',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          channelName:data.name,
          tokenFollower:localStorage.getItem('token')
        })
      })
}

    return <>
    <Nav/>
    <main className={classes.main}>
        <h1>{data?.name}</h1>
        <p>{data?.description}</p>
        {data?.isAdmin&&
        <button>Edit</button>}

        <button onClick={Follow}>{data?.isFollowed?'unfollow':'follow'}</button>


        {data?.posts.map((post)=>{
            return <PostComponent data={post}/>
        })}
    </main>
    <Footer/>
    </>
}