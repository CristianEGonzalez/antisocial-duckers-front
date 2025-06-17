import { apiFetch } from './apiFetch';

export const obtenerUsuarios = async () => {
  return apiFetch('users');
};

// crear ruta en backend
export const obtenerUsuarioPorId = async (id) => {
  return apiFetch(`users/${id}`);
};

export const crearUsuario = async (userData) => {
  return apiFetch('users', 'POST', userData); 
};

export const actualizarUsuario = async (id, userData) => {
  return apiFetch(`users/${id}`, 'PUT', userData);
};

export const eliminarUsuario = async (id) => {
  return apiFetch(`users/${id}`, 'DELETE');
};

// hacerlo por parametro, no por body
export const seguirUsuario = async (userId, followedId) => {
  return apiFetch(`users/${userId}/users`, 'POST', { seguidoId: followedId });
};

// hacerlo por parametro, no por body
export const dejarDeSeguirUsuario = async (userId, followedId) => {
  return apiFetch(`users/${userId}/users`, 'DELETE', { seguidoId: followedId });
};