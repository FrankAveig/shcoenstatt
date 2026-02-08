// =============================================
// Banner de descarga de App móvil - Schoenstatt
// Solo visible en dispositivos móviles (Home)
// =============================================

import { useState, useMemo } from 'react';
import styles from './AppDownloadBanner.module.scss';
import isoIcon from '../../assets/images/logo/iso.png';
import { getLocalStorage, setLocalStorage } from '../../utils';

const BANNER_DISMISSED_KEY = 'schoenstatt_app_banner_dismissed';

// URLs de las tiendas (reemplazar con las URLs reales cuando estén disponibles)
const STORE_URLS = {
  ios: 'https://apps.apple.com/ec/app/schoenstatt/id1605528871', // TODO: URL real de App Store
  android: 'https://play.google.com/store/apps/details?id=ec.schoenstatt.android&hl=es_EC&pli=1', // TODO: URL real de Play Store
};

/**
 * Detecta la plataforma móvil del usuario.
 * @returns {'ios' | 'android' | null}
 */
const detectPlatform = () => {
  const ua = navigator.userAgent || navigator.vendor || '';

  // iOS: iPhone, iPad, iPod
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    return 'ios';
  }

  // Android
  if (/android/i.test(ua)) {
    return 'android';
  }

  return null;
};

const AppDownloadBanner = () => {
  const platform = useMemo(() => detectPlatform(), []);
  const [dismissed, setDismissed] = useState(
    () => getLocalStorage(BANNER_DISMISSED_KEY) === 'true'
  );

  // Solo mostrar en plataformas móviles y si no fue descartado
  if (!platform || dismissed) return null;

  const handleDismiss = () => {
    setLocalStorage(BANNER_DISMISSED_KEY, 'true');
    setDismissed(true);
  };

  const handleDownload = () => {
    const url = platform === 'ios' ? STORE_URLS.ios : STORE_URLS.android;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const storeName = platform === 'ios' ? 'App Store' : 'Play Store';

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <img src={isoIcon} alt="Schoenstatt" className={styles.icon} />
        <div className={styles.text}>
          <p className={styles.title}>Para una mejor experiencia en móvil</p>
          <p className={styles.subtitle}>Disponible en {storeName}</p>
        </div>
        <button
          className={styles.closeBtn}
          onClick={handleDismiss}
          aria-label="Cerrar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <button className={styles.downloadBtn} onClick={handleDownload}>
        Descarga la aplicación
      </button>
    </div>
  );
};

export default AppDownloadBanner;
