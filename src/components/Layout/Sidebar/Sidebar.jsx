// =============================================
// Componente Sidebar (Admin) - Schoenstatt
// =============================================

import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { classNames } from '../../../utils';

const adminLinks = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/resources', label: 'Recursos', icon: '📁' },
  { path: '/admin/users', label: 'Usuarios', icon: '👥' },
  { path: '/admin/settings', label: 'Configuración', icon: '⚙️' },
];

const Sidebar = ({ collapsed = false }) => {
  return (
    <aside
      className={classNames(
        styles.sidebar,
        collapsed && styles.collapsed
      )}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          {collapsed ? 'A' : 'Admin Panel'}
        </h3>
      </div>

      <nav className={styles.nav}>
        {adminLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) =>
              classNames(styles.navItem, isActive && styles.active)
            }
          >
            <span className={styles.icon}>{link.icon}</span>
            {!collapsed && <span className={styles.label}>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
