// src/api_services/courses_api/coursesAPIService.ts
import axios from "axios";
import { CourseDTO } from "../../models/course/CourseDTO";
import { ICoursesAPIService } from "./ICoursesAPIService";

//const API_URL: string = import.meta.env.VITE_API_URL + "courses";

//const API_URL = import.meta.env.VITE_API_URL;

const COURSES_API_URL = import.meta.env.VITE_API_URL + "courses";
const USER_COURSES_API_URL = import.meta.env.VITE_API_URL;
const PROFESSOR_COURSES_API_URL = import.meta.env.VITE_API_URL;



export const coursesApi: ICoursesAPIService = {

  async getSviKursevi(token: string): Promise<CourseDTO[]> {
    const res = await axios.get<CourseDTO[]>(`${COURSES_API_URL}`, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  },

  async createCourse(token: string, newCourseData: { courseName: string; professorId: number }): Promise<CourseDTO | null> {
    const res = await axios.post<CourseDTO>(`${COURSES_API_URL}/AddCourse`, newCourseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async selectCourse(token: string, userId: number, courseId: number): Promise<any | null> {
    try {
      const res = await axios.post(`${USER_COURSES_API_URL}enroll`, { userId, courseId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    }catch(error){
      console.log(error)
    }
  
},
  async findCoursesForUser(token: string, userId: number): Promise<CourseDTO[]> {
    try {
      const res = await axios.get<CourseDTO[]>(`${USER_COURSES_API_URL}${userId}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Greška pri dohvatanju kurseva za korisnika:", error);
      return [];
    }
  },
findCoursesByProfessor: async (token: string, professorId: number): Promise<CourseDTO[]> => {
    try {
      console.log("kkk");
      console.log(PROFESSOR_COURSES_API_URL);
      console.log("ddd");
      const res = await axios.get<CourseDTO[]>(`${PROFESSOR_COURSES_API_URL}courses/${professorId}/findCoursesByProfessor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Greška pri dohvatanju kurseva za profesora:", error);
      return [];
    }
  },

};