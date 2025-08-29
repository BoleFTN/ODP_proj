import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import PrijavaStranica from "./pages/auth/PrijavaStranica";
import RegistracijaStranica from "./pages/auth/RegistracijaStranica";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import MainPage from "./pages/kursevi/MainPage";


function App() {
  return (
    <>


      <Routes>
        <Route path="/logIn" element={<PrijavaStranica authApi={authApi} />} />
        <Route path="/register" element={<RegistracijaStranica authApi={authApi} />} />
        <Route
      path="/mainPage"
element={
    <ProtectedRoute requiredRoles={["student", "professor"]}>
      <MainPage />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<Navigate to="/logIn" replace />} />


      </Routes>

    </>
  );
}
export default App;
