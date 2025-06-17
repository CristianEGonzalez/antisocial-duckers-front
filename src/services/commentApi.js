import { apiFetch } from './apiFetch';

// crear ruta en backend
export const getComentarioDePublicacion = async (postId) => {
  return apiFetch(`posts/${postId}/comments`); 
};

export const crearComentario = async (commentData) => {
  return apiFetch('comments', 'POST', commentData);
};

export const actualizarComentario = async (id, commentData) => {
  return apiFetch(`comments/${id}`, 'PUT', commentData);
};

export const eliminarComentario = async (id) => {
  return apiFetch(`comments/${id}`, 'DELETE');
};