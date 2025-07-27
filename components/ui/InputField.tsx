import { StyleSheet, TextInputProps, } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '../ThemedInput';

import ErrorMessage from '../ErrorMessage';

interface InputTextProps {
  textLabel?: string;
  inputConfig?: TextInputProps;
  errorMesage?: string | null;
}

export default function InputField({ 
  textLabel, 
  inputConfig, 
  errorMesage 
}: InputTextProps) {
  return (
    <ThemedView style={styles.inputContainer}>
      <ThemedText type='label'>
        {textLabel}
      </ThemedText>

      <ThemedInput
        {...inputConfig}
        style={[
          styles.textInput,
          inputConfig?.style // if you have other style in inputConfig
        ]}
      />

      {errorMesage && (
        <ErrorMessage message={errorMesage} />
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  inputContainer: { marginVertical: 10 },
  textInput: {
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});