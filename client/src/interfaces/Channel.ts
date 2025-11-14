import type { Post } from "../components/Pages/Main/Main";

export interface channel{
    name:string,
    description:string,
    followers:string[],
    adminList:string[],
    isAdmin:boolean,
    posts:Post[],
    isFollowed:boolean
}