import { useEffect, useState } from 'react'
import User from '../User/User'
import classes from './Footer.module.css'
import { getProfile } from '../Nav/Nav';

export default function Footer(){
    const [users, setUsers] = useState<{username:string,avatar:string}[]>();
    async function getFollowings() {
        const response = await fetch(`http://localhost:5000/profile/${(await getProfile()).profile}/followings`);
        setUsers(await response.json());
    }
    useEffect(()=>{getFollowings()},[])
    return <footer>
        <h1 className={classes.h1}>Followings</h1>
         <ul className={classes.ul}>
        {users?.map((user)=>{
            return <li className={classes.li}>
                <User profile={user.username}avatar={user.avatar}/>
            </li>
        })}
    </ul>
    </footer>
}