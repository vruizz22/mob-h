// Un timer que mostará el tiempo transcurrido desde que se abrió la aplicación en segundos.

import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';

import { useState, useEffect } from 'react';

export default function TimerCount() {
  const [time, setTime] = useState(0); // Estado para el tiempo transcurrido, inicialmente 0

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ThemedView style={styles.timerContainer}>
      <ThemedText style={styles.timerText}>
        Tiempo transcurrido: {time} segundos
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
