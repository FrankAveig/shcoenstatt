// =============================================
// Instancia centralizada de Axios - Schoenstatt
// =============================================

import axios from 'axios';
import { HTTP_STATUS, MESSAGES, STORAGE_KEYS } from '../constants';
import { getToken, removeToken, getLocalStorage } from '../utils';
import { getCountryApiBaseUrl } from '../constants/countries';

/**
 * Instancia de Axios con configuración base.
 * La baseURL se resuelve dinámicamente en cada request
 * según el país seleccionado.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de Request
 * - Adjunta automáticamente el token de autenticación
 * - Resuelve la baseURL según el país seleccionado
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // ---- Resolver baseURL dinámicamente por país ----
    const countryCode = getLocalStorage(STORAGE_KEYS.COUNTRY);

    if (countryCode) {
      config.baseURL = getCountryApiBaseUrl(countryCode);
    }

    // ---- Adjuntar token ----
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Response
 * - Maneja errores globales (401, 403, 500, etc.)
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      // Error de red / sin conexión
      console.error(MESSAGES.ERROR_NETWORK);
      return Promise.reject({
        message: MESSAGES.ERROR_NETWORK,
        status: null,
      });
    }

    const { status } = error.response;

    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        // Token expirado o inválido
        removeToken();
        window.location.hash = '#/login';
        console.warn(MESSAGES.SESSION_EXPIRED);
        break;

      case HTTP_STATUS.FORBIDDEN:
        console.warn(MESSAGES.UNAUTHORIZED);
        break;

      case HTTP_STATUS.INTERNAL_ERROR:
        console.error('Error interno del servidor');
        break;

      default:
        break;
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
