import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { CustomColors, ColorsWithOpacity } from '@/constants/ColorScheme';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRegistrationStore } from '@/store/useRegistrationStore';
import { designations } from '../data/designationData';

import Dropdown from './Dropdown';
import CustomButton from './Button';
import InputField from './InputField';

export default function AccountInformation() {
    const { currentStep, nextStep, prevStep } = useRegistrationStore();
    const [dropDownModal, setDropDownModal] = useState(false);
    const [designation, setDesignation] = useState('');

    const handlerNextButton = () => {
        nextStep();
    }

    const handlerPrevButton = () => {
        prevStep();
    }


    return (
        <>
            <View style={styles.formContainer}>
                <View style={styles.dropdownWrapper}>
                    <Dropdown 
                        textLabel='Designation'
                        data={designations}
                        visibility={dropDownModal}
                        dropdownModalOpen={() => {
                            setDropDownModal(true);
                            Keyboard.dismiss();
                        }}
                        dropdownModalClose={() => setDropDownModal(false)}
                        setSelectedValue={setDesignation}
                    />

                    <View style={styles.warningMessageWrapper}>
                        <ThemedText style={styles.textWarningMessage}>
                            NOTE: {"\n"}

                            This input section change base on your designation on the account details section
                        </ThemedText>
                    </View>
                </View>
               


                <View style={styles.inputWrapper}>
                    <InputField 
                        textLabel='First name'
                        inputConfig={{
                            keyboardType: 'default',
                            autoCapitalize: 'none',
                            placeholder: '',
                            style: [
                                styles.textInput,
                            ]
                        }}
                    />
                </View>
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
        </>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        // borderWidth: 2,
        marginHorizontal: 22,
        marginTop: 15,
    },

    dropdownWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: ColorsWithOpacity(CustomColors.black, 1),
        paddingBottom: 18,
        marginBottom: 18,
    },
    warningMessageWrapper: {
        gap: 5,
        // padding: 2, 
        marginBottom: 5,
    },
    textWarningMessage: {
        backgroundColor: ColorsWithOpacity(CustomColors.warning, 0.15), 
        borderColor: ColorsWithOpacity(CustomColors.warning, 0.20),
        color: CustomColors.warning,
        fontSize: 15,
        padding: 8,
        borderWidth: 1,
    },

    inputWrapper: {

    },
    textInput: {
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontFamily: 'popins-regular',
        fontSize: 14,
    },

    buttonContainer: {
        marginVertical: 13,
        marginHorizontal: 24,
    }
})