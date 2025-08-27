import { ICoursesAPIService } from "../../api_services/course_api/ICoursesAPIService";
import { TabelaKurseva } from "../../components/course/TabelaKurseva";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface MainPage {
  coursesAPI : ICoursesAPIService
}

export function MainPage({ coursesAPI }: MainPage) {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-600/75 to-orange-800/70">
        <p className="text-white text-xl">Učitavanje...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Dobrodošao, {user.username}!
      </h1>

      {user.userType === "student" ? (
        <>
          <h2 className="text-xl text-white mb-4">Moji kursevi</h2>
          <TabelaKurseva coursesAPI={coursesAPI} />
        </>
      ) : (
        <>
          <h2 className="text-xl text-white mb-4">Kursevi koje predajem</h2>
          <TabelaKurseva coursesAPI={coursesAPI} />
          {/* Ovde možeš dodati upload materijala */}
          <button className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-500">
            Dodaj materijal
          </button>
        </>
      )}
    </main>
  );
}