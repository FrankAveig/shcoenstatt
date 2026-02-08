// =============================================
// Servicio de Home / Publicaciones - Schoenstatt
// =============================================

import axiosInstance from '../api/axiosInstance';

/**
 * Obtener datos iniciales del Home (ramas + publicaciones paginadas)
 * GET /api/home
 * @returns {Promise}
 */
export const getHome = async () => {
  const { data } = await axiosInstance.get('api/home');
  return data;
};

/**
 * Obtener publicaciones de una rama específica
 * GET /api/ramas/{id}
 * @param {string|number} ramaId
 * @returns {Promise}
 */
export const getRamaById = async (ramaId) => {
  const { data } = await axiosInstance.get(`/ramas/${ramaId}`);
  return data;
};

/**
 * Cargar la siguiente página de publicaciones (infinite scroll)
 * Usa la URL completa que retorna next_page_url
 * @param {string} nextPageUrl - URL completa de la siguiente página
 * @returns {Promise}
 */
export const getNextPage = async (nextPageUrl) => {
  const { data } = await axiosInstance.get(nextPageUrl);
  return data;
};
