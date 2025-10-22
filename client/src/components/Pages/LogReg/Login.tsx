import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../public/logo.png';
import classes from './LoginReg.module.css'
import {useState, type ChangeEvent } from 'react';

//#region help types and functions
type loginStatus =  {status:'success',token:string}|{status:`login`|`password`|'database'}; 
 async function LogInApi(login:string,password:string):Promise<loginStatus>
    {
         const response = await fetch('http://localhost:5000/login',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    login:login,
                    password:password
                })
            }
        )
        if(!response.ok) throw new Error('Network error');
        
        return await response.json();
    } 
//#endregion

export default function Login(){
    //#region  hooks and utils
    const navigator = useNavigate();
    const [login,setLogin] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [message,setMessage] = useState<string>('');

    const changeLogin = (event:ChangeEvent<HTMLInputElement>)=>{
        setLogin(event.target.value);
    }
    const changePassword = (event:ChangeEvent<HTMLInputElement>)=>{
        setPassword(event.target.value);
    }
    //#endregion
    //#region login function

   const LogIn=async()=>{
    if(login=='' || password=='') return;
      try{
        const result:loginStatus = await LogInApi(login,password);

        if(result.status==='success'){
            localStorage.setItem('token',result.token);
             navigator('/');
        }
        else 
            switch(result.status){
            case 'login':
                setMessage(`login doesn't match`);
                break;
            case 'password':
                setMessage(`password doesn't match`);
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
    return <main className={classes.main}>
        <aside className={classes.aside}>
            <img src={logo} className={classes.img} alt='Applogo'/>
        </aside>
        <section className={classes.section}>
            <h1 className={classes.h1}>Log in</h1>
            <form className={classes.form}>
                <input type='text' value={login} onChange={changeLogin} placeholder='login'/>
                <input type='password' value={password} onChange={changePassword} placeholder='password' />
                <Link to="/registration">create account</Link>
                <h2>{message}</h2>
                <button type='button' onClick={LogIn}>Log in</button>
            </form>
        </section>
    </main>
}