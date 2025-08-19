import express from "express"
import cors from "cors"
import { UserAccountsRepository } from "./Database/Repositories/UserAccountsRepository/UserAccountsRepository"
import { IUserAccountsRepository } from "./Domain/repositories/userAccountsRepository/IUserAccountsRepository"
import { IUserAccountAuth } from "./Domain/services/AuthServices/IUserAccountAuth"
import { UserAccountAuth } from "./Services/AuthUserServices/UserAccountAuth"
import { UserAccountAuthController } from "./WebAPI/controllers/UserAccountAuthController"

require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const userAccountRepository : IUserAccountsRepository = new UserAccountsRepository()
const userAccountAuth : IUserAccountAuth = new UserAccountAuth(userAccountRepository)
const userAccountAuthController = new UserAccountAuthController(userAccountAuth)

app.use("/api/v1",userAccountAuthController.getRouter())

export default app