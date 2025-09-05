import { Comment } from "../../Models/Comment";


export interface ICommentRepository{
    createComment(comment:Comment):Promise<Comment>
    getById(id:number):Promise<Comment>
    getByNoteId(id:number):Promise<Comment[]>
    getByUserId(id:number):Promise<Comment[]>
    update(comment:Comment):Promise<Comment>
    delete(id:number):Promise<boolean>
    exists(id:number):Promise<boolean>
}