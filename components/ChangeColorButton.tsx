// ChangeColorButton.tsx
import React from 'react';
import { ThemedButton } from '@/components/ThemedButton';
import { useTheme } from '@/context/ThemeContext';

export default function ChangeColorButton() {
  const { toggleColorScheme } = useTheme(); // Usar toggleColorScheme

  return <ThemedButton title="Cambiar Color" onPress={toggleColorScheme} />;
}
