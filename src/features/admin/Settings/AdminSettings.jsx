// =============================================
// Configuración (Admin) - Schoenstatt
// =============================================

import styles from './AdminSettings.module.scss';

const AdminSettings = () => {
  return (
    <div className={styles.settings}>
      <h1 className={styles.title}>Configuración</h1>

      <div className={styles.content}>
        <p className={styles.description}>
          Configuración general del sistema.
        </p>
      </div>
    </div>
  );
};

export default AdminSettings;
