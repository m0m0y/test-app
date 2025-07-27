import React from 'react';
import { ActivityIndicator, StyleSheet, } from 'react-native';
import { ThemedView } from './ThemedView';
import { ColorsWithOpacity, CustomColors } from '@/constants/ColorScheme';
import { ThemedText } from './ThemedText';

export default function GlobalLoading({ isLoading }: { isLoading: boolean }) {

    if (!isLoading) return null;

    return (
        <ThemedView style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={CustomColors.primary} />
            <ThemedText style={{color: CustomColors.light}} type='subtitle'>Loading...</ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: ColorsWithOpacity(CustomColors.dark, 0.70), // Transparent black
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's on top
    },
})