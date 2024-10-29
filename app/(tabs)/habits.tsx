import { Alert, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HabitCard from '@/components/HabitCard';
import InputHabit from '@/components/InputHabit';
import TimerCount from '@/components/TimerCount';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { useTheme } from '@/context/ThemeContext';

import { useState } from 'react';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

// Lista de hábitos iniciales, vacía
interface Habit {
  id: number;
  name: string;
}

const initialHabits: Habit[] = [];

export default function HabitScreen() {
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

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Habit>) => (
    <HabitCard
      id={item.id}
      name={item.name}
      onDelete={handleHabitDeletion}
      onLongPress={drag} // Activa el arrastre al hacer long press
      isActive={isActive} // Cambia el estilo de la tarjeta si está en modo de arrastre
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
