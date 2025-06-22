import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerUsuarios } from '../services/userApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const nickGuardado = localStorage.getItem('usuario');
    const idGuardado = localStorage.getItem('usuarioId');

    if (nickGuardado) {
      setUsuario({ nickName: nickGuardado });
      if (idGuardado) setUsuarioId(parseInt(idGuardado));
    }

    setCargando(false); 
  }, []);

  const login = async (nickName) => {
    const usuarios = await obtenerUsuarios();
    const user = usuarios.find(u => u.nickName === nickName);

    if (user) {
      setUsuario({ nickName: user.nickName });
      setUsuarioId(user.id);

      localStorage.setItem('usuario', user.nickName);
      localStorage.setItem('usuarioId', user.id.toString());
    } else {
      console.warn('Usuario no encontrado');
    }
  };

  const logout = () => {
    setUsuario(null);
    setUsuarioId(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioId');
  };

  return (
    <AuthContext.Provider value={{ usuario, usuarioId, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
