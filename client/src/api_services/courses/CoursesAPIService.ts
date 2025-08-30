// src/api_services/courses_api/coursesAPIService.ts
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
      console.error("Greška pri dohvatanju svih kurseva:", error);
      return [];
    }
  },

  async createCourse(token: string, newCourseData: { courseName: string; professorId: number }): Promise<CourseDTO | null> {
    try {
      const res = await axios.post<CourseDTO>(`${API_URL}/AddCourse`, newCourseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Greška pri kreiranju kursa:", error);
      return null;
    }
  },

  async selectCourse(token: string, studentId: number, courseId: number): Promise<any | null> {
    try {
      const res = await axios.post(`${API_URL}/enroll`, {
        studentId,
        courseId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Greška pri upisivanju na kurs:", error);
      return null;
    }
  }
};