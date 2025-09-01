import { UserCourse } from "../../Models/UserCourse";


export interface IUserCourse{
    createUserCourse(userCourse:UserCourse) : Promise<UserCourse>
    getById(id:number) : Promise<UserCourse>
    getByUserId(id:number) : Promise<UserCourse[]>
    getByCourseId(id:number) : Promise<UserCourse[]>
    getAll() : Promise<UserCourse[]>
    update(userCourse:UserCourse) : Promise<UserCourse>
    delete(id:number) : Promise<boolean>
    exists(id:number) : Promise<boolean>
    isEnrolled(userId: number, courseId: number): Promise<boolean>;


}