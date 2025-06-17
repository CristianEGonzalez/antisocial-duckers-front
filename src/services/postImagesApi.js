import { apiFetch } from './apiFetch';

// dudoso esto hay que chequear como hacerlo bien

// crear ruta en backend
export const getImagesDePost = async (postId) => {
  return apiFetch(`posts/${postId}`);
};

export const crearPostImage = async (imageData) => {
  return apiFetch('archives', 'POST', imageData);
};

export const actualizarPostImage = async (imageId, imageData) => {
  return apiFetch(`archives/${imageId}`, 'PUT', imageData);
};

export const eliminarPostImage = async (imageId) => {
  return apiFetch(`archives/${imageId}`, 'DELETE');
};