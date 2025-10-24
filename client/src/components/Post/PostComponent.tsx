import { useEffect, useState, type ChangeEvent } from "react";
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
    const[editValue,setValue] = useState<string>();
    const[editMode,setEditMode] = useState<boolean>();
    const changeValue = (event:ChangeEvent<HTMLInputElement>)=>{
      setValue(event.target.value);
    }
    useEffect(()=>{
        const fulldate:Date = new Date(data.created_at);
        const day:string = `${fulldate.getDate().toString()}.${fulldate.getMonth().toString()}.${fulldate.getFullYear().toString()}`;
        setDate(day);
        const time:string =`${ fulldate.getHours().toString()}:${fulldate.getMinutes().toString()}`;
        setTime(time);
    },[])
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
       {editMode&&
       <>
       <input type="text" value={editValue} onChange={changeValue}/>
       <button onClick={ChangePost}>Submit</button>
       </>
       }
       <div className={classes.topDiv}>
       <Link to={`/profile/${data.created_by}`}>{data.created_by}</Link>
       {data.created_byUser&&<Options editFunc={()=>{ setEditMode(!editMode)}}deleteFunc={DeletePost}/>}</div>
       <p className={classes.p}>{data.content}</p>
       <section className={classes.info}>
        <div className={classes.likes}>
       <button onClick={Like} className={classes.like}>&#10084;</button>
       <h4>{data.likes}</h4>
       </div>
       <h4>{`${time}. ${date}`}</h4>
       </section>
    </Link>
    </div>
}