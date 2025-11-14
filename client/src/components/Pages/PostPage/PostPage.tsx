import { useParams } from 'react-router-dom'
import PostComponent from '../../Post/PostComponent'
import { useEffect, useState} from 'react';
import Comment from '../../Comment/Comment';
import Nav from '../../Nav/Nav';
import Footer from '../../Footer/Footer';
import classes from './PostPage.module.css'
import service from '../../../services/PostPage'
import type { Post } from '../../../interfaces/Post';
export default function PostPage(){
    //#region hooks
    const {id} = useParams();
    const [comment,setComment] = useState<string>('');
    const [data,setData] = useState<Post>();
     useEffect(()=>{
        getPage();
    },[])
    //#endregion
    async function getPage(){
        setData(await service.getPage(id!));
    }
    async function SendComment() {
        service.SendComment(comment,id!);
    }
    return <>
    <Nav/>
    <main className={classes.main}>
    {
        data!=null&&
        <>
    <PostComponent data={data!}/>
    <textarea className={classes.input} placeholder='comment' onChange={(e)=>setComment(e.target.value)} value={comment}/>
    <button className={classes.button} onClick={SendComment}>Send comment</button>
    </>
    }
    {
        data?.comments.map((comment)=>{
            return <Comment data={comment}/>
        })
    }
    </main>
    <Footer/>
    </>
}