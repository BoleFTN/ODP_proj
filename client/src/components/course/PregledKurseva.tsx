// src/components/course/PregledKurseva.tsx
import { useState, useEffect } from "react";
import { coursesApi } from "../../api_services/courses/CoursesAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { CourseDTO } from "../../models/course/CourseDTO";
import { Link } from "react-router-dom";

export function PregledKurseva() {
  const { user, token } = useAuth();
  const [kursevi, setKursevi] = useState<CourseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    const fetchKursevi = async () => {
      setLoading(true);
      setError(null);
      try {
        // Logika za studente (prikaz svih dostupnih kurseva)
        const kurseviList = await coursesApi.getSviKursevi(token);
        setKursevi(kurseviList);
      } catch (err) {
        setError("Greška pri dohvatanju kurseva.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchKursevi();
  }, [user, token]);

  const handleSelectCourse = async (courseId: number) => {
    if (!token || !user) {
      return;
    }
    try {
      await coursesApi.selectCourse(token, user.id, courseId);
      alert("Kurs je uspešno odabran!");
    } catch (err) {
      alert("Greška pri odabiru kursa.");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Učitavam podatke...</p>;
  }

  if (error) {
    return <p style={{ color: "red", marginTop: "10px" }}>{error}</p>;
  }

  return (
    <>
      <h2 className="text-xl text-white mb-4">Dostupni kursevi</h2>
      {kursevi.length > 0 ? (
        <ul className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          {kursevi.map((kurs) => (
            <li key={kurs.courseId} className="flex justify-between items-center mb-4 p-2 border-b border-gray-200 last:border-b-0">
              <Link
                to={`/student/prikaz-materijala/${kurs.courseId}`}
                className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
              >
                {kurs.courseName}
              </Link>
              <button
                onClick={() => handleSelectCourse(kurs.courseId)}
                className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition-colors"
              >
                Odaberi
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Nema dostupnih kurseva.</p>
      )}
    </>
  );
}