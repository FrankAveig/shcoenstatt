// =============================================
// Página de Login - Schoenstatt
// =============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Button from '../../../components/Button';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login({
        ...formData,
        device_name: 'WebAdmin',
      });
      navigate('/admin');
    } catch (err) {
      setError(err?.message || 'Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Schoenstatt</h1>
          <p className={styles.subtitle}>Panel de Administración</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Tu contraseña"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
