import express from "express"
import cors from "cors"
import { UserAccountsRepository } from "./Database/Repositories/UserAccountsRepository/UserAccountsRepository"
import { IUserAccountsRepository } from "./Domain/repositories/userAccountsRepository/IUserAccountsRepository"
import { IUserAccountAuth } from "./Domain/services/AuthServices/IUserAccountAuth"
import { UserAccountAuth } from "./Services/AuthUserServices/UserAccountAuth"
import { UserAccountAuthController } from "./WebAPI/controllers/UserAccountAuthController"
import { ICourseRepository } from "./Domain/repositories/courseRepository/ICourseRepository"
import { CourseRepository } from "./Database/Repositories/CourseRepository/CourseRepository"
import { CourseServices } from "./Services/CourseServices/CourseServices"
import { ICourseServices } from "./Domain/services/CourseServices/ICourseServices"
import { CourseController } from "./WebAPI/controllers/CourseController"
import { IUserCourse } from "./Domain/repositories/courseUserRepository/IUserCourse"
import { UserCourseRepository } from "./Database/Repositories/UserCourseRepository/UserCourseRepository"
import { IUserCourseServices } from "./Domain/services/UserCourseServices/IUserCourseServices"
import { UserCourseServices } from "./Services/UserCourseServices/UserCourseServices"
import { UserCourseController } from "./WebAPI/controllers/UserCoursesController"

require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const userAccountRepository : IUserAccountsRepository = new UserAccountsRepository()
const userAccountAuth : IUserAccountAuth = new UserAccountAuth(userAccountRepository)
const userAccountAuthController = new UserAccountAuthController(userAccountAuth)

app.use("/api/v1",userAccountAuthController.getRouter())

const courseRepository : ICourseRepository = new CourseRepository()
const courseServices : ICourseServices = new CourseServices(courseRepository)
const courseController = new CourseController(courseServices)

app.use("/api/v1",courseController.getRouter())

const userCourseRepository : IUserCourse = new UserCourseRepository()
const userCourseServices : IUserCourseServices = new UserCourseServices(userAccountRepository,userCourseRepository,courseRepository)
const userCourseController = new UserCourseController(userCourseServices)

app.use("/api/v1",userCourseController.getRouter())
export default app