import axios from "axios";
import { MaterialDTO } from "../../models/material/MaterialDTO"
import { IMaterialAPIServices } from "./IMaterialAPIServices"


const API_URL: string = import.meta.env.VITE_API_URL + "materials"

export const MaterialAPIServices : IMaterialAPIServices = {
   async createMaterial(title: string, filepath: string, userId: number, courseId: number, description: string): Promise<MaterialDTO> {
     try {
      const res = await axios.post<MaterialDTO>(`${API_URL}/createMaterial`, {
        title,
        filepath,
        userId,
        courseId,
        description
      });
      return res.data
    } catch {
        return new MaterialDTO()
    }
    },
    async editMaterial(title: string, filepath: string, userId: number, courseId: number, description: string, id: number): Promise<MaterialDTO> {
        try {
      const res = await axios.post<MaterialDTO>(`${API_URL}/editMaterial`, {
        title,
        filepath,
        userId,
        courseId,
        description,
        id
      });
      return res.data
    } catch {
        return new MaterialDTO()
    }
    },
    async findMaterials (courseId: number): Promise<MaterialDTO[]> {
        try {
      const res = await axios.post<MaterialDTO[]>(`${API_URL}/findMaterials`, {
        courseId
      });
      return res.data
    } catch {
        return []
    }
    }
}