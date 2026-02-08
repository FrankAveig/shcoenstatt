// =============================================
// Servicio de Ramas - Schoenstatt
// =============================================

import axiosInstance from '../api/axiosInstance';

const RAMAS_ENDPOINT = '/admin/ramas';

/**
 * Obtener todas las ramas
 * @returns {Promise<Array>} Lista de ramas
 */
export const getRamas = async () => {
  try {
    const { data } = await axiosInstance.get(RAMAS_ENDPOINT);
    // La API devuelve { estado, noticias, data: [...] }
    return data.data || [];
  } catch (err) {
    console.warn('Error obteniendo ramas:', err);
    throw err;
  }
};

/**
 * Crear una nueva rama
 * POST /admin/ramas (FormData con nombre, imagen, banner)
 * @param {FormData} formData - Datos de la rama (nombre, imagen, banner)
 * @returns {Promise<object>} Rama creada
 */
export const createRama = async (formData) => {
  const { data } = await axiosInstance.post(RAMAS_ENDPOINT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

/**
 * Actualizar una rama existente
 * POST /admin/ramas/{id} (FormData — usa _method: PUT para compatibilidad Laravel)
 * @param {number|string} id - ID de la rama
 * @param {FormData} formData - Datos actualizados
 * @returns {Promise<object>} Rama actualizada
 */
export const updateRama = async (id, formData) => {
  formData.append('_method', 'PUT');
  const { data } = await axiosInstance.post(`${RAMAS_ENDPOINT}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

/**
 * Obtener una rama por ID
 * GET /admin/ramas/{id}
 * @param {number|string} id
 * @returns {Promise<object>} Rama
 */
export const getRamaById = async (id) => {
  const { data } = await axiosInstance.get(`${RAMAS_ENDPOINT}/${id}`);
  return data.data || data;
};

/**
 * Inactivar (eliminar) una rama
 * DELETE /admin/ramas/{id}
 * @param {number|string} id
 * @returns {Promise<object>}
 */
export const deleteRama = async (id) => {
  const { data } = await axiosInstance.delete(`${RAMAS_ENDPOINT}/${id}`);
  return data;
};
