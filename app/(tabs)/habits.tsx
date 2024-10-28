import { ScrollView, Alert, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import HabitCard from '@/components/HabitCard';
import InputHabit from '@/components/InputHabit';
import TimerCount from '@/components/TimerCount';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { useTheme } from '@/context/ThemeContext';

import { useState } from 'react';

// Lista de hábitos iniciales
const initialHabits = [
  { id: 1, name: 'Habito 1' },
  { id: 2, name: 'Habito 2' },
  { id: 3, name: 'Habito 3' },
];

export default function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [newHabit, setNewHabit] = useState('');
  const { colors } = useTheme(); // Obtén los colores actuales del tema

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
      { id: prevHabits.length + 1, name },
    ]);
  }

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
            }}
          />
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                id={habit.id}
                name={habit.name}
                onDelete={handleHabitDeletion}
              />
            ))}
          </ScrollView>
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
    flex: 1, // Para que ocupe toda la pantalla
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
