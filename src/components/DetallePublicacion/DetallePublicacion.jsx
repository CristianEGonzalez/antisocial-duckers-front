import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { obtenerPublicacionPorId } from "../../services/postApi";
import { obtenerUsuarioPorId } from "../../services/userApi";
import {
  obtenerComentariosDeUnaPublicacion,
  eliminarComentario,
} from "../../services/commentApi";
import EscribirComentario from "../EscribirComentario/EscribirComentario";
import { useAuth } from "../../context/AuthContext";
import "./DetallePublicacion.css";

const DetallePublicacion = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [user, setUser] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [comentarioAEliminar, setComentarioAEliminar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { usuario, usuarioId } = useAuth();

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        setCargando(true);
        const unaPublicacion = await obtenerPublicacionPorId(id);
        const unUsuario = await obtenerUsuarioPorId(unaPublicacion.userId);
        const listaDeComentarios = await obtenerComentariosDeUnaPublicacion(
          unaPublicacion.id
        );
        setPublicacion(unaPublicacion);
        setUser(unUsuario);
        setComentarios(listaDeComentarios);
      } catch (err) {
        setError(
          "Error al cargar la publicación: " +
            (err.message || "Por favor, intenta de nuevo más tarde.")
        );
      } finally {
        setCargando(false);
      }
    };

    fetchPublicacion();
  }, [id]);

  const handleComentarioCreado = (nuevoComentario) => {
    setComentarios((prev) => [nuevoComentario, ...prev]);
  };

  const handleEliminarComentario = async (comentarioId) => {
    try {
      await eliminarComentario(comentarioId);
      setComentarios((prev) =>
        prev.filter((comentario) => comentario.id !== comentarioId)
      );
    } catch (err) {
      console.error("Error al eliminar el comentario:", err);
    }
  };

  const tieneImagenes = publicacion?.Post_Images?.length > 0;

  if (cargando) {
    return <div className="text-center my-4 fs-5">Cargando publicación...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Carrusel fijo a la izquierda */}
        <div
          className={`col-md-8 col-12 p-3 bg-body-secondary ${
            tieneImagenes ? "carousel-container" : ""
          }`}
        >
          {tieneImagenes && (
            <div
              id={`carousel-${publicacion.id}`}
              className="carousel slide h-100"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner h-100">
                {publicacion.Post_Images.map((image, index) => (
                  <div
                    className={`carousel-item h-100 ${
                      index === 0 ? "active" : ""
                    }`}
                    data-bs-interval="3000"
                    key={index}
                  >
                    <img
                      src={image.url}
                      className="carousel-image"
                      alt={`Imagen ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              {publicacion.Post_Images.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carousel-${publicacion.id}`}
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                    <span className="visually-hidden">Anterior</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carousel-${publicacion.id}`}
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                    <span className="visually-hidden">Siguiente</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Columna derecha con scroll */}
        <div
          className={`col-md-4 col-12 bg-light p-3 overflow-y-auto ${
            tieneImagenes
              ? "scroll-columna-derecha"
              : "scroll-columna-derecha-sin-imagenes mx-auto col-md-8"
          }`}
        >
          <p className="text-muted mb-2 publicacion-text">
            Publicado por:{" "}
            <span className="fw-medium text-dark">@{user.nickName}</span>
          </p>
          <h2 className="h4">{publicacion.title}</h2>
          <p className="text-muted">{publicacion.content}</p>

          {usuario && (
            <EscribirComentario
              postId={publicacion.id}
              onComentarioCreado={handleComentarioCreado}
              userId={usuarioId}
            />
          )}

          <h5 className="mt-4">Comentarios ({comentarios?.length || 0})</h5>

          {comentarios && comentarios.length > 0 ? (
            <div className="list-group">
              {comentarios.map((comentario) => (
                <div
                  key={comentario.id}
                  className="list-group-item list-group-item-action bg-white p-3 rounded-3 shadow-sm border-light mb-3 position-relative"
                >
                  <div className="d-flex justify-content-between mb-2">
                    <h6 className="mb-0">@{comentario.User.nickName}</h6>

                    {usuario && usuario.nickName === comentario.User.nickName && (
                      <button
                        onClick={() => setComentarioAEliminar(comentario.id)}
                        className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                        title="Eliminar comentario"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                  <p className="mb-0">{comentario.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No hay comentarios aún.</p>
          )}

          {/* Modal de confirmación */}
          {comentarioAEliminar && (
            <div
              className="modal show d-block"
              tabIndex="-1"
              onClick={() => setComentarioAEliminar(null)}
            >
              <div
                className="modal-dialog"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirmar eliminación</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setComentarioAEliminar(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>¿Querés eliminar este comentario?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setComentarioAEliminar(null)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        await handleEliminarComentario(comentarioAEliminar);
                        setComentarioAEliminar(null);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallePublicacion;
