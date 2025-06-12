import React from 'react';
import { Pressable, StyleSheet, Text, View, StyleProp, TextStyle, TextInputProps } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ButtonColors } from '@/constants/ButtonColors';
import { ThemedInput } from '../ThemedInput';

interface InputGroupProps {
    textLabel?: string,
    inputConfig?: TextInputProps,
    buttonLabel?: string,
}

export default function InputGroup({ textLabel, inputConfig, buttonLabel }: InputGroupProps) {
  return (
    <View style={{ marginVertical: 10 }}>
        <ThemedText type='label'>
            {textLabel}
        </ThemedText>

        <View style={styles.textInputWrapper}>
            <ThemedInput 
                style={styles.textInput}
                {...inputConfig}
            />

            <Pressable style={styles.inputButton} >
                <Text style={styles.inputButtonText}>
                    {buttonLabel}
                </Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textInputWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        gap: 10,
    },
    textInput: {
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontFamily: 'popins-regular',
        fontSize: 14,
        width: 270,
    },
    inputButton: { 
        backgroundColor: ButtonColors.secondary.background, 
        borderColor: ButtonColors.secondary.border, 
        borderWidth: ButtonColors.secondary.borderWidth,
        borderRadius: 100,
        paddingVertical: 11,
        width: 85,
    },
    inputButtonText: {
        color: ButtonColors.secondary.text,
        textAlign: 'center',
        fontFamily: 'popins-semibold',
    }
})