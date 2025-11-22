import type { profile } from "../interfaces/Profile";

export default class{
    static async getData(username:string):Promise<profile>{
     try{
       const response:Response = await fetch(`http://localhost:5000/profile/?username=${username}&token=${localStorage.getItem('token')}`);
       
       if(!response.ok) throw new Error('server problem');

       return await response.json();
    }
      catch(error)
    {
      console.error(error);
      return {} as profile;
    }
    }
    
    static async Follow(username:string) {
      try{
      const response:Response = await fetch('http://localhost:5000/profile',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          loginFollowing:username,
          tokenFollower:localStorage.getItem('token')
        })
        
      })
      if(!response.ok) throw new Error('server problem');
    }
    catch(error){
      console.error(error);
    }
    }
    static async SubmitProfile(username:string,description:string,avatar:File){
      const formData:FormData = new FormData();
      formData.append('login',username);
      formData.append('description',description);
      formData.append('avatar',avatar);
      const reader:FileReader = new FileReader();
      try{
        reader.onload=async()=>{
      const response:Response = await fetch('http://localhost:5000/profile',{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          login:username,
          description:description,
          avatar:reader.result
        })
      })
      if(!response.ok) throw new Error('server problem');
      }
    reader.readAsDataURL(avatar);
    }
      catch(error){
        console.error(error);
      }
    }
}