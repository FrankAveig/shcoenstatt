// =============================================
// Hook genérico para fetch de datos - Schoenstatt
// =============================================

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para realizar peticiones HTTP
 * @param {Function} fetchFn - Función que retorna una promesa
 * @param {object} options - Opciones { immediate: boolean, deps: array }
 * @returns {object} { data, loading, error, execute, reset }
 */
const useFetch = (fetchFn, options = {}) => {
  const { immediate = true, deps = [] } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err?.message || 'Ha ocurrido un error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, execute, reset };
};

export default useFetch;
