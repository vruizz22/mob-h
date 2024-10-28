// InputHabit.tsx
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/context/ThemeContext';

interface InputHabitProps {
  onChangeText: (text: string) => void;
  value: string;
}

const InputHabit: React.FC<InputHabitProps> = ({ onChangeText, value }) => {
  const { colors } = useTheme(); // Obtén los colores actuales del tema

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.inputHabit,
          {
            color: colors.text, // Color del texto en el input
            borderColor: colors.icon, // Color del borde del input
          },
        ]}
        onChangeText={onChangeText}
        value={value}
        placeholder="Ingresa un Hábito"
        placeholderTextColor={colors.icon} // Color del texto del placeholder
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  inputHabit: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});

export default InputHabit;
