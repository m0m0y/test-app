import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Keyboard, StatusBar, Text } from 'react-native';
import { ColorsWithOpacity, CustomColors } from '@/constants/ColorScheme';
import { useLocationStore } from '@/store/useLocationStore';
import { useFocusEffect } from 'expo-router';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { PasswordRequired } from '@/constants/PasswordRequirements';
import { useRegistrationStore } from '@/store/useRegistrationStore';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import OTPModal from '@/app/(auth)/otp-modal';
import CustomButton from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import Dropdown from '@/components/ui/Dropdown';
import InputGroup from '@/components/ui/InputGroup';
import InputDateGroup from '@/components/ui/InputDateGroup';
import TimeFormat from '@/constants/TimeFormat';
import FileUpload from '@/components/ui/FileUpload';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '@/components/ui/AlertModal';

// interface SelectedFileProps {
//   uri: string;
//   name: string;
//   size: number;
//   mimeType: string;
// }

export default function AccountDetails() {
    const { 
        currentStep,
        accountDetails,

        validationMessages,
        validModal,
        closeValidModal,

        isEmailVerified, // 2 set of value (false, true)
        isUsernameVerified, // 2 set of value (false, true)
        isOTPVerified, // 3 set of value (undenfined, false, true)
       
        otpModal,
        timeLeft,

        disabledEmail,
        disabledUsername,

        recentlyVerified,

        nextStep,
        prevStep,
        goToStep,
        setLocationValues,
        setAccountDetails,

        handleUpdateEmail,
        handleUpdateUsername,

        clearValidationMessage, 

        handleValidateEmail,
        handleValidateUsername,
        validateOTP,

        resendOTP,
        closeOtpModal,
    } = useRegistrationStore();

    const [locationDropdown, setLocationDropdown] = useState<
        'island' | 'region' | 'province' | 'municipality' | 'barangay' | undefined
    >(undefined); // Centralize state for modal visibility
    const resetLocationData = useLocationStore((state) => state.resetLocationData);
    const [items, setItems] = useState(PasswordRequired);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [verifiedType, setVerifiedType] = useState<'email' | 'username' | null>(null);

    // console.log(recentlyVerified);
    // console.log(isOTPVerified);
    
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
            closeOtpModal();
        }, [])
    );

    // Set value of locations
    useEffect(() => {
        setLocationValues({
            island: selectedIsland || '',
            region: selectedRegion || '',
            province: selectedProvince || '',
            municipality: selectedMunicipality || '',
            barangay: selectedBarangay || ''
        });
    }, [
        selectedIsland, 
        selectedRegion, 
        selectedProvince, 
        selectedMunicipality, 
        selectedBarangay
    ]);

    // Initial state value para sa birthdate at age
    useEffect(() => {
        if (!accountDetails.birthday) {
            const defaultDate = new Date(1990, 0, 1);
            const defaultAge = calculateAge(defaultDate);

            setAccountDetails('birthday', defaultDate.toISOString().split('T')[0]);
            setAccountDetails('age', defaultAge.toString());
        }
    }, [accountDetails.birthday]);

    // Calculate age function
    const calculateAge = (val: Date): number => {
        const today = new Date();
        const birth = new Date(val);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    // const [formData, setFormData] = useState({
    //     email: '',
    //     username: '',
    //     password: '',
    //     birthday: new Date(1990, 0, 1),
    //     age: '',
    //     confirmPass: '',
    //     file: null,
    // });

    // const handleChange = (name: string, value: string | Date ) => {
        // setFormData({ ...formData, [name]: value });
    // }

    const handleChange = (field: keyof typeof accountDetails, value: string) => {
        setAccountDetails(field, value);
        if (validationMessages[field as keyof typeof validationMessages]) {
            clearValidationMessage(field);
        }
    }

    const handleBirthdateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date(accountDetails.birthday || '');
        const currentAge = calculateAge(currentDate).toString();

        handleChange('birthday', currentDate.toISOString().split('T')[0]);
        handleChange('age', currentAge);
        setShowDatePicker(false);
    }

    const handleOTPComplete = (otpValue: string) => {
        validateOTP(otpValue);
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

    // const handleNextButton = () => {
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

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf', // Allow all file types
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                // setSelectedFile({
                //     uri: file.uri,
                //     name: file.name,
                //     size: file.size || 0,
                //     mimeType: file.mimeType || 'application/octet-stream',
                // });
                handleChange('file', file.name);
            }
        } catch(error) {
            console.error('Error picking document:', error);
            // Alert.alert('Error', 'Failed to pick document');
        }
    }

    const handleNextButton = () => {
        nextStep();
    }

    const handlerPrevButton = () => {
        // prevStep();
    }

    // Conditional approach for the content of Alert Modal
    const renderMessageStatus = () => {
        if (recentlyVerified === 'email') {
            return (
                <>
                    <ThemedText 
                        type='defaultSemiBold'
                        style={styles.alertMessageTitle}
                    >
                        Email Verified Successfully!
                    </ThemedText>

                    <ThemedText 
                        type='description'
                        style={styles.alertMessage}
                    >
                        Your email address has been successfully verified.
                    </ThemedText>
                </>
            );
        } else if (recentlyVerified === 'username') {
              return (
                <>
                    <ThemedText 
                        type='description'
                        style={styles.alertMessage}
                    >
                        Username successfully verified!.
                    </ThemedText>
                </>
            );
        }

        return null;
    }
    
    return (
        <>
            <ThemedView style={styles.formContainer}>
                <Dropdown 
                    textLabel='Island'
                    data={islands}
                    visibility={locationDropdown === 'island'}
                    dropdownModalOpen={() => {
                        setLocationDropdown('island');
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setLocationDropdown(undefined)}
                    setSelectedValue={setSelectedIsland}
                    selectedValue={selectedIsland}
                    errorMesage={validationMessages.island}
                />

                <Dropdown 
                    textLabel='Region'
                    data={regions}
                    visibility={locationDropdown === 'region'}
                    dropdownModalOpen={() => {
                        setLocationDropdown('region');
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setLocationDropdown(undefined)}
                    setSelectedValue={setSelectedRegion}
                    selectedValue={selectedRegion}
                    errorMesage={validationMessages.region}
                />

                <Dropdown 
                    textLabel='Province'
                    data={province}
                    visibility={locationDropdown === 'province'}
                    dropdownModalOpen={() => {
                        setLocationDropdown('province');
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setLocationDropdown(undefined)}
                    setSelectedValue={setSelectedProvince}
                    selectedValue={selectedProvince}
                    errorMesage={validationMessages.province}

                />

                <Dropdown 
                    textLabel='Municipality'
                    data={municipality}
                    visibility={locationDropdown === 'municipality'}
                    dropdownModalOpen={() => {
                        setLocationDropdown('municipality');
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setLocationDropdown(undefined)}
                    setSelectedValue={setSelectedMunicipality}
                    selectedValue={selectedMunicipality}
                    errorMesage={validationMessages.municipality}
                />

                <Dropdown 
                    textLabel='Barangay'
                    data={barangay}
                    visibility={locationDropdown === 'barangay'}
                    dropdownModalOpen={() => {
                        setLocationDropdown('barangay')
                        Keyboard.dismiss();
                    }}
                    dropdownModalClose={() => setLocationDropdown(undefined)}
                    setSelectedValue={setSelectedBarangay}
                    selectedValue={selectedBarangay}
                    errorMesage={validationMessages.barangay}
                />

                <InputDateGroup 
                    textLabel='Date of birth'
                    birthdate={accountDetails.birthday}
                    calculateAge={calculateAge}
                    showDatePicker={showDatePicker}
                    setShowDatePicker={() => setShowDatePicker(true)}
                    handleDateChange={handleBirthdateChange}
                    errorMessage={validationMessages.birthday}
                />

                <InputGroup 
                    textLabel='Email'
                    inputConfig={{
                        keyboardType: 'email-address',
                        value: accountDetails.email,
                        onChangeText: (text) => handleChange('email', text),
                        placeholder: 'Enter Email',
                        editable: disabledEmail === true ? false : true,
                    }}
                    buttonLabel={
                        // Dynamically changing the button label
                        isOTPVerified === true 
                        ? 'Update' 
                        : 'Verify'
                    }
                    onButtonClick={() => {
                        // Check if the accountDetails.email is available before passing to handleValidationEmail
                        if (accountDetails.email) {
                            {
                                // Conditional approach for button update and verify
                                disabledEmail === true
                                ? handleUpdateEmail() 
                                : handleValidateEmail(accountDetails.email)
                            }
                        }
                    }}
                    isDisabled={disabledEmail}
                    OTPtimer={TimeFormat(timeLeft)}
                    errorMessage={validationMessages.email}
                    // Display verify message if true
                    verifyMessage={
                        isOTPVerified === true 
                        ? 'Email Verified' 
                        : undefined
                    } 
                />

                <InputGroup 
                    textLabel='Username'
                    inputConfig={{
                        keyboardType: 'default',
                        value: accountDetails.username,
                        onChangeText: (text) => handleChange('username', text),
                        autoCapitalize: 'none',
                        placeholder: 'Type your username',
                        editable: disabledUsername === true ? false : true,
                    }}
                    buttonLabel={
                        // Dynamically changing the button label
                        isUsernameVerified === true 
                        ? 'Update' 
                        : 'Check'
                    }
                    onButtonClick={() => {
                        // Check if the accountDetails.username is available before passing to handleValidateUsername
                        if (accountDetails.username) {
                            {
                                // Conditional approach for button update and verify
                                disabledUsername === true 
                                ? handleUpdateUsername()
                                : handleValidateUsername(accountDetails.username)
                            }
                        }
                    }}
                    isDisabled={disabledUsername}
                    errorMessage={validationMessages.username}
                    verifyMessage={
                        isUsernameVerified === true 
                        ? 'Username verified' 
                        : undefined
                    } // Display verify message if true
                />

                <InputField 
                    textLabel='Password'
                    inputConfig={{
                        keyboardType: 'default',
                        secureTextEntry: true,
                        value: accountDetails.password,
                        onChangeText: validatePassword,
                        autoCapitalize: 'none',
                        placeholder: 'Enter Password',
                    }}
                    errorMesage={validationMessages.password}
                />

                <ThemedView style={styles.passwordWarningContainer}>
                    <ThemedText style={styles.passwordTextWarning}>
                        Your password must contain:
                    </ThemedText>

                    {items.map((item) => (
                        <ThemedView key={item.id} style={styles.checkListContainer}>
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
                        </ThemedView>
                    ))}
                </ThemedView>

                <InputField 
                    textLabel='Confirm Password'
                    inputConfig={{
                        keyboardType: 'default',
                        secureTextEntry: true,
                        value: accountDetails.confirmPass,
                        onChangeText: (text) => handleChange('confirmPass', text),
                        autoCapitalize: 'none',
                        placeholder: 'Confirm Password',
                    }}
                    errorMesage={validationMessages.confirmPass}
                />

                <FileUpload 
                    // onUploadComplete={handleNextButton}
                    // uploadUrl={formData.file}
                    // setSelectedFile={setSelectedFile}
                    selectedFile={accountDetails.file!}
                    onPressPickDocument={handlePickDocument}
                    onPressRemoveFile={() => handleChange('file', '')}
                    errorMesage={validationMessages.file}
                />
            </ThemedView>

            <ThemedView style={styles.buttonContainer}>
                <CustomButton 
                    title='Next'
                    onPress={handleNextButton}
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
            </ThemedView>

            {/* OTP MODAL */}
            {otpModal && (
                <OTPModal 
                    visibility={otpModal}
                    onClose={closeOtpModal}
                    onComplete={handleOTPComplete}
                    onChangeText={(text) => handleChange('otp', text)}
                    resendOTP={resendOTP}
                    OTPtimer={TimeFormat(timeLeft)}
                    isDisabled={disabledEmail}
                    isVerified={isOTPVerified}
                />
            )}

            {/* ALERT MESSAGE MODAL */}
            {validModal && (
                <AlertModal
                    visibility={validModal}
                    changeStatusBar={true}
                    content={
                        <>
                            <Ionicons 
                                name="checkmark-done-sharp" 
                                size={55} 
                                style={styles.alertIcon}
                                color={CustomColors.success}
                            />
                            
                            {renderMessageStatus()}
                        </>
                    }
                    buttons={[
                    { 
                        buttonTitle: 'Continue', 
                        buttonStyle: {borderRadius: 5},
                        buttonOnpress: closeValidModal, 
                    },
                    ]}
                    handleRequestClose={closeValidModal}
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
    },

    alertIcon: {
        marginBottom: 9,
        textAlign: 'center',
    },
    alertMessageTitle: {
        marginBottom: 20,
        textAlign: 'center',
    },
    alertMessage: {
        textAlign: 'center',
    }
});
