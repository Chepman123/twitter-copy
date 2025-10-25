import { useEffect, useState, type ChangeEvent } from "react"
import { Link, useParams } from "react-router-dom";
import userIcon from '../../../../public/userIcon.png'
import type { Post } from "../Main/Main";
import PostComponent from '../../Post/PostComponent';
import PostCreateModal from "../../PostModal/PostCreateModal";
import classes from './ProfilePage.module.css'
import Nav from "../../Nav/Nav";
import Footer from "../../Footer/Footer";
import banner from '../../../../public/1.jpg'

interface profile{
    description?:string,
    icon?:string,
    userAccount?:boolean,
    followersCount?:number,
    followingsCount?:number,
    isFollowed?:boolean,
    posts?:Post[]
}

export default function ProfilePage(){

   //#region hooks and utils functions
    const {username} = useParams();
    const [profile,setProfile] = useState<profile>(); 
    const [editMode,setEditMode]=useState<boolean>(false);
    function ChangeDescription(event:ChangeEvent<HTMLTextAreaElement>){
         if(!event.target.value) return;
         setProfile({...profile, description:event.target.value});
    }
    useEffect(()=>{
      getData()
      setEditMode(false);
    },[username])
    //#endregion 
    //#region getData
    async function getData(){
     try{
       const response = await fetch(`http://localhost:5000/profile/?username=${username}&token=${localStorage.getItem('token')}`);
       const result:profile = await response.json();
      setProfile(result);
       
    }
      catch(error)
    {
      console.error(error);
    }
    }
    useEffect(()=>{
       getData();
    },[])
    //#endregion

    //#region following
    
    async function Follow() {
      try{
      await fetch('http://localhost:5000/profile',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          loginFollowing:username,
          tokenFollower:localStorage.getItem('token')
        })
        
      })
      setProfile({...profile,isFollowed:!profile?.isFollowed});
    }
    catch(error){
      console.error(error);
    }
    }
    //#endregion
    
    //#region submitProfile
    async function SubmitProfile(){
      setEditMode(false);
      try{
      await fetch('http://localhost:5000/profile',{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({login:username,description:profile?.description,icon:''})
      })
      
      }
      catch(error){
        console.error(error);
      }
    }
    function fileHandler(event:ChangeEvent<HTMLInputElement>):void{
        if(event.target.files?.length){
          //setImageEdit(event.target.files[0]);
        }
    }
    //#endregion
    return<>
      <Nav/>
    <main className={classes.main}>
      <img src={banner} className={classes.banner}/>
      <img src={profile?.icon||userIcon} className={classes.img}/>
      <div className={classes.div}>
    
    <h1 className={classes.h1}>{username}</h1>
    <div>
    <Link to={'/profile/'+username+'/followers'}>Followers:{profile?.followersCount}</Link>
    <Link to={'/profile/'+username+'/followings'}>Followings:{profile?.followingsCount}</Link>
    </div>
    </div>
  {
  !editMode && (
    <>
      <p className={classes.p}>{profile?.description}</p>
      {profile?.userAccount && (
        <>
        <button className={classes.button} type="button" onClick={() => setEditMode(true)}>
          Edit profile
        </button>
        </>
      )}
      {!profile?.userAccount &&
         <button type="button" onClick={Follow}>
          {profile?.isFollowed?'Unfollow':'Follow'}
        </button>
      }
    </>
  )
}
{
  editMode && (
    <>
      {profile?.userAccount && (
        <>
        <textarea placeholder="description" onChange={ChangeDescription} value={profile?.description}/><br/>
        <input type="file" onChange={fileHandler} /><br/>
        <button type="button" onClick={SubmitProfile}>
          Submit
        </button></>
      )}
    </>
  )
}
  <div className={classes.border}/>
    {profile?.posts?.map((post:Post)=>{
      return <PostComponent data={post}/>
    })}
    </main>
    <Footer/>
    </>
}