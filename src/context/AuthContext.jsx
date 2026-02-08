// =============================================
// Contexto de Autenticación - Schoenstatt
// =============================================

import { createContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS, ROLES } from '../constants';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils';
import * as authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getLocalStorage(STORAGE_KEYS.TOKEN));
  const [loading, setLoading] = useState(true);

  /**
   * Verificar si hay un usuario autenticado al cargar la app.
   * Si la API no está disponible, usa el usuario guardado en localStorage.
   */
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = getLocalStorage(STORAGE_KEYS.TOKEN);

      if (savedToken) {
        try {
          const profile = await authService.getProfile();
          setUser(profile);
          setToken(savedToken);
        } catch {
          // Si la API falla, intentar cargar el usuario desde localStorage
          const savedUser = getLocalStorage(STORAGE_KEYS.USER);
          if (savedUser) {
            setUser(savedUser);
            setToken(savedToken);
          } else {
            // No hay usuario guardado → cerrar sesión
            handleLogout();
          }
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Iniciar sesión
   */
  const handleLogin = useCallback(async (credentials) => {
    const response = await authService.login(credentials);

    const { token: newToken, user: userData } = response;

    setLocalStorage(STORAGE_KEYS.TOKEN, newToken);
    setLocalStorage(STORAGE_KEYS.USER, userData);
    setToken(newToken);
    setUser(userData);

    return response;
  }, []);

  /**
   * Cerrar sesión
   */
  const handleLogout = useCallback(() => {
    removeLocalStorage(STORAGE_KEYS.TOKEN);
    removeLocalStorage(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }, []);

  /**
   * Verificar si el usuario tiene un rol específico.
   * Soporta tanto el campo 'role' (string) como 'rol' (numérico) del backend.
   */
  const hasRole = useCallback(
    (role) => {
      if (!user) return false;
      // Soporte para rol numérico del backend (1 = admin)
      if (role === ROLES.ADMIN) {
        return user.rol === 1 || user.rol_desc === 'Administrador' || user.role === ROLES.ADMIN;
      }
      return user.role === role || user.rol_desc?.toLowerCase() === role;
    },
    [user]
  );

  /**
   * Verificar si el usuario es admin
   */
  const isAdmin = useCallback(() => {
    return hasRole(ROLES.ADMIN);
  }, [hasRole]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login: handleLogin,
    logout: handleLogout,
    hasRole,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
