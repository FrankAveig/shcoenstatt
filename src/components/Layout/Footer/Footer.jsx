// =============================================
// Componente Footer - Schoenstatt
// =============================================

import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {currentYear} Schoenstatt. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
