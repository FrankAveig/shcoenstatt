// =============================================
// Componente ImageUploader - Schoenstatt
// Dropzone + Cropper reutilizable
// Soporta aspect ratios configurables (1:1, 16:9, etc.)
// =============================================

import { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { createPortal } from 'react-dom';
import styles from './ImageUploader.module.scss';
import { FiUploadCloud, FiX, FiCheck, FiRotateCw, FiTrash2 } from 'react-icons/fi';

/**
 * @param {object} props
 * @param {string} props.label - Etiqueta del campo (ej: "Logo", "Portada")
 * @param {number} props.aspectRatio - Relación de aspecto del crop (ej: 1 para 1:1, 16/9 para 16:9)
 * @param {string|null} props.value - URL de la imagen actual (preview)
 * @param {function} props.onChange - Callback con el Blob resultante del crop
 * @param {string} props.placeholder - Texto placeholder en el dropzone
 * @param {string} props.aspectLabel - Etiqueta del aspecto (ej: "1:1", "16:9")
 * @param {number} props.maxSize - Tamaño máximo en bytes (default 5MB)
 */
const ImageUploader = ({
  label = 'Imagen',
  aspectRatio = 1,
  value = null,
  onChange,
  placeholder = 'Arrastra una imagen o haz clic para seleccionar',
  aspectLabel = '',
  maxSize = 5 * 1024 * 1024,
}) => {
  const [rawImage, setRawImage] = useState(null); // imagen sin recortar (data URL)
  const [showCropper, setShowCropper] = useState(false);
  const [preview, setPreview] = useState(value); // preview recortada
  const [error, setError] = useState(null);
  const cropperRef = useRef(null);

  // Sincronizar preview cuando cambia el value prop (para edición)
  useEffect(() => {
    if (value && typeof value === 'string') {
      setPreview(value);
    } else if (!value) {
      setPreview(null);
    }
  }, [value]);

  // ---- Dropzone ----
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const err = rejectedFiles[0].errors[0];
        if (err.code === 'file-too-large') {
          setError(`El archivo es muy grande. Máximo ${Math.round(maxSize / 1024 / 1024)}MB.`);
        } else if (err.code === 'file-invalid-type') {
          setError('Solo se aceptan imágenes (JPG, PNG, WEBP).');
        } else {
          setError(err.message);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          setRawImage(reader.result);
          setShowCropper(true);
        };
        reader.readAsDataURL(file);
      }
    },
    [maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize,
    multiple: false,
  });

  // ---- Cropper: confirmar recorte ----
  const handleCropConfirm = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({
      maxWidth: 1200,
      maxHeight: 1200,
      imageSmoothingQuality: 'high',
    });

    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setPreview(url);
          setShowCropper(false);
          setRawImage(null);
          onChange?.(blob);
        }
      },
      'image/jpeg',
      0.9
    );
  }, [onChange]);

  // ---- Cropper: rotar ----
  const handleRotate = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) cropper.rotate(90);
  };

  // ---- Cancelar crop ----
  const handleCropCancel = () => {
    setShowCropper(false);
    setRawImage(null);
  };

  // ---- Eliminar imagen ----
  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    setRawImage(null);
    onChange?.(null);
  };

  return (
    <div className={styles.wrapper}>
      {/* Label */}
      <label className={styles.label}>
        {label}
        {aspectLabel && (
          <span className={styles.aspectBadge}>{aspectLabel}</span>
        )}
      </label>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${
          isDragActive ? styles.dragActive : ''
        } ${preview ? styles.hasPreview : ''}`}
        style={
          preview
            ? { aspectRatio: aspectRatio >= 1.5 ? '16/9' : '1/1' }
            : { aspectRatio: aspectRatio >= 1.5 ? '16/9' : '1/1' }
        }
      >
        <input {...getInputProps()} />

        {preview ? (
          <>
            <img src={preview} alt={label} className={styles.previewImg} />
            <div className={styles.previewOverlay}>
              <span className={styles.changeText}>Cambiar imagen</span>
            </div>
            <button
              className={styles.removeBtn}
              onClick={handleRemove}
              type="button"
              aria-label="Eliminar imagen"
            >
              <FiTrash2 size={16} />
            </button>
          </>
        ) : (
          <div className={styles.placeholder}>
            <FiUploadCloud className={styles.uploadIcon} size={32} />
            <p className={styles.placeholderText}>{placeholder}</p>
            <p className={styles.placeholderHint}>
              JPG, PNG o WEBP · Máx. {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* ---- Modal Cropper ---- */}
      {showCropper &&
        rawImage &&
        createPortal(
          <div className={styles.cropperOverlay}>
            <div className={styles.cropperModal}>
              {/* Header */}
              <div className={styles.cropperHeader}>
                <h3 className={styles.cropperTitle}>Recortar imagen</h3>
                <button
                  className={styles.cropperCloseBtn}
                  onClick={handleCropCancel}
                  type="button"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Cropper */}
              <div className={styles.cropperBody}>
                <Cropper
                  ref={cropperRef}
                  src={rawImage}
                  style={{ height: '100%', width: '100%' }}
                  aspectRatio={aspectRatio}
                  viewMode={1}
                  dragMode="move"
                  guides={true}
                  scalable={true}
                  cropBoxMovable={true}
                  cropBoxResizable={true}
                  background={false}
                  responsive={true}
                  autoCropArea={0.9}
                  checkOrientation={false}
                />
              </div>

              {/* Footer */}
              <div className={styles.cropperFooter}>
                <button
                  className={styles.cropperSecondaryBtn}
                  onClick={handleRotate}
                  type="button"
                >
                  <FiRotateCw size={16} />
                  Rotar
                </button>
                <div className={styles.cropperActions}>
                  <button
                    className={styles.cropperCancelBtn}
                    onClick={handleCropCancel}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    className={styles.cropperConfirmBtn}
                    onClick={handleCropConfirm}
                    type="button"
                  >
                    <FiCheck size={16} />
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ImageUploader;
