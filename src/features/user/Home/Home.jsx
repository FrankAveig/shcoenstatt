// =============================================
// Página de Inicio (Home) - Pinterest-style - Schoenstatt
// =============================================

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Home.module.scss';
import RamasSelector from './components/RamasSelector';
import PublicationCard from './components/PublicationCard';
import Loader from '../../../components/Loader';
import AppDownloadBanner from '../../../components/AppDownloadBanner';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import * as homeService from '../../../services/homeService';
import { getMockHomeData, getMockRamaData } from '../../../data/mockData';

const Home = () => {
  const { countryCode } = useParams();

  // ---- State ----
  const [ramas, setRamas] = useState([]);
  const [selectedRama, setSelectedRama] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [usingMock, setUsingMock] = useState(false);

  // ---- Infinite Scroll ----
  const loadMore = useCallback(async () => {
    if (!nextPageUrl || loadingMore) return;

    setLoadingMore(true);
    try {
      const data = await homeService.getNextPage(nextPageUrl);
      const paginated = data.publicaciones || data;
      const newItems = paginated.data || [];

      setPublicaciones((prev) => [...prev, ...newItems]);
      setNextPageUrl(paginated.next_page_url || null);
    } catch (err) {
      console.error('Error cargando más publicaciones:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [nextPageUrl, loadingMore]);

  const { sentinelRef } = useInfiniteScroll(loadMore, {
    hasMore: !!nextPageUrl,
    loading: loadingMore,
  });

  // ---- Helper: procesar respuesta (API o mock) ----
  const processResponse = useCallback((data, isInitial = false) => {
    if (isInitial && data.ramas) {
      setRamas(data.ramas);
    }
    const paginated = data.publicaciones || {};
    setPublicaciones(paginated.data || []);
    setNextPageUrl(paginated.next_page_url || null);
  }, []);

  // ---- Carga inicial (se re-ejecuta cuando cambia el país) ----
  useEffect(() => {
    const fetchHome = async () => {
      // Resetear todo al cambiar de país
      setRamas([]);
      setSelectedRama(null);
      setPublicaciones([]);
      setNextPageUrl(null);
      setLoading(true);
      setError(null);

      try {
        const data = await homeService.getHome();
        processResponse(data, true);
        setUsingMock(false);
      } catch (err) {
        console.warn('API no disponible, usando datos de demostración.', err);
        // Fallback a mock data
        const mockData = getMockHomeData();
        processResponse(mockData, true);
        setUsingMock(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [countryCode]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Cambio de rama ----
  const handleRamaChange = useCallback(async (ramaId) => {
    setSelectedRama(ramaId);
    setPublicaciones([]);
    setNextPageUrl(null);
    setLoading(true);
    setError(null);

    try {
      let data;

      if (usingMock) {
        // Usar mock data
        data = ramaId === null ? getMockHomeData() : getMockRamaData(ramaId);
      } else {
        // Usar API real
        data = ramaId === null
          ? await homeService.getHome()
          : await homeService.getRamaById(ramaId);
      }

      const paginated = data.publicaciones || data;
      setPublicaciones(paginated.data || []);
      setNextPageUrl(paginated.next_page_url || null);
    } catch (err) {
      setError('No se pudieron cargar las publicaciones.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [usingMock]);

  // ---- Render ----
  return (
    <div className={styles.home}>
      {/* Banner descarga app (solo móvil) */}
      <AppDownloadBanner />

      {/* Selector de Ramas */}
      <RamasSelector
        ramas={ramas}
        selectedId={selectedRama}
        onSelect={handleRamaChange}
      />

      {/* Feed */}
      <div className={styles.feed}>
        {/* Loading */}
        {loading && (
          <div className={styles.loaderWrapper}>
            <Loader size="lg" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className={styles.stateWrapper}>
            <p className={styles.errorText}>{error}</p>
            <button className={styles.retryBtn} onClick={() => handleRamaChange(selectedRama)}>
              Reintentar
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && publicaciones.length === 0 && (
          <div className={styles.stateWrapper}>
            <span className={styles.emptyIcon}>📭</span>
            <p className={styles.emptyText}>No hay publicaciones disponibles.</p>
          </div>
        )}

        {/* Masonry Grid */}
        {!loading && publicaciones.length > 0 && (
          <div className={styles.masonry}>
            {publicaciones.map((pub) => (
              <PublicationCard key={pub.id} publicacion={pub} />
            ))}
          </div>
        )}

        {/* Infinite scroll sentinel */}
        {!loading && nextPageUrl && (
          <div ref={sentinelRef} className={styles.sentinel}>
            {loadingMore && <Loader size="sm" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
