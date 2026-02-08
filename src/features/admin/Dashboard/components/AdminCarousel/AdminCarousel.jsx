// =============================================
// Carousel de imágenes - Panel Admin - Schoenstatt
// Autoplay con indicadores y transición suave
// =============================================

import { useState, useEffect, useCallback } from 'react';
import styles from './AdminCarousel.module.scss';

// Imágenes del carousel (Schoenstatt - inspiracionales)
const CAROUSEL_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=900&q=80',
    title: 'Bienvenido al Panel de Administración',
    subtitle: 'Gestiona el contenido de Schoenstatt desde aquí',
  },
  {
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80',
    title: 'Comunidad y Fe',
    subtitle: 'Conectando personas a través de la espiritualidad',
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80',
    title: 'Misión Schoenstatt',
    subtitle: 'Construyendo un mundo mejor juntos',
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    title: 'Santuarios del Mundo',
    subtitle: 'Unidos en la alianza de amor',
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 segundos

const AdminCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className={styles.track}>
        {CAROUSEL_IMAGES.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === current ? styles.active : ''
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className={styles.image}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h2 className={styles.slideTitle}>{slide.title}</h2>
              <p className={styles.slideSubtitle}>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className={styles.indicators}>
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === current ? styles.activeDot : ''
            }`}
            onClick={() => goTo(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCarousel;
