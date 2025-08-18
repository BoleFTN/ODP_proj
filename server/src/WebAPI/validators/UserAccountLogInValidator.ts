import { ValidationResult } from "../../Domain/Types/ValidatorResult";

export function UserAccountLogInValidator(username : string,password : string) : ValidationResult{
    if(username.length < 3){
        return {sucessful: false,message:"Username is too short"}
    }
    if(username.length > 20){
        return {sucessful: false,message:"Username is too long"}
    }

     if(password.length < 3){
        return {sucessful: false,message:"Password is too short"}
    }
    if(password.length > 500){
        return {sucessful: false,message:"Password is too long"}
    }

     return {sucessful: true,message:"Data is valid"}
}