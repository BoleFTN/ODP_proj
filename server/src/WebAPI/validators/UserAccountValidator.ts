import { ValidationResult } from "../../Domain/Types/ValidatorResult";

export function UserAccountValidator(username : string,password : string,fullName : string,userType : string) : ValidationResult{
    if(username.length < 3){
        return {sucessful: false,message:"Username is too short"}
    }
    if(username.length > 20){
        return {sucessful: false,message:"Username is too long"}
    }

    if(fullName.length < 3 ){
        return {sucessful: false,message:"Name is too short"}
    }
    if(fullName.length > 30 ){
        return {sucessful: false,message:"Name is too long"}
    }

    if(userType !== "student" && userType !== "professor"){
        return {sucessful: false,message:"User type is invalid"}
    }

    if(password.length < 3){
        return {sucessful: false,message:"Password is too short"}
    }
    if(password.length > 500){
        return {sucessful: false,message:"Password is too long"}
    }


    return {sucessful: true,message:"Data is valid"}
}