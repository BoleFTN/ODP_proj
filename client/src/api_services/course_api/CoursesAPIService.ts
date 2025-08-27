import axios from "axios";
import { CourseDTO } from "../../models/course/CourseDTO";
import { ICoursesAPIService } from "./ICoursesAPIService";


const API_URL: string = import.meta.env.VITE_API_URL + "courses";

export const coursesApi: ICoursesAPIService = {
  async getSviKursevi(token: string): Promise<CourseDTO[]> {
    try {
      const res = await axios.get<CourseDTO[]>(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Greška prilikom dobijanja kurseva:", error);
      return [];
    }
  },
/*
  // Metoda za kreiranje novog kursa
  async createCourse(course: CourseDTO, token: string): Promise<CourseDTO> {
    try {
      const res = await axios.post<CourseDTO>(`${API_URL}/add`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Greška prilikom dodavanja kursa:", error);
      return new CourseDTO(); // Vraćamo prazan objekat u slučaju greške
    }
  },*/
};