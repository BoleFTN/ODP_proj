import { CourseDTO } from "../../Domain/DTOs/course/CourseDTO";
import { UserCourseDTO } from "../../Domain/DTOs/usercourse/UserCourseDTO";
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
    const courseOvera = await this.CourseRepository.exists(courseId);
    const userOvera = await this.UserAccountRepository.exists(userId);

    // Provera da li kurs ili korisnik postoje
    if (courseOvera === false || userOvera === false) {
        // Vrati prazan DTO ili baci grešku, zavisno od tvoje logike
        return new UserCourseDTO();
    }
    
    // Provera da li je korisnik već upisan na kurs
    // Potrebna ti je metoda u UserCourseRepository-ju
    const isAlreadyEnrolled = await this.UserCourseRepository.isEnrolled(userId, courseId);
    if (isAlreadyEnrolled) {
        console.log(`Korisnik ${userId} je već upisan na kurs ${courseId}.`);
        // Vrati prazan DTO da signalizira da upis nije uspeo
        return new UserCourseDTO();
    }
    

    // Kreiranje upisa ako sve provere prođu
    const userCourse = await this.UserCourseRepository.createUserCourse(new UserCourse(0, userId, courseId));
    
    // Vrati DTO sa ID-om iz baze
    return new UserCourseDTO(userCourse.userCourseId, userId, courseId);
}
    async FindCourses(userId: number): Promise<CourseDTO[]> {
        //console.log(userId)
        const userOvera = await this.UserAccountRepository.exists(userId)
        //console.log(userOvera)
        if(userOvera === false){
            return []
        }
        const links : UserCourse[] = await this.UserCourseRepository.getByUserId(userId)
       // console.log(links)
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