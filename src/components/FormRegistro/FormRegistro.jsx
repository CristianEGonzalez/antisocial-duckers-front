import { useState } from 'react';
import { obtenerUsuarios, crearUsuario } from '../../services/userApi';
import { useNavigate, Link } from 'react-router-dom';

function FormRegistro() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Para que se limpien los mensajes de error o éxito en cada submit
    setError(null); 
    setMensajeExito(null);

    try {
      // Validar si el nickname ya existe
      const usuariosExistentes = await obtenerUsuarios();
      const nicknameYaExiste = usuariosExistentes.some(
        (usuario) => usuario.nickName === nickname
      );

      if (nicknameYaExiste) {
        throw new Error("El nickname ya está en uso. Por favor, elige otro.");
      }

      // Si el nickname es válido, crear el nuevo usuario
      const nuevoUsuario = { nickName: nickname, email: email};
      const usuarioRegistrado = await crearUsuario(nuevoUsuario);

      setMensajeExito(`¡Registro exitoso ${usuarioRegistrado.nickName}! Ahora puedes iniciar sesión.`);

      // Limpiar el formulario
      setNickname('');
      setEmail('');
      setError('');

      setTimeout(navigate, 2000, '/login');

    } catch (err) {
      console.error("Error en el registro:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nicknameRegistro" className="form-label">Nickname:</label>
            <input type="text" id="nicknameRegistro" className="form-control" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="emailRegistro" className="form-label">Email:</label>
            <input type="email" id="emailRegistro" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {error && <p className="alert alert-danger text-center">{error}</p>}
          {mensajeExito && <p className="alert alert-success text-center">{mensajeExito}</p>}

          <button type="submit" className="btn btn-success w-100 mt-3">Registrar</button>
        </form>
        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default FormRegistro;