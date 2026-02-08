// =============================================
// Hook de Autenticación - Schoenstatt
// =============================================

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook personalizado para acceder al contexto de autenticación
 * @returns {object} Contexto de autenticación
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  return context;
};

export default useAuth;
