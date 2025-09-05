

export class CommentDTO{
     public constructor(
        public commentId:number=0,
        public content:string="",
        public userId : number=0,
        public noteId : number=0
    ){}
}