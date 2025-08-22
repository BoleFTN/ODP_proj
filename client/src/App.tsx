import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";

function App() {
  return (
    <>


      <Routes>
        <Route path="/logIn" element={<PrijavaStranica authApi={authApi} />} />
        <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />
        <Route path="/" element={<Navigate to="/logIn" replace />} />

      </Routes>

    </>
  );
}
export default App;
