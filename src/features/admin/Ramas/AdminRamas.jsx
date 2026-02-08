// =============================================
// Administración de Ramas - Schoenstatt
// =============================================

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminRamas.module.scss';
import AdminCarousel from '../Dashboard/components/AdminCarousel';
import useAuth from '../../../hooks/useAuth';
import { getRamas } from '../../../services/ramasService';
import { FiArrowLeft, FiSearch, FiChevronRight, FiPlus } from 'react-icons/fi';
import Loader from '../../../components/Loader';

// ---- Mock data (fallback si la API falla) ----
const MOCK_RAMAS = [
  {
    id: 1,
    nombre: 'Rama de Familias',
    imagen_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80',
  },
  {
    id: 2,
    nombre: 'Rama de Señoras',
    imagen_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80',
  },
  {
    id: 3,
    nombre: 'Rama de Hombres',
    imagen_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 4,
    nombre: 'Rama Juventud Femenina',
    imagen_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
  },
  {
    id: 5,
    nombre: 'Pastoral del Santuario',
    imagen_url: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80',
  },
  {
    id: 6,
    nombre: 'Virgen Peregrina',
    imagen_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 7,
    nombre: 'Coordinación Diocesana',
    imagen_url: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80',
  },
];

const AdminRamas = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [ramas, setRamas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Cargar ramas al montar
  useEffect(() => {
    const fetchRamas = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getRamas();
        // Filtrar ramas eliminadas (deleted_at !== null)
        const activeRamas = data.filter((rama) => !rama.deleted_at);
        setRamas(activeRamas);
      } catch (err) {
        console.warn('API no disponible, usando datos de demostración.', err);
        setRamas(MOCK_RAMAS);
      } finally {
        setLoading(false);
      }
    };

    fetchRamas();
  }, []);

  // Filtrar ramas por búsqueda
  const filteredRamas = useMemo(() => {
    if (!search.trim()) return ramas;
    const term = search.toLowerCase().trim();
    return ramas.filter((rama) =>
      rama.nombre.toLowerCase().includes(term)
    );
  }, [ramas, search]);

  // Nombre del usuario para el avatar
  const userName = user?.persona?.nombres || user?.name || 'Admin';
  const avatarLetter = userName.charAt(0).toUpperCase();
  const avatarImage = user?.persona?.imagen_url;

  // Volver al dashboard
  const handleBack = () => {
    navigate('/admin');
  };

  // Click en una rama → navegar a edición
  const handleRamaClick = (rama) => {
    navigate(`/admin/ramas/editar/${rama.id}`);
  };

  return (
    <div className={styles.ramas}>
      {/* ======== Carousel (solo desktop) ======== */}
      <div className={styles.carouselSide}>
        <AdminCarousel />
      </div>

      {/* ======== Panel de menú ======== */}
      <div className={styles.panelSide}>
        {/* Header */}
        <div className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={handleBack}
            aria-label="Volver"
          >
            <FiArrowLeft size={22} />
          </button>

          <h1 className={styles.title}>Ramas</h1>

          <button
            className={styles.avatarBtn}
            onClick={logout}
            title="Cerrar sesión"
          >
            {avatarImage ? (
              <img
                src={avatarImage}
                alt={userName}
                className={styles.avatarImg}
              />
            ) : (
              <span className={styles.avatarLetter}>{avatarLetter}</span>
            )}
          </button>
        </div>

        {/* Buscador */}
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} size={18} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Botón crear nueva rama */}
        <div className={styles.addBtnWrapper}>
          <button
            className={styles.addBtn}
            onClick={() => navigate('/admin/ramas/crear')}
            type="button"
          >
            <FiPlus size={18} />
            Nueva rama
          </button>
        </div>

        {/* Lista de ramas */}
        <div className={styles.ramasList}>
          {loading ? (
            <div className={styles.loaderWrapper}>
              <Loader size="md" />
            </div>
          ) : error ? (
            <div className={styles.errorWrapper}>
              <p className={styles.errorText}>{error}</p>
            </div>
          ) : filteredRamas.length === 0 ? (
            <p className={styles.noResults}>
              {search ? 'No se encontraron ramas' : 'No hay ramas disponibles'}
            </p>
          ) : (
            filteredRamas.map((rama) => (
              <button
                key={rama.id}
                className={styles.ramaItem}
                onClick={() => handleRamaClick(rama)}
              >
                <span className={styles.ramaName}>{rama.nombre}</span>
                <FiChevronRight className={styles.chevron} size={18} />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRamas;
