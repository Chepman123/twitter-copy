import { useState} from "react";
import Footer from "../../Footer/Footer";
import Nav from "../../Nav/Nav";
import classes from './Explore.module.scss'

import Channel from "../../Channel/Channel";
import service from '../../../services/Main'
import User from "../../User/User";

export default function Explore(){
    const[text,SetText] = useState<string>('');
    const[users,setUsers] = useState<{username:string,type:string}[]>([]);

    async function Search() {
        setUsers(await service.Search(text));
    }
    return <>
    <Nav/>
    <main className={classes.main}>
        <div className={classes.search}>
        <input type="text" placeholder="search..." value={text} onChange={(e)=>SetText(e.target.value)}/>
        <button className={classes.button} onClick={Search}>Search</button>
        </div>
       {users.map((user) => (
  user.type === "user"
    ? <User key={user.username} profile={user.username} avatar=""/>
    : user.type === "channel"
      ? <Channel key={user.username} name={user.username} />
      : null
        ))}


    </main>
    <Footer/>
    </>
}