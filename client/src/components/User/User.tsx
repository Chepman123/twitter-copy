import { Link } from "react-router-dom";
import classes from './User.module.scss'
import icon from '../../../public/userIcon.png'

export default function User({profile,avatar}:{profile:string,avatar:string}){
    return <div className={classes.div}>
    <Link to={`/profile/${profile}`}>
        <img className={classes.img} src={avatar||icon}/>
        <h2 className={classes.h2}>{profile}</h2>
    </Link>
    </div>
}