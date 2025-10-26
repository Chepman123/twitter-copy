import { Link } from "react-router-dom";
import classes from './Channel.module.css'
export default function Channel({name}:{name:string}){
   return <div className={classes.div}>
   <Link to={`/channels/${name}`}>{name}</Link>
   </div>
}