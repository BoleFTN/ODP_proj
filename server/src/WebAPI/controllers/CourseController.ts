import { Router, Request, Response } from "express";
import { ICourseServices } from "../../Domain/services/CourseServices/ICourseServices";
import { IUserCourseServices } from "../../Domain/services/UserCourseServices/IUserCourseServices";
import { CourseValidator } from "../validators/CourseValidator";

export class CourseController {
    private router: Router;
    private CourseServices: ICourseServices;
    private UserCourseServices: IUserCourseServices;

    public constructor(
        CourseServices: ICourseServices, 
        UserCourseServices: IUserCourseServices
    ) {
        this.router = Router();
        this.CourseServices = CourseServices;
        this.UserCourseServices = UserCourseServices;
        this.initializeRoute();
    }

    private initializeRoute() {
        // GET ruta za dohvatanje svih kurseva
        this.router.get("/", this.getAllCourses.bind(this)); 

        // POST ruta za dodavanje novog kursa
        this.router.post("/AddCourse", this.AddCourse.bind(this));

        // POST ruta za upis korisnika na kurs
        this.router.post("/enroll", this.enrollUser.bind(this));

        // GET ruta za dohvatanje kurseva na koje je korisnik upisan
        this.router.get("/user/:userId/courses", this.findCoursesForUser.bind(this));
    }

    private async AddCourse(req: Request, res: Response): Promise<void> {
        try {
            const { courseName, professorId } = req.body;
            const valid = CourseValidator(courseName);

            if (valid.sucessful === false) {
                res.status(400).json({ sucessful: false, message: valid.message });
                return;
            }

            const result = await this.CourseServices.AddCourse(courseName, professorId);

            if (result.courseId !== 0) {
                res.status(200).json({ sucessful: true, message: "Adding course was sucessful", data: result });
            } else {
                res.status(401).json({ sucessful: false, message: "Adding course failed" });
            }
        } catch (error) {
            console.error("Error in AddCourse:", error);
            res.status(500).json({ sucessful: false, message: "Server error" });
        }
    }

    private async getAllCourses(req: Request, res: Response): Promise<void> {
        try {
            const kursevi = await this.CourseServices.getAll();
            res.status(200).json(kursevi);
        } catch (error) {
            console.error("Greška pri dohvatanju kurseva:", error);
            res.status(500).json({ sucessful: false, message: "Serverska greška." });
        }
    }

    private async enrollUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId, courseId } = req.body;
            const result = await this.UserCourseServices.EnrollUser(userId, courseId);
            
            if (result && result.id !== 0) {
                res.status(200).json({ sucessful: true, message: "Upis je uspešan." });
            } else {
                res.status(400).json({ sucessful: false, message: "Upis nije uspeo." });
            }
        } catch (error) {
            console.error("Greška pri upisu na kurs:", error);
            res.status(500).json({ sucessful: false, message: "Serverska greška." });
        }
    }

    private async findCoursesForUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const kursevi = await this.UserCourseServices.FindCourses(userId);
            res.status(200).json(kursevi);
        } catch (error) {
            console.error("Greška pri dohvatanju kurseva za korisnika:", error);
            res.status(500).json({ sucessful: false, message: "Serverska greška." });
        }
    }

    public getRouter() {
        return this.router;
    }
}