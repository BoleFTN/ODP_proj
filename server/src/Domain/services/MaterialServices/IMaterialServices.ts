import { MaterialDTO } from "../../DTOs/MaterialsDTO/MaterialDTO";


export interface IMaterialServices{
    createMaterial(title:string,filepath:string,userId:number,courseId:number,description:string):Promise<MaterialDTO>
    editMaterial(title:string,filepath:string,userId:number,courseId:number,description:string,id:number):Promise<MaterialDTO>
    findMaterials(courseId:number):Promise<MaterialDTO[]>
}