import { useParams } from "react-router-dom";

export default function Admin({username}:{username:string}){
    const {name} = useParams();
    function Delete(){
       fetch(`http://localhost:5000/channels/${name}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({admin:username})
       });
    }
    return <div><h2>{username}</h2>
    <button onClick={Delete}>X</button>
    </div>
}