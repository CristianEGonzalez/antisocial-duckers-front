import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

    useEffect(() => {
    const nickGuardado = localStorage.getItem('usuario');
    if (nickGuardado) {
        setUsuario({ nickName: nickGuardado });
    }
    setCargando(false); 
    }, []);

  // Guarda en localStorage al loguear
  const login = (nickName) => {
    setUsuario({ nickName });
    localStorage.setItem('usuario', nickName);
  };

  // Eliminar del localStorage al cerrar sesión
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

// Evitá exportar directamente una función anónima como export default
export function useAuth() {
  return useContext(AuthContext);
}