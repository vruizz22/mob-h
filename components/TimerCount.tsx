// Un timer que mostará el tiempo transcurrido desde que se abrió la aplicación en segundos.

import { Text, View, StyleSheet } from 'react-native';
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
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>Tiempo transcurrido: {time} segundos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
