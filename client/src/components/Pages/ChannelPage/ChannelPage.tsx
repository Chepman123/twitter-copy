import { useEffect, useState} from "react";
import Footer from "../../Footer/Footer";
import classes from './ChannelPage.module.css'
import Nav from "../../Nav/Nav";
import { useParams } from "react-router-dom";
import type { Post } from "../Main/Main";
import PostComponent from "../../Post/PostComponent";
import PostCreateModal from "../../PostModal/PostCreateModal";
import Admin from "../../Admin/Admin";
import service from '../../../services/ChannelPage'

export interface channel{
    name:string,
    description:string,
    followers:string[],
    adminList:string[],
    isAdmin:boolean,
    posts:Post[],
    isFollowed:boolean
}

export default function ChannelPage(){
  //#region hooks
    const {name} = useParams();
    const[admin,setAdmin] = useState<string>();
    const[desc,setDesc] = useState<string>('');
    const [data,setData] = useState<channel>();
    const [editMode,setMode] = useState<boolean>();
     useEffect(()=>{
          setAdmin(data?.followers[0]);
            GetChannels();
        },[])
    //#endregion
      async function GetChannels() {
            const result:channel = await service.GetChannel(name!);
            setData(result);
            setDesc(result.description);
        }
       
        function Follow() {
  if (!data) return;
   
  setData({
    ...data,
    isFollowed: !data.isFollowed
  });

  service.Follow(data);
}
   async function Submit() {
    service.Submit(name!,desc)
   }
   async function AddAdmin(){
    if(!admin)return;
    service.AddAdmin(name!,admin);
   }

    return <>
    <Nav/>
    <main className={classes.main}>
        <h1>{data?.name}</h1>
        {editMode&&
        <>
        <textarea placeholder="description" onChange={(e)=>setDesc(e.target.value)} value={desc}/>
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