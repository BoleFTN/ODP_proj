import { CourseDTO } from "../../DTOs/course/CourseDTO";


export interface ICourseServices{
    AddCourse(courseName: string, professorId: string):Promise<CourseDTO>
}