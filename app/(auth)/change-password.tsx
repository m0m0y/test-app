import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, colorsWithOpacity } from "@/constants/ColorScheme";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { PasswordRequired } from "@/constants/PasswordRequirements";
// import { AuthContext } from "../contexts/AuthContext";

import InputField from '@/components/ui/InputField';
import CustomButton from "@/components/ui/Button";
import SuccessModal from "./success-modal";

import { FormFieldsProps } from "@/models/changepass";

// type FormErrorMessage = Partial<Record<keyof FormFields, string>>; // Partial record of form values, making all fields optional.

export default function ChangPassword() {
  // validation checklist
  const [items, setItems] = useState(PasswordRequired);

  // default values of input type use for clear field after submission
  const initialFormValues = {
    oldPass: '',
    newPass: '',
    confirmPass: '',
  }

  const [formData, setFormData] = useState<FormFieldsProps>({});
  const [errorMessage, setErrorMessage] = useState<FormFieldsProps>({});
  const [errorStyle, setErrorStyles] = useState<{ [key: string]: boolean }>({});
  const [successModal, setSuccessModal] = useState(false);

  function handleChange(name: string, value: string) {
    setFormData({ ...formData, [name]: value });
    setErrorMessage({ ...errorMessage, [name]: '' });
    setErrorStyles({ ...errorStyle, [name]: false });
  }

  const handleSubmit = () => {
    let newErrorMessage: FormFieldsProps = {};
    let newErrorStyle: { [key: string]: boolean } = {};
    let isValid = true;

    if (!formData.oldPass?.trim()) {
      newErrorMessage.oldPass = "Please input your old password!";
      newErrorStyle.oldPass = true;
      isValid = false;
    }

    if (!formData.newPass?.trim()) {
      newErrorMessage.newPass = "Input your new password!";
      newErrorStyle.newPass = true;
      isValid = false;
    }

    if (!formData.confirmPass?.trim()) {
      newErrorMessage.confirmPass = "Please confirm your password!";
      newErrorStyle.confirmPass = true;
      isValid = false;
    } else if (formData.newPass !== formData.confirmPass) {
      newErrorMessage.confirmPass = "The Password didn't match, Please try again!";
      newErrorStyle.newPass = true;
      newErrorStyle.confirmPass = true;
      isValid = false;
    }

    // validation of required characters
    const hasFalse = items.some(item => !item.checked); // get the value of checked items

    if (hasFalse === true) {
      newErrorMessage.newPass = "Please double check your password!";
      newErrorStyle.newPass = true;
      isValid = false;
    } else if (isValid) {
      // Alert.alert('Form Submitted', JSON.stringify(formData));
      setFormData(initialFormValues); // clear input fields
      setSuccessModal(true); // open success message modal
    }

    // set value to useState
    setErrorMessage(newErrorMessage);
    setErrorStyles(newErrorStyle);
  }

  const validatePassword = (text: string) => {
    handleChange('newPass', text);

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

  function handlerSuccessClose() {
    setSuccessModal(false);
  }

  useEffect(() => {
    if(!formData.newPass) {
      setItems((checkItems) => 
        checkItems.map((item) => ({ ...item, checked: false }))
      )
    }
  }, [formData.newPass])

  // const val = useContext(AuthContext);
  // console.log(val);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ThemedView style={styles.contentContainer}>
            <View style={styles.formContainer}>
              {/* old password field */}
              <InputField
                textLabel="Old Password"
                inputConfig={{
                  keyboardType: 'default',
                  secureTextEntry: true,
                  value: formData.oldPass,
                  onChangeText: (text) => handleChange('oldPass', text),
                  autoCapitalize: 'none',
                  placeholder: 'Enter your old password',
                  style: [
                    styles.textInput,
                    errorStyle.oldPass && { borderColor: colors.danger }
                  ]
                }}
                errorMesage={errorMessage.oldPass}
              />

              <InputField
                textLabel="New Password"
                inputConfig={{
                  keyboardType: 'default',
                  secureTextEntry: true,
                  value: formData.newPass,
                  onChangeText: validatePassword,
                  autoCapitalize: 'none',
                  placeholder: 'Your new password',
                  style: [
                    styles.textInput,
                    errorStyle.oldPass && { borderColor: colors.danger }
                  ]
                }}
                errorMesage={errorMessage.newPass}
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
                textLabel="Confirm Password"
                inputConfig={{
                  keyboardType: 'default',
                  secureTextEntry: true,
                  value: formData.confirmPass,
                  onChangeText: (text) => handleChange('confirmPass', text),
                  autoCapitalize: 'none',
                  placeholder: 'Please confirm your password',
                   style: [
                    styles.textInput,
                    errorStyle.oldPass && { borderColor: colors.danger }
                  ]
                }}
                errorMesage={errorMessage.confirmPass}
              />

            </View>
          </ThemedView>
        </TouchableWithoutFeedback>


        <ThemedView style={styles.buttonContainer}>
          <CustomButton
            title='Save Password'
            type='primary'
            onPress={handleSubmit}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            />
        </ThemedView>

        {successModal && (
          <SuccessModal
          visibility={successModal}
          successOnClose={handlerSuccessClose}
          content= {
            <>
              <Ionicons 
                name="lock-closed" 
                size={90} 
                color={colorsWithOpacity(colors.secondary, 0.65)} 
              />

              <ThemedText type='subtitle' style={{ lineHeight: 40, }}>
                  Password Successfully Updated 🔑
              </ThemedText>

              <ThemedText type='description'>
                  {`Your password has been successfully updated. For security reasons, we recommend that you keep your new password secure to avoid the need for frequent resets. \n\n Please log in now to explore the full range of features available on our main page.`}
              </ThemedText> 
            </>
          }
          buttonTitle='Okay, go to Login'
        />
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },

  contentContainer: {
    flex: 1,
    // backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },

  formContainer: {
    // borderWidth: 1,
    marginBottom: 0,
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

  textInput: {
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: 'popins-regular',
    fontSize: 14,
  },

  buttonContainer: {
    padding: 20,
    // backgroundColor: 'white',
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


  // textTitle: {
  //   fontFamily: 'popins-bold',
  //   fontSize: 28,
  //   width: '100%',
  // },
  // textDesc: {
  //   fontFamily: 'popins-medium',
  //   fontSize: 16,
  // },
})