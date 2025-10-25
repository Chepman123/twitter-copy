import { useState, type ChangeEvent } from "react";
import Footer from "../../Footer/Footer";
import Nav from "../../Nav/Nav";
import classes from './Explore.module.css'
import User from "../../User/User";

export default function Explore(){
    const[text,SetText] = useState<string>();
    const[users,setUsers] = useState<{username:string}[]>([]);
    function changeText(event:ChangeEvent<HTMLInputElement>){{
        SetText(event.target.value);
    }}
    async function Search() {
        const response = await fetch('http://localhost:5000/explore',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({text:text})
        });
        setUsers(await response.json());
    }
    return <>
    <Nav/>
    <main className={classes.main}>
        <div className={classes.search}>
        <input type="text" placeholder="search..." value={text} onChange={changeText}/>
        <button className={classes.button} onClick={Search}>Search</button>
        </div>
        {users.map((user)=>{
            return <User profile={user.username}/>
        })}
    </main>
    <Footer/>
    </>
}