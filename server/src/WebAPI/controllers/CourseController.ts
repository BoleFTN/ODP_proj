import { Router, Request, Response } from "express";
import { ICourseServices } from "../../Domain/services/CourseServices/ICourseServices";
import { CourseValidator } from "../validators/CourseValidator";

export class CourseController {
    private router: Router;
    private CourseServices: ICourseServices;

    constructor(CourseServices: ICourseServices) {
        this.router = Router();
        this.CourseServices = CourseServices;
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.post("/Courses/AddCourse", this.AddCourse.bind(this));
    }

    private async AddCourse(req: Request, res: Response): Promise<void> {
        try {
            const { courseName, professorId } = req.body; // Dodao sam professorId ovde
            const valid = CourseValidator(courseName);

            if (valid.sucessful === false) {
                res.status(400).json({ sucessful: false, message: valid.message });
                return;
            }

            // Prosleđujemo professorId servisu
            const result = await this.CourseServices.AddCourse(courseName, professorId);

            if (result.courseId !== 0) {
                res.status(200).json({ sucessful: true, message: "Log in was sucessful", data: result });
            } else {
                res.status(401).json({ sucessful: false, message: "Log in failed" });
            }
        } catch (error) {
            console.error("Error in AddCourse:", error);
            res.status(500).json({ sucessful: false, message: "Server error" });
        }
    }

    public getRouter() {
        return this.router;
    }
}