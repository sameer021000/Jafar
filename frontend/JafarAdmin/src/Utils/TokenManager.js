/**
 * TokenManager.js
 * Simple wrapper around localStorage for JWT handling.
 * All keys are Uppercase to follow the project's naming conventions.
 */

const TOKEN_KEY = 'JAFAR_ADMIN_TOKEN'; // Uppercase per naming policy

export const saveToken = (token) => {
  if (!token) return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const hasToken = () => {
  return Boolean(getToken());
};
