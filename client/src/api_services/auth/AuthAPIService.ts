import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { IAuthAPIService } from "./IAuthAPIService";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const authApi: IAuthAPIService = {
  async logIn(username: string, password: string): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/logIn`, {
        username,
        password
      });
      return res.data;
    } catch (error) {
      let message = "Пријава није успешна.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      return {
        success: false,
        message,
        data: undefined,
      };
    }
  },

  async register(username: string, password: string,fullName : string,userType : string): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/register`, {
        username,
        password,
        fullName,
        userType,
      });
      return res.data;
    } catch (error) {
      let message = "Greska pri registraciji";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        success: false,
        message,
        data: undefined,
      };
    }
  },
};