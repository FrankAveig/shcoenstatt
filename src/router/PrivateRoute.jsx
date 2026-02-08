// =============================================
// Ruta Privada - Schoenstatt
// =============================================

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {object} props
 * @param {React.ReactNode} props.children - Contenido protegido
 * @param {string} props.requiredRole - Rol requerido (opcional)
 */
const PrivateRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();

  // Mostrar loader mientras se verifica la autenticación
  if (loading) {
    return <Loader fullScreen text="Verificando sesión..." />;
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar rol si es requerido
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
