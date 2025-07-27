import React from 'react';
import { Pressable, StyleSheet, TextInputProps } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ButtonColors } from '@/constants/ButtonColors';
import { ThemedView } from '../ThemedView';
import { ThemedInput } from '../ThemedInput';
import { useRegistrationStore } from '@/store/useRegistrationStore';

import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';

interface InputGroupProps {
    textLabel?: string;
    inputConfig?: TextInputProps;
    onButtonClick: () => void;
    buttonLabel?: string;
    isDisabled?: boolean | undefined;
    errorMessage?: string;
    verifyMessage?: string | undefined;
    OTPtimer?: string;
}

export default function InputGroup({ 
    textLabel, 
    inputConfig, 
    onButtonClick, 
    buttonLabel, 
    isDisabled, 
    errorMessage,
    verifyMessage,
    OTPtimer,
}: InputGroupProps) {
    return (
        <>
            <ThemedView style={styles.inputContainer}>
                <ThemedText type='label'>
                    {textLabel}
                </ThemedText>

                <ThemedView style={styles.textInputWrapper}>
                    <ThemedInput 
                        {...inputConfig}
                        style={styles.textInput}
                        type={
                            // Contional approach for UI
                            isDisabled === true 
                            ? 'success'
                            : errorMessage
                                ? 'error'
                                : 'default'
                        }
                    />

                    <Pressable 
                        style={({ pressed }) => [
                            styles.inputButton,
                            !inputConfig?.value && styles.buttonDisabled,
                            pressed && inputConfig?.value && styles.buttonPressed,
                            // Disabled when counter is running in OTP
                            isDisabled === false && styles.buttonDisabled,
                            isDisabled === true && styles.buttonUpdate,
                        ]}
                        onPress={inputConfig?.value ? onButtonClick : undefined}
                        // Disabled when counter is running in OTP
                        disabled={isDisabled === false}
                    >
                        <ThemedText style={styles.inputButtonText}>
                            {buttonLabel}
                        </ThemedText>
                    </Pressable>
                </ThemedView>

                {/* VERIFY MESSAGE */}
                {verifyMessage && (
                    <SuccessMessage message={verifyMessage} />
                )}

                {/* ERROR MESSAGE */}
                {errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )}

                {/* DISPLAY TIMER */}
                {isDisabled === false &&(
                    <ThemedText type='small' style={styles.OTPTimer}> Resend in {OTPtimer} </ThemedText>
                )}
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: { marginVertical: 10 },
    textInputWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    textInput: {
        borderRadius: 100,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: 270,
    },
    inputButton: { 
        backgroundColor: ButtonColors.primary.background, 
        borderColor: ButtonColors.primary.border, 
        borderWidth: ButtonColors.primary.borderWidth,
        borderRadius: 100,
        paddingHorizontal: 14,
        paddingVertical: 10,
        width: 90,
    },
    buttonDisabled: {
        backgroundColor: ButtonColors.secondary.background, 
        borderColor: ButtonColors.secondary.border, 
        borderWidth: ButtonColors.secondary.borderWidth,
    },
    buttonUpdate: {
        backgroundColor: ButtonColors.primary.background, 
        borderColor: ButtonColors.primary.border, 
        borderWidth: ButtonColors.primary.borderWidth,
    },
    buttonPressed: {
        opacity: 0.76,
    },
    inputButtonText: {
        color: ButtonColors.secondary.text,
        textAlign: 'center',
    },

    OTPTimer: { 
        fontFamily: 'poppins-regular', 
        textAlign: 'right' 
    },
})