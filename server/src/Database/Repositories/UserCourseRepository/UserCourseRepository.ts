import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserCourse } from "../../../Domain/Models/UserCourse";
import { IUserCourse } from "../../../Domain/repositories/courseUserRepository/IUserCourse";
import db from "../../connection/DbConnectionPool";


export class UserCourseRepository implements IUserCourse{
    async createUserCourse(userCourse: UserCourse): Promise<UserCourse> {
        try{
        const query : string = "INSERT INTO user_courses (userId,courseId) VALUES(?,?)"
        const [result] = await db.execute<ResultSetHeader>(query,[userCourse.userId,userCourse.courseId])

        if(result.insertId){
            return new UserCourse(result.insertId,userCourse.userId,userCourse.courseId)
        }
        else{
            return new UserCourse()
        }
    }
    catch{
        return new UserCourse()
    }
    }
    async getById(id: number): Promise<UserCourse> {
        try{
            const query : string = "SELECT * FROM user_courses WHERE userCourseId=?"
            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            if(rows.length>0){
                const row = rows[0]
                return new UserCourse(row.userCourseId,row.userId,row.courseId)
            }
            else{
                return new UserCourse()
            }
        }
        catch{
            return new UserCourse()
        }
    }
    async getByUserId(id: number): Promise<UserCourse[]> {
        try{
            const query:string = "SELECT * FROM user_courses WHERE userId=?"
            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            return rows.map((row => new UserCourse(row.userCourseId,row.userId,row.courseId)))
        }
        catch{
            return []
        }
    }
    async getByCourseId(id: number): Promise<UserCourse[]> {
       try{
            const query:string = "SELECT * FROM user_courses WHERE courseId=?"
            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            return rows.map((row => new UserCourse(row.userCourseId,row.userId,row.courseId)))
        }
        catch{
            return []
        }
    }
    async getAll(): Promise<UserCourse[]> {
        try{
            const query:string = "SELECT * FROM user_courses ORDER BY userCourseId"
            const [rows] = await db.execute<RowDataPacket[]>(query)
            return rows.map((row => new UserCourse(row.userCourseId,row.userId,row.courseId)))
        }
        catch{
            return []
        }
    }
    async update(userCourse: UserCourse): Promise<UserCourse> {
       try{
        const query : string = "UPDATE user_courses SET userId=?,courseId=? WHERE userCourseId=?"
        const [result] = await db.execute<ResultSetHeader>(query,[userCourse.userId,userCourse.courseId,userCourse.userCourseId])

        if(result.affectedRows > 0){
            return new UserCourse(userCourse.userCourseId,userCourse.userId,userCourse.courseId)
        }
        else{
            return new UserCourse()
        }
        }
        catch{
            return new UserCourse()
        }
    }
    async delete(id: number): Promise<boolean> {
       try{
        const query:string ="DELETE FROM user_courses WHERE userCourseId=?"
        const [result] = await db.execute<ResultSetHeader>(query,[id])

        if(result.affectedRows > 0){
            return true
        }
        else{
            return false
        }
        }
        catch{
            return false
        }
    }
    async exists(id: number): Promise<boolean> {
        try{
            const query : string = "SELECT COUNT(*) as count FROM user_courses WHERE userCourseId=?"
            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            if(rows[0].count > 0){
                return true
            }
            else{
                return false
            }
        }
        catch{
            return false
        }
    }

    async isEnrolled(userId: number, courseId: number): Promise<boolean> {
        try {
            const query: string = "SELECT COUNT(*) as count FROM user_courses WHERE userId=? AND courseId=?";
            const [rows] = await db.execute<RowDataPacket[]>(query, [userId, courseId]);

            if (rows[0].count > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Greška pri proveri upisa:", error);
            return false;
        }
    }

}