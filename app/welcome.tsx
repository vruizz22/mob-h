// app/welcome.tsx
import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { useTheme } from '@/context/ThemeContext';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  const handleStart = async () => {
    if (name.trim()) {
      await AsyncStorage.setItem('username', name); // Guarda el nombre en AsyncStorage
      router.replace({ pathname: '/(tabs)' }); // Navega a la pantalla de inicio después de guardar el nombre
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Habit Tracker</ThemedText>
      <ThemedText>Ingresa tu nombre para continuar:</ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            borderColor: colors.icon,
          },
        ]}
        placeholder="Tu nombre"
        placeholderTextColor={colors.icon}
        value={name}
        onChangeText={setName}
      />
      <ThemedButton title="Comenzar" onPress={handleStart} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    width: '80%',
    borderRadius: 8,
  },
});
