import {Link, useNavigate } from 'react-router-dom';
import logo from '../../../../public/logo.png';
import classes from './LoginReg.module.css'
import { useState} from 'react';
import service, { type loginStatus } from '../../../services/RegLog';


export default function Registration(){
    //#region  hooks and utils
    const navigator = useNavigate();
    const [login,setLogin] = useState<string>('');
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [passwordAgain,setPasswordAgain] = useState<string>('');
    const [message,setMessage] = useState<string>('');

    //#endregion
    //#region registration function

   const Reg=async()=>{
    if(login=='' || password=='') return;

     if(password!=passwordAgain){
        setMessage(`Password doesn't match`);
        return;
     }

        const result:loginStatus = await service.RegApi(login,password,username);
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
             case 'username':
                setMessage('username already exists');
                break;
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
                <input type='text' value={login} onChange={(e)=>setLogin(e.target.value)} placeholder='login'/>
                <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='username'/>
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
                <input type='password' value={passwordAgain} onChange={(e)=>setPasswordAgain(e.target.value)} placeholder='repeat password'/>
                <Link to="/login">I have already account</Link>
                <h2>{message}</h2>
                <button type='button' onClick={Reg}>Create account</button>
            </form>
        </section>
    </main>
}