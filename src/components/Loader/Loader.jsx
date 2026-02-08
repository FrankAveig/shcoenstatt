// =============================================
// Componente Loader - Schoenstatt
// =============================================

import styles from './Loader.module.scss';
import { classNames } from '../../utils';

/**
 * Loader / Spinner reutilizable
 * @param {object} props
 * @param {'sm'|'md'|'lg'} props.size - Tamaño
 * @param {boolean} props.fullScreen - Loader a pantalla completa
 * @param {string} props.text - Texto opcional debajo del spinner
 */
const Loader = ({ size = 'md', fullScreen = false, text = '', className = '' }) => {
  const content = (
    <div className={classNames(styles.loader, className)}>
      <div className={classNames(styles.spinner, styles[size])} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className={styles.fullScreen}>{content}</div>;
  }

  return content;
};

export default Loader;
