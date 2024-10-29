// Contextualizador de la hora, entregando tres contextos: (Dia, Tarde, Noche)
// Para esto recibe la constantes de horas y las compara con la hora actual
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { Hours } from '@/constants/Hours';

type HourContextType = {
  hourContext: 'Buenos Días' | 'Buenas Tardes' | 'Buenas Noches';
};

const HourContext = createContext<HourContextType | undefined>(undefined);

export const HourProvider = ({ children }: { children: ReactNode }) => {
  const [hourContext, setHourContext] = useState<
    'Buenos Días' | 'Buenas Tardes' | 'Buenas Noches'
  >('Buenos Días');

  useEffect(() => {
    const horaActual = new Date().getHours();
    const horaInicioDia = parseInt(Hours.dia.inicio.split(':')[0]);
    const horaFinDia = parseInt(Hours.dia.fin.split(':')[0]);
    const horaInicioTarde = parseInt(Hours.tarde.inicio.split(':')[0]);
    const horaFinTarde = parseInt(Hours.tarde.fin.split(':')[0]);
    const horaInicioNoche = parseInt(Hours.noche.inicio.split(':')[0]);
    const horaFinNoche = parseInt(Hours.noche.fin.split(':')[0]);

    if (
      (horaActual >= horaInicioDia && horaActual < horaFinDia) ||
      (horaActual >= horaInicioNoche && horaActual < horaFinNoche)
    ) {
      setHourContext('Buenos Días');
    } else if (horaActual >= horaInicioTarde && horaActual < horaFinTarde) {
      setHourContext('Buenas Tardes');
    } else {
      setHourContext('Buenas Noches');
    }
  }, []);

  return (
    <HourContext.Provider value={{ hourContext }}>
      {children}
    </HourContext.Provider>
  );
};

export const useHour = () => {
  const context = useContext(HourContext);
  if (!context) {
    throw new Error('useHour must be used within a HourProvider');
  }
  return context;
};
