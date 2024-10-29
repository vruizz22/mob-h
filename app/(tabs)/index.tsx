import { Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useHour } from '@/context/HourContext';

export default function Index() {
  const [name, setName] = useState('');
  const { hourContext } = useHour();

  useEffect(() => {
    const fetchName = async () => {
      const storedName = await AsyncStorage.getItem('username');
      if (storedName) {
        setName(storedName);
      }
    };
    fetchName();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      {/* Contextualizador de la hora, entregando tres contextos: (Dia, Tarde, Noche) */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Buen {hourContext === 'dia' ? 'día' : hourContext}
          {'\n'}
          {name}!
        </ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
