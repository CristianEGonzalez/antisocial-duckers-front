import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { obtenerUsuarioPorId } from "../../services/userApi";
import { obtenerPublicaciones } from "../../services/postApi";
import { Publicacion } from "../Publicacion/Publicacion";

const Perfil = () => {
  const { usuario, usuarioId, cargando } = useAuth();

  const [datosPerfilAmostrar, setDatosPerfilAmostrar] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [error, setError] = useState(null);
  const [contenidoCargando, setContenidoCargando] = useState(true);

  useEffect(() => {
    const cargarPerfilYPublicaciones = async () => {
      setContenidoCargando(true);
      setError(null);

      if (!usuarioId) {
        console.error(
          "No hay usuarioId disponible después de que el contexto terminó de cargar."
        );
        setError(
          "No se pudo cargar el perfil. Por favor, asegúrate de haber iniciado sesión."
        );
        setContenidoCargando(false);
        return;
      }

      let datosTemporalesPerfil = null;

      if (usuario.nickName) {
        datosTemporalesPerfil = {
          id: usuarioId,
          nombre: usuario.nickName,
          nickname: usuario.nickName,
        };
      }

      try {
        const usuarioDesdeApi = await obtenerUsuarioPorId(usuarioId);
        if (usuarioDesdeApi && usuarioDesdeApi.id) {
          datosTemporalesPerfil = {
            ...datosTemporalesPerfil,
            ...usuarioDesdeApi,
          };
        } else {
          console.warn("obtenerUsuarioPorId devolvió un valor nulo/vacío");
        }
      } catch (err) {
        console.warn("Error al obtener usuario por ID desde la API.", err);
      }

      setDatosPerfilAmostrar(datosTemporalesPerfil);

      // --- Lógica para obtener y filtrar las publicaciones ---
      try {
        let publicacionesObtenidas = [];
        publicacionesObtenidas = await obtenerPublicaciones();

        if (publicacionesObtenidas && publicacionesObtenidas.length > 0) {
          const todasLasPublicaciones = await obtenerPublicaciones();
          publicacionesObtenidas = todasLasPublicaciones.filter(
            (publicacion) => publicacion.userId === usuarioId
          );
        } else if (
          !publicacionesObtenidas ||
          publicacionesObtenidas.length === 0
        ) {
          // No hay publicaciones o la API devolvió un array vacío
        }

        setPublicaciones(publicacionesObtenidas);
      } catch (err) {
        console.error("Error al cargar las publicaciones:", err);
        setError(
          err.message ||
            "No se pudieron cargar las publicaciones. Intenta de nuevo."
        );
      } finally {
        setContenidoCargando(false);
      }
    };

    cargarPerfilYPublicaciones();
  }, [usuarioId, cargando, usuario]);

  if (cargando || contenidoCargando) {
    return (
      <div className="container mt-5">Cargando perfil y publicaciones...</div>
    );
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  if (!datosPerfilAmostrar) {
    return (
      <div className="container mt-5">
        No se pudo obtener la información del perfil.
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="p-2 rounded-3 shadow-sm border border-success-subtle text-center">
        <h2>
          {`@${datosPerfilAmostrar.nickname}`}
        </h2>
      </div>

      <div className="profile-posts mt-5">
        <h3 className="mb-1">Tus Publicaciones</h3>
        {publicaciones.length === 0 ? (
          <p className="text-muted text-center">Aún no hay publicaciones.</p>
        ) : (
          <section
            className="p-3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {publicaciones.map((post) => (
              <Publicacion
                key={post.id}
                idPublicacion={post.id}
                nickName={post.User.nickName}
                titulo={post.title || `Publicación #${post.id}`}
                contenido={post.content}
                imagenes={post.Post_Images.map((img) => img.url)}
                cantidadComentarios={post.Comments.length}
                urlVerMas={`/DetallePublicacionId/${post.id}`}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Perfil;
