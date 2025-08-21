import type { AuthResponse } from "../../types/auth/AuthResponse";

/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
  logIn(username: string, password: string): Promise<AuthResponse>;
  register(username: string, password: string,fullName : string,userType : string): Promise<AuthResponse>;
}