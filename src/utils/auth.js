// src/utils/auth.js

// Función para obtener el token JWT del localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Función para obtener el rol del usuario del localStorage
export const getUserRole = () => {
  return localStorage.getItem('role');
};

// Función para guardar token y rol
export const saveAuthData = (token, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};

// Función para limpiar token y rol (logout)
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
