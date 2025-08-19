import { useState, useEffect } from 'react'
import { PročitajVrednostPoKljuču } from './helpers/local_storage'
import { authApi } from './api_services/auth/AuthAPIService';
import AuthStranica from './pages/auth/AuthStranica';
import KontrolnaTabla from './pages/kontrolna_tabla/KontrolnaTabla';

function App() {
  const [prijavljen, setPrijavljen] = useState<boolean>(false);

  useEffect(() => {
    const token = PročitajVrednostPoKljuču('authToken')
    if (token && token.includes('/')) {
      setPrijavljen(true)
    }
  }, [])

  return prijavljen ? (
    <KontrolnaTabla onLogout={() => setPrijavljen(false)} />
  ) : (
    <AuthStranica
      authApi={authApi}
      onLoginSuccess={() => setPrijavljen(true)}
    />
  )
}

export default App;