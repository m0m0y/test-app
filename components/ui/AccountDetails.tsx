import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Pressable, Alert, } from 'react-native';
import { CustomColors, ColorsWithOpacity } from '@/constants/ColorScheme';
import { useLocationStore } from "@/store/useLocationStore";
import { useFocusEffect } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "../ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { PasswordRequired } from "@/constants/PasswordRequirements";
import { useRegistrationStore } from '@/store/useRegistrationStore';

import * as FileSystem from 'expo-file-system';
import OTPModal from "@/app/(auth)/otp-modal";
import CustomButton from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import InputGroup from "@/components/ui/InputGroup";
import InputDateGroup from "@/components/ui/InputDateGroup";
import TimeFormat from "@/constants/TimeFormat";
import FileUpload from "@/components/ui/FileUpload";

interface SelectedFile {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

export default function AccountDetails() {
    const { currentStep, nextStep, prevStep } = useRegistrationStore();
    const [dropDownModal, setDropDownModal] = useState<
        'island' | 'region' | 'province' | 'municipality' | 'barangay' | undefined
    >(undefined); // Centralize state for modal visibility
    const resetLocationData = useLocationStore((state) => state.resetLocationData);
    const [items, setItems] = useState(PasswordRequired);
    const [otpModal, setOtpModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActiveVerify, setIsActiveVerify] = useState<boolean>(false);

    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    const [uploading, setUploading] = useState(false);

    const { 
        islands, 
        regions, 
        province, 
        municipality,
        barangay,

        selectedIsland, 
        selectedRegion, 
        selectedProvince,
        selectedMunicipality,
        selectedBarangay,
        
        setSelectedIsland, 
        setSelectedRegion, 
        setSelectedProvince,
        setSelectedMunicipality,
        setSelectedBarangay,
    } = useLocationStore();

    useFocusEffect(
        useCallback(() => {
            resetLocationData();
        }, [])
    );

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        birthday: '',
        age: '',
        confirmPass: '',
    });

    const handleChange = (name: string, value: string | Date ) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleBirthDateChange = useCallback((birthday: Date, age: string) => {
        const dateString = birthday.toISOString().split('T')[0];

        setFormData(prev => ({
            ...prev,
            birthday: dateString,
            age: age
        }));
    }, []);

    const validateEmail = (val: any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(val)) {
            alert('Please enter a valid email');
            return false;
        }
        return true;
    }

    useEffect(() => {
        let interval = null;

        if (isActiveVerify && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActiveVerify(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActiveVerify, timeLeft]);

    const isDisabled: boolean = isActiveVerify && timeLeft > 0;

    const handleSendOtp = async () => {
        // Call validate email function
        Keyboard.dismiss();
        if (!validateEmail(formData.email)) { 
            return;
        }

        // Sending OTP
        try {
            alert('OTP sent!');
            setOtpModal(true);

            // Start the timer (15 seconds)
            setTimeLeft(15);
            setIsActiveVerify(true);
        } catch {
            console.error('Failed to send OTP');
        }
    }

    const handleResendOTP = async () => {
        // Re-send OTP
        try {
            alert('Sending OTP!');
            // Start the timer (15 seconds)
            setTimeLeft(15);
            setIsActiveVerify(true);
        } catch {
            console.error('Failed to send OTP');
        }
    }

    const handleOTPComplete = (otpValue: string) => {
        alert(`Entered OTP: ${otpValue}`);
        console.log('OTP:', otpValue);
    }

    const handleCheckUsername = async () => {
        try {
            alert('Checking Username...');
        } catch {
            console.error('Failed to check username');
        }
    }

    const validatePassword = (text: string) => {
        handleChange('password', text); // Call the value of field every type

        if (text === "") {
            setItems((prevItems) =>
                prevItems.map((item) => ({
                ...item,
                checked: false, // Check if the condition is met
                }))
            );
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) => ({
                ...item,
                checked: item.validate(text), // Check if the condition is met
            }))
        );
    }

    // const uploadFile = async () => {
    //     if (!selectedFile) {
    //         Alert.alert('Error', 'Please select a file first');
    //         return;
    //     }

    //     setUploading(true);

    //     try {
    //     // Method 1: Using FileSystem.uploadAsync (Recommended for Expo)
    //     const uploadResult = await FileSystem.uploadAsync(uploadUrl, selectedFile.uri, {
    //         fieldName: 'file',
    //         httpMethod: 'POST',
    //         uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //         headers: {
    //         'Content-Type': 'multipart/form-data',
    //         },
    //     });

    //     console.log('Upload result:', uploadResult);
        
    //     if (uploadResult.status === 200) {
    //         Alert.alert('Success', 'File uploaded successfully');
    //         onUploadComplete?.(JSON.parse(uploadResult.body));
    //         setSelectedFile(null);
    //     } else {
    //         throw new Error(`Upload failed with status: ${uploadResult.status}`);
    //     }
    //     } catch (error) {
    //     console.error('Upload error:', error);
    //     Alert.alert('Error', 'Failed to upload file');
    //     } finally {
    //     setUploading(false);
    //     }
    // };

    // const handlerNextButton = () => {
    //     // console.log(formData.birthday);
    //     // console.log(formData.age);
    //     // console.log(selectedFile);

    //     // if (!selectedFile) {
    //     //     Alert.alert('Error', 'Please select a file first');
    //     //     return;
    //     // }

    //     // setUploading(true);
    //     nextStep();
    // }

    const handlerNextButton = () => {
        nextStep();
    }

    const handlerPrevButton = () => {
        prevStep();
    }

    return (
        <>
            <View style={styles.formContainer}>

                <Dropdown 
                    textLabel='Island'
                    data={islands}
                    visibility={dropDownModal === 'island'}
                    dropdownModalOpen={() => {
                        setDropDownModal('island');
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setDropDownModal(undefined)}
                    setSelectedValue={setSelectedIsland}
                    selectedValue={selectedIsland}
                />

                <Dropdown 
                    textLabel='Region'
                    data={regions}
                    visibility={dropDownModal === 'region'}
                    dropdownModalOpen={() => {
                        setDropDownModal('region');
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setDropDownModal(undefined)}
                    setSelectedValue={setSelectedRegion}
                    selectedValue={selectedRegion}
                />

                <Dropdown 
                    textLabel='Province'
                    data={province}
                    visibility={dropDownModal === 'province'}
                    dropdownModalOpen={() => {
                        setDropDownModal('province');
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setDropDownModal(undefined)}
                    setSelectedValue={setSelectedProvince}
                    selectedValue={selectedProvince}
                />

                <Dropdown 
                    textLabel='Municipality'
                    data={municipality}
                    visibility={dropDownModal === 'municipality'}
                    dropdownModalOpen={() => {
                        setDropDownModal('municipality');
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setDropDownModal(undefined)}
                    setSelectedValue={setSelectedMunicipality}
                    selectedValue={selectedMunicipality}
                />

                <Dropdown 
                    textLabel='Barangay'
                    data={barangay}
                    visibility={dropDownModal === 'barangay'}
                    dropdownModalOpen={() => {
                        setDropDownModal('barangay')
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setDropDownModal(undefined)}
                    setSelectedValue={setSelectedBarangay}
                    selectedValue={selectedBarangay}
                />

                <InputDateGroup 
                    textLabel='Date of birth'
                    onBirthdayChange={handleBirthDateChange}
                    initialDate={new Date(1990, 0, 1)}
                />

                <InputGroup 
                    textLabel='Email'
                    buttonLabel='Verify'
                    textValue={formData.email}
                    onChangeText={(text: string) => handleChange('email', text)}
                    onButtonClick={handleSendOtp}
                    inputConfig={{
                        keyboardType: 'email-address',
                        placeholder: 'Enter Email',
                    }}
                    isDisabledBtn={isDisabled}
                    OTPtimer={TimeFormat(timeLeft)}
                />

                <InputGroup 
                    textLabel='Username'
                    buttonLabel='Check'
                    textValue={formData.username}
                    onChangeText={(text: string) => handleChange('username', text)}
                    onButtonClick={handleCheckUsername}
                    inputConfig={{
                        keyboardType: 'default',
                        placeholder: 'Type your username',
                    }}
                />

                <InputField 
                    textLabel='Password'
                    inputConfig={{
                        keyboardType: 'default',
                        secureTextEntry: true,
                        value: formData.password,
                        onChangeText: validatePassword,
                        autoCapitalize: 'none',
                        placeholder: 'Enter Password',
                        style: [
                            styles.textInput,
                        ]
                    }}
                />

                <View style={styles.passwordWarningContainer}>
                    <ThemedText style={styles.passwordTextWarning}>
                        Your password must contain:
                    </ThemedText>

                    {items.map((item) => (
                        <View key={item.id} style={styles.checkListContainer}>
                        <Ionicons
                            name='checkmark-circle'
                            size={20} 
                            color={
                                item.checked ? CustomColors.success : CustomColors.secondary
                            }
                        />
                        <ThemedText style={styles.checkList}>
                            {item.text}
                        </ThemedText>
                        </View>
                    ))}
                </View>

                <InputField 
                    textLabel='Confirm Password'
                    inputConfig={{
                        keyboardType: 'default',
                        secureTextEntry: true,
                        value: formData.confirmPass,
                        onChangeText: (text) => handleChange('confirmPass', text),
                        autoCapitalize: 'none',
                        placeholder: 'Confirm Password',
                        style: [
                            styles.textInput,
                        ]
                    }}
                />

                <FileUpload 
                    // onUploadComplete={handlerNextButton}
                    // uploadUrl={formData.file}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                />
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton 
                    title='Next'
                    onPress={handlerNextButton}
                    type='primary'
                />

                {currentStep === 1 ? 
                    <CustomButton 
                        title='Previous'
                        onPress={handlerPrevButton}
                        type='outlineSecondary'
                        otherProps={{ 
                            disabled: true
                        }}
                    />
                : 
                    <CustomButton 
                        title='Previous'
                        onPress={handlerPrevButton}
                        type='outlineSecondary'
                    />
                }
            </View>

            {otpModal && (
                <OTPModal 
                    visibility={otpModal}
                    onClose={() => setOtpModal(false)}
                    onComplete={handleOTPComplete}
                    onChangeText={(text) => handleChange('otp', text)}
                    resendOTP={handleResendOTP}
                    timer={TimeFormat(timeLeft)}
                    isDisabled={isDisabled}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    registrationContainer: { 
        flex: 1, 
        // backgroundColor: CustomColors.white,
    },

    formContainer: {
        // borderWidth: 2,
        marginHorizontal: 22,
        marginTop: 15,
    },
    textInput: {
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontFamily: 'popins-regular',
        fontSize: 14,
    },

    passwordWarningContainer: {
        marginVertical: 3, 
    },
    passwordTextWarning: {
        fontFamily: 'popins-bold',
        fontSize: 14,
        marginBottom: 5,
    },
    checkListContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    checkList: {
        marginLeft: 8, 
        fontSize: 13, 
        fontFamily: 'popins-regular',
    },

    buttonContainer: {
        marginVertical: 13,
        marginHorizontal: 24,
    }
});