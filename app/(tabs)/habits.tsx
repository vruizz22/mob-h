import { Alert, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HabitCard from '@/components/HabitCard';
import InputHabit from '@/components/InputHabit';
import TimerCount from '@/components/TimerCount';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

// Lista de hábitos iniciales, vacía
interface Habit {
  id: number;
  name: string;
  count: number;
}

const initialHabits: Habit[] = [];

export default function HabitScreen() {
  const [habits, setHabits] = useState(initialHabits);
  const [newHabit, setNewHabit] = useState('');
  const { colors } = useTheme(); // Obtén los colores actuales del tema

  const guardarHabitos = async () => {
    // Guardar los hábitos en AsyncStorage
    try {
      // Pasar la lista de hábitos a un string JSON
      const jsonValue = JSON.stringify(habits);
      await AsyncStorage.setItem('habits', jsonValue);
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar el hábito');
    }
  };

  useEffect(() => {
    const fetchHabits = async () => {
      const jsonValue = await AsyncStorage.getItem('habits');
      if (jsonValue !== null) {
        const habitosCargados = jsonValue != null ? JSON.parse(jsonValue) : [];
        setHabits(habitosCargados);
      }
    };
    fetchHabits();
  }, []);

  function handleHabitDeletion(habitID: number) {
    // Deja solo los hábitos cuyo nombre no sea igual al hábito que se quiere eliminar
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitID),
    );
  }

  function addHabit(name: string) {
    /* Si el input es vacio mostrar una alerta pop up
    de que no puede estar vacio */
    if (name.trim() === '') {
      Alert.alert('Error', 'El hábito no puede estar vacío');
      return;
    }
    // Agrega un nuevo hábito a la lista de hábitos
    setHabits((prevHabits) => [
      ...prevHabits,
      { id: prevHabits.length + 1, name, count: 0 }, // Inicializar count en 0
    ]);
  }

  useEffect(() => {
    guardarHabitos();
  }, [habits]);

  function handleIncrease(habitID: number) {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitID ? { ...habit, count: habit.count + 1 } : habit,
      ),
    );
  }

  function handleDecrease(habitID: number) {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitID
          ? { ...habit, count: Math.max(habit.count - 1, 0) }
          : habit,
      ),
    );
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Habit>) => (
    <HabitCard
      id={item.id}
      name={item.name}
      count={item.count} // Pasar el valor de count
      onDelete={handleHabitDeletion}
      onLongPress={drag}
      isActive={isActive}
      onIncrease={() => handleIncrease(item.id)} // Pasar la función onIncrease
      onDecrease={() => handleDecrease(item.id)} // Pasar la función onDecrease
    />
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
      >
        <ThemedView style={styles.container}>
          <TimerCount />
          <InputHabit onChangeText={setNewHabit} value={newHabit} />
          <ThemedButton
            title="Agregar Hábito"
            onPress={() => {
              addHabit(newHabit);
              setNewHabit('');
              // Cada vez que se agrega un hábito, guardar la lista de hábitos
              guardarHabitos();
            }}
          />
          <GestureHandlerRootView>
            <DraggableFlatList
              data={habits}
              onDragEnd={({ data }) => setHabits(data)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.scrollViewContent}
            />
          </GestureHandlerRootView>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
