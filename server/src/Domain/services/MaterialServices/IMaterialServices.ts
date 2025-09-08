import { MaterialDTO } from "../../DTOs/MaterialsDTO/MaterialDTO";


export interface IMaterialServices{
    createMaterial(materialName:string,filepath:string,userId:number,courseId:number,description:string):Promise<MaterialDTO>
    editMaterial(materialName:string,filepath:string,userId:number,courseId:number,description:string,id:number):Promise<MaterialDTO>
    findMaterials(courseId:number):Promise<MaterialDTO[]>
}