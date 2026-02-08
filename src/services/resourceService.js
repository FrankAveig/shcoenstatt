// =============================================
// Servicio de Recursos - Schoenstatt
// =============================================

import axiosInstance from '../api/axiosInstance';

const RESOURCES_ENDPOINT = '/resources';

/**
 * Obtener todos los recursos (con paginación opcional)
 * @param {object} params - { page, limit, search, category }
 * @returns {Promise}
 */
export const getResources = async (params = {}) => {
  const { data } = await axiosInstance.get(RESOURCES_ENDPOINT, { params });
  return data;
};

/**
 * Obtener un recurso por ID
 * @param {string|number} id
 * @returns {Promise}
 */
export const getResourceById = async (id) => {
  const { data } = await axiosInstance.get(`${RESOURCES_ENDPOINT}/${id}`);
  return data;
};

/**
 * Crear un nuevo recurso
 * @param {object} resourceData
 * @returns {Promise}
 */
export const createResource = async (resourceData) => {
  const { data } = await axiosInstance.post(RESOURCES_ENDPOINT, resourceData);
  return data;
};

/**
 * Actualizar un recurso
 * @param {string|number} id
 * @param {object} resourceData
 * @returns {Promise}
 */
export const updateResource = async (id, resourceData) => {
  const { data } = await axiosInstance.put(`${RESOURCES_ENDPOINT}/${id}`, resourceData);
  return data;
};

/**
 * Eliminar un recurso
 * @param {string|number} id
 * @returns {Promise}
 */
export const deleteResource = async (id) => {
  const { data } = await axiosInstance.delete(`${RESOURCES_ENDPOINT}/${id}`);
  return data;
};
