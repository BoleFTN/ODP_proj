import { UserAccountDTO } from "../../Domain/DTOs/auth/UserAccountDTO";
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
    // src/Domain/services/AuthServices/UserAccountAuth.ts

async register(username: string, password: string, userType: string, fullName: string): Promise<UserAccountDTO> {
    const userAccount = await this.UserAccountRepository.getByUsername(username);

    if (userAccount && userAccount.id !== 0) {
        // Ako korisnik već postoji, vrati prazan DTO
        return new UserAccountDTO();
    }

    const cryptedPassword = await bcrypt.hash(password, 10);
    const RegisteredAccount = await this.UserAccountRepository.createUserAccount(
        new UserAccount(0, fullName, username, cryptedPassword, userType)
    );

    // Vrati DTO, čak i u slučaju greške
    return new UserAccountDTO(
        RegisteredAccount.id,
        RegisteredAccount.username,
        RegisteredAccount.userType
    );
}

}