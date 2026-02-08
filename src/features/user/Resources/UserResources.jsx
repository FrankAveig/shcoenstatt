// =============================================
// Recursos (Vista Usuario) - Schoenstatt
// =============================================

import styles from './UserResources.module.scss';

const UserResources = () => {
  return (
    <div className={styles.resources}>
      <h1 className={styles.title}>Recursos</h1>
      <p className={styles.subtitle}>
        Encuentra todos los recursos disponibles de nuestra comunidad.
      </p>

      <div className={styles.grid}>
        <p className={styles.emptyText}>
          No hay recursos disponibles por el momento.
        </p>
      </div>
    </div>
  );
};

export default UserResources;
