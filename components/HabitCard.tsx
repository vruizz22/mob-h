import { StyleSheet, Button, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import { useState } from 'react';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/context/ThemeContext';

import Ionicons from '@expo/vector-icons/Ionicons';

interface HabitCardProps {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  onLongPress: () => void; // Para el gesto de arrastre
  isActive: boolean; // Para cambiar el estilo si está siendo arrastrado
}

export default function HabitCard(props: HabitCardProps) {
  const [count, setCount] = useState(0); // Estado para el contador de hábitos, inicialmente 0
  const { colors } = useTheme(); // Obtén los colores actuales del tema

  function handleIncrease() {
    // Añade 1 al contador de hábitos
    setCount((prevCount) => prevCount + 1);
  }

  function handleDecrease() {
    // Quita 1 al contador de hábitos
    setCount((prevCount) => prevCount - 1);

    /* Si el contador llega a 0, se llama a 
        la función onDelete del componente padre con el id del hábito */
    if (count === 0) {
      handleDelete();
    }
  }

  function handleDelete() {
    // Llama a la función onDelete del componente padre con el id del hábito
    props.onDelete(props.id);
  }

  const renderRightActions = () => (
    <ThemedView style={styles.delete}>
      <Ionicons name="trash-outline" size={24} color="black" />
    </ThemedView>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableOpen={handleDelete}
      >
        <ThemedView
          style={[
            styles.habitCard,
            props.isActive && {
              backgroundColor: colors.background, // Cambia el fondo si está en modo de arrastre
              opacity: 0.5,
            },
          ]}
        >
          <Pressable onLongPress={props.onLongPress}>
            <Card>
              <ThemedView style={styles.row}>
                <ThemedText style={styles.habitName}>{props.name}</ThemedText>
                <ThemedView style={styles.counterContainer}>
                  <Button onPress={handleDecrease} title="-" />
                  <ThemedText style={styles.counter}>{count}</ThemedText>
                  <Button onPress={handleIncrease} title="+" />
                </ThemedView>
              </ThemedView>
            </Card>
          </Pressable>
        </ThemedView>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  habitCard: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  activeCard: {
    backgroundColor: '#e0e0e0', // Cambia el fondo cuando está en modo de arrastre
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  counter: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  delete: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5c5c',
    width: 100,
    height: '100%',
  },
});
