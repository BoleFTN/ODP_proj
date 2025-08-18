import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserAccount } from "../../../Domain/Models/UserAccount";
import { IUserAccountsRepository } from "../../../Domain/repositories/userAccountsRepository/IUserAccountsRepository";
import db from "../../connection/DbConnectionPool";


export class UserAccountsRepository implements IUserAccountsRepository {
   
    async createUserAccount(userAccount: UserAccount): Promise<UserAccount> {
        try{
            const query : string = `INSERT INTO users (userId,fullName,username,userPassword,userType) VALUES (?,?,?,?,?)`

            const [result] = await db.execute<ResultSetHeader>(query,[
                userAccount.id,
                userAccount.fullName,
                userAccount.username,
                userAccount.password,
                userAccount.userType
            ])
             if(result.insertId){
                return new UserAccount(result.insertId,userAccount.fullName,userAccount.username,userAccount.password,userAccount.userType)
             }
             else{
                return new UserAccount()
             }
        }
        catch{
            return new UserAccount()
        }
    }
    async getById(id: Number): Promise<UserAccount> {
        try{
        const query : string = `SELECCT * FROM users WHERE userId=?`

        const [rows] = await db.execute<RowDataPacket[]>(query,[id])
        if(rows.length > 0){
            const row = rows[0]
            return new UserAccount(row.id,row.fullName,row.username,row.password,row.userType)
        }
        else{
            return new UserAccount()
        }
        }
        catch{
            return new UserAccount()
        }
    }
    async getByUsername(username: string): Promise<UserAccount> {
        try{
            const query =  `SELECCT * FROM users WHERE username=?`

            const [rows] = await db.execute<RowDataPacket[]>(query,[username])

        if(rows.length > 0){
            const row = rows[0]
            return new UserAccount(row.id,row.fullName,row.username,row.password,row.userType)
        }
        else{
            return new UserAccount()
        }
        }
        catch{
            return new UserAccount()
        }
    }
    async getAll(): Promise<UserAccount[]> {
         try{
        const query : string = `SELECCT * FROM users ORDER BY userId`

        const [rows] = await db.execute<RowDataPacket[]>(query)
       
            return rows.map(
                (row) => new UserAccount(row.id,row.fullName,row.username,row.password,row.userType)
            )
        
        }
        catch{
            return []
        }
    }

    async update(userAccount: UserAccount): Promise<UserAccount> {
        try{
            const query : string = `UPDATE users SET fullName=?,username=?,userPassword=?,userType=? WHERE userId=?`

            const [result] = await db.execute<ResultSetHeader>(query,[userAccount.fullName,userAccount.username,userAccount.password,userAccount.userType,userAccount.id])

            if(result.affectedRows > 0){
                return userAccount
            }
            else{
                return new UserAccount()
            }
        }
        catch{
            return new UserAccount()
        }
    }
    async delete(id: Number): Promise<boolean> {
        try{
            const query : string = `DELETE FROM users WHERE userId=?`

            const [result] = await db.execute<ResultSetHeader>(query,[id])
            if(result.affectedRows > 0){
                return true
            }
            else{
                return false
            }
        }
        catch{
            return false
        }
    }
    async exists(id: Number): Promise<boolean> {
        try{
            const query : string = `SELECT COUNT(*) as count FROM users WHERE userId=?`

            const [rows] = await db.execute<RowDataPacket[]>(query,[id])
            if(rows[0].count > 0){
                return true
            }
            else{
                return false
            }
        }
        catch{
            return false
        }
    }

}