import { CourseDTO } from "../../DTOs/CourseDTO";


export interface ICourseServices{
    AddCourse(courseName:string):Promise<CourseDTO>
}