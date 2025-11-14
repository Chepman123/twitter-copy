import { useEffect, useState, type ChangeEvent } from "react"
import { Link, useParams } from "react-router-dom";
import userIcon from '../../../../public/userIcon.png'
import PostComponent from '../../Post/PostComponent';
import service from '../../../services/ProfilePage';
import classes from './ProfilePage.module.css'
import Nav from "../../Nav/Nav";
import Footer from "../../Footer/Footer";
import banner from '../../../../public/1.jpg'
import type { Post } from "../../../interfaces/Post";
import type { profile } from "../../../interfaces/Profile";

export default function ProfilePage(){

   //#region hooks
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
    useEffect(()=>{
       getData();
    },[])
    //#endregion 
    async function getData(){
      setProfile(await service.getData(username!));
    }
    
    async function Follow() {
      service.Follow(username!);
      setProfile({...profile,isFollowed:!profile?.isFollowed});
    }
    async function SubmitProfile(){
      setEditMode(false);
      service.SubmitProfile(username!,profile?.description!)
    }
    function fileHandler(event:ChangeEvent<HTMLInputElement>):void{
        if(event.target.files?.length){
          //setImageEdit(event.target.files[0]);
        }
    }
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