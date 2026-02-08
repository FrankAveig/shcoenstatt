// =============================================
// Componente Navbar (Pinterest-style) - Schoenstatt
// =============================================

import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Navbar.module.scss';
import useAuth from '../../../hooks/useAuth';
import useCountry from '../../../hooks/useCountry';
import { showToast } from '../../Toast';
import logoImage from '../../../assets/images/logo/logo.png';
import { getCountryByCode, getFlagUrl } from '../../../constants/countries';

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { selectedCountry, openSelector } = useCountry();
  const { countryCode } = useParams();
  const navigate = useNavigate();

  const handleProximamente = () => {
    showToast('🚧 Próximamente', 'info');
  };

  // Cambiar país: navega a "/" para abrir el selector limpio
  const handleChangeCountry = () => {
    openSelector();
    navigate('/');
  };

  // Ruta base con país (usa el de la URL o el guardado)
  const activeCountry = countryCode || selectedCountry;
  const homeLink = activeCountry ? `/${activeCountry}/home` : '/';
  const currentCountryData = getCountryByCode(activeCountry);

  return (
    <nav className={styles.navbar}>
      {/* Izquierda: Hamburguesa + Logo */}
      <div className={styles.left}>
        <button className={styles.iconBtn} onClick={handleProximamente}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <Link to={homeLink} className={styles.brand}>
          <img src={logoImage} alt="Schoenstatt" className={styles.logo} />
        </Link>
      </div>

      {/* Derecha: Acciones */}
      <div className={styles.right}>
        {/* Selector de país */}
        {currentCountryData && (
          <button
            className={styles.countryBtn}
            onClick={handleChangeCountry}
            title="Cambiar país"
          >
            <img
              src={getFlagUrl(activeCountry, 40)}
              alt={currentCountryData.name}
              className={styles.countryFlagImg}
            />
          </button>
        )}

        {isAuthenticated && isAdmin() && (
          <Link to="/admin" className={styles.adminLink}>
            Admin
          </Link>
        )}

        {/* Buscar */}
        <button className={styles.iconBtn} onClick={handleProximamente}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Notificaciones */}
        <button className={styles.iconBtn} onClick={handleProximamente}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* Avatar / Usuario */}
        {isAuthenticated ? (
          <button className={styles.avatarBtn} onClick={logout} title="Cerrar sesión">
            <span className={styles.avatarText}>
              {(user?.persona?.nombres || user?.name || 'U').charAt(0).toUpperCase()}
            </span>
          </button>
        ) : (
          <Link to="/login" className={styles.avatarBtn} title="Iniciar sesión">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
