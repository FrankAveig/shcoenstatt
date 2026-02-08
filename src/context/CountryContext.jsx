// =============================================
// Contexto de País - Schoenstatt
// =============================================

import { createContext, useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants';
import { getLocalStorage, setLocalStorage } from '../utils';
import {
  getCountryByCode,
  isValidCountry,
} from '../constants/countries';

export const CountryContext = createContext(null);

// ---- Mapa de zonas horarias → código de país ----
const TIMEZONE_TO_COUNTRY = {
  'America/Guayaquil': 'ec',
  'Pacific/Galapagos': 'ec',
  'America/Argentina/Buenos_Aires': 'ar',
  'America/Argentina/Cordoba': 'ar',
  'America/Argentina/Mendoza': 'ar',
  'America/Argentina/Salta': 'ar',
  'America/Argentina/Tucuman': 'ar',
  'America/Argentina/Jujuy': 'ar',
  'America/Argentina/Catamarca': 'ar',
  'America/Argentina/La_Rioja': 'ar',
  'America/Argentina/San_Juan': 'ar',
  'America/Argentina/San_Luis': 'ar',
  'America/Argentina/Ushuaia': 'ar',
  'America/Argentina/Rio_Gallegos': 'ar',
  'America/Sao_Paulo': 'br',
  'America/Fortaleza': 'br',
  'America/Recife': 'br',
  'America/Bahia': 'br',
  'America/Belem': 'br',
  'America/Manaus': 'br',
  'America/Cuiaba': 'br',
  'America/Campo_Grande': 'br',
  'America/Santiago': 'cl',
  'America/Punta_Arenas': 'cl',
  'Pacific/Easter': 'cl',
  'America/Bogota': 'co',
  'America/Costa_Rica': 'cr',
  'Europe/Berlin': 'de',
  'Europe/Madrid': 'es',
  'Atlantic/Canary': 'es',
  'Asia/Kolkata': 'in',
  'Asia/Calcutta': 'in',
  'Europe/Rome': 'it',
  'America/Mexico_City': 'mx',
  'America/Cancun': 'mx',
  'America/Monterrey': 'mx',
  'America/Merida': 'mx',
  'America/Chihuahua': 'mx',
  'America/Mazatlan': 'mx',
  'America/Hermosillo': 'mx',
  'America/Tijuana': 'mx',
  'America/Lima': 'pe',
  'Asia/Manila': 'ph',
  'Europe/Lisbon': 'pt',
  'Atlantic/Madeira': 'pt',
  'Atlantic/Azores': 'pt',
  'America/Asuncion': 'py',
  'Europe/Zurich': 'ch',
  'America/New_York': 'us',
  'America/Chicago': 'us',
  'America/Denver': 'us',
  'America/Los_Angeles': 'us',
  'America/Phoenix': 'us',
  'America/Anchorage': 'us',
  'Pacific/Honolulu': 'us',
  'America/Indiana/Indianapolis': 'us',
  'America/Detroit': 'us',
  'America/Boise': 'us',
  'America/Montevideo': 'uy',
  'Africa/Johannesburg': 'za',
  'Australia/Sydney': 'au',
  'Australia/Melbourne': 'au',
  'Australia/Perth': 'au',
  'Australia/Brisbane': 'au',
  'Australia/Adelaide': 'au',
  'Australia/Hobart': 'au',
  'Australia/Darwin': 'au',
};

/**
 * Detecta el país del usuario usando APIs nativas del navegador.
 * 1. Intenta por zona horaria (Intl API)
 * 2. Fallback por idioma del navegador (navigator.language)
 * @returns {string|null} Código de país ISO o null
 */
const detectCountryLocal = () => {
  // Intento 1: Zona horaria
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fromTimezone = TIMEZONE_TO_COUNTRY[timezone];
    if (fromTimezone && isValidCountry(fromTimezone)) {
      return fromTimezone;
    }
  } catch (err) {
    console.warn('No se pudo obtener la zona horaria:', err);
  }

  // Intento 2: Idioma del navegador (ej: "es-EC" → "ec")
  try {
    const lang = navigator.language || navigator.languages?.[0];
    if (lang && lang.includes('-')) {
      const countryPart = lang.split('-')[1]?.toLowerCase();
      if (countryPart && isValidCountry(countryPart)) {
        return countryPart;
      }
    }
  } catch (err) {
    console.warn('No se pudo obtener el idioma del navegador:', err);
  }

  return null;
};

export const CountryProvider = ({ children }) => {
  // País guardado en localStorage
  const [selectedCountry, setSelectedCountry] = useState(
    () => getLocalStorage(STORAGE_KEYS.COUNTRY) || null
  );

  // País detectado localmente (sin API externa)
  const [detectedCountry, setDetectedCountry] = useState(null);
  const [detecting, setDetecting] = useState(true);

  // País actual de la URL (se setea desde CountryGuard)
  const [urlCountry, setUrlCountry] = useState(null);

  // Control de pantalla de selección (solo cuando entran a "/" sin país)
  const [showSelector, setShowSelector] = useState(false);

  // Control de modal de mismatch
  const [showMismatch, setShowMismatch] = useState(false);
  const [mismatchData, setMismatchData] = useState(null);

  // Países de la URL para los cuales ya se descartó/resolvió el modal (sesión)
  const [dismissedUrlCountries, setDismissedUrlCountries] = useState(new Set());

  // ---- Detectar país al montar (sin API externa) ----
  useEffect(() => {
    const code = detectCountryLocal();
    if (code) {
      setDetectedCountry(code);
    }
    setDetecting(false);
  }, []);

  // ---- Verificar mismatch automáticamente ----
  // Se ejecuta cuando tenemos el país de la URL Y un país de referencia
  // (ya sea guardado en localStorage o detectado localmente).
  // No muestra el modal si ya fue descartado/resuelto para este país de URL.
  useEffect(() => {
    if (!urlCountry || showMismatch) return;

    // Si ya se descartó el modal para este país de URL, no volver a mostrar
    if (dismissedUrlCountries.has(urlCountry)) return;

    const referenceCountry = selectedCountry || detectedCountry;
    if (!referenceCountry) return;

    if (
      urlCountry !== referenceCountry &&
      isValidCountry(urlCountry)
    ) {
      setMismatchData({
        urlCountry: getCountryByCode(urlCountry),
        referenceCountry: getCountryByCode(referenceCountry),
      });
      setShowMismatch(true);
    }
  }, [urlCountry, selectedCountry, detectedCountry, dismissedUrlCountries]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Registrar el país actual de la URL (llamado desde CountryGuard)
   */
  const registerUrlCountry = useCallback((countryCode) => {
    setUrlCountry(countryCode?.toLowerCase() || null);
  }, []);

  /**
   * Seleccionar un país y guardar en localStorage
   */
  const selectCountry = useCallback((countryCode) => {
    const code = countryCode?.toLowerCase();
    setLocalStorage(STORAGE_KEYS.COUNTRY, code);
    setSelectedCountry(code);
    setShowSelector(false);
  }, []);

  /**
   * Resolver el conflicto: el usuario elige navegar a un país.
   * NO modifica localStorage (la preferencia solo la cambia el CountrySelector).
   * Marca el país de la URL actual como "resuelto" para esta sesión.
   */
  const resolveMismatch = useCallback(() => {
    if (urlCountry) {
      setDismissedUrlCountries((prev) => new Set(prev).add(urlCountry));
    }
    setShowMismatch(false);
    setMismatchData(null);
  }, [urlCountry]);

  /**
   * Descartar el modal de mismatch sin guardar nada.
   * También marca como resuelto para no volver a mostrarlo.
   */
  const dismissMismatch = useCallback(() => {
    if (urlCountry) {
      setDismissedUrlCountries((prev) => new Set(prev).add(urlCountry));
    }
    setShowMismatch(false);
    setMismatchData(null);
  }, [urlCountry]);

  /**
   * Abrir el selector de país (primera vez o manualmente)
   */
  const openSelector = useCallback(() => {
    setShowSelector(true);
  }, []);

  const value = {
    selectedCountry,
    detectedCountry,
    detecting,
    urlCountry,
    showSelector,
    showMismatch,
    mismatchData,
    selectCountry,
    registerUrlCountry,
    resolveMismatch,
    dismissMismatch,
    openSelector,
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};
