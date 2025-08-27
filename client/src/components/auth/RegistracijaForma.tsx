import { useState } from "react";
import { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { validacijaPodatakaRegistracijaAuth } from "../../api_services/validators/auth/AuthRegisterValidator";
import { Link } from "react-router-dom";


export function RegistracijaForma({authApi}:AuthFormProps){
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [greska, setGreska] = useState("");
     const [fullName,setFullName] = useState("")
     const [userType,setUserType] = useState("")
     const { login } = useAuth();

     const podnesiFormu = async (e: React.FormEvent) => {
         e.preventDefault();
     
         const validacija = validacijaPodatakaRegistracijaAuth(username, password,fullName,userType);
         if (!validacija.uspesno) {
           setGreska(validacija.poruka ?? "Neispravni podaci!");
           return;
         }
     
         const odgovor = await authApi.register(username, password,fullName,userType);
         if (odgovor) {
           login(odgovor);
         } else {
           setUsername("");
           setPassword("");
           setUserType("");
           setFullName("");
         }
       };

       return (
    <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-md border border-blue-400">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Registracija</h1>
      <form onSubmit={podnesiFormu} className="space-y-4">
        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ime"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-1/2 bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Izaberite tip korisnika</option>
          <option value="student">Student</option>
          <option value="professor">Profesor</option>
        </select>
        {greska && <p className="text-md text-center text-red-700/80 font-medium">{greska}</p>}
        <button
          type="submit"
          className="w-full bg-blue-700/70 hover:bg-blue-700/90 text-white py-2 rounded-xl transition"
        >
          Registruj se
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Već imate nalog?{" "}
        <Link to="/logIn" className="text-blue-700 hover:underline">
          Prijavite se
        </Link>
      </p>
    </div>
  );
}