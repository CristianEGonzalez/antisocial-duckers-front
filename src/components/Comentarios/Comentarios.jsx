import { useEffect, useState } from "react";
import {obtenerComentariosDeUnaPublicacion, eliminarComentario} from "../../services/commentApi";

const Comentarios = ({usuario, idPublicacion, comentarios, setComentarios}) => {
  const [comentarioAEliminar, setComentarioAEliminar] = useState(null);

  useEffect(() => {
      const fetchComentarios = async () => {
        try {
          const listaDeComentarios = await obtenerComentariosDeUnaPublicacion(idPublicacion);
          setComentarios(listaDeComentarios);
        } catch (err) {
          setError(
            "Error al cargar los comentarios: " +
              (err.message || "Por favor, intenta de nuevo más tarde.")
          );
        }
      };
  
      fetchComentarios();
    }, []);  

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

  return <>
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
  </>
}

export default Comentarios;