// =============================================
// Utilidades generales - Schoenstatt
// =============================================

import { STORAGE_KEYS } from '../constants';

/**
 * Guarda un valor en localStorage
 * @param {string} key - Clave
 * @param {*} value - Valor a guardar
 */
export const setLocalStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
};

/**
 * Obtiene un valor de localStorage
 * @param {string} key - Clave
 * @returns {*} Valor deserializado
 */
export const getLocalStorage = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : null;
  } catch (error) {
    console.error('Error al leer localStorage:', error);
    return null;
  }
};

/**
 * Elimina un valor de localStorage
 * @param {string} key - Clave
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error al eliminar de localStorage:', error);
  }
};

/**
 * Obtiene el token almacenado
 * @returns {string|null}
 */
export const getToken = () => {
  return getLocalStorage(STORAGE_KEYS.TOKEN);
};

/**
 * Guarda el token
 * @param {string} token
 */
export const setToken = (token) => {
  setLocalStorage(STORAGE_KEYS.TOKEN, token);
};

/**
 * Elimina el token
 */
export const removeToken = () => {
  removeLocalStorage(STORAGE_KEYS.TOKEN);
};

/**
 * Formatea una fecha a formato legible
 * @param {string|Date} date - Fecha
 * @param {object} options - Opciones de formato
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  return new Date(date).toLocaleDateString('es-ES', defaultOptions);
};

/**
 * Capitaliza la primera letra
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Genera clases CSS condicionales
 * @param  {...any} classes
 * @returns {string}
 */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Convierte una fecha en texto relativo ("Hace 3 semanas")
 * @param {string|Date} date - Fecha
 * @returns {string}
 */
export const timeAgo = (date) => {
  if (!date) return '';

  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return 'Hace un momento';
  if (diffMins < 60) return `Hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
  if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  if (diffDays < 7) return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  if (diffWeeks < 5) return `Hace ${diffWeeks} ${diffWeeks === 1 ? 'semana' : 'semanas'}`;
  if (diffMonths < 12) return `Hace ${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
  return `Hace ${diffYears} ${diffYears === 1 ? 'año' : 'años'}`;
};
