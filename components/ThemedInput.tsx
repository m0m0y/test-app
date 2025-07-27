import { type TextInputProps, TextInput, StyleSheet } from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';
import { ColorsWithOpacity, CustomColors } from "@/constants/ColorScheme";

export type ThemedInputProps = TextInputProps & {
    type?: 'default' | 'error' | 'success';
};

export function ThemedInput({ style, type = 'default', ...otherProps }: ThemedInputProps) {
    const defaultColor = useThemeColor({ colorProps: 'borderColor' });
    const color = useThemeColor({ colorProps: 'text' });
    const borderType = () => {
        switch(type) {
            case 'success':
                return styles.success
            case 'error':
                return styles.error
            default: 
                return { borderColor: defaultColor }
        }
    }

    return (
        <TextInput
            {...otherProps}
            style={[
                {color},
                style,
                styles.others,
                borderType(),
            ]}
            placeholderTextColor={color}
        />
    );
}

const styles = StyleSheet.create({
    others: {
        fontFamily: 'popins-regular',
        fontSize: 14,
        borderWidth: 1.2,
    },
    success: {
        borderColor: CustomColors.success,
        backgroundColor: ColorsWithOpacity(CustomColors.success, 0.2),
    },
    error: {
        borderColor: CustomColors.danger,
        backgroundColor: ColorsWithOpacity(CustomColors.danger, 0.2),

    },
});