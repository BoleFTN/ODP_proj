import { useContext } from "react";
import type { AuthContextType } from "../../types/auth/AuthContext";
import AuthContext from "../../context/auth/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  //console.log("🔍 [useAuth] Trenutni context:", context); // Dodato za debug

  if (context === undefined) {
    throw new Error("useAuth mora biti korišćen unutar AuthProvider-a");
  }

  return context;
};
