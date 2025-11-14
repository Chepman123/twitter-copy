import type { Post } from "./Post";

export interface profile{
    description?:string,
    icon?:string,
    userAccount?:boolean,
    followersCount?:number,
    followingsCount?:number,
    isFollowed?:boolean,
    posts?:Post[]
}