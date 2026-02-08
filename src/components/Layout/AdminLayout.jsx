// =============================================
// Layout Admin - Schoenstatt
// Layout simple: solo renderiza el contenido admin
// =============================================

import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.scss';

const AdminLayout = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
