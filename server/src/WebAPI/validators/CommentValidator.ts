import { ValidationResult } from "../../Domain/Types/ValidatorResult";


export function CommentValidator(content:string):ValidationResult{
    if(content.length<3){
         return {sucessful: false,message:"Content is too short"}
    }

    if(content.length>200){
         return {sucessful: false,message:"Content is too long"}
    }
     return {sucessful: true,message:"Data is valid"}
}