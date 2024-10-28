import {
  TouchableOpacity,
  type TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  textType?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  title: string;
};

export function ThemedButton({
  lightColor,
  darkColor,
  textType = 'default',
  title,
  style,
  ...otherProps
}: ThemedButtonProps) {
  return (
    <TouchableOpacity style={style} {...otherProps}>
      <ThemedView
        lightColor={lightColor}
        darkColor={darkColor}
        style={styles.button}
      >
        <ThemedText
          lightColor={lightColor}
          darkColor={darkColor}
          type={textType}
          style={styles.text}
        >
          {title}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
});
