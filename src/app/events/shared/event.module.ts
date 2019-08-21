export interface IEvent{
    id:number
    name:string
    date:string
    time:string
    price:number
    imageUrl:string
    location?:{
        address:string
        city:string
        country:string
    },
    onlineUrl?:string
    sessions:ISession[]
    }
    
   export interface ISession{
        session_id:number
        name:string
        presenter:string
        duration:number
        level:string
        abstr:string 
        voters:string[]
    }