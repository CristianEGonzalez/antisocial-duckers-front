import { apiFetch } from './apiFetch';

export const getPublicaciones = async () => {
  return apiFetch('posts');
};

// crear ruta en backend
export const getPublicacionesById = async (id) => {
  return apiFetch(`posts/${id}`);
};

// no se como usar este, consultar con el profesor
export const getPublicacionesByUserId = async (userId) => {
  return apiFetch(`posts?userId=${userId}`);
};

export const crearPublicacion = async (postData) => {
  return apiFetch('posts', 'POST', postData);
};

export const actualizarPublicacion = async (id, postData) => {
  return apiFetch(`posts/${id}`, 'PUT', postData);
};

export const eliminarPublicacion = async (id) => {
  return apiFetch(`posts/${id}`, 'DELETE');
};

// hacerlo por parametro, no por body
export const asociarTagAPost = async (postId, tagId) => {
  return apiFetch(`posts/${postId}/tags`, 'POST', { tagId });
};

// hacerlo por parametro, no por body
export const desasociarTagDePost = async (postId, tagId) => {
  return apiFetch(`posts/${postId}/tags`, 'DELETE', { tagId });
};

export const obtenerTagsDeUnPost = async (postId) => {
  return apiFetch(`posts/${postId}/tags`);
};