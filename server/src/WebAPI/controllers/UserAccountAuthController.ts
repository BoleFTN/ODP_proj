import { Router,Request,Response } from "express";
import { IUserAccountAuth } from "../../Domain/services/AuthServices/IUserAccountAuth";
import { UserAccountValidator } from "../validators/UserAccountValidator";
import { UserAccountLogInValidator } from "../validators/UserAccountLogInValidator";
import jwt from "jsonwebtoken";


export class UserAccountAuthController {
    private router : Router
    private UserAccountAuth : IUserAccountAuth

    constructor(UserAccountAuthService : IUserAccountAuth){
        this.router = Router()
        this.UserAccountAuth = UserAccountAuthService
        this.initializeRoute()
    }

    private initializeRoute() {
        this.router.post("/AuthServices/logIn",this.logIn.bind(this))
        this.router.post("/AuthServices/register",this.register.bind(this))
    }

    private async logIn(req : Request,res : Response): Promise<void>{
        try{
            const{username,password} = req.body

            const valid = UserAccountLogInValidator(username,password)

            if(valid.sucessful === false){
                res.status(400).json({ sucessful:false,message:valid.message})
                return;
            }

            const result = await this.UserAccountAuth.logIn(username,password)

            if(result.id !== 0 ){
                 const token = jwt.sign(
                 { 
                  id: result.id, 
                  username: result.username, 
                  userType: result.userType,
            }, process.env.JWT_SECRET ?? "", { expiresIn: '6h' });

                res.status(200).json({ sucessful:true,message:"Log in was sucessful", data: token})
            }
            else{
                res.status(401).json({ sucessful:false,message:"Log in failed"})
            }
        }
        catch{
             res.status(500).json({ sucessful:false,message:"Server error"})
        }
    }

    private async register(req : Request,res : Response): Promise<void>{
        try{
            const{username,password,fullName,userType} = req.body

            const valid = UserAccountValidator(username,password,fullName,userType)

            if(valid.sucessful === false){
                res.status(400).json({ sucessful:false,message:valid.message})
                return;
            }

            const result = await this.UserAccountAuth.register(username,password,userType,fullName)

            if(result.id !== 0 ){
                const token = jwt.sign(
            { 
              id: result.id, 
             username: result.username, 
             userType: result.userType,
          }, process.env.JWT_SECRET ?? "", { expiresIn: '6h' });
                res.status(200).json({ sucessful:true,message:"Log in was sucessful", data: token})
            }
            else{
                res.status(401).json({ sucessful:false,message:"Log in failed"})
            }
        }
        catch{
             res.status(500).json({ sucessful:false,message:"Server error"})
        }
    }

    public getRouter(){
        return this.router
    }
}