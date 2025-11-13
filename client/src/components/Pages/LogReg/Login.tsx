import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../public/logo.png';
import classes from './LoginReg.module.css'
import {useState} from 'react';
import service, { type loginStatus } from '../../../services/RegLog';


export default function Login(){
    //#region hooks
    const navigator = useNavigate();
    const [login,setLogin] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [message,setMessage] = useState<string>('');

    //#endregion
    //#region login function

   const LogIn=async()=>{
    if(login=='' || password=='') return;
        const result:loginStatus = await service.LogInApi(login,password);

        if(result.status==='success'){
            localStorage.setItem('token',result.token);
             navigator('/');
        }
        else 
            switch(result.status){
            case 'login':
                setMessage(`login or username doesn't match`);
                break;
            case 'password':
                setMessage(`password doesn't match`);
                break;
            case 'database':
                setMessage('database error');
                break;
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
                <input type='text' value={login} onChange={(e)=>setLogin(e.target.value)} placeholder='login or username'/>
                <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
                <Link to="/registration">create account</Link>
                <h2>{message}</h2>
                <button type='button' onClick={LogIn}>Log in</button>
            </form>
        </section>
    </main>
}