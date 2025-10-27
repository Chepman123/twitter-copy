import { useState, type ChangeEvent} from "react";
import Modal from "../Modal/Modal";
import classes from './PostModal.module.css'
export default function PostCreateModal({channelName}:{channelName?:string}){
    //#region hooks, utils functions
    const [modal,setModal] = useState<boolean>(false);
    const [content,setContent] = useState<string>('');
    function changeContent(event:ChangeEvent<HTMLTextAreaElement>){
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
            content:content,
            channelName:channelName??''
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
            <div className={classes.textarea}>
            <textarea className={classes.input} onChange={changeContent} value={content} placeholder="What's happening?"/>
            </div>
            <div className={classes.div}>
            <button className={classes.button} onClick={createPost}>Post</button>
            </div>
        </Modal>
        </div>
    )
}