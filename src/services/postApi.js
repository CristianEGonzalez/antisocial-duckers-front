import { apiFetch } from './apiFetch';

export const obtenerPublicaciones = async () => {
  return apiFetch('posts');
};

// crear ruta en backend
export const obtenerPublicacionPorId = async (id) => {
  return apiFetch(`posts/${id}`);
};

// no se como usar este, consultar con el profesor
// export const obtenerPublicacionesPorUserId = async (userId) => {
//   return apiFetch(`posts?userId=${userId}`);
// };

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
  return apiFetch(`posts/${postId}/tags/${tagId}`, 'POST');
};

// hacerlo por parametro, no por body
export const desasociarTagDePost = async (postId, tagId) => {
  return apiFetch(`posts/${postId}/tags`, 'DELETE', { tagId });
};

export const obtenerTagsDeUnPost = async (postId) => {
  return apiFetch(`posts/${postId}/tags`);
};