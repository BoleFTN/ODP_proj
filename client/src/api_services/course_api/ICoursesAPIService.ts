import { CourseDTO } from "../../models/course/CourseDTO";

export interface ICoursesAPIService {
  getSviKursevi(token: string): Promise<CourseDTO[]>;


//  createCourse(course: Course, token: string): Promise<Course>;
}