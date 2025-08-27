import { useState, useEffect } from "react";
import { ICoursesAPIService } from "../../api_services/course_api/ICoursesAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { CourseDTO } from "../../models/course/CourseDTO";
import { RedUTabeliKurseva } from "./RedUTabeliKurseva";

interface TabelaKurseva {
  coursesAPI: ICoursesAPIService;
}

export function TabelaKurseva({ coursesAPI }: TabelaKurseva) {
  const [kursevi, setKursevi] = useState<CourseDTO[]>([]);
  const { token } = useAuth();
 
  
  useEffect(() => {
    (async () => {
      const data = await coursesAPI.getSviKursevi(token ?? "");
      setKursevi(data);
    })();
  }, [token, coursesAPI]);

  return (
    <div className="bg-white/30 backdrop-blur-lg border border-gray-300 shadow-xl rounded-2xl p-6 w-full max-w-6xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center orange-text">
        Spisak kurseva
      </h2>
      <table className="w-full table-auto border-collapse text-center tabela-korisnika orange-text">
        <thead>
          <tr className="text-gray-700 border-b border-gray-300 orange-text">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">IME KURSA</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {kursevi.length > 0 ? (
            kursevi.map((kurs) => (
              <RedUTabeliKurseva key={kurs.courseId} kurs={kurs} />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4 orange-text">
               Nema dostupnih kurseva.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      
    </div>
  );
}


