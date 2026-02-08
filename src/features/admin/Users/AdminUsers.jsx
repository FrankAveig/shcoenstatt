// =============================================
// Gestión de Usuarios (Admin) - Schoenstatt
// =============================================

import styles from './AdminUsers.module.scss';

const AdminUsers = () => {
  return (
    <div className={styles.users}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Usuarios</h1>
      </div>

      <div className={styles.content}>
        <p className={styles.empty}>
          No hay usuarios registrados aún.
        </p>
      </div>
    </div>
  );
};

export default AdminUsers;
