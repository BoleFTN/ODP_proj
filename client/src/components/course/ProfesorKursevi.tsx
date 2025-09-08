import { useState, useEffect } from "react";
import { coursesApi } from "../../api_services/courses/CoursesAPIService";
import { CourseDTO } from "../../models/course/CourseDTO";
import { Link } from "react-router-dom";

interface ProfesorKurseviProps {
    token: string | null;
    user: {
        id: number;
        username: string;
        userType: string;
    } | null;
}

export const ProfesorKursevi: React.FC<ProfesorKurseviProps> = ({ token, user }) => {
    const [enrolledCourses, setEnrolledCourses] = useState<CourseDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            if (!user?.id || !token) {
                setLoading(false);
                return;
            }
            try {
                //console.log(user.id)
                const courses = await coursesApi.findCoursesByProfessor(token, user.id);
                setEnrolledCourses(courses);
            } catch (err) {
                setError("Greška pri dohvatanju upisanih kurseva.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [user, token]);

    if (loading) {
        return <p>Učitavam kurseve...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
  <div style={{
      fontFamily: 'ariel',
      backgroundColor: 'rgba(17, 25, 110, 0.18)',
      padding: '20px',
      borderRadius: '10px',
      fontWeight: "bold",
      color: 'rgb(5, 2, 66)'
  }}>
    <h2 className="text-xl text-white mb-4">Moji kursevi</h2>
    {enrolledCourses.length > 0 ? (
      <ul className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {enrolledCourses.map((course) => (
          <li key={course.courseId} className="flex justify-between items-center mb-4 p-2 border-b border-gray-200 last:border-b-0">
            {/* IZMENJENI DEO */}
            <Link
              to={`/profesor/upravljanje/${course.courseId}`}
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              {course.courseName}
            </Link>
            <Link
              to={`/profesor/upravljanje/${course.courseId}`}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg shadow-md hover:bg-gray-300 transition-colors"
            >
              Dodaj materijal
            </Link>
            {/* KRAJ IZMENJENOG DELA */}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-white">Nemate kurseve. </p>
    )}
  </div>
);
};