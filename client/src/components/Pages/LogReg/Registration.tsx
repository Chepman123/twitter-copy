import {Link, useNavigate } from 'react-router-dom';
import logo from '../../../../public/logo.png';
import classes from './LoginReg.module.css'
import { useState, type ChangeEvent } from 'react';

//#region help types and functions
type loginStatus =  {status:'success',token:string}|{status:`login`|`password`|'database'}; 
 async function RegApi(login:string,password:string,username:string):Promise<loginStatus>
    {
         const response = await fetch('http://localhost:5000/registration',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    login:login,
                    password:password,
                    username:username
                })
            }
        )
        if(!response.ok) throw new Error('Network error');
        
        return await response.json();
    } 
//#endregion

export default function Registration(){
    //#region  hooks and utils
    const navigator = useNavigate();
    const [login,setLogin] = useState<string>('');
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [passwordAgain,setPasswordAgain] = useState<string>('');
    const [message,setMessage] = useState<string>('');

    const changeLogin = (event:ChangeEvent<HTMLInputElement>)=>{
        setLogin(event.target.value);
    }
    const changeUsername = (event:ChangeEvent<HTMLInputElement>)=>{
        setUsername(event.target.value);
    }
    const changePassword = (event:ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value);
    }
    const changePasswordAgain = (event:ChangeEvent<HTMLInputElement>)=>{
        setPasswordAgain(event.target.value);
    }
    //#endregion
    //#region registration function

   const Reg=async()=>{
    if(login=='' || password=='') return;

     if(password!=passwordAgain){
        setMessage(`Password doesn't match`);
        return;
     }

      try{
        const result:loginStatus = await RegApi(login,password,username);
        if(result.status==='success'){
            localStorage.setItem('token',result.token);
             navigator('/');
        }
        else 
            switch(result.status){
             case 'login':
                setMessage('login already exists');
                break;
             case 'password':
                setMessage('password is not safe');
                break;
             case 'database':
                setMessage('database error');
                break;
        }
      }
      catch(error){
        console.error(error);
      }
   }
   //#endregion
    return <main className={classes.registration}>
        <aside className={classes.aside}>
            <img src={logo} className={classes.img} alt='Applogo'/>
        </aside>
        <section className={classes.section}>
            <h1 className={classes.h1}>Registration</h1>
            <form className={classes.form}>
                <input type='text' value={login} onChange={changeLogin} placeholder='login'/>
                <input type='text' value={username} onChange={changeUsername} placeholder='username'/>
                <input type='password' value={password} onChange={changePassword} placeholder='password'/>
                <input type='password' value={passwordAgain} onChange={changePasswordAgain} placeholder='repeat password'/>
                <Link to="/login">I have already account</Link>
                <h2>{message}</h2>
                <button type='button' onClick={Reg}>Create account</button>
            </form>
        </section>
    </main>
}