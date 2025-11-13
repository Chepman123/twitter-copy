import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import classes from './Follows.module.css'
import Nav from "../../Nav/Nav";
import Footer from "../../Footer/Footer";
import User from "../../User/User";
import service from '../../../services/Main'

export default function Follow({following}:{following:boolean}){
    const {username} = useParams();
    const [follows,setFollows] = useState<{username:string}[]>();
    async function getFollows(){
        setFollows(await service.getFollows(following,username!));
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