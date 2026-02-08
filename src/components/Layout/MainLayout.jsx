// =============================================
// Layout Principal (Usuario) - Schoenstatt
// =============================================

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './MainLayout.module.scss';

/**
 * Layout principal para las páginas de usuario
 * Sin footer (Pinterest style: feed continuo)
 */
const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
