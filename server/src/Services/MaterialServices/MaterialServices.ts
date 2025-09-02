import { MaterialDTO } from "../../Domain/DTOs/MaterialsDTO/MaterialDTO";
import { Material } from "../../Domain/Models/Material";
import { IMaterialsRepository } from "../../Domain/repositories/materialsRepository/IMaterialRepository";
import { IUserAccountsRepository } from "../../Domain/repositories/userAccountsRepository/IUserAccountsRepository";
import { IUserAccountAuth } from "../../Domain/services/AuthServices/IUserAccountAuth";
import { IMaterialServices } from "../../Domain/services/MaterialServices/IMaterialServices";

export class MaterialServices implements IMaterialServices{
    public constructor(private MaterialsRepository:IMaterialsRepository,private UserAccountRepository:IUserAccountsRepository){
        this.MaterialsRepository = MaterialsRepository
        this.UserAccountRepository = UserAccountRepository
    }

    async createMaterial(title: string, filepath: string, userId: number, courseId: number, description: string): Promise<MaterialDTO> {
        
        const userTester = await this.UserAccountRepository.getById(userId)
        if(userTester.userType !== "professor"){
            return new MaterialDTO()
        }
        const newMaterial = await this.MaterialsRepository.createMaterial(new Material(0,title,filepath,courseId,userId,description))

        return new MaterialDTO(newMaterial.materialId,newMaterial.materialName,newMaterial.filepath,newMaterial.courseId,newMaterial.userId,newMaterial.description)
    }
    async editMaterial(title: string, filepath: string, userId: number, courseId: number, description: string,id:number): Promise<MaterialDTO> {
        const newMaterial = await this.MaterialsRepository.getById(id)

        if(newMaterial.courseId === 0){
            return new MaterialDTO()
        }

        const editedMaterial = await this.MaterialsRepository.update(new Material(0,title,filepath,courseId,userId,description))

        return new MaterialDTO(editedMaterial.materialId,editedMaterial.materialName,editedMaterial.filepath,editedMaterial.courseId,editedMaterial.userId,editedMaterial.description)
    }
    async findMaterials(courseId: number): Promise<MaterialDTO[]> {
        
        const materials:Material[] = await this.MaterialsRepository.getByCourseId(courseId)

        if(materials.length === 0){
            return []
        }

        const materialsExit:MaterialDTO[] = []
        for(const material of materials){
            materialsExit.push(new MaterialDTO(material.materialId,material.materialName,material.filepath,material.courseId,material.userId,material.description))
        }

        return materialsExit
    }
}