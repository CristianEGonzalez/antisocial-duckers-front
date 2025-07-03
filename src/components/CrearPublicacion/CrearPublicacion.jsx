import React, { useState, useEffect } from 'react';
import { getTags } from '../../services/tagApi'; 
import { useNavigate } from 'react-router-dom';
import { crearPublicacion, asociarTagAPost } from '../../services/postApi'; 
import { useAuth } from '../../context/AuthContext';

function CrearPublicacion () {
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([])
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([])
  const [urlsImagenes, setUrlsImagenes] = useState([])
  const [nuevaUrlImagen, setNuevaUrlImagen] = useState('')
  const [cargandoEtiquetas, setCargandoEtiquetas] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [mensajeExito, setMensajeExito] = useState(null)

  const navigate = useNavigate()

  const { usuarioId, cargando } = useAuth()

  const MAXIMO_IMAGENES = 5

  useEffect(() => {
    const cargarEtiquetas = async () => {
      try {
        const datosEtiquetas = await getTags()
        setEtiquetasDisponibles(datosEtiquetas)
      } catch (err) {
        setError("Error al cargar las etiquetas.")
        console.error("Error al cargar etiquetas:", err)
      } finally {
        setCargandoEtiquetas(false);
      }
    };
    cargarEtiquetas()
  }, [])


  const agregarUrlImagen = () => {
    if (nuevaUrlImagen.trim() === '') {
      setError("La URL de la imagen no puede estar vacía.")
      return;
    }
    if (urlsImagenes.length >= MAXIMO_IMAGENES) {
      setError(`Solo puedes agregar un máximo de ${MAXIMO_IMAGENES} imágenes.`);
      return;
    }
    if (!nuevaUrlImagen.startsWith('http://') && !nuevaUrlImagen.startsWith('https://')) {
        setError("La URL debe comenzar con http:// o https://")
        return;
    }

    const nuevasUrls = urlsImagenes.slice()
    nuevasUrls.push(nuevaUrlImagen.trim())
    setUrlsImagenes(nuevasUrls)

    setNuevaUrlImagen('')
    setError(null)
  };


  const eliminarUrlImagen = (indexAEliminar) => {
    const nuevasUrls = []
    for (let i = 0; i < urlsImagenes.length; i++) {
      if (i !== indexAEliminar) {
        nuevasUrls.push(urlsImagenes[i])
      }
    }
    setUrlsImagenes(nuevasUrls)
  };

  const manejarSeleccionEtiqueta = (e) => {
    const { value, checked } = e.target;
    setEtiquetasSeleccionadas(prev =>
      checked ? [...prev, parseInt(value)] : prev.filter(id => id !== parseInt(value))
    )
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError(null)
    setMensajeExito(null)
    setEnviando(true)

    if (cargando) {
      setError("Cargando información de usuario. Por favor, espera.")
      setEnviando(false)
      return
    }

    if (!usuarioId) {
      setError("Debes iniciar sesión para crear una publicación.")
      setEnviando(false)
      return
    }

    if (!titulo || !contenido) {
      setError("El título y el contenido son obligatorios.")
      setEnviando(false)
      return
    }

    const datosPublicacion = {
      title: titulo,
      content: contenido,
      userId: usuarioId,
      imagenes: urlsImagenes.map(url => ({ url: url })),
    }

    try {
      const nuevaPublicacion = await crearPublicacion(datosPublicacion)
      const postId = nuevaPublicacion.id

      for (const tagId of etiquetasSeleccionadas) {
        try {
          await asociarTagAPost(postId, tagId);
          console.log(`Tag ${tagId} asociado al Post ${postId}`)
        } catch (tagError) {
          console.error(`Error al asociar el tag ${tagId} al post ${postId}:`, tagError)
          setError(`Publicación creada, pero hubo un error al asociar el tag ${tagId}.`)
        }
      }

      setMensajeExito("¡Publicación creada y elementos asociados con éxito!")

      setTitulo('')
      setContenido('')
      setEtiquetasSeleccionadas([])
      setUrlsImagenes([])
      setNuevaUrlImagen('')

      setTimeout(navigate, 2500, '/perfil')
    } catch (err) {
      setError("Error al crear la publicación: " + (err.message || "Algo salió mal."));
      console.error("Error al crear publicación:", err);
    } finally {
      setEnviando(false);
    }
  };

  const formularioDeshabilitado = enviando || cargando;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg formulario-tarjeta">
        <h2 className="card-title text-center mb-4">Crear Nueva Publicación</h2>

        <form onSubmit={manejarEnvio}>
          {/* Mensajes de error y éxito */}
          {error && (
            <p className="alert alert-danger text-center">{error}</p>
          )}
          {mensajeExito && (
            <p className="alert alert-success text-center">{mensajeExito}</p>
          )}

          {/* Mensaje de carga de usuario */}
          {cargando && (
            <p className="alert alert-info text-center">
              Cargando información de usuario... Por favor, espera.
            </p>
          )}

          {/* Campo Título */}
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={formularioDeshabilitado}
              required
            />
          </div>

          {/* Campo Contenido */}
          <div className="mb-3">
            <label htmlFor="contenido" className="form-label">
              Contenido:
            </label>
            <textarea
              id="contenido"
              className="form-control area-contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              disabled={formularioDeshabilitado}
              required
            ></textarea>
          </div>

          {/* Campo Etiquetas */}
          <div className="mb-3">
            <label className="form-label">
              Etiquetas:
            </label>
            {cargandoEtiquetas ? (
              <p className="text-muted">Cargando etiquetas...</p>
            ) : etiquetasDisponibles.length > 0 ? (
              <div className="contenedor-etiquetas">
                {etiquetasDisponibles.map(etiqueta => (
                  <div key={etiqueta.id} className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      value={etiqueta.id}
                      checked={etiquetasSeleccionadas.includes(etiqueta.id)}
                      onChange={manejarSeleccionEtiqueta}
                      disabled={formularioDeshabilitado}
                      className="form-check-input"
                      id={`tag-${etiqueta.id}`}
                    />
                    <label className="form-check-label" htmlFor={`tag-${etiqueta.id}`}>
                      {etiqueta.tag}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No hay etiquetas disponibles.</p>
            )}
          </div>

          {/* Campo Imágenes */}
          <div className="mb-3">
            <label htmlFor="nuevaUrlImagen" className="form-label">
              Imágenes (opcional, máx. {MAXIMO_IMAGENES}):
            </label>
            <div className="input-group mb-2">
              <input
                type="url"
                id="nuevaUrlImagen"
                className="form-control"
                value={nuevaUrlImagen}
                onChange={(e) => setNuevaUrlImagen(e.target.value)}
                disabled={formularioDeshabilitado || urlsImagenes.length >= MAXIMO_IMAGENES}
                placeholder="Pega la URL de la imagen aquí"
              />
              <button
                type="button"
                onClick={agregarUrlImagen}
                disabled={formularioDeshabilitado || urlsImagenes.length >= MAXIMO_IMAGENES || nuevaUrlImagen.trim() === ''}
                className="btn btn-primary boton-agregar-imagen"
              >
                Agregar
              </button>
            </div>
            {urlsImagenes.length > 0 && (
              <div className="mt-2">
                <p className="form-text text-muted mb-1">Imágenes agregadas:</p>
                <ul className="list-group list-group-flush">
                  {urlsImagenes.map((url, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span className="text-truncate">{url}</span>
                      <button
                        type="button"
                        onClick={() => eliminarUrlImagen(index)}
                        disabled={formularioDeshabilitado}
                        className="btn btn-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Botón de enviar */}
          <button
            type="submit"
            disabled={formularioDeshabilitado}
            className="btn btn-success w-100 mt-3"
          >
            {enviando ? 'Creando Publicación...' : 'Crear Publicación'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearPublicacion;