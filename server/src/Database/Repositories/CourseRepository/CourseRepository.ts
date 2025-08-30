import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Course } from "../../../Domain/Models/Course";
import { ICourseRepository } from "../../../Domain/repositories/courseRepository/ICourseRepository";
import db from "../../connection/DbConnectionPool";
import { UserCourse } from "../../../Domain/Models/UserCourse";

export class CourseRepository implements ICourseRepository {
   async getEnrollment(studentId: number, courseId: number): Promise<UserCourse> {
        try {
            const query: string = "SELECT * FROM user_courses WHERE userId=? AND courseId=?";
            const [rows] = await db.execute<RowDataPacket[]>(query, [studentId, courseId]);

            if (rows.length > 0) {
                const row = rows[0];
                return new UserCourse(row.id, row.userId, row.courseId);
            } else {
                return new UserCourse(); // Vrati prazan objekat ako upis ne postoji
            }
        } catch (error) {
            console.error("Greška pri dohvatanju upisa:", error);
            return new UserCourse();
        }
    }

    async createEnrollment(userCourse: UserCourse): Promise<UserCourse> {
        try {
            const query: string = "INSERT INTO user_courses(userId, courseId) VALUES(?, ?)";
            const [result] = await db.execute<ResultSetHeader>(query, [userCourse.userId, userCourse.courseId]);

            if (result.insertId) {
                return new UserCourse(result.insertId, userCourse.userId, userCourse.courseId);
            } else {
                return new UserCourse();
            }
        } catch (error) {
            console.error("Greška pri kreiranju upisa:", error);
            return new UserCourse();
        }
    }
    
    async createCourse(course: Course): Promise<Course> {
        try {
            const query = "INSERT INTO courses(courseName, professorId) VALUES(?, ?)";
            const [result] = await db.execute<ResultSetHeader>(query, [course.courseName, course.professorId]);

            if (result.insertId) {
                return new Course(result.insertId, course.courseName, course.professorId);
            } else {
                return new Course();
            }
        } catch (error) {
            console.error("Error creating course:", error);
            return new Course();
        }
    }

    async getById(id: Number): Promise<Course> {
        try {
            const query: string = "SELECT * FROM courses WHERE courseId=?";
            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

            if (rows.length > 0) {
                const row = rows[0];
                return new Course(row.courseId, row.courseName, row.professorId);
            } else {
                return new Course();
            }
        } catch (error) {
            console.error("Error getting course by ID:", error);
            return new Course();
        }
    }

    async getByName(name: string): Promise<Course> {
        try {
            const query: string = "SELECT * FROM courses WHERE courseName=?";
            const [rows] = await db.execute<RowDataPacket[]>(query, [name]);

            if (rows.length > 0) {
                const row = rows[0];
                return new Course(row.courseId, row.courseName, row.professorId);
            } else {
                return new Course();
            }
        } catch (error) {
            console.error("Error getting course by name:", error);
            return new Course();
        }
    }

    async getAll(): Promise<Course[]> {
        try {
            const query: string = "SELECT * FROM courses ORDER BY courseId";
            const [rows] = await db.execute<RowDataPacket[]>(query);

            return rows.map(row => new Course(row.courseId, row.courseName, row.professorId));
        } catch (error) {
            console.error("Error getting all courses:", error);
            return [];
        }
    }

    async update(course: Course): Promise<Course> {
        try {
            const query: string = "UPDATE courses SET courseName=?, professorId=? WHERE courseId=?";
            const [result] = await db.execute<ResultSetHeader>(query, [course.courseName, course.professorId, course.courseId]);

            if (result.affectedRows > 0) {
                return new Course(course.courseId, course.courseName, course.professorId);
            } else {
                return new Course();
            }
        } catch (error) {
            console.error("Error updating course:", error);
            return new Course();
        }
    }

    async delete(id: Number): Promise<boolean> {
        try {
            const query: string = "DELETE FROM courses WHERE courseId=?";
            const [result] = await db.execute<ResultSetHeader>(query, [id]);

            if (result.affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            return false;
        }
    }

    async exists(id: Number): Promise<boolean> {
        try {
            const query: string = "SELECT COUNT(*) as count FROM courses WHERE courseId=?";
            const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

            if (rows[0].count > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error checking if course exists:", error);
            return false;
        }
    }
}