import { useEffect, useState, type ChangeEvent } from "react";
import type { Post } from "../Pages/Main/Main";
import { Link } from "react-router-dom";

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
     function DeletePost() {
       api('DELETE',{id:data.id});  
    }
    async function ChangePost() {
      await api('PUT',{id:data.id,content:editValue});  
      setEditMode(false);
    }
    return <>
       <p>{data.content}</p>
       {editMode&&
       <>
       <input type="text" value={editValue} onChange={changeValue}/>
       <button onClick={ChangePost}>Submit</button>
       </>
       }
       <Link to={`/profile/${data.created_by}`}>{data.created_by}</Link>
       {data.created_byUser &&
       <>
         <button onClick={()=>setEditMode(!editMode)}>edit</button>
         <button onClick={DeletePost}>delete</button>
       </>
       }
       <h4>{`Created at ${time}. ${date}`}</h4>
    </>
}