import { Link } from 'react-router-dom';
import './Publicacion.css'
import Etiquetas from '../Etiquetas/Etiquetas';

// Componente funcional de React para la tarjeta con carrusel
export const Publicacion = ({
  idPublicacion,
  nickName,
  titulo,
  contenido,
  urlVerMas,
  imagenes = [],
  cantidadComentarios,
}) => {
  // Validamos si hay imagenes en la publicacion
  const hasImages = imagenes && imagenes.length > 0;

  // Resumimos el contenido cuando tiene más de 50 carácteres según si hay imágenes
  const contenidoResumido = hasImages ? contenido.slice(0, 50) : contenido; 
  
  return (
    // Contenedor principal de la tarjeta con estilos de Bootstrap
    <div className="card cardformat">

      {/* Carrusel de imágenes (solo si hay imágenes) */}
      {hasImages && (
        <div id={idPublicacion} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {imagenes.map((image, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval="3000"
                key={index}
              >
                <img
                  src={image}
                  className={`d-block w-100 imgPublicacion`}
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
          {imagenes.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target={`#${idPublicacion}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#${idPublicacion}`} data-bs-slide="next" >
                <span className="carousel-control-next-icon"aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Sección del nombre de usuario */}
      <div className="px-3 pt-1">
        <p className="text-muted mb-0 publicacion-text">
          Publicado por:{" "}<span className="fw-medium text-dark">@{nickName}</span>
        </p>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="card-body d-flex flex-column">
        <h5 className="publicacion-titulo">{titulo}</h5>
        <p className="publicacion-text">
          {contenidoResumido}{hasImages && contenido.length > 50 && <span>...</span>}
        </p>

        {/* Contenedor para las etiquetas (etiquetas) */}
        <Etiquetas idPublicacion={idPublicacion}/>

        {/* Contenedor para la cantidad de comentarios */}
        <div className="text-muted mb-3 mt-auto publicacion-coment">
          Comentarios: <span className="fw-bold">{cantidadComentarios}</span>
        </div>
        <div className="d-grid gap-2 col-12 mx-auto">
          <Link to={urlVerMas} className="boton-verMas">
            Ver Más...
          </Link>
        </div>
      </div>
    </div>
  );
};