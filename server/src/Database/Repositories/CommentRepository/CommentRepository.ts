import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Comment } from "../../../Domain/Models/Comment";
import { ICommentRepository } from "../../../Domain/repositories/commentRepository/ICommentRepository";
import db from "../../connection/DbConnectionPool";


export class CommentRepository implements ICommentRepository{
    async createComment(comment: Comment): Promise<Comment> {
        try{
            const query : string = "INSERT INTO comments (content,noteId,userId) VALUES (?,?,?)"
            const [result] = await db.execute<ResultSetHeader>(query,[comment.content,comment.noteId,comment.userId])

            if(result.insertId){
                return new Comment(result.insertId,comment.content,comment.userId,comment.noteId)
            }
            else{
                return new Comment()
            }
        }
        catch{
            return new Comment()
        }
    }
    async getById(id: number): Promise<Comment> {
        try{
            const query = "SELECT * FROM comment WHERE commentId=?"
            const [rows] = await db.execute<RowDataPacket[]>(query,(id))

            if(rows.length > 0){
                const row = rows[0]

                return new Comment(row.commentId,row.content,row.userId,row.noteId)
            }
            else{
                return new Comment()
            }
        }
        catch{
            return new Comment()
        }
    }
    async getByNoteId(id: number): Promise<Comment[]> {
        try{
            const query = "SELECT * FROM comment WHERE noteId=?"
            const [rows] = await db.execute<RowDataPacket[]>(query,(id))

            return rows.map((row) => new Comment(row.commentId,row.content,row.userId,row.noteId))
        }
        catch{
            return []
        }
    }
    async getByUserId(id: number): Promise<Comment[]> {
        try{
            const query = "SELECT * FROM comment WHERE userId=?"
            const [rows] = await db.execute<RowDataPacket[]>(query,(id))

            return rows.map((row) => new Comment(row.commentId,row.content,row.userId,row.noteId))
        }
        catch{
            return []
        }
    }
    async update(comment: Comment): Promise<Comment> {
        try{
            const query = "UPDATE TABLE comments SET content=?,noteId=?,userId=? WHERE commentId=?"

            const [result] = await db.execute<ResultSetHeader>(query,(comment.content,comment.noteId,comment.userId,comment.commentId))

            if(result.affectedRows > 0){
                return new Comment(comment.commentId,comment.content,comment.userId,comment.noteId)
            }
            else{
                return new Comment()
            }
        }
        catch{
            return new Comment()
        }
    }
    async delete(id: number): Promise<boolean> {
        try{
            const query:string = "DELETE FROM comments WHERE commentId=?"
            const [result] = await db.execute<ResultSetHeader>(query,[id])

            if(result.affectedRows > 0){
                return true
            }
            else{
                return false
            }
        }
        catch{
            return false
        }
    }
    async exists(id: number): Promise<boolean> {
        try{
            const query:string = "SELECT COUNT(*) as count FROM comments WHERE commentId=?"
            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            if(rows[0].count > 0){
                return true
            }
            else{
                return false
            }
        }
        catch{
            return false
        }
    }
    
}