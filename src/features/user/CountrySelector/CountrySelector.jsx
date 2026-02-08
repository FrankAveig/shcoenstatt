// =============================================
// Pantalla de Selección de País - Schoenstatt
// =============================================

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styles from './CountrySelector.module.scss';
import useCountry from '../../../hooks/useCountry';
import { COUNTRIES, getFlagUrl } from '../../../constants/countries';
import logoImage from '../../../assets/images/logo/logo.png';

const CountrySelector = () => {
  const { showSelector, detectedCountry, detecting, selectCountry } =
    useCountry();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [manualSelected, setManualSelected] = useState(null);

  // Auto-seleccionar detectado si el usuario no ha elegido manualmente
  const selected = manualSelected ?? detectedCountry;

  // Filtrar países por búsqueda
  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRIES;
    const term = search.toLowerCase().trim();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(term) || c.code.includes(term)
    );
  }, [search]);

  // Seleccionar y navegar directamente
  const handleSelectCountry = (code) => {
    setManualSelected(code);
    selectCountry(code);
    navigate(`/${code}/home`);
  };

  // No renderizar si no se necesita
  if (!showSelector) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* ---- Header ---- */}
        <div className={styles.header}>
          <img src={logoImage} alt="Schoenstatt" className={styles.logo} />
          <h1 className={styles.title}>Selecciona tu país</h1>
          <p className={styles.subtitle}>
            Elige el país desde donde estás accediendo para mostrarte el
            contenido correspondiente.
          </p>
        </div>

        {/* ---- Buscador ---- */}
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        {/* ---- Sugerencia de detección ---- */}
        {!detecting && detectedCountry && (
          <button
            className={styles.detectedBanner}
            onClick={() => handleSelectCountry(detectedCountry)}
          >
            <img
              src={getFlagUrl(detectedCountry, 40)}
              alt=""
              className={styles.detectedFlag}
            />
            <span>
              Parece que estás en{' '}
              <strong>
                {COUNTRIES.find((c) => c.code === detectedCountry)?.name}
              </strong>
            </span>
            <svg
              className={styles.detectedArrow}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {detecting && (
          <div className={styles.detectingBar}>
            <span className={styles.spinner} />
            <span>Detectando tu ubicación...</span>
          </div>
        )}

        {/* ---- Grid de países ---- */}
        <div className={styles.grid}>
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              id={`country-${country.code}`}
              className={`${styles.countryItem} ${
                selected === country.code ? styles.selected : ''
              }`}
              onClick={() => handleSelectCountry(country.code)}
            >
              <img
                src={getFlagUrl(country.code, 80)}
                alt={country.name}
                className={styles.flagImg}
                loading="lazy"
              />
              <span className={styles.countryName}>{country.name}</span>
              {detectedCountry === country.code && (
                <span className={styles.locationBadge}>📍</span>
              )}
              <svg
                className={styles.chevron}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}

          {filteredCountries.length === 0 && (
            <p className={styles.noResults}>No se encontraron países</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CountrySelector;
