import { useState, useEffect } from "react";
import { getTags } from "../../services/tagApi";
import { obtenerPublicaciones } from "../../services/postApi";
import { Publicacion } from "../Publicacion/Publicacion";
import "./FiltroEtiquetas.css";

function FiltroDeEtiquetasYPublicaciones() {
  const [etiquetas, setEtiquetas] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
  const [idEtiquetaSeleccionada, setIdEtiquetaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datosEtiquetas = await getTags();
        setEtiquetas(datosEtiquetas);

        const datosPublicaciones = await obtenerPublicaciones();
        setPublicaciones(datosPublicaciones);
        setPublicacionesFiltradas(datosPublicaciones);
      } catch (err) {
        setError("Error al cargar los datos: " + err.message);
        console.error("Error al cargar los datos:", err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const manejarClickEtiqueta = (idDeEtiqueta) => {
    if (idEtiquetaSeleccionada === idDeEtiqueta) {
      setIdEtiquetaSeleccionada(null);
      setPublicacionesFiltradas(publicaciones);
    } else {
      setIdEtiquetaSeleccionada(idDeEtiqueta);
      const publicacionesFiltradasPorEtiqueta = publicaciones.filter(
        (publicacion) =>
          publicacion.Tags &&
          publicacion.Tags.some(
            (tagAsociado) =>
              tagAsociado.PostTag && tagAsociado.PostTag.tagId === idDeEtiqueta
          )
      );
      setPublicacionesFiltradas(publicacionesFiltradasPorEtiqueta);
    }
  };

  const obtenerNombreEtiquetaPorId = (id) => {
    const etiquetaEncontrada = etiquetas.find((etiqueta) => etiqueta.id === id);
    return etiquetaEncontrada ? etiquetaEncontrada.tag : "Desconocida";
  };

  if (cargando) {
    return (
      <div className="mensaje-carga">Cargando publicaciones y etiquetas...</div>
    );
  }

  if (error) {
    return <div className="mensaje-error">Error: {error}</div>;
  }

  return (
    <div className="contenedor-publicaciones">
      <h1 className="titulo-principal">Explorar Publicaciones</h1>

      <h2 className="seccion-filtros">Filtrar por Etiqueta:</h2>
      <div className="contenedor-etiquetas-botones">
        {etiquetas.map((etiqueta) => (
          <button
            key={etiqueta.id}
            onClick={() => manejarClickEtiqueta(etiqueta.id)}
            className={`boton-etiqueta ${
              idEtiquetaSeleccionada === etiqueta.id ? "activo" : ""
            }`}
          >
            {etiqueta.tag}
          </button>
        ))}
        {idEtiquetaSeleccionada && (
          <button
            onClick={() => manejarClickEtiqueta(idEtiquetaSeleccionada)}
            className="boton-quitar-filtro"
          >
            X Quitar Filtro
          </button>
        )}
      </div>

      <hr className="separador" />

      <h2 className="titulo-seccion-publicaciones">
        {idEtiquetaSeleccionada
          ? `Publicaciones con la etiqueta: "${obtenerNombreEtiquetaPorId(
              idEtiquetaSeleccionada
            )}"`
          : "Todas las Publicaciones"}
      </h2>

      {publicacionesFiltradas.length > 0 ? (
        <div>
          <section
            className="p-3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {publicacionesFiltradas.map((post) => (
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
        </div>
      ) : (
        <p className="mensaje-sin-publicaciones">
          No hay publicaciones para la etiqueta seleccionada.
        </p>
      )}
    </div>
  );
}

export default FiltroDeEtiquetasYPublicaciones;
