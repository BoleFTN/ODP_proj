import { UserAccountDTO } from "../../DTOs/auth/UserAccountDTO"

export interface IUserAccountAuth {
    logIn(username : string,password : string) : Promise<UserAccountDTO>
    register(username : string,password : string,userType:string,fullName : string) : Promise<UserAccountDTO>
}
