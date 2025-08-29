import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuthHook';
import { CourseDTO } from '../../models/course/CourseDTO';
import { coursesApi } from '../../api_services/courses/CoursesAPIService';

export function MainPage() {
  const { user, token } = useAuth();
  const [kursevi, setKursevi] = useState<CourseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Stanje za formu za dodavanje kursa
  const [courseName, setCourseName] = useState('');
  const [professorId, setProfessorId] = useState(user?.id || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Proveravamo da li je korisnik student ili profesor i da li ima token
    if (user && token) {
      const fetchKursevi = async () => {
        try {
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
    } else {
      setLoading(false);
    }
  }, [user, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!courseName || !professorId) {
        setMessage('Sva polja su obavezna.');
        return;
    }

    if (!token) {
        setMessage('Niste autentifikovani.');
        return;
    }

    try {
        const newCourseData = { 
            courseName, 
            professorId: parseInt(professorId as string, 10) 
        };
        const newCourse = await coursesApi.createCourse(token, newCourseData);

        if (newCourse) {
            setMessage('Kurs je uspešno kreiran!');
            setCourseName('');
            setProfessorId(user?.id || ''); // Resetuje na ID ulogovanog profesora
        } else {
            setMessage('Kreiranje kursa nije uspelo.');
        }
    } catch (err) {
        setMessage('Došlo je do greške prilikom komunikacije sa serverom.');
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
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Dobrodošao, {user?.username}!
      </h1>

      {user?.userType === "student" ? (
        <>
          <h2 className="text-xl text-white mb-4">Dostupni kursevi</h2>
          {kursevi.length > 0 ? (
            <ul>
              {kursevi.map((kurs) => (
                <li key={kurs.courseId} style={{ color: "white" }}>
                  {kurs.courseName}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "white" }}>Nema dostupnih kurseva.</p>
          )}
        </>
      ) : (
        <>
          <h2 className="text-xl text-white mb-4">Kreiraj novi kurs</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Naziv kursa:
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                ID profesora:
              </label>
              <input
                type="number"
                value={professorId}
                readOnly
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200"
              />
            </div>
            {message && <p className={`mb-4 text-center ${message.includes('uspešno') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
            <button type="submit" className="w-full px-4 py-2 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition-colors">
              Kreiraj kurs
            </button>
          </form>
        </>
      )}
    </main>
  );
}

export default MainPage;