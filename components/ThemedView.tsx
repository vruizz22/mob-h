// ThemedView.tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
