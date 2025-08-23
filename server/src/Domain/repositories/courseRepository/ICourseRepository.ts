import { Course } from "../../Models/Course";


export interface ICourseRepository{
    createCourse(course:Course):Promise<Course>
    getById(id:Number):Promise<Course>
    getByName(name:string):Promise<Course>
    getByProfessorId(id:string):Promise<Course[]>
    getAll():Promise<Course[]>
    update(course:Course):Promise<Course>
    delete(id:Number):Promise<boolean>
    exists(id:Number):Promise<boolean>
}