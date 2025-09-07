import { Course } from "../../Models/Course";
import { UserCourse } from "../../Models/UserCourse";


export interface ICourseRepository{
    createCourse(course:Course):Promise<Course>
    getById(id:number):Promise<Course>
    getByName(name:string):Promise<Course>
    getAll():Promise<Course[]>
    update(course:Course):Promise<Course>
    delete(id:number):Promise<boolean>
    exists(id:number):Promise<boolean>
    getEnrollment(studentId: number, courseId: number): Promise<UserCourse>;
    createEnrollment(userCourse: UserCourse): Promise<UserCourse>;
    getByProfessorId(id:number):Promise<Course[]>
}