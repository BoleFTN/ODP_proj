import { CourseDTO } from "../../models/course/CourseDTO";

export interface ICoursesAPIService {
  getSviKursevi(token: string): Promise<any[]>;
  createCourse(token: string, newCourseData: { courseName: string; professorId: number }): Promise<any | null>;
  selectCourse(token: string, studentId: number, courseId: number): Promise<any | null>;
  findCoursesForUser(token: string, userId: number): Promise<CourseDTO[]>;
  
}