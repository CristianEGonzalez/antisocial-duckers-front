// Componente funcional de React para la tarjeta con carrusel
export const Publicacion = ({
  idPublicacion,
  nickName,
  titulo,
  contenido,
  urlVerMas,
  imagenes,
  etiquetas,
  cantidadComentarios,
}) => {
  return (
    // Contenedor principal de la tarjeta con estilos de Bootstrap
    <div
      className="card"
      style={{
        width: "18rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "10px",
      }}
    >
      {/* Sección del nombre de usuario */}
      <div className="px-4 pt-4">
        <p className="text-muted mb-2">
          Publicado por:{" "}
          <span className="fw-medium text-dark">@{nickName}</span>
        </p>
      </div>

      {/* Carrusel de imágenes */}
      <div id={idPublicacion} className="carousel slide" data-bs-ride="carousel" >
        <div className="carousel-inner">
          {imagenes.map((image, index) => (
            // Cada elemento del carrusel
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval="3000"
              key={index}
            >
              <img
                src={image}
                className={`d-block w-100`}
                style={{ height: "200px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Indicadores en parte inferior de la imagen de cuántas imagenes hay en el post */}
        {imagenes.length > 1 && (
          <div className="carousel-indicators">
            {imagenes.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target={`#${idPublicacion}`}
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}

        {/* Controles de navegación del carrusel (anterior/siguiente) */}
        {imagenes.length > 1 && ( <>
          <button className="carousel-control-prev" type="button" data-bs-target={`#${idPublicacion}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${idPublicacion}`} data-bs-slide="next" >
            <span className="carousel-control-next-icon"aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </>)}

      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="card-body">
        <h5 className="card-titulo">{titulo}</h5>
        <p className="card-text">{contenido}</p>

        {/* Contenedor para las etiquetas (etiquetas) */}
        <div className="mt-3 mb-2 d-flex flex-wrap gap-2">
          {etiquetas.map((tag, index) => (
            <span
              key={index}
              className="badge bg-secondary text-white rounded-pill px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Contenedor para la cantidad de comentarios */}
        <div className="text-muted mb-3">
          Comentarios: <span className="fw-bold">{cantidadComentarios}</span>
        </div>
        <div class="d-grid gap-2 col-12 mx-auto">
          <a href={urlVerMas} className="btn btn-outline-success">
            Ver Más
          </a>
        </div>
      </div>
    </div>
  );
};
