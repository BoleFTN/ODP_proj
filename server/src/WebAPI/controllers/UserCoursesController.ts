import { Router, Request, Response } from "express";
import { IUserCourseServices } from "../../Domain/services/UserCourseServices/IUserCourseServices";
import { CourseDTO } from "../../Domain/DTOs/course/CourseDTO";

export class UserCourseController {
    private router: Router;
    private UserCourseservices: IUserCourseServices;

    constructor(UserCourseServices: IUserCourseServices) {
        this.router = Router();
        this.UserCourseservices = UserCourseServices;
        this.initializeRoute();
    }

    private initializeRoute() {
        // upis korisnika na kurs

        this.router.post("/enroll", this.EnrollUser.bind(this));

        // svi kursevi na koje je korisnik upisan
        this.router.get("/:userId/courses", this.FindCourses.bind(this));
    }

    private async EnrollUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId, courseId } = req.body;
            console.log(userId, courseId);
            const result = await this.UserCourseservices.EnrollUser(userId, courseId);

            if (result && result.id !== 0) {
                res.status(200).json({
                    sucessful: true,
                    message: "Enrollment was successful",
                    course: result
                });
            } else {
                res.status(400).json({
                    sucessful: false,
                    message: "Korisnik je vec upisan na ovaj kurs."
                });
            }
        } catch (error) {
            console.error("Error in EnrollUser:", error);
            res.status(500).json({ sucessful: false, message: "Server error" });
        }
    }

    private async FindCourses(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            //console.log(userId)
            const result: CourseDTO[] = await this.UserCourseservices.FindCourses(userId);
           // console.log(result) 
            res.status(200).json(result);
        } catch (error) {
            console.error("Error in FindCourses:", error);
            res.status(500).json({ sucessful: false, message: "Server error" });
        }
    }

    public getRouter() {
        return this.router;
    }
}
