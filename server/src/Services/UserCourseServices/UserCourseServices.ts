import { CourseDTO } from "../../Domain/DTOs/course/CourseDTO";
import { UserCourseDTO } from "../../Domain/DTOs/userCourse/UserCourseDTO";
import { UserCourse } from "../../Domain/Models/UserCourse";
import { ICourseRepository } from "../../Domain/repositories/courseRepository/ICourseRepository";
import { IUserCourse } from "../../Domain/repositories/courseUserRepository/IUserCourse";
import { IUserAccountsRepository } from "../../Domain/repositories/userAccountsRepository/IUserAccountsRepository";
import { IUserCourseServices } from "../../Domain/services/UserCourseServices/IUserCourseServices";


export class UserCourseServices implements IUserCourseServices{

    public constructor(private UserAccountRepository:IUserAccountsRepository,private UserCourseRepository:IUserCourse,private CourseRepository : ICourseRepository){
        this.UserAccountRepository=UserAccountRepository
        this.UserCourseRepository=UserCourseRepository
        this.CourseRepository = CourseRepository
    }

    async EnrollUser(userId: number, courseId: number): Promise<UserCourseDTO> {
        const courseOvera = await this.CourseRepository.exists(courseId)
        const userOvera = await this.UserAccountRepository.exists(userId)
        if(courseOvera === false || userOvera===false){
            return new UserCourseDTO()
        }

        const userCourse = await this.UserCourseRepository.createUserCourse(new UserCourse(0,userId,courseId))
        return new UserCourseDTO(userCourse.userCourseId,userId,courseId)
    }
    async FindCourses(userId: number): Promise<CourseDTO[]> {
        const userOvera = await this.UserAccountRepository.exists(userId)
        if(userOvera === false){
            return []
        }
        const links : UserCourse[] = await this.UserCourseRepository.getByUserId(userId)
        if (links.length === 0) {
        return [];
        }

        const courses: CourseDTO[] = [];
        for (const link of links) {
            const course = await this.CourseRepository.getById(link.courseId);
                if (course.courseId !== 0) {
                    courses.push(new CourseDTO(course.courseId, course.courseName, course.professorId));
                }
        }

        return courses
    }
    
}