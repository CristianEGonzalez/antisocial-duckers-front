import { useEffect, useState } from 'react';
import { Publicacion } from "../Publicacion/Publicacion";
import { getPublicaciones /*, getPublicacionesById*/ } from '../../services/postApi.js';


function PublicacionesRecientes() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const publicaciones = await getPublicaciones(); 
        setPosts(publicaciones);
      } catch (err) {
        setError("Error al cargar las publicaciones: " + (err.message || 'Por favor, intenta de nuevo más tarde.'));
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []); // El array vacío asegura que esta función se ejecuta solo una vez al montar el componente

  if (loading) {
    return <div className="text-center my-4">Cargando publicaciones...</div>;
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
    <section className="bg-light p-3" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-around" }}>
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