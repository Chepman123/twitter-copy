import type { Post } from "../interfaces/Post";


export default class{
    static async getPage(id:string):Promise<Post>{
        try{
          const response:Response = await fetch(`http://localhost:5000/post/${id}`, {
           method: 'GET',
           headers: {
          'Content-Type': 'application/json',
          'token':  localStorage.getItem('token')!
          }
           });
    
           if(!response.ok) throw new Error('server problem');

            return await response.json();
        }
        catch(error){
            console.error(error);
            return {} as Post
        }
    }
    static async SendComment(comment:string,id:string):Promise<void>{
        try{
            const response:Response = await fetch(`http://localhost:5000/post/${id}/comment`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({token:localStorage.getItem('token'),content:comment})
            });
            if(!response.ok) throw new Error('server problem');
        }
        catch(error){
            console.error(error);
        }
        }
}