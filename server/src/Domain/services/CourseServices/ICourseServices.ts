import { CourseDTO } from "../../DTOs/course/CourseDTO";


export interface ICourseServices{
    AddCourse(courseName: string, professorId: number):Promise<CourseDTO>
    getAll(): Promise<CourseDTO[]>; // Dodaj ovu liniju
    findCoursesByProfessor(id:number):Promise<CourseDTO[]>
}