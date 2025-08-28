import { CourseRepository } from "../../Database/Repositories/CourseRepository/CourseRepository";
import { CourseDTO } from "../../Domain/DTOs/course/CourseDTO";
import { Course } from "../../Domain/Models/Course";
import { ICourseRepository } from "../../Domain/repositories/courseRepository/ICourseRepository";
import { ICourseServices } from "../../Domain/services/CourseServices/ICourseServices";

export class CourseServices implements ICourseServices{
    public constructor(private CourseRepository : ICourseRepository){
        this.CourseRepository = CourseRepository
    }

    async AddCourse(courseName: string, professorId: number): Promise<CourseDTO> {
        const course = await this.CourseRepository.getByName(courseName);

        if(course.courseId === 0){
            const courseAdd : Course = await this.CourseRepository.createCourse(new Course(course.courseId, courseName, professorId));
            if(courseAdd.courseId !== 0){
                return new CourseDTO(courseAdd.courseId, courseAdd.courseName, courseAdd.professorId);
            }
            else{
                return new CourseDTO();
            }
        }
        else{
            return new CourseDTO();
        }
    }
}