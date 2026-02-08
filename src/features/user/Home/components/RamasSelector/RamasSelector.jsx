// =============================================
// Selector horizontal de Ramas (Pinterest-style) - Schoenstatt
// =============================================

import { useRef } from 'react';
import styles from './RamasSelector.module.scss';
import { classNames } from '../../../../../utils';

/**
 * Barra horizontal de categorías/ramas estilo Pinterest
 */
const RamasSelector = ({ ramas = [], selectedId = null, onSelect }) => {
  const scrollRef = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer} ref={scrollRef}>
        <button
          className={classNames(styles.ramaTab, selectedId === null && styles.active)}
          onClick={() => onSelect(null)}
        >
          Todas
        </button>

        {ramas.map((rama) => (
          <button
            key={rama.id}
            className={classNames(styles.ramaTab, selectedId === rama.id && styles.active)}
            onClick={() => onSelect(rama.id)}
          >
            {rama.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RamasSelector;
