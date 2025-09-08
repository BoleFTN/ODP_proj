import axios from "axios";
import { MaterialDTO } from "../../models/material/MaterialDTO";

const API_URL: string = import.meta.env.VITE_API_URL + "materials"



    export const materialsApi = {
    createMaterial: async (materialData: {
        materialName: string;
        filepath: string;
        userId: number;
        courseId: number;
        description: string;
    }, token: string): Promise<MaterialDTO> => {
        try {
            const res = await axios.post<MaterialDTO>(`${API_URL}/createMaterial`, materialData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // OVDE JE KLJUČ
                },
            });
            return res.data;
        } catch (error) {
            console.error("Greška pri kreiranju materijala:", error);
            throw error;
        }
    },
   
    editMaterial: async (materialData: {
        title: string;
        filepath: string;
        userId: number;
        courseId: number;
        description: string;
        id: number;
    }): Promise<MaterialDTO> => {
        try {
            const res = await axios.post<MaterialDTO>(`${API_URL}/editMaterial`, materialData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return res.data;
        } catch (error) {
            console.error("Greška pri ažuriranju materijala:", error);
            throw error;
        }
    },

    // Pronalaženje materijala za određeni predmet
    findMaterials: async (courseId: number): Promise<MaterialDTO[]> => {
        try {
            const res = await axios.post<MaterialDTO[]>(`${API_URL}/findMaterials`, { courseId: courseId });
            return res.data;
        } catch (error) {
            console.error("Greška pri dohvatanju materijala:", error);
            return [];
        }
    }
};