import { useParams } from 'react-router-dom'
import PostComponent from '../../Post/PostComponent'
import { useEffect, useState, type ChangeEvent } from 'react';
import type { Post } from '../Main/Main';
import Comment from '../../Comment/Comment';
import Nav from '../../Nav/Nav';
import Footer from '../../Footer/Footer';
import classes from './PostPage.module.css'
export default function PostPage(){
    const {id} = useParams();
    const [comment,setComment] = useState<string>();
    const [data,setData] = useState<Post>();

    function changeText(event:ChangeEvent<HTMLInputElement>){
        setComment(event.target.value);
    }

    async function getPage(){
      const response = await fetch(`http://localhost:5000/post/${id}`, {
       method: 'GET',
       headers: {
      'Content-Type': 'application/json',
      'token':  localStorage.getItem('token')!
      }
       });

        const data:Post = await response.json();
        setData(data);
    }
    async function SendComment() {
        await fetch(`http://localhost:5000/post/${id}/comment`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({token:localStorage.getItem('token'),content:comment})
        });
    }
    useEffect(()=>{
        getPage();
    },[])
    return <>
    <Nav/>
    <main className={classes.main}>
    {
        data!=null&&
        <>
    <PostComponent data={data!}/>
    <input className={classes.input} type="text" placeholder='comment' onChange={changeText} value={comment}/>
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