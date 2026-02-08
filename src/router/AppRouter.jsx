// =============================================
// Router Principal - Schoenstatt
// =============================================

import { HashRouter, Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

// Layouts
import MainLayout from '../components/Layout/MainLayout';
import AdminLayout from '../components/Layout/AdminLayout';

// Rutas protegidas
import PrivateRoute from './PrivateRoute';
import { ROLES } from '../constants';

// Features - Auth
import Login from '../features/auth/Login';

// Features - Usuario
import Home from '../features/user/Home';
import UserResources from '../features/user/Resources';
import CountrySelector from '../features/user/CountrySelector';
import CountryMismatchModal from '../components/CountryMismatchModal';

// Features - Admin
import AdminDashboard from '../features/admin/Dashboard';
import AdminRamas from '../features/admin/Ramas';
import RamaForm from '../features/admin/Ramas/RamaForm';

// Hooks y utilidades
import useCountry from '../hooks/useCountry';
import { isValidCountry, DEFAULT_COUNTRY } from '../constants/countries';

// ---- Componente: Redirige "/" al país guardado o abre selector ----
const CountryRootRedirect = () => {
  const { selectedCountry, openSelector } = useCountry();

  // Si tiene país guardado → redirigir directamente
  if (selectedCountry) {
    return <Navigate to={`/${selectedCountry}/home`} replace />;
  }

  // Si NO tiene país guardado → abrir el selector
  useEffect(() => {
    openSelector();
  }, [openSelector]);

  return null;
};

// ---- Componente: Guardia de país en la URL ----
const CountryGuard = () => {
  const { countryCode } = useParams();
  const { selectedCountry, registerUrlCountry } = useCountry();

  // Registrar el país de la URL en el contexto para verificación de mismatch
  useEffect(() => {
    if (countryCode) {
      registerUrlCountry(countryCode);
    }
  }, [countryCode, registerUrlCountry]);

  // Si el código no es válido, redirigir
  if (!isValidCountry(countryCode)) {
    return (
      <Navigate
        to={`/${selectedCountry || DEFAULT_COUNTRY}/home`}
        replace
      />
    );
  }

  return <Outlet />;
};

// ---- Router Principal ----
const AppRouter = () => {
  return (
    <HashRouter>
      {/* Selector de país (overlay, solo cuando se necesita) */}
      <CountrySelector />

      {/* Modal de mismatch de país */}
      <CountryMismatchModal />

      <Routes>
        {/* ========================= */}
        {/* Raíz: Redirige al país    */}
        {/* ========================= */}
        <Route path="/" element={<CountryRootRedirect />} />

        {/* ========================= */}
        {/* Rutas de Autenticación     */}
        {/* ========================= */}
        <Route path="/login" element={<Login />} />

        {/* ========================= */}
        {/* Rutas con prefijo de país  */}
        {/* /:countryCode/home, etc.   */}
        {/* ========================= */}
        <Route path="/:countryCode" element={<CountryGuard />}>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="resources" element={<UserResources />} />
          </Route>
        </Route>

        {/* ========================= */}
        {/* Rutas de Admin (globales)  */}
        {/* ========================= */}
        <Route
          element={
            <PrivateRoute requiredRole={ROLES.ADMIN}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/ramas" element={<AdminRamas />} />
          <Route path="/admin/ramas/crear" element={<RamaForm />} />
          <Route path="/admin/ramas/editar/:id" element={<RamaForm />} />
          {/* Sub-secciones del admin (se implementarán progresivamente) */}
          <Route path="/admin/oraciones" element={<AdminDashboard />} />
          <Route path="/admin/categorias" element={<AdminDashboard />} />
          <Route path="/admin/lugares" element={<AdminDashboard />} />
          <Route path="/admin/permisos" element={<AdminDashboard />} />
          <Route path="/admin/capitalarios" element={<AdminDashboard />} />
          <Route path="/admin/grupo-silencio" element={<AdminDashboard />} />
        </Route>

        {/* ========================= */}
        {/* Ruta 404 - Redirigir       */}
        {/* ========================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
