// =============================================
// Hook de Infinite Scroll - Schoenstatt
// =============================================

import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook para detectar cuando el usuario llega al final del scroll
 * @param {Function} onLoadMore - Función a ejecutar al llegar al final
 * @param {object} options
 * @param {boolean} options.hasMore - Si hay más páginas por cargar
 * @param {boolean} options.loading - Si ya se está cargando
 * @param {number} options.threshold - Distancia en px del fondo para disparar (default: 300)
 * @returns {object} { observerRef }
 */
const useInfiniteScroll = (onLoadMore, { hasMore = false, loading = false, threshold = 300 } = {}) => {
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, loading]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Limpiar observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Crear nuevo IntersectionObserver
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0,
    });

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect, threshold]);

  return { sentinelRef };
};

export default useInfiniteScroll;
