import type { RezultatValidacije } from "../../../types/validation/ValidationResult";

export function validacijaPodatakaRegistracijaAuth(username?: string, password?: string,fullName?: string,userType?: string): RezultatValidacije {
  if (!username || !password || !fullName ||!userType) {
    return { uspesno: false, poruka: 'Unesite sve trazene podatke.' };
  }

  if (username.length < 3) {
    return { uspesno: false, poruka: 'Korisnicko ime mora imati najmanje 3 karaktera' };
  }

  if (password.length < 6) {
    return { uspesno: false, poruka: 'Lozinka mora imati najmanje 6 karaktera' };
  }

  if (password.length > 20) {
    return { uspesno: false, poruka: 'Lozinka moze imati najvise 20 karaktera' };
  }

   if(fullName.length < 3 ){
        return {uspesno: false,poruka:"Ime je predugo"}
    }
    if(fullName.length > 30 ){
        return {uspesno: false,poruka:"Name is too long"}
    }

    if(userType !== "student" && userType !== "professor"){
        return {uspesno: false,poruka:"User type is invalid"}
    }
  return { uspesno: true };
}
