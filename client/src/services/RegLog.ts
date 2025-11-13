export type loginStatus =  {status:'success',token:string}|{status:`login`|`password`|'database'|'username'}; 
export default class{
    static async LogInApi(login:string,password:string):Promise<loginStatus>
    {
        try{
         const response:Response = await fetch('http://localhost:5000/login',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    login:login,
                    password:password
                })
            }
        )
        if(!response.ok) throw new Error('Network error');
        
        return await response.json();
    }
    catch(error){
        console.error(error);
        return {status:'database'};
    }
    } 
    static async RegApi(login:string,password:string,username:string):Promise<loginStatus>
    {
        try{
         const response:Response = await fetch('http://localhost:5000/registration',
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    login:login,
                    password:password,
                    username:username
                })
            }
        )
        if(!response.ok) throw new Error('Network error');
        
        return await response.json();
         }
    catch(error){
        console.error(error);
        return {status:'database'};
    }
    } 
}