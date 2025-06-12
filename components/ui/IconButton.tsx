import { StyleSheet, TextStyle, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type IconName = keyof typeof Ionicons.glyphMap;

interface IconButtonProps {
  iconName: IconName,
  iconSize?: number,
  iconColor?: string,
  onPress: () => void,
  iconButtonStyle?: StyleProp<ViewStyle>,
  disabled?: boolean,
}

export default function IconButton(props: IconButtonProps) {
  const colorScheme = useColorScheme();

  return (
      <Pressable
        onPress={ props.onPress }
        disabled={ false }
        style={({pressed}) => [
          pressed && styles.pressed,
          props.iconButtonStyle,
      ]}
      >
        <Ionicons 
          name={ props.iconName } 
          size={ props.iconSize } 
          color={ props.iconColor } 
          style={{ color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,  }}
        />
      </Pressable>
  )
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.50,
  },
})