// =============================================
// Dashboard Admin - Schoenstatt
// Layout: Carousel (desktop) + Panel de menú
// =============================================

import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.scss';
import AdminCarousel from './components/AdminCarousel';
import useAuth from '../../../hooks/useAuth';
import { showToast } from '../../../components/Toast';

// React Icons
import {
  PiUsersThreeDuotone,
  PiHandsPrayingDuotone,
  PiTagDuotone,
  PiMapPinDuotone,
  PiShieldCheckDuotone,
  PiBookOpenDuotone,
  PiSpeakerSlashDuotone,
} from 'react-icons/pi';
import { FiChevronRight } from 'react-icons/fi';

// ---- Opciones del menú de administración ----
const ADMIN_MENU_ITEMS = [
  {
    id: 'ramas',
    label: 'Ramas',
    icon: PiUsersThreeDuotone,
    path: '/admin/ramas',
    available: true,
  },
  {
    id: 'oraciones',
    label: 'Oraciones',
    icon: PiHandsPrayingDuotone,
    path: '/admin/oraciones',
    available: false,
  },
  {
    id: 'categorias',
    label: 'Categorías',
    icon: PiTagDuotone,
    path: '/admin/categorias',
    available: false,
  },
  {
    id: 'lugares',
    label: 'Lugares',
    icon: PiMapPinDuotone,
    path: '/admin/lugares',
    available: false,
  },
  {
    id: 'permisos',
    label: 'Permisos',
    icon: PiShieldCheckDuotone,
    path: '/admin/permisos',
    available: false,
  },
  {
    id: 'capitalarios',
    label: 'Capitalarios',
    icon: PiBookOpenDuotone,
    path: '/admin/capitalarios',
    available: false,
  },
  {
    id: 'grupo-silencio',
    label: 'Grupo de silencio',
    icon: PiSpeakerSlashDuotone,
    path: '/admin/grupo-silencio',
    available: false,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Nombre del usuario para el avatar
  const userName = user?.persona?.nombres || user?.name || 'Admin';
  const avatarLetter = userName.charAt(0).toUpperCase();
  const avatarImage = user?.persona?.imagen_url;

  // Navegar o mostrar "Próximamente"
  const handleItemClick = (item) => {
    if (item.available) {
      navigate(item.path);
    } else {
      showToast('🚧 Próximamente', 'info');
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* ======== Carousel (solo desktop) ======== */}
      <div className={styles.carouselSide}>
        <AdminCarousel />
      </div>

      {/* ======== Panel de menú ======== */}
      <div className={styles.panelSide}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Administración</h1>

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

        {/* Lista de opciones */}
        <div className={styles.menuList}>
          {ADMIN_MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={styles.menuItem}
                onClick={() => handleItemClick(item)}
              >
                <span className={styles.menuIcon}>
                  <Icon size={22} />
                </span>
                <span className={styles.menuLabel}>{item.label}</span>
                <FiChevronRight className={styles.chevron} size={18} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
