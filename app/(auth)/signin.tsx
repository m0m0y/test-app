import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions, Image, ImageBackground, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomColors, ColorsWithOpacity } from "@/constants/ColorScheme";
import { useRouter } from 'expo-router';
import { useAuthStore } from "@/store/useAuthStore";
import { useHeaderHeight } from '@react-navigation/elements';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import InputField from '@/components/ui/InputField';
import TextLink from '@/components/ui/TextLink';
import CustomButton from '@/components/ui/Button';
import ForgotPassword from './forgot-password';
import AlertModal from "@/components/ui/AlertModal";

// import { useCourseState } from "@/store/useCourseStore";
// import { useAuth } from "../../store/AuthContext";
// import axios from 'axios';
// import { handleLogin } from "@/src/api/auth";

interface ModalProps {
  alertShow: boolean;
  alertMessage: string | undefined;
}

type FieldKeys = 'email' | 'password';

type FormFieldsProps = {
  [key in FieldKeys]: string;
}

type FocusedProps = {
  [key in FieldKeys]: boolean;
}

export default function SigninScreen() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const onLogin = useAuthStore((state) => state.onLogin);

  const screenHeight = Dimensions.get('window').height;
  const keyboardOffset = Platform.OS === 'ios' ? headerHeight : 0;
  const backGroundImg = require('../../assets/images/dark-auth-bg.png');
  const logo = require('../../assets/images/nyc-logo.png');
  
  const [forgotModal, setForgotModal] = useState(false);
  const [alertModal, setAlertModal] = useState<ModalProps>({ 
    alertShow: false, 
    alertMessage: '' 
  });

  const [formData, setFormData] = useState<FormFieldsProps>({
    email: '',
    password: '',
  }); 
  const [isFocused, setIsFocused] = useState<FocusedProps>({
    email: false,
    password: false,
  });
  
  // For testing 
  // const { onLogin, isLoading } = useAuthStore();
  // const fetchCourse = useCourseState((state) => state.fetchCourse);

  // useEffect(() => {
  //   // Simulate invalid token for testing
  //   useAuthStore.getState().authToken = { accessToken: null, authenticated: false };
  //   axios.defaults.headers.common['Authorization'] = '';
  //   console.log("Invalid token set in auth store for testing");
  // }, []);

  // useEffect(() => {
  //   fetchCourse();
  // }, []);

  const handleSubmit = async () => {
    const result = await onLogin(formData.email, formData.password);
    // console.log(result);
    
    if(result && result.error) {
      setAlertModal({ alertShow: true, alertMessage: result.message, });
      console.log('Sign in message: ' + result.message);
    } else {
      router.replace("/(tabs)/home");
    }
  }

  const handleRegister = () => {
    router.push('/(auth)/registration');
  }

  // MODAL BUTTONS
  const alertCloseHandler = () => {
    setAlertModal({
      alertShow: false,
      alertMessage: ''
    });
    StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true);
  }
  
  const findAccountHandler = () => {
      
  }

  function handleChange(name: string, value: string) {
    setFormData({ ...formData, [name]: value });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const handleSubmit = async () => {
    // const result = await handleLogin(formData);
    // console.log(result.message);
    
    // let emailValidationMessage = result.message.email;
    // let passValidationMessage = result.message.password;

    // let newErrorMessage: FormFieldsProps = {};
    // let newErrorStyle: { [key: string]: boolean } = {};
    // let isValid = true;

    // if (!formData.email) {
    //   newErrorMessage.email = emailValidationMessage;
    //   newErrorStyle.email = true;
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrorMessage.email = emailValidationMessage;
    //   newErrorStyle.email = true;
    //   isValid = false;
    // }

    // if (!formData.password) {
    //   newErrorMessage.password = passValidationMessage;
    //   newErrorStyle.password = true;
    //   isValid = false;
    // }

    // if(result.message === "Invalid credentials") {
    //   setInvalidMessage(result.message);
    //   setAlertModal(true);
    //   isValid = false;
    // }
    
    // setErrorMessage(newErrorMessage);
    // setErrorStyle(newErrorStyle);

    // if (isValid) {
    //   try {
    //     await onLogin(formData.email || '', formData.password || '');
    //     console.log(formData.email);
        
    //     // router.replace('/(tabs)/home');
    //   } catch (error: any) {
    //       // Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred.');
    //     console.log(error.response?.data?.message);
    //   }
    // }
  // }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // console.log(isLoading);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardOffset} // Adjust the offset
        style={{ flex: 1, }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ThemedView style={styles.contentContainer}>

            {/* Image Contianer */}
            <View style={[
              styles.imageContainer, 
              { height: screenHeight * 0.6 }
            ]}>
              <ImageBackground
                source={backGroundImg} resizeMode="cover"
                style={styles.backgroundImage}
              >
                <Image
                  source={logo}
                  style={styles.logo}
                />
              </ImageBackground>
            </View>

            {/* Form Container */}
            <ThemedView style={styles.formWrapper}>

              <View style={styles.textContainer}>
                <View style={styles.subTitle}>
                  <Ionicons 
                    name="log-in" 
                    size={20} 
                    color={CustomColors.secondary}   
                  />
                  <ThemedText style={styles.subTitleText}>START TO SIGN IN</ThemedText>
                </View>
                <ThemedText type='title' style={{ lineHeight: 50, }}>Welcome 👋</ThemedText>
              </View>

              <View style={styles.formContainer}>
                <InputField
                  textLabel="Email or Username"
                  inputConfig={{
                    keyboardType: 'email-address',
                    value: formData.email,
                    onChangeText: (text) => handleChange('email', text),
                    autoCapitalize: 'none',
                    placeholder: 'Enter your email / username',
                    style: [
                      styles.textInput, 
                      isFocused.email && styles.textInputFocused
                    ],
                    onFocus: () => setIsFocused(prev => ({ ...prev, email: true })),
                    onBlur: () => setIsFocused(prev => ({ ...prev, email: false })),
                  }}
                />

                <InputField
                  textLabel="Password"
                  inputConfig={{
                    keyboardType: 'default',
                    secureTextEntry: true,
                    value: formData.password,
                    onChangeText: (text) => handleChange('password', text),
                    autoCapitalize: 'none',
                    placeholder: 'Enter password',
                    style: [
                      styles.textInput, 
                      isFocused.password && styles.textInputFocused
                    ],
                    onFocus: () => setIsFocused(prev => ({ ...prev, password: true })),
                    onBlur: () => setIsFocused(prev => ({ ...prev, password: false })),
                  }}
                />

                <View style={{ alignSelf: 'flex-end' }}>
                  <TextLink
                    text='Forgot Password?'
                    textStyle={styles.fogotTextLink}
                    onPress={() => setForgotModal(true)}
                  />
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  title='Login'
                  type='primary'
                  onPress={handleSubmit}
                  // buttonStyle={styles.button}
                  // textStyle={styles.buttonText}
                />
              </View>

              <View style={styles.textLinkContainer}>
                <ThemedText style={styles.textDesc}>
                  New on our platform?
                  {' '}
                  <ThemedText style={styles.highlightText} onPress={handleRegister} selectable={false} suppressHighlighting={true}>
                    Create an account
                  </ThemedText>
                </ThemedText>
              </View>

            </ThemedView>

          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* FOGRGOT MODAL */}
      {forgotModal && (
        <ForgotPassword
          visibility={forgotModal}
          fogotClose={() => setForgotModal(false)}
        />
      )}

      {/* ALERT MESSAGE MODAL */}
      {alertModal && (
        <AlertModal
          visibility={alertModal.alertShow}
          // messageAlertModal={() => alertModal}
          changeStatusBar={true}
          content={
            <>
              <Text style={{
                marginVertical: 5,
                fontFamily: 'popins-medium',
                fontSize: 14,
                textAlign: 'center',
                color: CustomColors.black,
              }}>
                {alertModal.alertMessage}
              </Text>
            </>
          }
          buttons={[
            { 
              buttonTitle: 'Try Again', 
              buttonType: 'outlineDark', 
              buttonOnpress: alertCloseHandler, 
            },
            { 
              buttonTitle: 'Find my Account', 
              buttonType: 'primary', 
              buttonOnpress: findAccountHandler,
            }
          ]}
          handleRequestClose={alertCloseHandler}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '78%',
    position: 'absolute',
  },

  formWrapper: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textContainer: {
    marginVertical: 5,
  },
  subTitle: {
    flexDirection: 'row',
  },
  subTitleText: {
    fontFamily: 'popins-bold', 
    color: CustomColors.secondary, 
  },
  textTitle: {
    fontFamily: 'popins-bold',
    fontSize: 30,
  },

  formContainer: {
    marginBottom: 5,
  },
  textInput: {
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: 'popins-regular',
    fontSize: 14,
  },
  textInputFocused: {
    borderWidth: 2,
    borderColor: ColorsWithOpacity(CustomColors.primary, 0.8), // Change to your preferred focus color
  },
  fogotTextLink: {
    fontSize: 14,
    fontFamily: 'popins-regular',
  },

  buttonContainer: {
    marginVertical: 5,
  },


  textLinkContainer: {
    marginVertical: 5,
    alignSelf: 'center',
  },
  textDesc: {
    fontFamily: 'popins-regular',
    fontSize: 15,
  },
  highlightText: {
    color: CustomColors.primary,
    fontFamily: 'popins-bold',
    textDecorationLine: 'underline',
  },
});

