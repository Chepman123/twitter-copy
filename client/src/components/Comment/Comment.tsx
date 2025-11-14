import { Link } from 'react-router-dom';
import classes from './Comment.module.css'
import { useEffect, useState, type ChangeEvent } from "react"
import Options from '../Options/Options';
import type { Comment } from '../../interfaces/Comment';

export default function Comment({data}:{data:Comment}){
    const [content,setContent] = useState<string>(data.content)
    const [editMode,setEditMode] = useState<boolean>(false);
    function changeContent(event:ChangeEvent<HTMLTextAreaElement>){
       setContent(event.target.value);
    }
    async function Edit(){
      setEditMode(false);
       await fetch(`http://localhost:5000/post/${data.id}/comment`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({content:content})
      })
      
    }
    function Delete(){
      fetch(`http://localhost:5000/post/${data.id}/comment`,{
        method:'DELETE'
      })
    }
    const [date,setDate] = useState<string>();
    useEffect(()=>{
       const fulldate:Date = new Date(data.date);
       const day = `${fulldate.getDate()}.${fulldate.getMonth()}.${fulldate.getFullYear()}`;
       const hour = `${fulldate.getHours()}:${fulldate.getMinutes()}`;
       setDate(`${day} ${hour}`);
    },[])
return (
  <div className={classes.div}>
    {!editMode && (
      <>
      <div className={classes.topDiv}>
        <Link to={`/profile/${data.username}`}>{data.username}</Link>
        {data.createdByUser &&
          <Options editFunc={() => setEditMode(true)}deleteFunc={Delete}/>
        }</div>
        <p className={classes.content}>{content}</p>
        <p className={classes.p}>{date}</p>
      </>
    )}

    {editMode && (
      <>
      <Link to={`/profile/${data.username}`}>{data.username}</Link><br/>
        <textarea onChange={changeContent} value={content} />
        <button className={classes.button} onClick={Edit}>Submit</button>
      </>
    )}
  </div>
)}
