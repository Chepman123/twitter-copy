import type { Post } from "../components/Pages/Main/Main";

export default class{
     static async Search(text:string):Promise<{username:string,type:string}[]> {
        try{
        const response = await fetch('http://localhost:5000/explore',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({text:text})
        });
        if(!response.ok) throw new Error('server problem');
        return await response.json();
    }
    catch(error){
        console.error(error);
        return [];
    }
    }
    static async getFollows(following:boolean,username:string):Promise<{username:string}[]>{
        let api:string = `http://localhost:5000/profile/${username}`;
        api += following?`/followings`:'/followers';
        try{
        const response:Response = await fetch(api);

        if(!response.ok) throw new Error('server problem');

        return await response.json();
        }
        catch(error){
            console.error(error);
            return []
        }
    }
    static async getProfile():Promise<Post[]>{
        try{
       const response:Response = await fetch('http://localhost:5000',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token:localStorage.getItem('token')})
       })
       if(!response.ok) throw new Error('server problem')
       return await response.json();
    }
    catch(error){
        console.error(error);
        return[];
    }
    }
}