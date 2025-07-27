import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

import InputField from './InputField';
import Dropdown from './Dropdown';

interface SKPositionProps {
  label: string;
  data: { label: string, value: string }[];
  visibility: boolean;
  dropdownModalOpen: () => void;
  dropdownModalClose: () => void;
  setSelectedValue: (value: string) => void;
}

export default function SKForm({ 
  label, 
  data, 
  visibility, 
  dropdownModalOpen, 
  dropdownModalClose,
  setSelectedValue 
}: SKPositionProps) {
  return (
    <ThemedView style={styles.inputWrapper}>
      <InputField 
        textLabel='Philhealth Number'
        inputConfig={{
            keyboardType: 'number-pad',
            autoCapitalize: 'none',
            placeholder: 'Enter 12-digit philhealth',
        }}
      />

      <Dropdown 
        textLabel={label}
        data={data}
        visibility={visibility}
        dropdownModalOpen={dropdownModalOpen}
        dropdownModalClose={dropdownModalClose}
        setSelectedValue={setSelectedValue}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 8,
  },
})