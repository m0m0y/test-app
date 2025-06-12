import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, Pressable } from 'react-native';
import { colors, colorsWithOpacity } from '@/constants/ColorScheme';
import { useLocationStore } from "@/store/useLocationStore";

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { ThemedInput } from "@/components/ThemedInput";
// import { ButtonColors } from '@/constants/ButtonColors';
// import { RegistrationProps } from "@/models/registration";

import { useFocusEffect } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { PasswordRequired } from "@/constants/PasswordRequirements";

import CustomButton from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import InputGroup from "@/components/ui/InputGroup";
import InputDateGroup from "@/components/ui/InputDateGroup";

interface DateFormDataProps {
    date: string;
    month: string;
    year: string;
}

export default function Registration() {
    // const [selected, setSelectedOption] = useState('');
    const [dropDownModal, setDropDownModal] = useState<
        'island' | 'region' | 'province' | 'municipality' | 'barangay' | undefined
    >(undefined); // centralize state for modal visibility
    const resetLocationData = useLocationStore((state) => state.resetLocationData);

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

    // const formFields = [
    //     {
    //         key: 'island',
    //         label: 'Island',
    //         data: islands,
    //         setSelectedLocation: setSelectedIsland,
    //         selectedValue: selectedIsland,
    //     },
    //     {
    //         key: 'region',
    //         label: 'Region',
    //         data: regions,
    //         setSelectedLocation: setSelectedRegion,
    //         selectedValue: selectedRegion,
    //     },
    //     {
    //         key: 'province',
    //         label: 'Province',
    //         data: province,
    //         setSelectedLocation: setSelectedProvince,
    //         selectedValue: selectedProvince,
    //     },
    //     {
    //         key: 'municipality',
    //         label: 'Municipality',
    //         data: municipality,
    //         setSelectedLocation: setSelectedMunicipality,
    //         selectedValue: selectedMunicipality,
    //     },
    //     {
    //         key: 'barangay',
    //         label: 'Barangay',
    //         data: barangay,
    //         setSelectedLocation: setSelectedBarangay,
    //         selectedValue: selectedBarangay,
    //     }
    // ];

    // const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    // const months = [
    //     { label: 'January', value: '1' },
    //     { label: 'February', value: '2' },
    //     { label: 'March', value: '3' },
    //     { label: 'April', value: '4' },
    //     { label: 'May', value: '5' },
    //     { label: 'June', value: '6' },
    //     { label: 'July', value: '7' },
    //     { label: 'August', value: '8' },
    //     { label: 'September', value: '9' },
    //     { label: 'October', value: '10' },
    //     { label: 'November', value: '11' },
    //     { label: 'December', value: '12' },
    // ];

    const [formData, setFormData] = useState({
        date: '',
        month: '',
        year: '',
        email: '',
        username: '',
        password: '',
        confirmPass: '',
    });
    // const [selectedDay, setSelectedDay] = useState('1');

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    }

    const [items, setItems] = useState(PasswordRequired);

    const validationPassword = (text: string) => {
        handleChange('password', text);

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

    const handlerNextButton = () => {
        if (formData.year.length !== 4) {
            console.log('invalid the year');
        } else {
            console.log('correct');
        }

        // console.log(formData.year.length);

        // console.log('Island:', selectedIsland);
        // console.log('Region:', selectedRegion);
        // console.log('Province:', selectedProvince);
        // console.log('Municipality:', selectedMunicipality);
        // console.log('Barangay:', selectedBarangay);
        // console.log('Date', formData.date);
        // console.log('Month', formData.month);
        // console.log('Year', formData.year);
    }

    // console.log('Selected date: ' + selectedDay);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust the offset
            style={{ flex: 1, }}
        >
            {/* { Header Content } */}
            <View style={styles.headerContainer}>
                <View style={styles.headerWrapper}>

                    <View style={styles.titleContainer}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.stepNumber}>
                                1
                            </Text>
                        </View>

                        <View style={styles.textTitleWrapper}>
                            <Text style={styles.textTitle}>
                                Account Information
                            </Text>
                            <Text style={styles.subTextTitle}>
                                Enter your Account Details
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', 
                    }}>
                        <View style={{
                            backgroundColor: colorsWithOpacity(colors.secondary, 0.20), 
                            width: 40, 
                            height: 40,
                            borderRadius: 25,
                            alignItems: 'center', 
                            justifyContent: 'center',
                            marginHorizontal: 15,
                        }}>
                            <Text style={{ 
                                fontFamily: 'popins-semibold',
                                fontSize: 16,
                                lineHeight: 24,
                            }}>
                                2
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: colorsWithOpacity(colors.secondary, 0.20), 
                            width: 40, 
                            height: 40,
                            borderRadius: 25,
                            alignItems: 'center', 
                            justifyContent: 'center',
                        }}>
                            <Text style={{ 
                                fontFamily: 'popins-semibold',
                                fontSize: 16,
                                lineHeight: 24,
                            }}>
                                3
                            </Text>
                        </View>
                    </View>
                </View>
            </View>


            {/* Form Content */}
            <ScrollView 
                keyboardShouldPersistTaps="handled"
                // contentContainerStyle={{ flexGrow: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.registrationContainer}>
                        <View style={styles.formContainer}>

                            <Dropdown 
                                textLabel='Island'
                                data={islands}
                                visibility={dropDownModal === 'island'}
                                dropdownModalOpen={() => setDropDownModal('island')}
                                dropdownModalClose={() => setDropDownModal(undefined)}
                                setSelectedLocation={setSelectedIsland}
                                selectedValue={selectedIsland}
                            />

                            <Dropdown 
                                textLabel='Region'
                                data={regions}
                                visibility={dropDownModal === 'region'}
                                dropdownModalOpen={() => setDropDownModal('region')}
                                dropdownModalClose={() => setDropDownModal(undefined)}
                                setSelectedLocation={setSelectedRegion}
                                selectedValue={selectedRegion}
                            />

                            <Dropdown 
                                textLabel='Province'
                                data={province}
                                visibility={dropDownModal === 'province'}
                                dropdownModalOpen={() => setDropDownModal('province')}
                                dropdownModalClose={() => setDropDownModal(undefined)}
                                setSelectedLocation={setSelectedProvince}
                                selectedValue={selectedProvince}
                            />

                            <Dropdown 
                                textLabel='Municipality'
                                data={municipality}
                                visibility={dropDownModal === 'municipality'}
                                dropdownModalOpen={() => setDropDownModal('municipality')}
                                dropdownModalClose={() => setDropDownModal(undefined)}
                                setSelectedLocation={setSelectedMunicipality}
                                selectedValue={selectedMunicipality}
                            />

                            <Dropdown 
                                textLabel='Barangay'
                                data={barangay}
                                visibility={dropDownModal === 'barangay'}
                                dropdownModalOpen={() => setDropDownModal('barangay')}
                                dropdownModalClose={() => setDropDownModal(undefined)}
                                setSelectedLocation={setSelectedBarangay}
                                selectedValue={selectedBarangay}
                            />

                            <InputDateGroup 
                                textLabel='Date of birth'
                                dateValue={formData.date}
                                monthValue={formData.month}
                                yearValue={formData.year}
                                onChangeText={(field: keyof DateFormDataProps, value: string) => handleChange(field, value)}
                            />

                            <InputGroup 
                                textLabel='Email'
                                buttonLabel='Verify'
                                inputConfig={{
                                    keyboardType: 'email-address',
                                    value: formData.email,
                                    onChangeText: (text) => handleChange('email', text),
                                    placeholder: 'Enter Email',
                                }}
                            />

                            <InputGroup 
                                textLabel='Username'
                                buttonLabel='Check'
                                inputConfig={{
                                    keyboardType: 'default',
                                    value: formData.username,
                                    onChangeText: (text) => handleChange('email', text),
                                    placeholder: 'Type your username',
                                }}
                            />

                            <InputField 
                                textLabel='Password'
                                inputConfig={{
                                    keyboardType: 'default',
                                    secureTextEntry: true,
                                    value: formData.password,
                                    onChangeText: validationPassword,
                                    autoCapitalize: 'none',
                                    placeholder: 'Enter Password',
                                    style: [
                                        styles.textInput,
                                    ]
                                }}
                            />

                            <View style={styles.textWarningContainer}>
                                <ThemedText style={styles.textWarning}>
                                    Your password must contain:
                                </ThemedText>

                                {items.map((item) => (
                                    <View key={item.id} style={styles.checkListContainer}>
                                    <Ionicons
                                        name='checkmark-circle'
                                        size={20} 
                                        color={item.checked ? colors.success : colors.secondary}
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
                        </View>

                        <View style={styles.buttonContainer}>
                            <CustomButton 
                                title='Next'
                                onPress={handlerNextButton}
                                type='primary'
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    registrationContainer: { 
        flex: 1, 
        backgroundColor: colors.white 
    },
    headerWrapper: { 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },

    headerContainer: { 
        backgroundColor: '#F8F8F8', 
        paddingHorizontal: 15, 
        paddingVertical: 18, 
        // marginBottom: 10,
        // borderWidth: 2,
    },

    titleContainer: { 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
    },

    numberContainer: {
        backgroundColor: '#203871', 
        width: 40, 
        height: 40,
        borderRadius: 25,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    stepNumber: {
        fontFamily: 'popins-semibold',
        fontSize: 16,
        color: colors.white,
    },
    
    textTitleWrapper: { 
        flexDirection: 'column', 
        marginHorizontal: 10, 
    },
    textTitle: { 
        fontFamily: 'popins-bold', 
        fontSize: 18,
        lineHeight: 21,
    },
    subTextTitle: { 
        fontFamily: 'popins-regular', 
        fontSize: 13, 
        lineHeight: 15,
    },


    formContainer: {
        // borderWidth: 2,
        marginHorizontal: 24,
    },
    // textLabel: { 
    //     fontFamily: 'popins-semibold', 
    //     fontSize: 17, 
    // },
    // textLabel: {
    //     marginBottom: 4,
    //     fontSize: 17, 
    //     fontFamily: 'popins-semibold',
    // },
    // textInputWrapper: {
    //     flexDirection: 'row', 
    //     justifyContent: 'space-between', 
    //     alignItems: 'center', 
    // },
    // textInputButton: { 
    //     backgroundColor: ButtonColors.secondary.background, 
    //     borderColor: ButtonColors.secondary.border, 
    //     borderWidth: ButtonColors.secondary.borderWidth,
    //     borderRadius: 100,
    //     paddingVertical: 11,
    //     width: 85,
    // },
    textInput: {
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontFamily: 'popins-regular',
        fontSize: 14,
    },


    textWarningContainer: {
        marginVertical: 3, 
    },
    textWarning: {
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
        marginVertical: 15,
        marginHorizontal: 24,
    }
});