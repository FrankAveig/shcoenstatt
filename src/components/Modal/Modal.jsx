// =============================================
// Componente Modal - Schoenstatt
// =============================================

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { classNames } from '../../utils';

/**
 * Modal reutilizable con portal
 * @param {object} props
 * @param {boolean} props.isOpen - Controla la visibilidad
 * @param {Function} props.onClose - Callback al cerrar
 * @param {string} props.title - Título del modal
 * @param {React.ReactNode} props.children - Contenido
 * @param {'sm'|'md'|'lg'} props.size - Tamaño del modal
 * @param {boolean} props.closeOnOverlay - Cerrar al click en overlay
 */
const Modal = ({
  isOpen,
  onClose,
  title = '',
  children,
  size = 'md',
  closeOnOverlay = true,
  className = '',
}) => {
  // Cerrar con Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={classNames(styles.modal, styles[size], className)}>
        {/* Header */}
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
