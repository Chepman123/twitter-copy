import { useState, type ChangeEvent} from "react";
import Modal from "../Modal/Modal";

export default function PostCreateModal(){
    //#region hooks, utils functions
    const [modal,setModal] = useState<boolean>(false);
    const [content,setContent] = useState<string>('');
    function changeContent(event:ChangeEvent<HTMLInputElement>){
        setContent(event.target.value);
    }
    function showModal():void{
         setModal(!modal);
    }
    //#endregion
    //#region createPost
    async function createPost(){
       if(content=='')return;
       try
       {
       await fetch(`http://localhost:5000/profile/post`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            token:localStorage.getItem('token'),
            content:content
        })
       })
    }
    catch(error){
        console.error(error);
    }
        setModal(false);
    }
   
    return(
        <div>
        <button onClick={showModal}>Create Post</button>
        <Modal open={modal} onClick={()=>setModal(false)}>
            <input type="text" onChange={changeContent} value={content}/>
            <button onClick={createPost}>create</button>
        </Modal>
        </div>
    )
}