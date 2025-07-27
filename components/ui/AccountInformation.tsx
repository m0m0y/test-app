import React, { useEffect, useState } from 'react';
import { StyleSheet, Keyboard, } from 'react-native';
import { CustomColors, ColorsWithOpacity } from '@/constants/ColorScheme';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useRegistrationStore } from '@/store/useRegistrationStore';
import { designations, sectorialGroup, skPosition, statementOfEmployment } from '../data/dropdownOptions';
import { gender } from '../data/genderData';

import Dropdown from './Dropdown';
import CustomButton from './Button';
import InputField from './InputField';
import RadioButton from './RadioButton';
import SKForm from './SKForm';
import LYDOForm from './LYDOForm';
import LYDCForm from './LYDCForm';

export default function AccountInformation() {
    const { currentStep, nextStep, prevStep } = useRegistrationStore();
    const [designationDropdown, setDesignationDropdown] = useState(false);
    const [sectorialDropdown, setSectorialDropdown] = useState(false);
    const [skPositionDropdown, setSkPositionDropdown] = useState(false);
    const [statementOfEmploymentDropdown, setStatementOfEmploymentDropdown] = useState(false);

    const [designation, setDesignation] = useState('');
    const [skPositon, setSkPosition] = useState('');
    const [soe, setSoe] = useState('');
    const [selectedGender, setSelectedGender] = useState('male'); // since I put a default value here

    const getDesignationLabel = () => {
        const designationLabel = designations.find(item => item.value === designation);
        const splitLabel = designationLabel?.label.split(' -', 1);
        return splitLabel?.toString();
    }

    const currentDesignation = getDesignationLabel();

    const handleSelectGender = (value: string) => {
        setSelectedGender(value);
    };

    const handlerNextButton = () => {
        nextStep();
    }

    const handlerPrevButton = () => {
        prevStep();
    }

    return (
        <>
            <ThemedView style={styles.formContainer}>
                <ThemedView style={styles.dropdownWrapper}>
                    <Dropdown 
                        textLabel='Designation'
                        data={designations}
                        visibility={designationDropdown}
                        dropdownModalOpen={() => {
                            setDesignationDropdown(true);
                            Keyboard.dismiss();
                        }}
                        dropdownModalClose={() => setDesignationDropdown(false)}
                        setSelectedValue={setDesignation}
                    />

                    <ThemedView style={styles.warningMessageWrapper}>
                        <ThemedText style={styles.textWarningMessage}>
                            NOTE: {"\n"}

                            This input section change base on your designation on the account details section
                        </ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.inputWrapper}>
                    <InputField 
                        textLabel='First name'
                        inputConfig={{
                            keyboardType: 'default',
                            autoCapitalize: 'none',
                            placeholder: 'Type your firstname',
                        }}
                    />

                    <InputField 
                        textLabel='Last name'
                        inputConfig={{
                            keyboardType: 'default',
                            autoCapitalize: 'none',
                            placeholder: 'Type your lastname',
                        }}
                    />

                    <InputField 
                        textLabel='Middle name'
                        inputConfig={{
                            keyboardType: 'default',
                            autoCapitalize: 'none',
                            placeholder: 'Type your middlename',
                        }}
                    />

                    <InputField 
                        textLabel='Suffix'
                        inputConfig={{
                            keyboardType: 'default',
                            autoCapitalize: 'none',
                            placeholder: 'Ex: Jr, Sr, II etc',
                        }}
                    />

                    <InputField 
                        textLabel='Mobile Number'
                        inputConfig={{
                            keyboardType: 'default',
                            autoCapitalize: 'none',
                            placeholder: '000-0000-000',
                        }}
                    />

                    <InputField 
                        textLabel='Telephone Number'
                        inputConfig={{
                            keyboardType: 'default',
                            autoCapitalize: 'none',
                            placeholder: '#0000',
                        }}
                    />

                    <RadioButton
                        label='Gender'
                        data={gender}
                        onSelect={handleSelectGender}
                        selectedValue={selectedGender} // select default value (male)
                    />

                    <Dropdown 
                        textLabel='Sectorial Group'
                        data={sectorialGroup}
                        visibility={sectorialDropdown}
                        dropdownModalOpen={() => {
                            setSectorialDropdown(true);
                            Keyboard.dismiss();
                        }}
                        dropdownModalClose={() => setSectorialDropdown(false)}
                        setSelectedValue={setDesignation}
                    />

                    <InputField 
                        textLabel='Office Address'
                        inputConfig={{
                            keyboardType: 'default',
                            autoCapitalize: 'none',
                            placeholder: 'Enter your office address',
                        }}
                    />
                </ThemedView>

                {currentDesignation === 'SK' && 
                    <SKForm 
                        label='Position'
                        data={skPosition}
                        visibility={skPositionDropdown}
                        dropdownModalOpen={() => setSkPositionDropdown(true)}
                        dropdownModalClose={() => setSkPositionDropdown(false)}
                        setSelectedValue={setSkPosition}
                    />
                }
                {currentDesignation === 'LYDO' && 
                    <LYDOForm 
                        label='Statement Of Employment'
                        data={statementOfEmployment}
                        visibility={statementOfEmploymentDropdown}
                        dropdownModalOpen={() => setStatementOfEmploymentDropdown(true)}
                        dropdownModalClose={() => setStatementOfEmploymentDropdown(false)}
                        setSelectedValue={setSoe}
                    />
                }
                {currentDesignation === 'LYDC' && <LYDCForm />}

            </ThemedView>


            <ThemedView style={styles.buttonContainer}>
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
            </ThemedView>
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
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: ColorsWithOpacity(CustomColors.secondary, 5),
        paddingBottom: 18,
        marginBottom: 8,
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
        paddingBottom: 18,
        marginBottom: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    buttonContainer: {
        marginVertical: 13,
        marginHorizontal: 24,
    },

})