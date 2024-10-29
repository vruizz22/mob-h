// Constantes de horas
// Momentos: (Dia, Tarde, Noche)
// Donde dia: (05:00 - 12:00), tarde (12:00 - 20:00), noche (20:00 - 05:00)

const horaInicioDia = '05:00';
const horaFinDia = '12:00';
const horaInicioTarde = '12:00';
const horaFinTarde = '20:00';
const horaInicioNoche = '20:00';
const horaFinNoche = '05:00';

export const Hours = {
  dia: {
    inicio: horaInicioDia,
    fin: horaFinDia,
  },
  tarde: {
    inicio: horaInicioTarde,
    fin: horaFinTarde,
  },
  noche: {
    inicio: horaInicioNoche,
    fin: horaFinNoche,
  },
};
