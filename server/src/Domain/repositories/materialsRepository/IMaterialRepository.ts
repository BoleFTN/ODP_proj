import { Material } from "../../Models/Material";


export interface IMaterialsRepository {
createMaterial(material:Material):Promise<Material>
getById(id:number):Promise<Material>
getByMaterialNamw(name:string):Promise<Material>
getAll():Promise<Material[]>
getByCourseId(id:number):Promise<Material[]>
getByUserId(id:number):Promise<Material[]>
update(material:Material):Promise<Material>
delete(id:number):Promise<boolean>
exists(id:number):Promise<boolean>
}