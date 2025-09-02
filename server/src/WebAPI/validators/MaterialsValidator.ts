import { ValidationResult } from "../../Domain/Types/ValidatorResult";


export function MaterialValidation(title:string,userId:number,courseId:number,description:string):ValidationResult{
    if(title.length<3){
        return {sucessful:false,message:"Title is too short"}
    }
    if(title.length>50){
        return {sucessful:false,message:"Title is too long"}
    }
    if(userId === 0){
        return {sucessful:false,message:"User isnt valid"}
    }
    if(courseId === 0){
        return {sucessful:false,message:"Course isnt valid"}
    }
    if(description.length<3){
        return {sucessful:false,message:"Description is too short"}
    }
    if(description.length > 150){
        return {sucessful:false,message:"Description is too long"}
    }


    return {sucessful:true,message:"Material sucessfully posted"}
}