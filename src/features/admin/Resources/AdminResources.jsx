// =============================================
// Gestión de Recursos (Admin) - Schoenstatt
// =============================================

import styles from './AdminResources.module.scss';

const AdminResources = () => {
  return (
    <div className={styles.resources}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Recursos</h1>
      </div>

      <div className={styles.content}>
        <p className={styles.empty}>
          No hay recursos registrados aún. Comienza agregando uno nuevo.
        </p>
      </div>
    </div>
  );
};

export default AdminResources;
