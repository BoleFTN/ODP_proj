import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";

function App() {
  return (
    <>
      <h1 style={{ color: "red", textAlign: "center" }}>Test App render</h1>

      <Routes>
        <Route path="/login" element={<PrijavaStranica authApi={authApi} />} />
        <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
export default App;
