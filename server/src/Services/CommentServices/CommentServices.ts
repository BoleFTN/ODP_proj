import { CommentDTO } from "../../Domain/DTOs/comment/CommentDTO";
import { Comment } from "../../Domain/Models/Comment";
import { ICommentRepository } from "../../Domain/repositories/commentRepository/ICommentRepository";
import { ICommentServices } from "../../Domain/services/CommentServices/ICommentServices";


export class CommentServices implements ICommentServices{
    public constructor(private commentRepository:ICommentRepository){
        this.commentRepository = commentRepository
    }

    async postComment(content: string, userId: number, noteId: number): Promise<CommentDTO> {
        const comment = await this.commentRepository.createComment(new Comment(0,content,userId,noteId))

        return new CommentDTO(comment.commentId,comment.content,comment.userId,comment.noteId)
    }
    async editComment(content: string, userId: number, noteId: number, id: number): Promise<CommentDTO> {
        const test = await this.commentRepository.exists(id)

        if(test === true){
            const updatedComment = await this.commentRepository.update(new Comment(id,content,userId,noteId))

            return new CommentDTO(updatedComment.commentId,updatedComment.content,updatedComment.userId,updatedComment.noteId)
        }

        else{
            return new CommentDTO()
        }
    }
    
}