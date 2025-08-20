import { UserAccountDTO } from "../../Domain/DTOs/UserAccountDTO";
import { UserAccount } from "../../Domain/Models/UserAccount";
import { IUserAccountsRepository } from "../../Domain/repositories/userAccountsRepository/IUserAccountsRepository";
import { IUserAccountAuth } from "../../Domain/services/AuthServices/IUserAccountAuth";
import bcrypt from "bcryptjs"

export class UserAccountAuth implements IUserAccountAuth {
    
    public constructor(private UserAccountRepository : IUserAccountsRepository){
        this.UserAccountRepository = UserAccountRepository
    }

    async logIn(username: string, password: string): Promise<UserAccountDTO> {
        const userAccount = await this.UserAccountRepository.getByUsername(username)

        if(userAccount.id !== 0 && await bcrypt.compare(password,userAccount.password)){
            return new UserAccountDTO(userAccount.id,userAccount.username,userAccount.userType)
        }
        else{
            return new UserAccountDTO()
        }
    }
    async register(username: string, password: string, userType: string, fullName: string): Promise<UserAccountDTO> {
        const userAccount = await this.UserAccountRepository.getByUsername(username)
        if(userAccount.id === 0){
            const cryptedPassword : string = await bcrypt.hash(password,10)
            const RegisteredAccount : UserAccount = await this.UserAccountRepository.createUserAccount(new UserAccount(userAccount.id,fullName,username,cryptedPassword,userType))

            if(RegisteredAccount.id !== 0 ){
                return new UserAccountDTO(RegisteredAccount.id,RegisteredAccount.username,RegisteredAccount.userType)
            }
            else{
                return new UserAccountDTO()
            }
        }
        else{
            return new UserAccountDTO()
        }
    }

}