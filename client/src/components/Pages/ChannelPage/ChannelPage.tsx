import { useEffect, useState, type ChangeEvent } from "react";
import Footer from "../../Footer/Footer";
import classes from './ChannelPage.module.css'
import Nav from "../../Nav/Nav";
import { useParams } from "react-router-dom";
import type { Post } from "../Main/Main";
import PostComponent from "../../Post/PostComponent";
import PostCreateModal from "../../PostModal/PostCreateModal";
import Admin from "../../Admin/Admin";

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
    const[admin,setAdmin] = useState<string>();
    const[desc,setDesc] = useState<string>('');
    const [data,setData] = useState<channel>();
    const [editMode,setMode] = useState<boolean>();
    function changeDesc(event:ChangeEvent<HTMLTextAreaElement>){
        setDesc(event.target.value);
    }
      async function GetChannels() {
            const response = await fetch(`http://localhost:5000/channels/${name}`,{
          method:'GET',
          headers:{'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}}`}
        });
            const result:channel = await response.json();
            setData(result);
            setDesc(result.description);
        }
        useEffect(()=>{
          setAdmin(data?.followers[0]);
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
   async function Submit() {
    await fetch(`http://localhost:5000/channels/${name}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({description:desc})
    })
   }
   async function AddAdmin(){
    console.log(admin);
         await fetch(`http://localhost:5000/channels/${name}/newAdmin`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({admin:admin})
    })
   }

    return <>
    <Nav/>
    <main className={classes.main}>
        <h1>{data?.name}</h1>
        {editMode&&
        <>
        <textarea placeholder="description" onChange={changeDesc} value={desc}/>
        <button onClick={()=>{setMode(false);Submit()}}>Submit</button>
        <h2>Admins</h2>
        {data?.adminList.map((admin)=>{
          return <Admin username={admin}/>
        })}
        <select value={admin} onChange={(e) => setAdmin(e.target.value)}>
          {data?.followers.map((follower)=>{
            return <option value={follower}>{follower}</option>
          })}
        </select>
        <button onClick={AddAdmin}>Add admin</button>
        </>
        }
        {!editMode&&
        <>
        <p>{desc}</p>
        {data?.isAdmin&&
        <>
        <button onClick={()=>{setMode(true)}}>Edit</button>
        <PostCreateModal channelName={data.name}/></>
        }
        <h2>followers: {data?.followers.length}</h2>
         <button onClick={Follow}>{data?.isFollowed?'unfollow':'follow'}</button>

         </>}
       

        {data?.posts.map((post)=>{
            return <PostComponent data={post}/>
        })}
    </main>
    <Footer/>
    </>
}