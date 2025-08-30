import { CourseDTO } from "../../DTOs/course/CourseDTO";
import { UserCourseDTO } from "../../DTOs/usercourse/UserCourseDTO";


export interface IUserCourseServices{
    EnrollUser(userId:number,courseId:number):Promise<UserCourseDTO>
    FindCourses(userId:number):Promise<CourseDTO[]>
}