import React, { useRef, useEffect, useState, } from 'react';
import { StyleSheet, TextInput, View, NativeSyntheticEvent, TextInputKeyPressEventData, Keyboard } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CustomColors } from "@/constants/ColorScheme";
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomSheetModal, BottomSheetView, } from '@gorhom/bottom-sheet';
import { ButtonColors } from '@/constants/ButtonColors';

import CustomButton from '@/components/ui/Button';

interface OTPModalProps {
    visibility: boolean;
    onClose: () => void;
    length?: number;
    onComplete?: (otp: string) => void;
    onChangeText?: (otp: string) => void;
    resendOTP: () => void;
    timer: string;
    isDisabled: boolean;
}

export default function OTPModal({ visibility, onClose, length=6, onComplete, onChangeText, resendOTP, timer, isDisabled}: OTPModalProps) {
    const colorScheme = useColorScheme();
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const [activeInput, setActiveInput] = useState<number>(0);
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    // Trigger the bottom sheet modal using visibility props
    useEffect(() => {
        if (visibility && bottomSheetRef.current) {
            bottomSheetRef.current.present();
        } else if (!visibility && bottomSheetRef.current) {
            bottomSheetRef.current.dismiss();
        }
    }, [visibility]);

    // Use for force to adjust size of BottomSheet
    useEffect(() => {
        const keyboardShowListner = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
                bottomSheetRef.current?.snapToIndex(1); // Expand
            }
        );

        const keyboardHideListner = Keyboard.addListener (
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
                bottomSheetRef.current?.snapToIndex(0); // Collapse
            }
        );

        return () => {
            keyboardShowListner?.remove();
            keyboardHideListner?.remove();
        };
    }, []);

    const handleChange = (text: string, index: number): void => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Call onChangeText callback
        if (onChangeText) {
            onChangeText(newOtp.join(''));
        }

        // Move to next input if current field is filled
        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
            setActiveInput(index + 1);
        }

        // Call onComplete when all fields are filled
        if (newOtp.every(digit => digit !== '') && onComplete) {
            onComplete(newOtp.join(''));
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>, 
        index: number
    ): void => {
        if (e.nativeEvent.key === 'Backspace') {
            // If current field has content, let onChangeText handle the deletion
            if (otp[index]) {
                return;
            }
        
            // If current field is empty and not the first field, go to previous
            if (index > 0) {
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
                setActiveInput(index - 1);
                
                if (onChangeText) {
                    onChangeText(newOtp.join(''));
                }
            }
        }
    };

    const handleFocus = (index: number): void => {
        setActiveInput(index);
    };

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['50%']} 
            backgroundStyle={{ 
                backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, 
            }}
            onDismiss={onClose}
            backdropComponent={({ style }) => (
                <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]} />
            )}
            enablePanDownToClose={true}
            enableDismissOnClose={true}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
        >
            <BottomSheetView style={{ flex: 1, }}>
                <ThemedView style={styles.modalContainer}>
                    <Ionicons 
                        name="mail-open" 
                        size={100} 
                        color={CustomColors.primary}
                        style={{
                            textAlign: 'center',
                            alignSelf: 'center',
                            marginBottom: 15,
                            paddingBottom: 8,
                            borderBottomWidth: 1,
                            width: '89%',
                            borderColor: '#6c757d2a',
                        }}
                    />
                   
                    <ThemedText type="subtitle" style={{ textAlign: 'center', }} >
                        Verify Account
                    </ThemedText>

                    <ThemedText type="description" style={{ textAlign:'center' }} >
                        Please enter verification code we sent to your email.
                    </ThemedText>

                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={[
                                    styles.otpInput,
                                    activeInput === index && styles.activeInput,
                                ]}
                                value={digit}
                                onChangeText={(text: string) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                onFocus={() => handleFocus(index)}
                                keyboardType="default"
                                autoCapitalize="none"
                                maxLength={1}
                                selectTextOnFocus
                                autoComplete="sms-otp"
                                textContentType="oneTimeCode"
                            />
                        ))}
                    </View>
                </ThemedView>

                <ThemedView style={styles.buttonContainer}>
                     <CustomButton
                        title={isDisabled ? 'Resend ' + timer : 'Resend OTP'}
                        onPress={resendOTP}
                        buttonStyle={[
                            styles.button, 
                            isDisabled ? styles.buttonDisabled : {}
                        ]}
                        textStyle={styles.buttonText}
                        otherProps={{
                            disabled: isDisabled
                        }}
                    />
                </ThemedView>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
    },

    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    otpInput: {
        width: 50,
        height: 55,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'popins-semibold',
        backgroundColor: '#6c757d2a',
        marginHorizontal: 5,
    },
    activeInput: {
        borderColor: '#007AFF',
        backgroundColor: '#fff',
    },

    buttonContainer: {
        padding: 20,
    },
    button: {
        borderRadius: 100,
        padding: 10,
        borderWidth: 1,
    },
    buttonDisabled: {
        backgroundColor: ButtonColors.secondary.background, 
        borderColor: ButtonColors.secondary.border, 
        borderWidth: ButtonColors.secondary.borderWidth,
    },
    buttonText: {
        height: 24,
        fontFamily: 'popins-semibold',
        fontSize: 16,
        textAlign: 'center',
    },
})