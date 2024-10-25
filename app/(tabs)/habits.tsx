import { StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import HabitCard from '@/components/HabitCard';
import InputHabit from '@/components/InputHabit';
import TimerCount from '@/components/TimerCount';
import { ThemedView } from '@/components/ThemedView';

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
      <SafeAreaView style={styles.container}>
        <TimerCount />
        {/*SafeAreaView es un contenedor que se ajusta a los márgenes del dispositivo */}
        <ThemedView style={styles.inputContainer}>
          <InputHabit onChangeText={setNewHabit} value={newHabit} />
        </ThemedView>
        <ScrollView style={styles.scrollView}>
          <Button
            title="Agregar Hábito"
            onPress={() => {
              addHabit(newHabit);
              setNewHabit('');
            }}
          />
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              id={habit.id}
              name={habit.name}
              onDelete={handleHabitDeletion}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Asegura que los elementos se alineen al principio
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  inputContainer: {
    marginBottom: 100, // Espacio entre el input y el ScrollView
  },
  scrollView: {
    flex: 1, // Ocupa el espacio restante
  },
});
