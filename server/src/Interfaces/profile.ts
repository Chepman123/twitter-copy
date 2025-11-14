import { Post } from "./Post";

export default interface profile{
    description:string;
    icon:string;
    userAccount:boolean;
    followersCount:number;
    followingsCount:number;
    isFollowed:boolean;
    posts:Post[]
}