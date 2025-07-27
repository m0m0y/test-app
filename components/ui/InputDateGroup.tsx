import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { ThemedInput } from '../ThemedInput';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ColorsWithOpacity, CustomColors } from '@/constants/ColorScheme';

import DateFormat from '@/constants/DateFormat';

interface InputDateComponentProps {
    textLabel?: string;
    birthdate?: Date | string;
    calculateAge: (val: Date) => number; // should I declare this as number instead of void?
    showDatePicker: boolean;
    setShowDatePicker: () => void;
    handleDateChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
    errorMessage?: string;
}

export default function InputDateGroup({ 
    textLabel, 
    birthdate,
    calculateAge,
    showDatePicker,
    setShowDatePicker,
    handleDateChange,
    errorMessage,
}: InputDateComponentProps) {
    const colorScheme = useColorScheme();

    // Convert birthdate to Date object if it's a string, or use current date as fallback
    const getDateObject = (date?: Date | string): Date => {
        if (!date) return new Date(1990, 0, 1); // Handle undefined case
        if (date instanceof Date) {
            return date;
        }
        if (typeof date === 'string') {
            return new Date(date);
        }
        return new Date(); // Fallback to current date
    };

    const birthdateObj = getDateObject(birthdate);
    // const initialDateValue = getDateObject();

    return (
        <ThemedView style={styles.datePickerContainer}>
            <ThemedText type='label'>
                { textLabel }
            </ThemedText>

            <ThemedView style={styles.birthdateWrapper}>
                <ThemedView style={{ flexDirection: 'column' }}>
                    <ThemedText type='label'> 
                        Select Birth Date
                    </ThemedText>

                    <TouchableOpacity
                        style={[
                            styles.datePickerField,
                            { 
                                borderColor: colorScheme === 'dark' ?
                                Colors.dark.borderColor :
                                Colors.light.borderColor
                            }
                        ]} 
                        onPress={setShowDatePicker}
                    >
                        <ThemedText type='small'>
                            {DateFormat(birthdateObj)}
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
                
                <ThemedView style={{ flexDirection: 'column' }}>
                    <ThemedText type='label'> 
                        Age 
                    </ThemedText>

                    <ThemedInput 
                        style={styles.textInput}
                        placeholder='--'
                        value={calculateAge(birthdateObj).toString()} // convert the calculate value to string
                        editable={false}
                        type='default'
                    />
                </ThemedView>
            </ThemedView>

            {errorMessage && (
                <ThemedText type='smallSemiBold' style={styles.errorText}>
                    {errorMessage}
                </ThemedText>
            )}

            {/* DateTimePicker component */}
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={birthdateObj}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()} // Hindi pwedeng future date
                    minimumDate={new Date(1990, 0, 1)} // Minimum na 1900
                />
            )}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    datePickerContainer: { marginVertical: 10 },
    birthdateWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    textInput: {
        backgroundColor: ColorsWithOpacity(CustomColors.secondary, 0.40),
        borderRadius: 100,
        paddingHorizontal: 14,
        paddingVertical: 10,
        width: 90,
    },

    datePickerField: {
        borderRadius: 100,
        borderWidth: 1.2,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        width: 270,
    },
    ageText: {
        fontSize: 14,
        color: '#666',
    },

    errorText: {
        color: CustomColors.danger,
    },
})