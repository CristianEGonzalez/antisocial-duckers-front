import { apiFetch } from './apiFetch';

export const getTags = async () => {
  return apiFetch('tags');
};

export const crearTag = async (tagData) => {
  return apiFetch('tags', 'POST', tagData); 
};

export const actualizaTag = async (id, tagData) => {
  return apiFetch(`tags/${id}`, 'PUT', tagData);
};

export const eliminarTag = async (id) => {
  return apiFetch(`tags/${id}`, 'DELETE');
};