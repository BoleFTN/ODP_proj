import React, { useState, useEffect } from 'react';
import { coursesApi } from '../../api_services/courses/CoursesAPIService';
import { CourseDTO } from '../../models/course/CourseDTO';

interface EnrolledCoursesListProps {
    token: string | null;
    user: {
        id: number;
        username: string;
        userType: string;
    } | null;
}

export const EnrolledCoursesList: React.FC<EnrolledCoursesListProps> = ({ token, user }) => {
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
                const courses = await coursesApi.findCoursesForUser(token, user.id);
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
        return <p>Učitavam upisane kurseve...</p>;
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
                            <span className="text-lg text-gray-800">{course.courseName}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white">Niste upisani ni na jedan kurs.</p>
            )}
        </div>
    );
};