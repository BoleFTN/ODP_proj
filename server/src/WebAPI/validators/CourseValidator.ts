import { ValidationResult } from "../../Domain/Types/ValidatorResult";

export function CourseValidator(courseName:string):ValidationResult{
    if(courseName.length<3){
        return {sucessful:false,message:"Course name is too short"}
    }
    if(courseName.length>20){
        return {sucessful:false,message:"Course name is too long"}
    }
    return {sucessful:true,message:"Data is valid"}
}