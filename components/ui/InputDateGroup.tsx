import React, { useState } from 'react';
import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedInput } from '../ThemedInput';

interface InputDateComponentProps {
    textLabel?: string,
    dateValue: string,
    monthValue: string,
    yearValue: string,
    onChangeText: (field: 'date' | 'month' | 'year', value: string) => void,
}

export default function InputDateGroup({ 
    textLabel, 
    dateValue, 
    monthValue, 
    yearValue, 
    onChangeText, 
}: InputDateComponentProps) {

    return (
        <View style={styles.dateFormWrapper}>
            <ThemedText type='label'>
                { textLabel }
            </ThemedText>

            <View style={styles.inputFieldWrapper}>
                <View style={styles.textInputContainer}>
                    <ThemedText type='defaultSemiBold'> Day </ThemedText>
                    <ThemedInput 
                        keyboardType='numeric'
                        placeholder='DD'
                        value={dateValue}
                        onChangeText={(text: string) => onChangeText('date', text)}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <ThemedText type='defaultSemiBold'> Month </ThemedText>
                    <ThemedInput 
                        keyboardType='numeric'
                        placeholder='MM'
                        value={monthValue}
                        onChangeText={(text: string) => onChangeText('month', text)}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <ThemedText type='defaultSemiBold'> Year </ThemedText>
                    <ThemedInput 
                        keyboardType='numeric'
                        placeholder='YYYY'
                        value={yearValue}
                        onChangeText={(text: string) => onChangeText('year', text)}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <ThemedText type='defaultSemiBold'> Age </ThemedText>
                    <ThemedInput 
                        style={[
                            styles.textInput,
                            {backgroundColor: '#e0e0e0'}
                        ]}
                        placeholder='--'
                        editable={false}
                    />
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dateFormWrapper: {
        marginVertical: 10
    },
    inputFieldWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    textInputContainer: {
        flexDirection: 'column',
        paddingVertical: 5,
    },
    textInput: {
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontFamily: 'popins-regular',
        fontSize: 14,
        width: 83,
        // marginRight: 3,
    },
})