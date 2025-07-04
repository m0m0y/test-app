import { StyleSheet, TextInput, StyleProp, TextStyle, TextInputProps, View, Text } from 'react-native';
import { CustomColors } from '@/constants/ColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '../ThemedInput';

interface InputTextProps {
  textLabel?: string,
  inputConfig?: TextInputProps,
  errorMesage?: string | null,
}

export default function InputField({ 
  textLabel, 
  inputConfig, 
  errorMesage 
}: InputTextProps) {
  return (
    <View style={styles.inputContainer}>
      <ThemedText type='label'>
        {textLabel}
      </ThemedText>

      <ThemedInput
        {...inputConfig}
      />

      {errorMesage && (
        <ThemedText type='small' style={styles.errorText}>
          {errorMesage}
        </ThemedText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: { marginVertical: 10 },
  errorText: {
    color: CustomColors.danger,
    fontFamily: 'popins-regular'
  },
});