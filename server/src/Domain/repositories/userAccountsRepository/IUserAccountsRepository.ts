import { UserAccount } from "../../Models/UserAccount";


export interface IUserAccountsRepository{
    createUserAccount(userAccount : UserAccount) : Promise<UserAccount>
    getById(id : Number) : Promise<UserAccount>
    getByUsername(username : string) : Promise<UserAccount>
    getAll() : Promise<UserAccount[]>
    update(userAccount : UserAccount) : Promise<UserAccount>
    delete(id : Number) : Promise<boolean>
    exists(id : Number) : Promise<boolean>
}