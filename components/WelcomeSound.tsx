import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

const WelcomeSound: React.FC = () => {
  useEffect(() => {
    let sound: Audio.Sound;

    const playSound = async () => {
      try {
        sound = new Audio.Sound();
        await sound.loadAsync(require('@/assets/sounds/welcome.mp3'));
        await sound.playAsync();
      } catch (error) {
        console.log('Failed to load the sound', error);
      }
    };

    playSound();

    // Limpia el sonido al desmontar el componente
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return null; // No necesita renderizar nada
};

export default WelcomeSound;
