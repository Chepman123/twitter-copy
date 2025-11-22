import { useEffect, useState } from "react";
import PostCreateModal from "../PostModal/PostCreateModal";
import User from "../User/User";
import classes from "./Nav.module.css";
import NavButton from "./NavButton";

 export async function getProfile():Promise<{profile:string,avatar:string}> {
    const response = await fetch('http://localhost:5000',{
      method:'GET',
      headers:{'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}}`}
    });
    return await response.json();
  }
export default function Nav() {
  const [profile,setProfile] = useState<{profile:string,avatar:string}>();
 
  async function ChangeProfile() {
     setProfile(await getProfile())
  }
  useEffect(()=>{ChangeProfile()},[])
  return (
    <nav className={classes.nav}>
      <NavButton
        path="/"
        icon="M3 11.5L12 4l9 7.5M5 20.5V11h14v9.5"
      >
        Home
      </NavButton>

      <NavButton
        path="/explore"
        icon="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
      >
        Explore
      </NavButton>

      <NavButton
        path="/channels"
        icon="M4 3h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 3v-3H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      >
        Channels
      </NavButton>

      <PostCreateModal />
      <User profile={profile?.profile!} avatar={profile?.avatar!}/>
    </nav>
  );
}
