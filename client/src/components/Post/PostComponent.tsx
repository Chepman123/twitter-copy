import { useEffect, useState, type ChangeEvent, type CSSProperties } from "react";
import type { Post } from "../Pages/Main/Main";
import { Link } from "react-router-dom";
import classes from './Post.module.css'
import Options from "../Options/Options";

//#region api
const api = async(method:string,body:{})=>{
  try{
   await fetch (`http://localhost:5000/profile/post`,{
        method:method,
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(body)
      })
    }
  catch(error){
    console.error(error);
  }
}
//#endregion

export default function PostComponent({data}:{data:Post}){
  //#region hooks
    const[time,setTime]=useState<string>();
    const[date,setDate]=useState<string>();
    const[editValue,setValue] = useState<string>(data.content);
    const[editMode,setEditMode] = useState<boolean>();
    const[isLiked,setIsLiked] = useState<boolean>(data.isLiked)
    const[likes,setLikes] = useState<string>('');
    const changeValue = (event:ChangeEvent<HTMLTextAreaElement>)=>{
      setValue(event.target.value);
    }
    useEffect(()=>{
        const fulldate:Date = new Date(data.created_at);
        const day:string = `${fulldate.getDate().toString()}.${fulldate.getMonth().toString()}.${fulldate.getFullYear().toString()}`;
        setDate(day);
        const time:string =`${ fulldate.getHours().toString()}:${fulldate.getMinutes().toString()}`;
        setTime(time);
    },[])
    useEffect(()=>{
      setIsLiked(data.isLiked)
    setLikes(data.likes);
  },[data.isLiked]);
    //#endregion
    //#region editing
    function DeletePost() {
       api('DELETE',{id:data.id});  
    }
    async function ChangePost() {
      await api('PUT',{id:data.id,content:editValue});  
      setEditMode(false);
    }
    //#endregion
    //#region Like and comment
    async function Like() {
      try{
         setIsLiked(!isLiked);
         if(isLiked) setLikes((Number(likes)-1).toString());
      else setLikes((Number(likes)+1).toString());
    await fetch(`http://localhost:5000/post/${data.id}/like`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({token:localStorage.getItem('token')})
    });
  }
  catch(error){
    console.error(error);
  }
   }
   //#endregion

    return <div className={classes.div}>
    <Link to={`/post/${data.id}`}>
     <div className={classes.topDiv}>
       <Link to={`/profile/${data.created_by}`}>{data.created_by}</Link>
       {data.created_byUser&&<Options editFunc={()=>{ setEditMode(!editMode)}}deleteFunc={DeletePost}/>}</div>
       {editMode&&
       <>
       <textarea value={editValue} onChange={changeValue}/>
       <button className={classes.button} onClick={ChangePost}>Submit</button>
       </>
       }
      {!editMode&&
       <p className={classes.p}>{editValue}</p>
      }
      
       <section className={classes.info}>
        <div className={classes.likes}>
       <button onClick={(e)=>{  e.preventDefault(); 
      e.stopPropagation();Like()}} className={classes.like} style={{color:isLiked?'red':'black'}as CSSProperties}>&#10084;</button>
       <h4>{likes}</h4>
       </div>
       <h4>{`${time}. ${date}`}</h4>
       </section>
    </Link>
    </div>
}