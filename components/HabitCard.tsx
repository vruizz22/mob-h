import { StyleSheet, Button, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
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
  count: number; // Recibir el valor de count como prop
  onDelete: (id: number) => void;
  onLongPress: () => void;
  isActive: boolean;
  onIncrease: () => void; // Función para aumentar el contador
  onDecrease: () => void; // Función para disminuir el contador
}
export default function HabitCard(props: HabitCardProps) {
  const { colors } = useTheme();

  const renderRightActions = () => (
    <ThemedView style={styles.delete}>
      <Ionicons name="trash-outline" size={24} color="black" />
    </ThemedView>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => props.onDelete(props.id)}
      >
        <ThemedView
          style={[
            styles.habitCard,
            props.isActive && {
              backgroundColor: colors.background,
              opacity: 0.5,
            },
          ]}
        >
          <Pressable onLongPress={props.onLongPress}>
            <Card>
              <ThemedView style={styles.row}>
                <ThemedText style={styles.habitName}>{props.name}</ThemedText>
                <ThemedView style={styles.counterContainer}>
                  {/* Usar la función onDecrease */}
                  <Button onPress={props.onDecrease} title="-" />
                  {/* Mostrar el valor de count */}
                  <ThemedText style={styles.counter}>{props.count}</ThemedText>
                  {/* Usar la función onIncrease */}
                  <Button onPress={props.onIncrease} title="+" />
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
