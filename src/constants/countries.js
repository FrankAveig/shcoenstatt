// =============================================
// Configuración de Países - Schoenstatt
// =============================================

/**
 * Lista de países donde Schoenstatt tiene presencia.
 * Cada país tiene su código ISO 3166-1 alpha-2 (minúscula),
 * nombre en español, y emoji de bandera.
 */
export const COUNTRIES = [
  { code: 'ar', name: 'Argentina', flag: '🇦🇷' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'br', name: 'Brasil', flag: '🇧🇷' },
  { code: 'cl', name: 'Chile', flag: '🇨🇱' },
  { code: 'co', name: 'Colombia', flag: '🇨🇴' },
  { code: 'cr', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'de', name: 'Alemania', flag: '🇩🇪' },
  { code: 'ec', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'es', name: 'España', flag: '🇪🇸' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'it', name: 'Italia', flag: '🇮🇹' },
  { code: 'mx', name: 'México', flag: '🇲🇽' },
  { code: 'pe', name: 'Perú', flag: '🇵🇪' },
  { code: 'ph', name: 'Filipinas', flag: '🇵🇭' },
  { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { code: 'py', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'ch', name: 'Suiza', flag: '🇨🇭' },
  { code: 'us', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'uy', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'za', name: 'Sudáfrica', flag: '🇿🇦' },
];

/** País por defecto si no se puede detectar */
export const DEFAULT_COUNTRY = 'ec';

/**
 * Busca un país por su código
 * @param {string} code - Código ISO (ej: 'ec')
 * @returns {object|null}
 */
export const getCountryByCode = (code) => {
  return COUNTRIES.find((c) => c.code === code?.toLowerCase()) || null;
};

/**
 * Verifica si un código de país es válido
 * @param {string} code
 * @returns {boolean}
 */
export const isValidCountry = (code) => {
  return COUNTRIES.some((c) => c.code === code?.toLowerCase());
};

/**
 * Obtiene la URL base de la API para un país.
 * Busca la variable VITE_APP_API_BASE_URL_{CODE} en .env.
 * Si no existe, usa VITE_APP_API_BASE_URL como fallback.
 * @param {string} countryCode
 * @returns {string}
 */
export const getCountryApiBaseUrl = (countryCode) => {
  const envKey = `VITE_APP_API_BASE_URL_${countryCode?.toUpperCase()}`;
  return import.meta.env[envKey] || import.meta.env.VITE_APP_API_BASE_URL;
};

/**
 * Obtiene la URL de la imagen de bandera de un país.
 * Usa flagcdn.com (CDN gratuito, sin API key).
 * @param {string} code - Código ISO del país
 * @param {number} width - Ancho deseado (px)
 * @returns {string}
 */
export const getFlagUrl = (code, width = 80) => {
  return `https://flagcdn.com/w${width}/${code?.toLowerCase()}.png`;
};
