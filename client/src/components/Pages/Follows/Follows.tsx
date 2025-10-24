import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import classes from './Follows.module.css'
import Nav from "../../Nav/Nav";
import Footer from "../../Footer/Footer";
import User from "../../User/User";

export default function Follow({following}:{following:boolean}){
    const {username} = useParams();
    const [follows,setFollows] = useState<{username:string}[]>();
    async function getFollows(){
        let api:string = `http://localhost:5000/profile/${username}`;
        api += following?`/followings`:'/followers';
        try{
        const response = await fetch(api);
        setFollows(await response.json());
        }
        catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{getFollows()},[])
    return <>
    <Nav/>
    <main className={classes.main}>
        <h1 className={classes.h1}>{following?`Followings`:'Followers'}</h1>
        {follows?.map((follow)=>{
            return <User profile={follow.username}/>
        })}
    </main>
    <Footer/>
    </>
}