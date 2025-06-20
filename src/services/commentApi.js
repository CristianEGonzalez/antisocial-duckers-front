import { apiFetch } from './apiFetch';

export const obtenerComentariosDeUnaPublicacion = async (postId) => {
  return apiFetch(`comments/${postId}`);
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