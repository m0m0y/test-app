import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, } from 'react-native';
import { CustomColors, ColorsWithOpacity } from '@/constants/ColorScheme';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

import ErrorMessage from "../ErrorMessage";

interface DropdownProps {
    textLabel: string;
    data: { label: string; value: string }[];
    visibility: boolean;
    
    dropdownModalOpen: () => void;
    dropdownModalClose: () => void;
    setSelectedValue: (value: string) => void;
    selectedValue?: string; 
    errorMesage?: string;
}

export default function Dropdown({ 
    textLabel, 
    data, 
    visibility, 
    dropdownModalOpen, 
    dropdownModalClose, 
    setSelectedValue, 
    selectedValue,
    errorMesage 
}: DropdownProps) {
    const colorScheme = useColorScheme();
    const [selectedOption, setSelectedOption] = useState('');
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    
    useEffect(() => {
        if (visibility && bottomSheetRef.current) {
            bottomSheetRef.current.present();
        } else if (!visibility && bottomSheetRef.current) {
            bottomSheetRef.current.dismiss();
        }
    }, [visibility]);
    
    useEffect(() => {
        if (selectedValue === undefined) {
            setSelectedOption('');
        }
    }, [selectedValue]);

    const handleSelect = (item: { label: string, value: string }) => {
        setSelectedOption(item.label);
        setSelectedValue(item.value); // call setter (setSelectedIsland, setSelectedRegion, etc..)
        dropdownModalClose(); // close modal
        // StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true);
    }
    
    return (
        <ThemedView style={styles.inputContainer}>
            <ThemedText type='label'>
                { textLabel }
            </ThemedText>

            <TouchableOpacity 
                style={[
                    styles.dropdownField, 
                    { 
                        borderColor: colorScheme === 'dark' ?
                        Colors.dark.borderColor : 
                        Colors.light.borderColor, 
                    }
                ]}
                onPress={dropdownModalOpen}
                activeOpacity={1}
            >
                <ThemedView style={styles.placeholderContainer}>
                    {selectedOption ? 
                        <ThemedText type="small">
                            {selectedOption}
                        </ThemedText> : 
                        <ThemedText type="small">
                            { textLabel }
                        </ThemedText> 
                    }

                    <Ionicons 
                        name="chevron-down" 
                        size={24} 
                        color={
                            colorScheme === 'dark' ?
                            Colors.dark.text :
                            Colors.light.text
                        }
                    />
                </ThemedView>
            </TouchableOpacity>

            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={['40%', '90%',]}
                enableDynamicSizing={false}
                backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, }}
                onDismiss={dropdownModalClose}
                backdropComponent={({ style }) => (
                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]} />
                )}
            >
                <ThemedView style={styles.modalContainer}>
                    <ThemedText style={styles.modalSubTitle}>
                        Choose { textLabel }
                    </ThemedText>

                    <BottomSheetFlatList 
                        data={data}
                        keyExtractor={(item) => item.value}
                        style={{ 
                            paddingHorizontal: 20, 
                            paddingTop: 13,
                            paddingBottom: 25, 
                        }}
                        ListEmptyComponent={() => (
                            <ThemedText style={styles.emptyDataText}>
                                Empty data
                            </ThemedText>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                            >
                                <ThemedView 
                                    style={[
                                        styles.itemWrapper,
                                        { backgroundColor: colorScheme === 'dark' ?
                                        ColorsWithOpacity(CustomColors.secondary, 0.30) : 
                                        ColorsWithOpacity(CustomColors.dark, 0.10), }
                                    ]}
                                >
                                    {selectedOption === item.label ? 
                                        <Ionicons 
                                            name="radio-button-on" 
                                            size={24} 
                                            color={CustomColors.primary} 
                                        /> : 
                                        <Ionicons 
                                            name="radio-button-off" 
                                            size={24} 
                                            color={CustomColors.primary} 
                                        /> 
                                    } 

                                    <ThemedText style={styles.itemText}>
                                        { item.label }
                                    </ThemedText>
                                </ThemedView>
                            </TouchableOpacity>
                        )}
                    />
                </ThemedView>
            </BottomSheetModal>

            {errorMesage && (
                <ErrorMessage message={errorMesage} />
            )}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    inputContainer: { marginVertical: 10 },
    dropdownField: { 
        borderRadius: 100,
        borderWidth: 1.2,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    placeholderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    modalContainer: {
        borderTopWidth: 1,
        borderTopColor: ColorsWithOpacity(CustomColors.secondary, 0.20),
    },
    modalSubTitle: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        paddingTop: 20,
        paddingHorizontal: 24,
    },
    emptyDataText: {
        marginTop: 25, 
        textAlign: 'center',
    },

    itemWrapper: {
        padding: 15,
        marginVertical: 8,
        borderRadius: 15,
        fontFamily: 'popins-regular',
        flexDirection: 'row',
    },
    itemText: {
        fontFamily: 'popins-regular',
        fontSize: 17,
        alignItems: 'center',
        marginHorizontal: 6
    },
})