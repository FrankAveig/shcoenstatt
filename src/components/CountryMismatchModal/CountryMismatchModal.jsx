// =============================================
// Modal de Conflicto de País - Schoenstatt
// Estilo MercadoLibre: avisa si la URL es de otro país
// =============================================

import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styles from './CountryMismatchModal.module.scss';
import useCountry from '../../hooks/useCountry';
import { getFlagUrl } from '../../constants/countries';

const CountryMismatchModal = () => {
  const { showMismatch, mismatchData, resolveMismatch, dismissMismatch } =
    useCountry();
  const navigate = useNavigate();

  if (!showMismatch || !mismatchData) return null;

  const { urlCountry, referenceCountry } = mismatchData;

  // Ir al país del usuario (guardado/detectado) — solo navega, NO cambia localStorage
  const handleGoToReference = () => {
    resolveMismatch();
    navigate(`/${referenceCountry.code}/home`);
  };

  // Continuar en el país de la URL — solo cierra el modal, NO cambia localStorage
  const handleStayInUrl = () => {
    resolveMismatch();
  };

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Cerrar */}
        <button
          className={styles.closeBtn}
          onClick={dismissMismatch}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Banderas */}
        <div className={styles.flagsRow}>
          <img
            src={getFlagUrl(referenceCountry.code, 160)}
            alt={referenceCountry.name}
            className={styles.bigFlag}
          />
          <span className={styles.arrow}>→</span>
          <img
            src={getFlagUrl(urlCountry.code, 160)}
            alt={urlCountry.name}
            className={styles.bigFlag}
          />
        </div>

        {/* Texto descriptivo */}
        <h2 className={styles.title}>
          Estás navegando desde otra ubicación
        </h2>
        <p className={styles.description}>
          Parece que estás en{' '}
          <strong>{referenceCountry.name}</strong> pero estás ingresando a
          la página de <strong>{urlCountry.name}</strong>.
        </p>

        {/* Botones de acción */}
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleGoToReference}>
            <img src={getFlagUrl(referenceCountry.code, 40)} alt="" className={styles.btnFlag} />
            Ir a {referenceCountry.name}
          </button>
          <button className={styles.secondaryBtn} onClick={handleStayInUrl}>
            <img src={getFlagUrl(urlCountry.code, 40)} alt="" className={styles.btnFlag} />
            Continuar en {urlCountry.name}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CountryMismatchModal;
