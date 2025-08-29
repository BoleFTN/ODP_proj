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
    async register(username: string, password: string, userType: string, fullName: string): Promise<any> {
  const userAccount = await this.UserAccountRepository.getByUsername(username);

  if (userAccount && userAccount.id !== 0) {
    // Ako korisnik već postoji, vrati poruku o grešci.
    return { success: false, message: "Korisničko ime je već zauzeto." };
  }
  
  const cryptedPassword = await bcrypt.hash(password, 10);
  const RegisteredAccount = await this.UserAccountRepository.createUserAccount(
    new UserAccount(0, fullName, username, cryptedPassword, userType)
  );

  if (RegisteredAccount.id !== 0) {
    // Uspesno kreiran nalog, vrati samo poruku o uspehu.
    return { success: true, message: "Uspešna registracija. Prijavite se." };
  }
  
  // Nesto je poslo po zlu.
  return { success: false, message: "Greška pri registraciji." };
}

}