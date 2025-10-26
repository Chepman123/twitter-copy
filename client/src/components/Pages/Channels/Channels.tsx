import { useEffect, useState, type ChangeEvent } from "react";
import Footer from "../../Footer/Footer";
import Nav from "../../Nav/Nav";
import classes from './Channels.module.css'
import Channel from "../../Channel/Channel";

export default function Channels(){
    const[creatingMode,setMode]=useState<boolean>(false);
    const[name,setName] = useState<string>('');
    const[desc,setDesc] = useState<string>('');
    const[channels,setChannels] = useState<{name:string}[]>([]);
    function changeName(event:ChangeEvent<HTMLInputElement>){
        setName(event.target.value);
    }
    function changeDesc(event:ChangeEvent<HTMLTextAreaElement>){
        setDesc(event.target.value);
    }
    async function Create() {
        await fetch('http://localhost:5000/channels',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:name,description:desc})
        })
    }
    async function GetChannels() {
        const response = await fetch('http://localhost:5000/channels',{
      method:'GET',
      headers:{'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}}`}
    });
        const result = await response.json();
        setChannels(result);
    }
    useEffect(()=>{
        GetChannels();
    },[])
    return <>
    <Nav/>
    <main className={classes.main}>
        {!creatingMode&&
            <>
        <button onClick={()=>{setMode(true)}}>Create channel</button>
        </>}
        {creatingMode&&
           <>
           <input type="text" placeholder="Channel name" onChange={changeName} value={name}/>
           <textarea placeholder='description(optional)' onChange={changeDesc} value={desc}/>
           <button onClick={()=>{setMode(false);Create()}}>Create</button>
           </>
        }
        {channels.map((channel)=>{
            return <Channel name={channel.name}/>
        })}
    </main>
    <Footer/>
    </>
}