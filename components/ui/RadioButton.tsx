import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { CustomColors } from '@/constants/ColorScheme';
import { ThemedView } from '../ThemedView';

interface RadioButtonProps {
    label: string;
    data: { label: string, value: string }[];
    onSelect: (val: string) => void;
    selectedValue: string; // default value
}

export default function RadioButton({ 
    label,
    data,
    onSelect,
    selectedValue
}: RadioButtonProps) {
    
    return (
        <ThemedView style={styles.radioButtonContainer}>
            <ThemedText type='label'>{label}</ThemedText>

            <ThemedView style={styles.radioButtonWrapper}> 
                {data.map((gender) => {
                    const isSelected = selectedValue === gender.value; // Check each item value

                    return(
                        <TouchableOpacity 
                            key={gender.label}
                            onPress={() => onSelect(gender.value)} 
                            style={styles.buttonWrapper}
                        >
                            {isSelected ? 
                                <Ionicons 
                                    name="radio-button-on" 
                                    size={24} 
                                    color={CustomColors.primary} 
                                /> : 
                                <Ionicons 
                                    name="radio-button-off" 
                                    size={24} 
                                    color={CustomColors.primary} 
                                /> 
                            }
                            <ThemedText>{gender.label}</ThemedText>
                        </TouchableOpacity>
                    )
                })}
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    radioButtonContainer: {
        marginVertical: 10, 
    },
    radioButtonWrapper: {
        flexDirection: 'row', 
        gap: 100,
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 5,
    },
})