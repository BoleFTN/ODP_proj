import { Router,Request,Response } from "express";
import { IMaterialServices } from "../../Domain/services/MaterialServices/IMaterialServices";
import { MaterialValidation } from "../validators/MaterialsValidator";


export class MaterialsController{
    private router : Router
    private MaterialServices:IMaterialServices

    constructor(MaterialServices:IMaterialServices){
        this.router = Router()
        this.MaterialServices = MaterialServices
        this.initializeRoute()
    }
    private initializeRoute() {
        this.router.post("/createMaterial",this.createMaterial.bind(this))
        this.router.post("/editMaterial",this.editMaterial.bind(this))
        this.router.post("/findMaterials",this.findMaterials.bind(this))
    }

    private async createMaterial(req:Request,res:Response):Promise<void>{
        try{
        const{title,filepath,userId,courseId,description} = req.body
        const validation = MaterialValidation(title,userId,courseId,description)

        if(validation.sucessful === false){
            res.status(400).json({ sucessful:false,message:validation.message})
        }

        const result = await this.MaterialServices.createMaterial(title,filepath,userId,courseId,description)

        if(result.materialId !== 0){
             res.status(200).json(result)
        }
        else{
             res.status(401).json({ sucessful:false})
        }
        }
        catch{
            res.status(500).json({ sucessful: false, message: "Serverska greška" });
        }
    }

    private async editMaterial(req:Request,res:Response):Promise<void>{
        try{
            const {title, filepath, userId, courseId, description,id} = req.body
            const validation = MaterialValidation(title,userId,courseId,description)

            const result = await this.MaterialServices.editMaterial(title, filepath, userId, courseId,description,id)

            if(result.materialId !== 0){
             res.status(200).json(result)
        }
        else{
             res.status(401).json({ sucessful:false,message:validation.message})
        }
        }
        catch{
            res.status(500).json({ sucessful: false, message: "Serverska greška" });
        }
    }

    private async findMaterials (req:Request,res:Response):Promise<void>{
        try{
            const {courseId}= req.body
            const result = await this.MaterialServices.findMaterials(courseId)
            res.status(200).json(result)
        }
        catch{
            res.status(500).json({ sucessful: false, message: "Serverska greška" });
        }
    }
    public getRouter(){
        return this.router
    }
}