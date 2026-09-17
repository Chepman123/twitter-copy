import { useParams } from "react-router-dom";
import classes from './Admin.module.scss';
export default function Admin({username}:{username:string}){
    const {name} = useParams();
    function Delete(){
       fetch(`http://localhost:5000/channels/${name}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({admin:username})
       });
    }
    return <div className={classes.div} onClick={Delete}><h2>X {username}</h2>
    </div>
}