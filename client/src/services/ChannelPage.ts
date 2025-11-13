import type { channel } from "../components/Pages/ChannelPage/ChannelPage";

export default class{
    static async GetChannel(name:string):Promise<channel>{
        try{
            const response:Response = await fetch(`http://localhost:5000/channels/${name}`,{
          method:'GET',
          headers:{'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}}`}
        });
            return await response.json();
        }
    catch(error){
        console.error(error);
        return {} as channel;
    }
    }
        static async Follow(data:channel):Promise<void>{
            try{
        const response:Response = await fetch('http://localhost:5000/channels/follow',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          channelName:data.name,
          tokenFollower:localStorage.getItem('token')
        })
      })
      if(!response.ok) throw new Error('server problem');
       }
    catch(error){
        console.error(error);
    }
}   
    static async Submit(name:string,desc:string):Promise<void> {
        try{
     const response:Response = await fetch(`http://localhost:5000/channels/${name}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({description:desc})
    })
     if(!response.ok) throw new Error('server problem');
       }
    catch(error){
        console.error(error);
    }
   }
   static async AddAdmin(name:string,admin:string):Promise<void>{
    try{
          const response:Response = await fetch(`http://localhost:5000/channels/${name}/newAdmin`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({admin:admin})
    })
     if(!response.ok) throw new Error('server problem');
       }
    catch(error){
        console.error(error);
    }
   }
    static async Create(desc:string):Promise<void> {
        await fetch('http://localhost:5000/channels',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:name,description:desc})
        })
    }
     static async GetChannels():Promise<{name:string}[]>{
        try{
                    const response:Response = await fetch('http://localhost:5000/channels',{
              method:'GET',
              headers:{'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}}`}
    });
            return await response.json();
        }
    catch(error){
        console.error(error);
        return [];
    }
    }
}