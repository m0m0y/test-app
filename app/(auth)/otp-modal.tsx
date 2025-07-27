import React, { useRef, useEffect, useState, } from 'react';
import { StyleSheet, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, Keyboard } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { ColorsWithOpacity, CustomColors } from "@/constants/ColorScheme";
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomSheetModal, BottomSheetView, } from '@gorhom/bottom-sheet';
import { ButtonColors } from '@/constants/ButtonColors';
import { ThemedInput } from '@/components/ThemedInput';

import CustomButton from '@/components/ui/Button';

interface OTPModalProps {
    visibility: boolean;
    onClose: () => void;
    length?: number;
    onComplete?: (otp: string) => void;
    onChangeText?: (otp: string) => void;
    resendOTP: () => void;
    OTPtimer: string;
    isDisabled: boolean | undefined;
    isVerified: boolean | undefined;
}

export default function OTPModal({ 
    visibility, 
    onClose, 
    length=6, 
    onComplete, 
    onChangeText, 
    resendOTP, 
    OTPtimer, 
    isDisabled, 
    isVerified,
}: OTPModalProps) {
    const colorScheme = useColorScheme();
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const [activeInput, setActiveInput] = useState(0);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const bottomSheetRef = useRef<BottomSheetModal>(null);

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

    const handleChange = (text: string, index: number) => {
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
    ) => {
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

    const handleFocus = (index: number) => {
        setActiveInput(index);
    };

    // Clear fields of the OTP
    const resetOTP = () => {
        const newOtp = new Array(length).fill('');
        setOtp(newOtp);
        setActiveInput(0);

        // Focus sa first input after reset
        setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 100);

        // Call onChangeText callback with empty string
        if (onChangeText) {
            onChangeText('');
        }
    }

    // Handle resend OTP button press
    const handleResetOTP = () => {
        resetOTP();
        resendOTP();
    }

    // Dynamic title for button
    const verificationButtonTitle = (isDisabled: boolean | undefined) => {
        if (isDisabled === false) return 'Resend ' + OTPtimer;
        if (isDisabled === true) return 'Verified';
        return 'Resend OTP';
    }

    // Dynamic input field style
    const verificationInputStyle = () => {
        if (isVerified === false) return styles.errorInput;
        if (isVerified === true) return styles.successInput;
        return null;
    }

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['50%']} 
            backgroundStyle={{ 
                backgroundColor: colorScheme === 'dark' ? 
                Colors.dark.background : 
                Colors.light.background, 
            }}
            onDismiss={onClose}
            backdropComponent={({ style }) => (
                <ThemedView style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]} />
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
                        style={styles.icon}
                    />
                   
                   <ThemedView style={styles.textContainer}>
                        <ThemedText type="subtitle">
                            Verify Account
                        </ThemedText>

                        <ThemedText type="description">
                            Please enter verification code we sent to your email.
                        </ThemedText>
                   </ThemedView>
                  

                    <ThemedView style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={[
                                    styles.defaultInput,
                                    activeInput === index && styles.activeInput,
                                    verificationInputStyle()
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
                                editable={isVerified === true ? false : true}
                            />
                        ))}
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.buttonContainer}>
                    <CustomButton
                        title={verificationButtonTitle(isDisabled)}
                        onPress={handleResetOTP}
                        buttonStyle={[
                            styles.button, 
                            isDisabled === false && styles.buttonDisabled,
                            isDisabled === true && styles.buttonSuccess,
                        ]}
                        textStyle={styles.buttonText}
                        otherProps={{
                            disabled: isDisabled === false || isDisabled === true
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

    icon: {
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: 15,
        paddingBottom: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '89%',
        borderColor: CustomColors.secondary,
    },

    textContainer: {
        // flex: 1,
        alignItems: 'center',
        paddingVertical: 5,
    },

    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    defaultInput: {
        width: 50,
        height: 55,
        borderWidth: 2,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'popins-semibold',
        marginHorizontal: 5,
        borderColor: ColorsWithOpacity(CustomColors.secondary, 2),
        backgroundColor: ColorsWithOpacity(CustomColors.secondary, 0.2),
    },
    activeInput: {
        borderColor: CustomColors.primary,
        backgroundColor: CustomColors.white,
    },
    errorInput: {
        borderColor: ColorsWithOpacity(CustomColors.danger, 1),
        backgroundColor: ColorsWithOpacity(CustomColors.danger, 0.2),
    },
    successInput: {
        borderColor: ColorsWithOpacity(CustomColors.success, 1),
        backgroundColor: ColorsWithOpacity(CustomColors.success, 0.2),
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
    buttonSuccess: {
        backgroundColor: ButtonColors.success.background, 
        borderColor: ButtonColors.success.border, 
        borderWidth: ButtonColors.success.borderWidth,
    },
    buttonText: {
        height: 24,
        fontFamily: 'popins-semibold',
        fontSize: 16,
        textAlign: 'center',
    },
})