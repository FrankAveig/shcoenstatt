// =============================================
// Mock Data - Schoenstatt
// Datos de demostración cuando la API no está disponible
// =============================================

const MOCK_RAMAS = [
  { id: 1, nombre: 'Comunidad' },
  { id: 2, nombre: 'Juventud' },
  { id: 3, nombre: 'Familias' },
  { id: 4, nombre: 'Mujeres' },
  { id: 5, nombre: 'Hombres' },
  { id: 6, nombre: 'Eventos' },
  { id: 7, nombre: 'Oraciones' },
  { id: 8, nombre: 'Formación' },
];

// Helper para generar fechas relativas
const daysAgo = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
};

const MOCK_PUBLICACIONES = [
  {
    id: 1,
    titulo: 'Saludo de Feliz Año 2026 de la Hermana María Isabel Brasero',
    cabecera_url: 'https://picsum.photos/seed/sch1/400/450',
    fijada: true,
    tipo: 'imagen',
    fecha: daysAgo(7),
  },
  {
    id: 2,
    titulo: 'Mensaje del Padre Joselo Zabala',
    cabecera_url: 'https://picsum.photos/seed/sch2/400/350',
    fijada: false,
    tipo: 'video',
    fecha: daysAgo(21),
  },
  {
    id: 3,
    titulo: 'Cruz de la Nueva Unidad',
    cabecera_url: 'https://picsum.photos/seed/sch3/400/500',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(28),
  },
  {
    id: 4,
    titulo: 'Misas de Navidad en Schoenstatt Miami',
    cabecera_url: 'https://picsum.photos/seed/sch4/400/420',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(35),
  },
  {
    id: 5,
    titulo: '1ra Feria Comunitaria de Salud y Bienestar',
    cabecera_url: 'https://picsum.photos/seed/sch5/400/380',
    fijada: true,
    tipo: 'imagen',
    fecha: daysAgo(90),
  },
  {
    id: 6,
    titulo: 'Retiro Espiritual de Cuaresma 2026',
    cabecera_url: 'https://picsum.photos/seed/sch6/400/520',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(3),
  },
  {
    id: 7,
    titulo: 'Encuentro de Jóvenes Schoenstatt',
    cabecera_url: 'https://picsum.photos/seed/sch7/400/340',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(14),
  },
  {
    id: 8,
    titulo: 'Peregrinación al Santuario de la Mater',
    cabecera_url: 'https://picsum.photos/seed/sch8/400/460',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(45),
  },
  {
    id: 9,
    titulo: 'Campaña del Rosario por la Paz',
    cabecera_url: 'https://picsum.photos/seed/sch9/400/400',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(10),
  },
  {
    id: 10,
    titulo: 'Formación para Matrimonios',
    cabecera_url: 'https://picsum.photos/seed/sch10/400/360',
    fijada: false,
    tipo: 'video',
    fecha: daysAgo(18),
  },
  {
    id: 11,
    titulo: 'Misa de Alianza - Celebración Especial',
    cabecera_url: 'https://picsum.photos/seed/sch11/400/480',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(55),
  },
  {
    id: 12,
    titulo: 'Campaña de la Virgen Peregrina',
    cabecera_url: 'https://picsum.photos/seed/sch12/400/550',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(60),
  },
  {
    id: 13,
    titulo: 'Taller de Liderazgo Juvenil',
    cabecera_url: 'https://picsum.photos/seed/sch13/400/300',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(25),
  },
  {
    id: 14,
    titulo: 'Encuentro de Padres Fundadores',
    cabecera_url: 'https://picsum.photos/seed/sch14/400/440',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(70),
  },
  {
    id: 15,
    titulo: 'Novena de Navidad en Comunidad',
    cabecera_url: 'https://picsum.photos/seed/sch15/400/500',
    fijada: false,
    tipo: 'video',
    fecha: daysAgo(40),
  },
  {
    id: 16,
    titulo: 'Jornada de Voluntariado Comunitario',
    cabecera_url: 'https://picsum.photos/seed/sch16/400/380',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(80),
  },
  {
    id: 17,
    titulo: 'Concierto de Adviento para la Comunidad',
    cabecera_url: 'https://picsum.photos/seed/sch17/400/460',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(95),
  },
  {
    id: 18,
    titulo: 'Oración del Santuario - Transmisión en Vivo',
    cabecera_url: 'https://picsum.photos/seed/sch18/400/340',
    fijada: false,
    tipo: 'video',
    fecha: daysAgo(5),
  },
  {
    id: 19,
    titulo: 'Celebración del 18 de Octubre',
    cabecera_url: 'https://picsum.photos/seed/sch19/400/520',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(110),
  },
  {
    id: 20,
    titulo: 'Charla sobre Espiritualidad Kentenijiana',
    cabecera_url: 'https://picsum.photos/seed/sch20/400/400',
    fijada: false,
    tipo: 'imagen',
    fecha: daysAgo(15),
  },
];

/**
 * Retorna datos mock con la misma estructura que la API
 */
export const getMockHomeData = () => ({
  ramas: MOCK_RAMAS,
  publicaciones: {
    data: MOCK_PUBLICACIONES,
    current_page: 1,
    next_page_url: null,
    last_page: 1,
    per_page: 20,
    total: MOCK_PUBLICACIONES.length,
  },
});

export const getMockRamaData = (ramaId) => {
  const filtered = MOCK_PUBLICACIONES.filter((_, i) => (i + ramaId) % 3 !== 0);
  return {
    publicaciones: {
      data: filtered,
      current_page: 1,
      next_page_url: null,
      last_page: 1,
      per_page: 20,
      total: filtered.length,
    },
  };
};
