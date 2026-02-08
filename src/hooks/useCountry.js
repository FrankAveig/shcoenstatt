// =============================================
// Hook useCountry - Schoenstatt
// =============================================

import { useContext } from 'react';
import { CountryContext } from '../context/CountryContext';

/**
 * Hook para acceder al contexto de país
 * @returns {object} Valores y funciones del CountryContext
 */
const useCountry = () => {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error('useCountry debe usarse dentro de un CountryProvider');
  }

  return context;
};

export default useCountry;
