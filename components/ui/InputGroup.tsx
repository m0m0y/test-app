import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInputProps } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ButtonColors } from '@/constants/ButtonColors';
import { ThemedInput } from '../ThemedInput';

interface InputGroupProps {
    textLabel?: string;
    textValue: string;
    inputConfig?: TextInputProps;
    onChangeText: (text: string) => void;
    onButtonClick: () => void;
    buttonLabel?: string;
    isDisabledBtn?: boolean;
    OTPtimer?: string;
}

export default function InputGroup({ textLabel, textValue, onChangeText, inputConfig, onButtonClick, buttonLabel, isDisabledBtn, OTPtimer }: InputGroupProps) {
    return (
        <View>
            <ThemedText type='label'>
                {textLabel}
            </ThemedText>

            <View style={styles.textInputWrapper}>
                <ThemedInput 
                    style={styles.textInput}
                    value={textValue}
                    onChangeText={onChangeText}
                    {...inputConfig}
                />

                <Pressable 
                    style={({ pressed }) => [
                        styles.inputButton,
                        !textValue && styles.buttonDisabled,
                        pressed && textValue && styles.buttonPressed,
                        isDisabledBtn ? styles.buttonDisabled : {}
                    ]}
                    onPress={!textValue ? undefined : onButtonClick}
                    disabled={isDisabledBtn}
                >
                    <Text style={styles.inputButtonText}>
                        {buttonLabel}
                    </Text>
                </Pressable>
            </View>

            <Text style={{ fontSize: 14, fontFamily: 'poppins-regular', textAlign: 'right' }}>{isDisabledBtn ? 'Resend in ' + OTPtimer : ''}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        gap: 5,
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
        backgroundColor: ButtonColors.primary.background, 
        borderColor: ButtonColors.primary.border, 
        borderWidth: ButtonColors.primary.borderWidth,
        borderRadius: 100,
        paddingVertical: 11,
        width: 85,
    },
    buttonDisabled: {
        backgroundColor: ButtonColors.secondary.background, 
        borderColor: ButtonColors.secondary.border, 
        borderWidth: ButtonColors.secondary.borderWidth,
    },
    buttonPressed: {
        opacity: 0.76,
    },
    inputButtonText: {
        color: ButtonColors.secondary.text,
        textAlign: 'center',
        fontFamily: 'popins-semibold',
    }
})