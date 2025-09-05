import { CommentDTO } from "../../DTOs/comment/CommentDTO";


export interface ICommentServices{
    postComment(content:string,userId:number,noteId:number):Promise<CommentDTO>
    editComment(content:string,userId:number,noteId:number,id:number):Promise<CommentDTO>
} 