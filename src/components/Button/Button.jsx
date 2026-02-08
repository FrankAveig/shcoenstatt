// =============================================
// Componente Button - Schoenstatt
// =============================================

import styles from './Button.module.scss';
import { classNames } from '../../utils';

/**
 * Botón reutilizable
 * @param {object} props
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {'primary'|'secondary'|'danger'|'outline'|'ghost'} props.variant - Variante visual
 * @param {'sm'|'md'|'lg'} props.size - Tamaño del botón
 * @param {boolean} props.fullWidth - Ancho completo
 * @param {boolean} props.loading - Estado de carga
 * @param {boolean} props.disabled - Deshabilitado
 * @param {string} props.className - Clases adicionales
 * @param {Function} props.onClick - Handler de click
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...rest
}) => {
  const buttonClasses = classNames(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className={styles.spinner} />}
      <span className={loading ? styles.hiddenText : ''}>
        {children}
      </span>
    </button>
  );
};

export default Button;
