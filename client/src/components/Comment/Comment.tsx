import { useEffect, useState, type ChangeEvent } from "react"

export interface Comment{
    id:string,
    username:string,
    content:string,
    date:string,
    createdByUser:boolean
}
export default function Comment({data}:{data:Comment}){
    const [content,setContent] = useState<string>(data.content)
    const [editMode,setEditMode] = useState<boolean>(false);
    function changeContent(event:ChangeEvent<HTMLInputElement>){
       setContent(event.target.value);
    }
    async function Edit(){
       await fetch(`http://localhost:5000/post/${data.id}/comment`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({content:content})
      })
      setEditMode(false);
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
  <>
    {!editMode && (
      <>
        <h4>{data.username}</h4>
        <h4>{date}</h4>
        <p>{content}</p>

        {data.createdByUser && (
          <>
            <button onClick={Delete}>Delete</button>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </>
    )}

    {editMode && (
      <>
        <input type="text" onChange={changeContent} value={content} />
        <button onClick={Edit}>Submit</button>
      </>
    )}
  </>
)}
