// Pagina de configuracion de usuario
import { StyleSheet } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import ChangeColorButton from '@/components/ChangeColorButton';

export default function AjusteScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    // Elimina el nombre del almacenamiento
    await AsyncStorage.removeItem('username');
    // Redirige a la pantalla de bienvenida
    router.replace('/welcome');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Configuración</ThemedText>
      <ThemedView style={styles.optionContainer}>
        <ThemedText style={styles.optionTitle}>Cuenta</ThemedText>
        <ThemedButton title="Cerrar sesión" onPress={handleLogout} />
        <ThemedText style={styles.optionTitle}>Cambiar Color</ThemedText>
        <ChangeColorButton />
      </ThemedView>
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
  optionContainer: {
    width: '80%',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
});
