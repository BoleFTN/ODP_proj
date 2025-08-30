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

require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

// Kreiranje instanci repozitorijuma
const userAccountRepository = new UserAccountsRepository();
const courseRepository = new CourseRepository();
const userCourseRepository = new UserCourseRepository();

// Kreiranje instanci servisa
const userAccountAuth = new UserAccountAuth(userAccountRepository);
const courseServices = new CourseServices(courseRepository);
const userCourseServices = new UserCourseServices(userAccountRepository, userCourseRepository, courseRepository);

// Kreiranje instanci kontrolera
const userAccountAuthController = new UserAccountAuthController(userAccountAuth);
// Prosledi ispravne servise kontrolerima
const courseController = new CourseController(courseServices, userCourseServices);
const userCourseController = new UserCourseController(userCourseServices);

// Korišćenje kontrolera sa specifičnim rutama
app.use("/api/v1/auth", userAccountAuthController.getRouter());
app.use("/api/v1/courses", courseController.getRouter());
app.use("/api/v1/user-courses", userCourseController.getRouter());

export default app;
