import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Colors } from '@/constants/Colors';

import Dropdown from './Dropdown';
import DateFormat from '@/constants/DateFormat';

interface LYDOStatementOfEmploymentProps {
  label: string;
  data: { label: string, value: string }[];
  visibility: boolean;
  dropdownModalOpen: () => void;
  dropdownModalClose: () => void;
  setSelectedValue: (value: string) => void;
}

export default function LYDOForm({
  label, 
  data, 
  visibility, 
  dropdownModalOpen, 
  dropdownModalClose,
  setSelectedValue 
}: LYDOStatementOfEmploymentProps) {
  const colorScheme = useColorScheme();
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Function para sa pag-handle ng date change
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    // const currentDate = selectedDate || birthdate;
    setShowDatePicker(false);
    console.log(selectedDate);
    // setBirthdate(currentDate);
  };

  // Function para i-show ang date picker
  const showDatepicker = (): void => {
    setShowDatePicker(true);
  };

  return (
    <>
      <ThemedView style={styles.inputWrapper}>
        <Dropdown 
          textLabel={label}
          data={data}
          visibility={visibility}
          dropdownModalOpen={dropdownModalOpen}
          dropdownModalClose={dropdownModalClose}
          setSelectedValue={setSelectedValue}
        />

        <ThemedView style={{ flexDirection: 'column' }}>
          <ThemedText type='defaultSemiBold'> 
              Select Birth Date
          </ThemedText>

          <TouchableOpacity
              style={[
                  styles.dateSelect,
                  { 
                      borderColor: colorScheme === 'dark' ?
                      Colors.dark.borderColor :
                      Colors.light.borderColor
                  }
              ]} 
              onPress={showDatepicker}
          >
            <ThemedText type='small'>
                {DateFormat(birthdate)}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* DateTimePicker component */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthdate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()} // Hindi pwedeng future date
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 8,
  },

  dateSelect: {
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    // width: 270,
  },
})