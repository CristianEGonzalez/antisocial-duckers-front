import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //para obtener el ID de la URL
import { obtenerPublicacionPorId } from '../../services/postApi';
import { obtenerUsuarioPorId } from '../../services/userApi'
import { obtenerComentariosDeUnaPublicacion } from '../../services/commentApi'

export const DetallePublicacion = () => {
  //'id' de los parámetros de la url
  const { id } = useParams(); 
  const [publicacion, setPublicacion] = useState(null);
  const [usuario, setUsuario] = useState(null)
  const [comentarios, setComentarios] = useState(null)
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        setCargando(true); 
        const unaPublicacion = await obtenerPublicacionPorId(id); 
        const unUsuario = await obtenerUsuarioPorId(unaPublicacion.userId);
        const listaDeComentarios = await obtenerComentariosDeUnaPublicacion(unaPublicacion.id)
        setPublicacion(unaPublicacion);
        setUsuario(unUsuario);
        setComentarios(listaDeComentarios)

      } catch (err) {
        setError("Error al cargar la publicación: " + (err.message || 'Por favor, intenta de nuevo más tarde.'));
      } finally {
        setCargando(false);
      }
    };

    fetchPublicacion(); 
  }, [id]); // se vuelve a ejecutar si cambia el id


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

  // Verifica si la publicación tiene imágenes para mostrar el carrusel.
  const tieneImagenes = publicacion.Post_Images && publicacion.Post_Images.length > 0;

  return (
    <div className="bg-light d-flex flex-column align-items-center py-4 px-3" style={{ minHeight: '100vh' }}>
      <div className="bg-white rounded-3 shadow-lg overflow-hidden w-100" style={{ maxWidth: '960px' }}>
        <div className="p-4 border-bottom border-light">
          <p className="text-muted mb-0">
            Publicado por:{" "}
            <span className="fw-medium text-dark">@{usuario.nickName}</span>
          </p>
        </div>

        {/* Carrusel de imágenes, solo se renderiza si hay imágenes disponibles */}
        {tieneImagenes && (
          <div id={`carousel-${publicacion.id}`} className="carousel slide w-100" data-bs-ride="carousel">
            <div className="carousel-inner rounded-md">
              {publicacion.Post_Images.map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="3000" 
                  key={index}
                >
                  <img
                    src={image.url}
                    className="d-block w-100 object-cover"
                    style={{ height: "500px" }}
                    alt={`Imagen ${index + 1} de la publicación`}
                  />
                </div>
              ))}
            </div>

            {/* Las lineas */}
            {publicacion.Post_Images.length > 1 && (
              <div className="carousel-indicators">
                {publicacion.Post_Images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target={`#carousel-${publicacion.id}`}
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0 ? "true" : "false"}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            )}

            {/* Controles de navegación del carrusel (anterior/siguiente) */}
            {publicacion.Post_Images.length > 1 && (
              <>
                <button 
                  className="carousel-control-prev" 
                  type="button" 
                  data-bs-target={`#carousel-${publicacion.id}`} 
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button 
                  className="carousel-control-next" 
                  type="button" 
                  data-bs-target={`#carousel-${publicacion.id}`} 
                  data-bs-slide="next" 
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* Cuerpo principal de la publicación (título, contenido, etiquetas) */}
        <div className="p-4">
          <h1 className="h1 text-dark mb-3">{publicacion.title || `Publicación #${publicacion.id}`}</h1>
          <p className="lead text-dark mb-4">
            {publicacion.content} 
          </p>

          {/* tags */}
          {publicacion.Tags && publicacion.Tags.length > 0 && (
            <div className="mt-4 mb-4 d-flex flex-wrap gap-2">
              {publicacion.Tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-info text-dark rounded-pill px-3 py-2" 
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          )}

          <hr className="my-4" />

          {/*Comentarios */}
          <h3 className="h3 text-dark mb-3">Comentarios ({publicacion.Comments ? publicacion.Comments.length : 0})</h3>
          {publicacion.Comments && publicacion.Comments.length > 0 ? (
            <div className="list-group">
              {comentarios.map(comentario => (
                // Renderiza cada comentario. Se podría reemplazar por un componente <Comentario />
                <div key={comentario.id} className="list-group-item list-group-item-action bg-light p-3 rounded-3 shadow-sm border border-light mb-3">
                  <div className="d-flex w-100 justify-content-between mb-2">
                    <h5 className="h5 text-dark mb-0">@{comentario.userId}</h5>
                  </div>
                  <p className="mb-0 text-dark">{comentario.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            // Mensaje si no hay comentarios
            <p className="text-muted">No hay comentarios aún. ¡Sé el primero en comentar!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallePublicacion;
