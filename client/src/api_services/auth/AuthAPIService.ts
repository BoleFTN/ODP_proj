// src/services/AuthAPIService.ts

import type { IAuthAPIService } from "./IAuthAPIService";
import axios from "axios";

// Definiši tip odgovora od back-enda za greške


const API_URL: string = import.meta.env.VITE_API_URL + "AuthServices";

export const authApi: IAuthAPIService = {
  // logIn i register sada vraćaju Promise<string | ErrorResponse>
  async logIn(username: string, password: string): Promise<string> {
   try {
      const res = await axios.post<string>(`${API_URL}/logIn`, {
        username,
        password,
      });
      return res.data;
    } catch {
      return "";
    }
  },

  async register(username: string, password: string, fullName: string, userType: string
  ): Promise< string> {
    try {
      const res = await axios.post<string>(`${API_URL}/register`, {
        username,
        password,
        fullName,
        userType,
      });
      return res.data;
    } catch {
      return "";
    }
  },
};