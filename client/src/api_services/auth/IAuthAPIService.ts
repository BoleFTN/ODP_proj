
/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
  logIn(username: string, password: string): Promise<string>;
  register(username: string, password: string,fullName : string,userType : string): Promise<string>;
}