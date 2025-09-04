import { MaterialDTO } from "../../models/material/MaterialDTO";

export interface IMaterialAPIServices{
    createMaterial(title: string, filepath: string, userId: number, courseId: number, description: string): Promise<MaterialDTO>
    editMaterial(title: string, filepath: string, userId: number, courseId: number, description: string,id:number): Promise<MaterialDTO>
    findMaterials(courseId: number): Promise<MaterialDTO[]>
}