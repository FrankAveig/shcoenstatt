// =============================================
// Formulario Crear/Editar Rama - Schoenstatt
// Layout: Carousel (desktop) + Panel formulario
// =============================================

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './RamaForm.module.scss';
import ImageUploader from '../../../../components/ImageUploader';
import AdminCarousel from '../../Dashboard/components/AdminCarousel';
import { FiArrowLeft } from 'react-icons/fi';
import { showToast } from '../../../../components/Toast';
import { createRama, updateRama, getRamaById } from '../../../../services/ramasService';
import Loader from '../../../../components/Loader';

// ---- Mock data para edición (fallback si la API falla) ----
const MOCK_RAMA_DATA = {
  id: 1,
  nombre: 'Rama de Familias',
  imagen_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80',
  banner_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
};

const RamaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // ---- State del formulario ----
  const [nombre, setNombre] = useState('');
  const [logoUrl, setLogoUrl] = useState(null); // URL de la imagen existente
  const [portadaUrl, setPortadaUrl] = useState(null); // URL de la imagen existente
  const [logoBlob, setLogoBlob] = useState(null); // Blob de nueva imagen
  const [portadaBlob, setPortadaBlob] = useState(null); // Blob de nueva imagen
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  // ---- Cargar datos de la rama si está en modo edición ----
  useEffect(() => {
    if (!isEditMode) return;

    const fetchRama = async () => {
      setLoading(true);
      try {
        const response = await getRamaById(id);
        // La API puede devolver { data: {...} } o directamente el objeto
        const ramaData = response.data || response;
        
        setNombre(ramaData.nombre || '');
        setLogoUrl(ramaData.imagen_url || null);
        setPortadaUrl(ramaData.banner_url || null);
      } catch (err) {
        console.warn('API no disponible, usando datos de demostración.', err);
        // Usar mock data
        setNombre(MOCK_RAMA_DATA.nombre);
        setLogoUrl(MOCK_RAMA_DATA.imagen_url);
        setPortadaUrl(MOCK_RAMA_DATA.banner_url);
      } finally {
        setLoading(false);
      }
    };

    fetchRama();
  }, [id, isEditMode]);

  // Volver atrás
  const handleBack = () => {
    navigate('/admin/ramas');
  };

  // ---- Submit ----
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!nombre.trim()) {
      showToast('Ingresa el nombre de la rama', 'warning');
      return;
    }

    setSaving(true);

    try {
      // Construir FormData
      const formData = new FormData();
      formData.append('nombre', nombre.trim());

      if (logoBlob) {
        formData.append('imagen', logoBlob, 'logo.jpg');
      }

      if (portadaBlob) {
        formData.append('banner', portadaBlob, 'portada.jpg');
      }

      if (isEditMode) {
        await updateRama(id, formData);
        showToast('Rama actualizada exitosamente', 'success');
      } else {
        await createRama(formData);
        showToast('Rama creada exitosamente', 'success');
      }

      navigate('/admin/ramas');
    } catch (err) {
      console.error(`Error ${isEditMode ? 'actualizando' : 'creando'} rama:`, err);
      showToast(`Error al ${isEditMode ? 'actualizar' : 'crear'} la rama. Intenta de nuevo.`, 'error');
    } finally {
      setSaving(false);
    }
  };

  // ---- Inactivar rama (solo en modo edición) ----
  const handleInactivate = async () => {
    // TODO: Implementar lógica de inactivación
    showToast('Funcionalidad de inactivación próximamente', 'info');
  };

  if (loading) {
    return (
      <div className={styles.layout}>
        <div className={styles.carouselSide}>
          <AdminCarousel />
        </div>
        <div className={styles.panelSide}>
          <div className={styles.loaderWrapper}>
            <Loader size="md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      {/* ======== Carousel (solo desktop) ======== */}
      <div className={styles.carouselSide}>
        <AdminCarousel />
      </div>

      {/* ======== Panel formulario ======== */}
      <div className={styles.panelSide}>
        {/* Header */}
        <div className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={handleBack}
            type="button"
            aria-label="Volver"
          >
            <FiArrowLeft size={22} />
          </button>
          <h1 className={styles.title}>Rama</h1>
        </div>

        {/* Formulario con scroll */}
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className={styles.field}>
              <input
                type="text"
                className={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* Logo (1:1) */}
            <ImageUploader
              label="Logo"
              aspectRatio={1}
              aspectLabel="1:1"
              value={logoUrl}
              onChange={(blob) => {
                setLogoBlob(blob);
                // Si se sube una nueva imagen, limpiar la URL anterior
                if (blob) setLogoUrl(null);
              }}
              placeholder="Arrastra el logo o haz clic"
            />

            {/* Portada (16:9) */}
            <ImageUploader
              label="Portada"
              aspectRatio={16 / 9}
              aspectLabel="16:9"
              value={portadaUrl}
              onChange={(blob) => {
                setPortadaBlob(blob);
                // Si se sube una nueva imagen, limpiar la URL anterior
                if (blob) setPortadaUrl(null);
              }}
              placeholder="Arrastra la portada o haz clic"
            />

            {/* Botones */}
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  className={styles.inactivateBtn}
                  onClick={handleInactivate}
                >
                  Inactivar rama
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RamaForm;
