import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Material } from "../../../Domain/Models/Material";
import { IMaterialsRepository } from "../../../Domain/repositories/materialsRepository/IMaterialRepository";
import db from "../../connection/DbConnectionPool";


export class MaterialsRepository implements IMaterialsRepository{
    async createMaterial(material: Material): Promise<Material> {
        try{
            const query : string = "INSERT INTO materials (materialName,filePath,courseId,userId, description) VALUES(?,?,?,?,?)"

            const [result] = await db.execute<ResultSetHeader>(query,[material.materialName,material.filepath,material.courseId,material.userId,material.description])

            if(result.insertId){
                return new Material(result.insertId,material.materialName,material.filepath,material.courseId,material.userId)
            }
            else{
                return new Material()
            }
        }
        catch{
            return new Material()
        }
    }
    async getById(id: number): Promise<Material> {
        try{
            const query : string = "SELECT * FROM materials WHERE materialId=?"

            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            if(rows.length > 0){
                const row = rows[0]
                return new Material(row.materialId,row.materialName,row.filePath,row.courseId,row.userId,row. description)
            }
            else{
                return new Material()
            }
        }
        catch{
            return new Material()
        }
    }
    async getByMaterialNamw(name: string): Promise<Material> {
        try{
            const query : string = "SELECT * FROM materials WHERE materialName=?"

            const [rows] = await db.execute<RowDataPacket[]>(query,[name])

             if(rows.length > 0){
                const row = rows[0]
                return new Material(row.materialId,row.materialName,row.filePath,row.courseId,row.userId,row. description)
            }
            else{
                return new Material()
            }
        }
        catch{
            return new Material()
        }
    }
    async getAll(): Promise<Material[]> {
        try{
            const query : string = "SELECT * FROM materials ORDER BY materialId"

            const [rows] = await db.execute<RowDataPacket[]>(query)

            return rows.map(
                (row) => new Material(row.materialId,row.materialName,row.filePath,row.courseId,row.userId,row. description)
            )
        }
        catch{
            return []
        }
    }
    async getByCourseId(id: number): Promise<Material[]> {
        try{
            const query : string = "SELECT * FROM materials WHERE courseId=?"

            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            return rows.map(
                (row) => new Material(row.materialId,row.materialName,row.filePath,row.courseId,row.userId,row. description)
            )
        }
        catch{
            return []
        }
    }
    async getByUserId(id: number): Promise<Material[]> {
        try{
             const query : string = "SELECT * FROM materials WHERE userId=?"

            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            return rows.map(
                (row) => new Material(row.materialId,row.materialName,row.filePath,row.courseId,row.userId,row. description)
            )
        }
        catch{
            return []
        }
    }
    async update(material: Material): Promise<Material> {
        try{
            const query : string = "UPDATE materials SET materialName=?,filePath=?,courseId=?,userId=?, description=? WHERE materialId=?"

            const [result] = await db.execute<ResultSetHeader>(query,[material.materialName,material.filepath,material.courseId,material.userId,material.description,material.materialId])

            if(result.affectedRows > 0){
                return new Material(material.materialId,material.materialName,material.filepath,material.courseId,material.userId,material.description)
            }
            else{
                return new Material()
            }
        }
        catch{
            return new Material()
        }
    }
    async delete(id: number): Promise<boolean> {
        try{
            const query : string = "DELETE FROM materials WHERE materialId=?"

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
            const query : string = "SELECT COUNT(*) as count WHERE materialId=?"
            
            const [rows] = await db.execute<RowDataPacket[]>(query,[id])

            if(rows[0].count > 0 ){
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

}