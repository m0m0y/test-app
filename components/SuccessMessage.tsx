import React from 'react';
import { StyleSheet } from 'react-native';
import { ColorsWithOpacity, CustomColors } from '@/constants/ColorScheme';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

export default function SuccessMessage({ message }: { message: string}) {
    return (
        <ThemedView style={styles.errorWrapper}>
            <Ionicons 
                name="checkmark-done-sharp" 
                size={18} 
                color={CustomColors.success} 
            />
            <ThemedText 
                type='smallSemiBold' 
                style={styles.successText}
            >
                {message}
            </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    errorWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'none'
    },
    successText: {
        color: CustomColors.success,
    },
})