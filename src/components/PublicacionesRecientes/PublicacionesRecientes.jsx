import { useEffect, useState } from 'react';
import { Publicacion } from "../Publicacion/Publicacion";
import { getPublicaciones /*, getPublicacionesById*/ } from '../../services/postApi.js';

const obtenerPublicacionesRecientes = (publicaciones, cantidad) => {
  if (!publicaciones || publicaciones.length === 0) {
    return [];
  }
  const publicacionesOrdenadas = [...publicaciones].sort((a, b) => {
    const datoA = new Date(a.updatedAt);
    const datoB = new Date(b.updatedAt);

    // Ordenar de forma descendente (más reciente primero)
    return datoB.getTime() - datoA.getTime();
  });
  return publicacionesOrdenadas.slice(0, cantidad);
};

function PublicacionesRecientes() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true); //Evaluar si lo dejamos o lo quitamos y también se borraría el finally
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        setCargando(true);
        const publicaciones = await getPublicaciones();
        
        // --- Definimos cuántas publicaciones recientes se mostrarán en el home ---
        const publicacionesRecientes = obtenerPublicacionesRecientes(publicaciones, 8);
        setPosts(publicacionesRecientes);
        // ---------------------------------

      } catch (err) {
        setError("Error al cargar las publicaciones: " + (err.message || 'Por favor, intenta de nuevo más tarde.'));
      } finally {
        setCargando(false);
      }
    };

    fetchPublicaciones();
  }, []); // El array vacío asegura que esta función se ejecuta solo una vez al montar el componente

  if (cargando) {
    return <div className="text-center my-4">Cargando publicaciones...</div>; //Se podría mejorar la estética del cargando
  }

  if (error) {
    return <div className="alert alert-danger text-center my-4" role="alert">
      {error}
    </div>;
  }

  if (posts.length === 0) {
    return <div className="text-center my-4">No hay publicaciones para mostrar. ¡Crea una!</div>;
  }

  return (
    <section className="bg-light p-3" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-around"}}>
      {posts.map(post => (
        <Publicacion
          key={post.id}
          idPublicacion={post.id}
          nickName={post.User.nickName}
          titulo={post.title || `Publicación #${post.id}`}
          contenido={post.content}
          imagenes={post.Post_Images.map(img => img.url)}
          etiquetas={post.Tags.map(tag => tag.tag)}
          cantidadComentarios={post.Comments.length}
          urlVerMas={`/post/${post.id}`} // getPublicacionesById(post.id)
        />
      ))}
    </section>
  );
}

export default PublicacionesRecientes;