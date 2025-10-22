import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";

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
    return<>
    <ul>
        {follows?.map((follow)=>{
            return <li>
                <Link to={'/profile/'+follow.username} key={follow.username}>{follow.username}</Link>
                </li>
        })}
    </ul>
    </>
}