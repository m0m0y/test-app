import { type TextInputProps, StyleSheet, TextInput } from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';

// export type ThemedViewProps = TextInputProps & {
//   lightColor?: string;
//   darkColor?: string;
// };

export type ThemedInputProps = TextInputProps;

export function ThemedInput({ style, ...otherProps }: ThemedInputProps) {
    const borderColor = useThemeColor({ colorProps: 'borderColor' });
    const color = useThemeColor({ colorProps: 'text' });

    return (
        <TextInput
            style={[{ borderColor, color }, style]}
            placeholderTextColor={color}
            {...otherProps}
        />
    );
}