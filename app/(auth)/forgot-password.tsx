import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomColors } from '@/constants/ColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomSheetModal, BottomSheetView, } from '@gorhom/bottom-sheet';

import CustomButton from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import TextLink from '@/components/ui/TextLink';
import SuccessModal from "./success-modal";

interface ModalProps {
  visibility: boolean,
  fogotClose: () => void,
}

export default function ForgotPassword({ visibility, fogotClose }: ModalProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [errorStyle, setErrorStyle] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleChange(text: string) {
    setEmail(text);
    setErrorMessage(undefined);
    setErrorStyle(false);
  }  

  const handleSubmit = () => {
    let isValid = true;

    if (!email) {
      setErrorMessage("Input your email first");
      setErrorStyle(true);
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address!");
      setErrorStyle(true);
      isValid = false;
    }

    if (isValid) {
      setEmail('');
      setSuccessModal(true);
    }
  }

  function handlerSuccessClose() {
    setSuccessModal(false);
    fogotClose();
  }

  function hanlderChangePass() {
    router.push('/change-password');
    fogotClose();
  }

  useEffect(() => {
    if (visibility && bottomSheetRef.current) {
      bottomSheetRef.current.present();
    } else if (!visibility && bottomSheetRef.current) {
      bottomSheetRef.current.dismiss();
    }
  }, [visibility]);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['90%']}
        backgroundStyle={{ 
          backgroundColor: colorScheme === 'dark' ? 
          Colors.dark.background : 
          Colors.light.background, 
        }}
        onDismiss={fogotClose}
        backdropComponent={({ style }) => (
          <View style={[
            style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
          ]} />
        )}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
          <BottomSheetView style={{ flex: 1 }}>
            <ThemedView style={styles.modalContainer}>
              <Image 
                source={require('../../assets/images/nyc-logo.png')} 
                style={styles.imageLogo} 
              />

              <View style={styles.textContainer}>
                <ThemedText type='title' style={{ lineHeight: 50, }}>
                  Forgot Password👋
                </ThemedText>
                <ThemedText style={styles.modalText}>
                  Enter your email and we'll reset your password
                </ThemedText>
              </View>

              <InputField
                textLabel='Email Address'
                inputConfig={{
                  keyboardType: 'email-address',
                  value: email,
                  onChangeText: (text) => handleChange(text),
                  autoCapitalize: 'none',
                  placeholder: 'Enter your email',
                  style: [
                    errorStyle && { borderColor: CustomColors.danger }
                  ]
                }}
                errorMesage={errorMessage}
              />

              <View style={styles.textContainer}>
                <ThemedText style={[ styles.modalText, { textAlign: 'center', marginVertical: 5, lineHeight: 18 } ]}>
                  For a quick and easier solution, simply change your password.
                  {" "}
                  <TextLink
                    text='Change Password'
                    textStyle={styles.textHighlight}
                    onPress={hanlderChangePass}
                    style={{ marginTop: 20 }}
                  />
                </ThemedText>
              </View>
              
            </ThemedView>
            
            <ThemedView style={styles.buttonContainer}>
              <CustomButton
                title='Send Password'
                type='primary'
                onPress={handleSubmit}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
              />
            </ThemedView> 

          </BottomSheetView>
        </TouchableWithoutFeedback>
      </BottomSheetModal>

      {successModal && (
        <SuccessModal
          visibility={successModal}
          successOnClose={handlerSuccessClose}
          content= {
            <>
              <Ionicons name="mail-open" size={80} color={CustomColors.primary} />
              <ThemedText type='title' style={{ lineHeight: 40, }}>Password has been sent to your email. 🔑</ThemedText>
              <ThemedText type='description'>Kindly check your inbox and make sure you entered the correct email.</ThemedText> 
            </>
          }
          buttonTitle='Login Account'
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },

  imageLogo: {
    width: 254,
    height: 88.28,
    marginHorizontal: '-3%',
    marginVertical: 8,
  },

  textContainer: {
    marginVertical: 8,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'popins-regular',
  },
  textHighlight: {
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'popins-semibold',
  },

  buttonContainer: {
    padding: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'lightgray',
  },
  button: {
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
  },
  buttonText: {
    height: 24,
    fontFamily: 'popins-regular',
    fontSize: 16,
    textAlign: 'center',
  },
});