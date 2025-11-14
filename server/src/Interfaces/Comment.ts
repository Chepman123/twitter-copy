export default interface Comment{
    id:string,
    username:string,
    content:string,
    date:string,
    createdByUser:boolean,
    channel:string|null
}