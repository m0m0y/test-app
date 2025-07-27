import React from 'react';
import { StyleSheet } from 'react-native';
import { ColorsWithOpacity, CustomColors } from '@/constants/ColorScheme';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

export default function ErrorMessage({ message }: { message: string}) {
    return (
        <ThemedView style={styles.errorWrapper}>
            <Ionicons 
                name="alert-circle-sharp" 
                size={18} 
                color={CustomColors.danger} 
            />
            <ThemedText 
                type='smallSemiBold' 
                style={styles.errorText}
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
    errorText: {
        color: CustomColors.danger,
    },
})