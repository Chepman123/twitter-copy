import type { profile } from "../components/Pages/ProfilePage/ProfilePage";

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
    static async SubmitProfile(username:string,description:string){
      try{
      const response:Response = await fetch('http://localhost:5000/profile',{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({login:username,description:description,icon:''})
      })
      if(!response.ok) throw new Error('server problem');
      }
      catch(error){
        console.error(error);
      }
    }
}