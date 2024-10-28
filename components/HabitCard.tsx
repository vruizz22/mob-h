import { StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { useState } from 'react';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import Ionicons from '@expo/vector-icons/Ionicons';

interface HabitCardProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

export default function HabitCard(props: HabitCardProps) {
  const [count, setCount] = useState(0); // Estado para el contador de hábitos, inicialmente 0

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
        <ThemedView style={styles.habitCard}>
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
