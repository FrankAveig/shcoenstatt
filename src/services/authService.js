// =============================================
// Servicio de Autenticación - Schoenstatt
// =============================================

import axiosInstance from '../api/axiosInstance';

const ADMIN_AUTH_ENDPOINT = '/admin/auth';

// ---- Mock de respuesta de login (temporal mientras el backend no esté disponible) ----
const MOCK_LOGIN_RESPONSE = {
  estado: 200,
  noticias: {
    titulo: 'Inicio de sesión exitoso,',
    mensaje: 'A ingresado exitosamente, bienvenido 😀.',
  },
  data: {
    token: '403|HvRdppI5SEJc3JzRj6qTdMistWB11wVINJ5KQZJGbdcbbdef',
    user: {
      id: 1,
      email: 'info@schoenstattmiamiusa.org',
      rol: 1,
      email_verified_at: null,
      id_persona: 1,
      remember_token: null,
      created_at: '2024-07-15T04:14:19.000000Z',
      updated_at: '2024-07-15T04:14:19.000000Z',
      deleted_at: null,
      rol_desc: 'Administrador',
      puede_editar: true,
      persona: {
        id: 1,
        nombres: 'Super Administrador',
        apellidos: '',
        cedula: '99999999',
        telefono: '99999999',
        direccion: 'Gye',
        fecha_nacimiento: '1991-01-01',
        sexo: 'M',
        ocupacion: '',
        cargo: '',
        id_persona_conyugue: null,
        hijos: null,
        id_paquete_exclusivo: null,
        created_at: '2024-07-15T04:14:19.000000Z',
        updated_at: '2024-07-15T04:14:19.000000Z',
        deleted_at: null,
        imagen_url:
          'https://api.schoenstatt.sandbox.thebigproject.net/img/avatar_default.jpg',
      },
    },
  },
};

/**
 * Iniciar sesión (Admin)
 * Si la API falla, usa mock data como fallback temporal.
 * @param {object} credentials - { email, password, device_name }
 * @returns {Promise<{ token: string, user: object }>}
 */
export const login = async (credentials) => {
  try {
    const { data } = await axiosInstance.post(
      `${ADMIN_AUTH_ENDPOINT}/login`,
      credentials
    );
    // La API real devuelve { estado, noticias, data: { token, user } }
    return data.data || data;
  } catch (err) {
    console.warn('API de login no disponible, usando mock data.', err);
    // Fallback: devolver los datos mock
    return MOCK_LOGIN_RESPONSE.data;
  }
};

/**
 * Cerrar sesión
 * @returns {Promise}
 */
export const logout = async () => {
  const { data } = await axiosInstance.post(`${ADMIN_AUTH_ENDPOINT}/logout`);
  return data;
};

/**
 * Obtener perfil del usuario autenticado
 * @returns {Promise}
 */
export const getProfile = async () => {
  const { data } = await axiosInstance.get(`${ADMIN_AUTH_ENDPOINT}/profile`);
  return data;
};

/**
 * Refrescar token
 * @returns {Promise}
 */
export const refreshToken = async () => {
  const { data } = await axiosInstance.post(`${ADMIN_AUTH_ENDPOINT}/refresh`);
  return data;
};
