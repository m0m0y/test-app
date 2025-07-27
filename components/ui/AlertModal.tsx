import React from 'react';
import { StyleSheet, Modal, StatusBar, ViewStyle, TextStyle } from 'react-native';
import { CustomColors, ColorsWithOpacity } from "@/constants/ColorScheme";
import { ThemedView } from "@/components/ThemedView";
import { ButtonColors } from '@/constants/ButtonColors';

import CustomButton from '@/components/ui/Button';
type ButtonType = keyof typeof ButtonColors; // Define available button types

interface ButtonConfigProps {
    buttonTitle: string,
    buttonType?: ButtonType,
    buttonOnpress: () => void,
    buttonStyle?: ViewStyle,
    buttonTextStyle?: TextStyle,
}

interface MessageModalProps {
    visibility: boolean,
    messageAlertModal?: () => void;
    buttons: ButtonConfigProps[],
    changeStatusBar?: boolean, 
    content?: React.ReactNode,
    handleRequestClose: () => void,
}

export default function AlertModal(props: MessageModalProps) {
    // const handleSubmit = () => {
    //     console.log('clicked');
    // }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visibility}
            // onRequestClose={messageAlertModal ? handleCloseModal : undefined}
            onRequestClose={props.handleRequestClose}
            onShow={() => {
                if(props.changeStatusBar) {
                    StatusBar.setBackgroundColor(ColorsWithOpacity(CustomColors.dark, 0.50), true)
                }
            }}
            // onDismiss={() => 
            //     // StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true)
            //     console.log('asdasd')
            //     // StatusBar.setBackgroundColor(colorsWithOpacity(colors.light, 0), true)
            // }
        >
            <ThemedView style={styles.overlay}>
                <ThemedView style={styles.alertModalContainer}>
                    <ThemedView style={styles.textContainer}>
                        {/* {props.content ? 
                            <>{props.content}</> : 
                            null 
                        } */}
                        {props.content}
                    </ThemedView>

                    {props.buttons.length > 0 && (
                        <ThemedView style={styles.buttonContainer}>
                            {props.buttons.map((button, index) => (
                                <CustomButton
                                    key={index}
                                    title={button.buttonTitle}
                                    type={button.buttonType}
                                    onPress={button.buttonOnpress}
                                    buttonStyle={[styles.button, button.buttonStyle]}
                                    textStyle={[
                                        styles.buttonText, 
                                        button.buttonTextStyle
                                    ]}
                                />
                            ))}
                        </ThemedView>
                    )}
                </ThemedView>
            </ThemedView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: ColorsWithOpacity(CustomColors.dark, 0.50),
    },
    alertModalContainer: {
        width: '85%',
        borderRadius: 5,
        shadowColor: CustomColors.black,
        shadowOpacity: 10,
        shadowRadius: 3,
        elevation: 5,
    },

    textContainer: {
        padding: 24, 
        borderRadius: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: ColorsWithOpacity(CustomColors.secondary, 0.1),
        borderTopWidth: StyleSheet.hairlineWidth, 
        borderTopColor: 'lightgray',
        paddingTop: 10,
        gap: 5,
    },
    button: {
        paddingHorizontal: 15, 
        height: 45,
        // paddingTop: 10,
        // marginVertical: 4, 
        // width: '100%',
        // height: 40,
    },
    buttonText: {
        alignItems: 'center',
    }
})