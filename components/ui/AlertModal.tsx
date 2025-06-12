import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, StatusBar, Pressable, ViewStyle, TextStyle } from 'react-native';
import { colors, colorsWithOpacity } from "@/constants/ColorScheme";

import CustomButton from '@/components/ui/Button';

interface ButtonConfigProps {
    buttonTitle: string,
    buttonType?: string,
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
                        StatusBar.setBackgroundColor(colorsWithOpacity(colors.dark, 0.50), true)
                    }
                }
            }
            // onDismiss={() => 
            //     // StatusBar.setBackgroundColor('rgba(253, 254, 255, 0)', true)
            //     console.log('asdasd')
            //     // StatusBar.setBackgroundColor(colorsWithOpacity(colors.light, 0), true)
            // }
        >
            <View style={styles.overlay}>
                <View style={styles.alertModalContainer}>
                    <View style={styles.textContainer}>
                        {props.content ? ( <View style={{}}>{props.content}</View> ) : null }
                    </View>

                    {props.buttons.length > 0 && (
                        <View style={styles.buttonContainer}>
                            {props.buttons.map((button, index) => (
                                <CustomButton
                                    key={index}
                                    title={button.buttonTitle}
                                    type={button.buttonType ? 'outlineDark' : 'primary'}
                                    onPress={button.buttonOnpress}
                                    buttonStyle={styles.button}
                                    textStyle={[styles.buttonText, button.buttonTextStyle]}
                                />
                            ))}
                        </View>
                    )}                    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: colorsWithOpacity(colors.dark, 0.50),
    },
    alertModalContainer: {
        backgroundColor: colors.white,
        width: '75%',
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOpacity: 10,
        shadowRadius: 3,
        elevation: 5,
    },

    textContainer: {
        backgroundColor: colors.white, 
        padding: 24, 
        borderRadius: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colorsWithOpacity(colors.secondary, 0.1),
        borderTopWidth: StyleSheet.hairlineWidth, 
        borderTopColor: 'lightgray',
        // borderWidth: 1,
        height: 50,
    },
    button: {
        paddingTop: 10,
        paddingHorizontal: 20, 
        marginVertical: 4, 
        // textAlign: 'center',
        // borderWidth: 1,
        width: '100%',
        height: 40,
    },
    buttonText: {
        alignItems: 'center',
    }
})