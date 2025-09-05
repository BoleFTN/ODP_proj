import { Router,Request,Response } from "express";
import { ICommentServices } from "../../Domain/services/CommentServices/ICommentServices";
import { CommentValidator } from "../validators/CommentValidator";


export class CommentController{
    private router : Router
    private commentServices : ICommentServices

    constructor(commentServices : ICommentServices){
        this.commentServices = commentServices
        this.router = Router()
    }
    private initializeRoute() {
        this.router.post("/postComment",this.postComment.bind(this))
        this.router.post("/editComment",this.editComment.bind(this))
    }

    private async postComment(req:Request,res:Response){
        try{
        const {content, userId, noteId} = req.body

        const valid = CommentValidator(content)

        if(valid.sucessful === false){
            res.status(400).json({ sucessful:false,message:valid.message})
            return;
        }

        const result = await this.commentServices.postComment(content, userId, noteId)

        if(result.commentId !== 0){
            res.status(200).json(result)
        }
        else{
            res.status(401).json({ sucessful:false,message:"Posting ccomment failed"})
        }
    }
    catch{
        res.status(500).json({ sucessful:false,message:"Server error"})
    }
    }

    private async editComment(req:Request,res:Response){
        try{
        const {content, userId, noteId,id} = req.body

        const valid = CommentValidator(content)

        if(valid.sucessful === false){
            res.status(400).json({ sucessful:false,message:valid.message})
        }

        const result = await this.commentServices.editComment(content, userId, noteId,id)

        if(result.commentId !== 0){
            res.status(200).json(result)
        }
        else{
            res.status(401).json({ sucessful:false,message:"Editing ccomment failed"})
        }
    }
        catch{
            res.status(500).json({ sucessful:false,message:"Server error"})
        }
    }


    public getRouter(){
        return this.router
    }
}