import React, { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, StatusBar, Button } from 'react-native';
import { colors, colorsWithOpacity } from '@/constants/ColorScheme';
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";

// import { useLocationStore } from "@/store/useLocationStore";
// import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
// import { useBottomSheetModal } from '@gorhom/bottom-sheet';

interface DropdownProps {
    textLabel: string;
    data: { label: string; value: string }[];
    visibility: boolean;
    
    dropdownModalOpen: () => void;
    dropdownModalClose: () => void;
    setSelectedLocation: (value: string) => void;
    selectedValue?: string; 
}

export default function Dropdown({ textLabel, data, visibility, dropdownModalOpen, dropdownModalClose, setSelectedLocation, selectedValue }: DropdownProps) {

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
        setSelectedLocation(item.value); // call setter (setSelectedIsland, setSelectedRegion, etc..)
        dropdownModalClose(); // close modal
        // StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true);
    }
    
    return (
        <View style={{ marginBottom: 19, }}>
            <Text style={styles.textLabel}>{ textLabel }</Text>

            <TouchableOpacity 
                style={styles.dropdownField}
                // onPress={() => console.log(`${visibility}`)}
                onPress={dropdownModalOpen}
                activeOpacity={1}
            >
                <View style={styles.placeholderContainer}>
                    {selectedOption ? 
                        <Text style={styles.placeholderText}>{selectedOption}</Text> : 
                        <Text style={[
                            styles.placeholderText, 
                            { color: colors.secondary }
                        ]}>{ textLabel }</Text> 
                    }

                    <Ionicons name="chevron-down" size={24} color="black" />
                </View>
            
            </TouchableOpacity>

            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={['40%', '90%',]}
                enableDynamicSizing={false}
                backgroundStyle={{ backgroundColor: 'white' }}
                onDismiss={dropdownModalClose}
                backdropComponent={({ style }) => (
                    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]} />
                )}
            >
                
                <View style={styles.modalContainer}>
                    <Text style={styles.modalSubTitle}>Choose { textLabel }</Text>

                    <BottomSheetFlatList 
                        data={data}
                        keyExtractor={(item) => item.value}
                        style={{ paddingHorizontal: 24, paddingBottom: 26, }}
                        ListEmptyComponent={() => (
                            <Text style={{ marginTop: 25, fontSize: 17, textAlign: 'center', fontFamily: 'popins-regular' }}>
                                Empty data
                            </Text>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                            >
                                <View style={styles.itemWrapper}>
                                    {selectedOption === item.label ? 
                                        <Ionicons name="radio-button-on" size={24} color={colors.primary} /> : 
                                        <Ionicons name="radio-button-off" size={24} color={colors.black} /> 
                                    } 

                                    <Text style={styles.itemText}>
                                        { item.label }
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        )}
                    />

                    {/* <FlatList 
                        data={data}
                        keyExtractor={(item) => item.value}
                        ListEmptyComponent={() => (
                            <Text style={{ marginTop: 25, fontSize: 17, textAlign: 'center', fontFamily: 'popins-regular' }}>
                                Empty data
                            </Text>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                            >
                                <View style={styles.itemWrapper}>
                                    {selectedOption === item.label ? 
                                        <Ionicons name="radio-button-on" size={24} color={colors.primary} /> : 
                                        <Ionicons name="radio-button-off" size={24} color={colors.black} /> 
                                    } 

                                    <Text style={styles.itemText}>
                                        { item.label }
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        )}
                    /> */}
                </View>
            </BottomSheetModal>
        </View>
    )
}

const styles = StyleSheet.create({
    // formContainer: {
    //     paddingHorizontal: 20,
    //     marginBottom: 18,
    // },

    textLabel: { 
        marginBottom: 4,
        fontSize: 17, 
        fontFamily: 'popins-semibold',
    },
    dropdownField: { 
        borderRadius: 100,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    placeholderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    placeholderText: {
        fontFamily: 'popins-regular',
        fontSize: 14,
    },


    modalContainer: {
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colorsWithOpacity(colors.secondary, 0.20),
    },
    modalSubTitle: {
        fontFamily: 'popins-bold',
        fontSize: 20,
        paddingTop: 20,
        paddingHorizontal: 24,
    },

    itemWrapper: {
        backgroundColor: colorsWithOpacity(colors.dark, 0.10),
        padding: 11,
        marginVertical: 6,
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