// app/_layout.tsx
import { ThemeProvider } from '@/context/ThemeContext';
import { HourProvider } from '@/context/HourContext';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [isNameStored, setIsNameStored] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Revisa si hay un nombre guardado en AsyncStorage
  useEffect(() => {
    const checkStoredName = async () => {
      const storedName = await AsyncStorage.getItem('username');
      if (storedName) {
        setIsNameStored(true);
      }
    };
    checkStoredName();
  }, []);

  // Redirige a la pantalla correspondiente después de verificar si hay un nombre guardado
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      if (isNameStored) {
        router.replace({ pathname: '/(tabs)' }); // Redirige a las tabs si ya hay nombre
      } else {
        router.replace('/welcome'); // Redirige a welcome si no hay nombre
      }
    }
  }, [loaded, isNameStored]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <HourProvider>
        <Stack>
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </HourProvider>
    </ThemeProvider>
  );
}
