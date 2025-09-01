// src/pages/MainPage.tsx

import { DodajKurs } from "../../components/course/DodajKurs";
import { PregledKurseva } from "../../components/course/PregledKurseva";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { EnrolledCoursesList } from "../../components/course/EnrolledCoursesList"; // Dodaj import za novu komponentu

export function MainPage() {
  const { user, token } = useAuth();
  
  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Dobrodošao, {user?.username}!
      </h1>
      {user?.userType === "student" ? (
        <>
            <EnrolledCoursesList token={token} user={user} />
            <PregledKurseva />
        </>
      ) : (
        <DodajKurs token={token} user={user} />
      )}
    </main>
  );
}

export default MainPage;
