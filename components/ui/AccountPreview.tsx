import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRegistrationStore } from '@/store/useRegistrationStore';
import { ThemedView } from '../ThemedView';
import { CustomColors } from '@/constants/ColorScheme';

import CustomButton from './Button';

export default function AccountPreview() {
  const { currentStep, nextStep, prevStep } = useRegistrationStore();

  const handlerNextButton = () => {
    nextStep();
  }

  const handlerPrevButton = () => {
    prevStep();
  }

  return (
    <>
      <View style={styles.formContainer}>
        <Text>Test</Text>
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

  buttonContainer: {
    marginVertical: 13,
    marginHorizontal: 24,
  }
})