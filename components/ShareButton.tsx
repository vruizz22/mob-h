import { Alert, Share } from 'react-native';
import React, { useState, useCallback } from 'react';
import { ThemedButton } from '@/components/ThemedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
interface Habit {
  id: number;
  name: string;
  count: number;
}

const initialHabits: Habit[] = [];

export default function ShareButton() {
  const [habits, setHabits] = useState(initialHabits);

  useFocusEffect(
    useCallback(() => {
      const fetchHabits = async () => {
        const jsonValue = await AsyncStorage.getItem('habits');
        if (jsonValue) {
          const habitosCargados = JSON.parse(jsonValue);
          setHabits(habitosCargados);
        }
      };
      fetchHabits();
    }, []),
  );

  const onShare = async () => {
    try {
      const habitList = habits.map((habit) => habit.name).join(', ');
      const message = `Mis hábitos actuales: ${habitList}`;

      const result = await Share.share({ message });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return <ThemedButton onPress={onShare} title="Compartir" />;
}
