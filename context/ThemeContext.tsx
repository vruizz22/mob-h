// ThemeContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

type ThemeContextType = {
  colorScheme: 'light' | 'dark';
  colors: typeof Colors.light | typeof Colors.dark;
  toggleColorScheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme(); // Detecta el esquema de color del sistema
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    systemColorScheme || 'light',
  );

  // Determina los colores actuales según el esquema de color
  const colors = colorScheme === 'light' ? Colors.light : Colors.dark;

  useEffect(() => {
    if (systemColorScheme) {
      setColorScheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, colors, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
