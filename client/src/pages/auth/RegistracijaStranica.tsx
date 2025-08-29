import { useEffect } from "react";
import { RegistracijaForma } from "../../components/auth/RegistracijaForma";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { useNavigate } from "react-router-dom";
import { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";


interface RegistracijaStranicaProps {
  authApi: IAuthAPIService;
}

export default function RegistracijaStranica({ authApi }: RegistracijaStranicaProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Ako je korisnik već prijavljen, preusmeri ga na glavnu stranicu
    if (isAuthenticated && user) {
      navigate("/mainPage");
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-600/75 to-orange-800/70 flex items-center justify-center">
      <RegistracijaForma authApi={authApi} />
    </main>
  );
}