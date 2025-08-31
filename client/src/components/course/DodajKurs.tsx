import React, { useState } from 'react';
import { coursesApi } from '../../api_services/courses/CoursesAPIService';

interface DodajKursProps {
  token: string | null;
  user: {
    id: number;
    username: string;
    userType: string;
  } | null;
}

export const DodajKurs: React.FC<DodajKursProps> = ({ token, user }) => {
  const [courseName, setCourseName] = useState('');
  const [professorId, setProfessorId] = useState(user?.id);
  const [message, setMessage] = useState('');

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
        professorId: professorId as number,
      };
      
      const newCourse = await coursesApi.createCourse(token, newCourseData);

      if (newCourse) {
        setMessage('Kurs je uspešno kreiran!');
        setCourseName('');
        setProfessorId(user?.id);

      //Ovo zasad ne radi await coursesApi.selectCourse(token,newCourseData.professorId,newCourse.courseId)
      } else {
        setMessage('Kreiranje kursa nije uspelo.');
      }
    } catch (err) {
      setMessage('Došlo je do greške prilikom komunikacije sa serverom.');
      console.error(err);
    }
  };

  return (
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
  );
};
