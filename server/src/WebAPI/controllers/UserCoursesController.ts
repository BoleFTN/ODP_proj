import { Router, Request, Response } from "express";
import { IUserCourseServices } from "../../Domain/services/UserCourseServices/IUserCourseServices";
import { CourseDTO } from "../../Domain/DTOs/course/CourseDTO";


export class UserCourseController{
    private router : Router
    private UserCourseservices : IUserCourseServices

    constructor(UserCourseServices:IUserCourseServices){
        this.router=Router()
        this.UserCourseservices = UserCourseServices
        this.initializeRoute();
    }
    private initializeRoute() {
        this.router.post("/UserCourseServices/EnrollUser",this.EnrollUser.bind(this))
        this.router.post("/UserCourseServices/FindCourses",this.FindCourses.bind(this))
    }

    private async EnrollUser(req:Request,res:Response):Promise<void>{
        try{
        const {userId,courseId} = req.body

        const result = await this.UserCourseservices.EnrollUser(userId,courseId)
        if(result.id!==0){
             res.status(200).json({ sucessful:true,message:"Enrollment was sucess",course:result})
        }
        else{
            res.status(401).json({ sucessful:false,message:"Enrollment failed"})
        }
    }
    catch{
        res.status(500).json({ sucessful:false,message:"Server is down"})
    }
    }

    private async FindCourses(req:Request,res:Response):Promise<void>{
        try{
            const {userId} = req.body

            const result : CourseDTO[] = await this.UserCourseservices.FindCourses(userId)

            if(result.length === 0){
                res.status(401).json({ sucessful:false,message:"No courses found",course:[]})
            }
            else{
                res.status(200).json({ sucessful:true,message:"Enrollment was sucess",course:result})
            }
        }
        catch{
            res.status(500).json({ sucessful:false,message:"Server is down"})
        }
    }

    public getRouter(){
        return this.router
    }
}