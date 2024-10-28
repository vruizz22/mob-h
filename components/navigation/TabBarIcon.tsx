// TabBarIcon.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { ComponentProps } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  const { colors } = useTheme(); // Obtener colores del contexto de tema

  return (
    <Ionicons
      size={28}
      color={colors.tint} // Establece el color del ícono según el tema actual
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}
