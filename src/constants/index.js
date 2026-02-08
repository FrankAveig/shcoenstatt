// =============================================
// Constantes globales - Schoenstatt
// =============================================

// Roles de usuario
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Keys de almacenamiento local
export const STORAGE_KEYS = {
  TOKEN: 'schoenstatt_token',
  USER: 'schoenstatt_user',
  THEME: 'schoenstatt_theme',
  COUNTRY: 'schoenstatt_country',
};

// Estados HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// Paginación por defecto
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};

// Mensajes comunes
export const MESSAGES = {
  ERROR_GENERIC: 'Ha ocurrido un error. Por favor, intenta de nuevo.',
  ERROR_NETWORK: 'Error de conexión. Verifica tu conexión a internet.',
  SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
};
