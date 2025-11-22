import type { Comment } from "./Comment";

export interface Post{
    id:number,
    image?:string,
    content:string,
    created_by:string,
    created_at:string,
    created_byUser:boolean,
    likes:string,
    comments:Comment[],
    isLiked:boolean,
    channel:string,
    avatar:string
}
