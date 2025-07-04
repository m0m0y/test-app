import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInputProps, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedInput } from '../ThemedInput';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import DateFormat from '@/constants/DateFormat';
import { ColorsWithOpacity, CustomColors } from '@/constants/ColorScheme';

interface InputDateComponentProps {
    textLabel?: string;
    onBirthdayChange?: (birthday: Date, age: string) => void;
    initialDate?: Date;
}

export default function InputDateGroup({ 
    textLabel, 
    onBirthdayChange,
    initialDate = new Date(),
}: InputDateComponentProps) {
    const colorScheme = useColorScheme();
    const [birthdate, setBirthdate] = useState<Date>(initialDate);
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    // Calculate age function
    const calculateAge = (birthdate: Date): number => {
        const today = new Date();
        const birth = new Date(birthdate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    useEffect(() => {
        const currentAge = calculateAge(birthdate);
        onBirthdayChange?.(birthdate, currentAge.toString());
    }, [birthdate, onBirthdayChange]);

    // Function para sa pag-handle ng date change
    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        const currentDate = selectedDate || birthdate;
        setShowDatePicker(false);
        setBirthdate(currentDate);
    };

    // Function para i-show ang date picker
    const showDatepicker = (): void => {
        setShowDatePicker(true);
    };

    return (
        <>
            <View style={styles.dateFormWrapper}>
                <ThemedText type='label'>
                    { textLabel }
                </ThemedText>

                <View style={styles.textInputContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <ThemedText type='defaultSemiBold'> 
                            Select Birth Date
                        </ThemedText>

                        <TouchableOpacity
                            style={[
                                styles.dateSelect,
                                { 
                                    borderColor: colorScheme === 'dark' ?
                                    Colors.dark.borderColor :
                                    Colors.light.borderColor
                                }
                            ]} 
                            onPress={showDatepicker}
                        >
                            <ThemedText type='small'>
                                {DateFormat(birthdate)}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{ flexDirection: 'column' }}>
                        <ThemedText type='defaultSemiBold'> 
                            Age 
                        </ThemedText>

                        <ThemedInput 
                            style={[
                                styles.textInput,
                                { backgroundColor: ColorsWithOpacity(CustomColors.secondary, 0.40) }
                            ]}
                            placeholder='--'
                            value={calculateAge(birthdate).toString()}
                            editable={false}
                        />
                    </View>                
                </View>
            </View>

            {/* DateTimePicker component */}
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={birthdate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()} // Hindi pwedeng future date
                    minimumDate={initialDate} // Minimum na 1900
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    dateFormWrapper: {
        marginBottom: 10,
    },
    textInputContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        gap: 5,
    },
    textInput: {
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        width: 85,
    },

    dateSelect: {
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        width: 270,
    },
    ageText: {
        fontSize: 14,
        color: '#666',
    },
})