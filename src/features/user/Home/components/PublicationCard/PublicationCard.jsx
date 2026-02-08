// =============================================
// Tarjeta de Publicación - Schoenstatt
// =============================================

import { useState } from 'react';
import styles from './PublicationCard.module.scss';
import { classNames, timeAgo } from '../../../../../utils';

/**
 * Imagen con fallback a placeholder
 */
const CardImage = ({ src, alt }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={styles.imagePlaceholder}>
        <span className={styles.placeholderIcon}>📄</span>
      </div>
    );
  }

  return (
    <img
      className={styles.image}
      src={src}
      alt={alt || 'Publicación'}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

/**
 * Tarjeta de publicación estilo app Schoenstatt
 */
const PublicationCard = ({ publicacion }) => {
  const {
    titulo,
    cabecera_url,
    fijada,
    tipo,
    fecha,
  } = publicacion;

  return (
    <article className={styles.card}>
      {/* Imagen */}
      <div className={classNames(styles.imageWrapper, fijada && styles.pinned)}>
        <CardImage src={cabecera_url} alt={titulo} />

        {/* Badge video */}
        {tipo === 'video' && (
          <span className={styles.videoBadge}>▶</span>
        )}

        {/* Indicador fijada */}
        {fijada && (
          <span className={styles.pinnedBadge}>📌</span>
        )}
      </div>

      {/* Título + Tiempo relativo */}
      <div className={styles.info}>
        {titulo && <h3 className={styles.title}>{titulo}</h3>}
        {fecha && <p className={styles.timeAgo}>{timeAgo(fecha)}</p>}
      </div>
    </article>
  );
};

export default PublicationCard;
