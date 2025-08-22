import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuthHook";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { PrijavaForma } from "../../components/auth/PrijavaForma";

interface LoginPageProps {
  authApi: IAuthAPIService;
}

export default function PrijavaStranica({ authApi }: LoginPageProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Preusmeri samo ako smo na /logIn i imamo validnog korisnika
    if (
      location.pathname === "/logIn" &&
      isAuthenticated &&
      user?.userType
    ) {
      navigate(`/${user.userType}-dashboard`);
    }
  }, [isAuthenticated, navigate, user, location]);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex items-center justify-center flex-col">
      <PrijavaForma authApi={authApi} />

     
    </main>
  );
}
