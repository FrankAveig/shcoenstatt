// =============================================
// Componente Toast - Schoenstatt
// =============================================

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.scss';
import { classNames } from '../../utils';

/**
 * Toast individual
 */
const ToastItem = ({ message, type = 'info', onClose, duration = 2500 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={classNames(styles.toast, styles[type])}>
      <span className={styles.message}>{message}</span>
    </div>
  );
};

// ---- Singleton para manejar toasts desde cualquier lugar ----
let addToastFn = null;

/**
 * Función global para mostrar un toast desde cualquier parte
 * @param {string} message - Mensaje a mostrar
 * @param {'info'|'success'|'warning'|'error'} type - Tipo de toast
 */
export const showToast = (message, type = 'info') => {
  if (addToastFn) {
    addToastFn(message, type);
  }
};

/**
 * Contenedor de Toasts (montar una vez en App)
 */
const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Registrar la función global
  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
