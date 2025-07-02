import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { obtenerUsuarios } from '../../services/userApi';

export default function Login() {
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      setError(null); 
      setMensajeExito(null);
      
      const usuariosExistentes = await obtenerUsuarios();
      const existeNickname = usuariosExistentes.some(
        (usuario) => usuario.nickName === nickName
      );
      
      if (!existeNickname){
        setNickName('');
        throw new Error("El usuario no existe");
      }
      if (password !== '123456'){
        setPassword('');
        throw new Error("La contraseña es incorrecta.");
      }
  
      login(nickName);
  
      setMensajeExito(`Bienvenid@ ${nickName}!`);

      setTimeout(navigate, 2000, '/perfil');
      
    } catch (err) {
      console.error("Error al iniciar sesión:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nicknameInput" className="form-label">Nickname:</label>
            <input type="text" id="nicknameInput" className="form-control" value={nickName} onChange={(e) => setNickName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Contraseña:</label>
            <input type="password" id="passwordInput" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <p className="alert alert-danger text-center">{error}</p>}
          {mensajeExito && <p className="alert alert-success text-center">{mensajeExito}</p>}

          <button type="submit" className="btn btn-success w-100 mt-3">Iniciar sesión</button>
        </form>
        <p className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}