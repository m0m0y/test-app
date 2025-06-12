import { View, Text, StyleSheet, Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ButtonColors } from '@/constants/ButtonColors';

type ButtonType = keyof typeof ButtonColors; // Define available button types

interface ButtonProps {
    title: string,
    type?: ButtonType,
    onPress: () => void,
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
}

export default function CustomButton({ title, type = 'primary', onPress, buttonStyle, textStyle }: ButtonProps) {
    const { background, text, border, borderWidth } = ButtonColors[type];

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    pressed && styles.pressed,
                    {
                        backgroundColor: background, 
                        borderColor: border, 
                        borderWidth: borderWidth,
                        borderRadius: 100,
                        padding: 10,
                    }
                ]}
                onPress={onPress}>

                <ThemedText type='buttonText' style={[
                    { color: text }, // from ButtonColors
                ]}>
                    {title}
                </ThemedText>
                
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    pressed: {
        opacity: 0.76,
    },
})