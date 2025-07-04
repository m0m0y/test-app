import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Animated, Easing, Text, useAnimatedValue, } from 'react-native';
import { ColorsWithOpacity, CustomColors } from '@/constants/ColorScheme';
import { useRegistrationStore } from '@/store/useRegistrationStore';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { headerTitle } from '@/components/data/registrationHeaderText';

import AccountDetails from '@/components/ui/AccountDetails';
import AccountInformation from '@/components/ui/AccountInformation';
import AccountPreview from '@/components/ui/AccountPreview';
import CustomButton from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function registration() {
    const colorScheme = useColorScheme();
    const { currentStep, nextStep, prevStep } = useRegistrationStore();
    const totalSteps = 3;
    const progressPercentage = (currentStep / totalSteps) * 100;
    const [activeNumber, setActiveNumber] = useState(false);

    const titleTextAnim = useRef(new Animated.Value(1)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const formAnim = useRef(new Animated.Value(0)).current;
    const selectedTitle = headerTitle.find(step => step.id === currentStep);

    useEffect(() => {
        // Create and start animations directly
        const parallelAnimation  = Animated.parallel([
            // Title text animation
            Animated.sequence([
                Animated.timing(titleTextAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                // After fade out, fade in new text
                Animated.timing(titleTextAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]),

            // Progress animation
            Animated.sequence([
                Animated.timing(progressAnim, {
                    toValue: progressPercentage,
                    duration: 800, // 800ms animation
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth easing
                    useNativeDriver: false, // width animation requires layout
                })
            ]),

            // Form Animations
            Animated.sequence([
                Animated.timing(formAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(formAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]),
        ]);

        parallelAnimation.start();

        // Cleanup function
        return () => {
            parallelAnimation.stop();
        };

    }, [currentStep, progressPercentage]);

    // Progressbar width animation
    const animatedWidth = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp'
    });

    const getStepStyle = (stepNumber: number) => {
        if (stepNumber < currentStep) {
            // Completed step - green with checkmark
            return {
                backgroundColor: CustomColors.success, // Green color
                content: <Ionicons name='checkmark-done' size={24} />,
                textColor: 'white'
            };
        } else if (stepNumber === currentStep) {
            // Current active step - primary color with number
            return {
                backgroundColor: CustomColors.primary,
                content: stepNumber.toString(),
                textColor: 'white'
            };
        } else {
            // Future step - gray with number
            return {
                backgroundColor: ColorsWithOpacity(CustomColors.secondary, 0.2),
                content: stepNumber.toString(),
                textColor: CustomColors.secondary,
            };
        }
    }

    const NumberCircle = ({ number }: any) => {
        const stepStyle = getStepStyle(number);

        return (
            <Animated.View 
                style={[
                    styles.numberWrapper,
                    { backgroundColor: stepStyle.backgroundColor },
                ]}
            >
                <ThemedText 
                    type='defaultSemiBold'
                    style={{ color: stepStyle.textColor }}
                >
                    {stepStyle.content}
                </ThemedText>
            </Animated.View>
        );
    }
    
    return (
        <ThemedView style={styles.container}>
            {/* Header Content */}
            <View 
                style={[
                    styles.headerContainer,
                    { 
                        backgroundColor: colorScheme === 'dark' ?
                        '#303459' :
                        ColorsWithOpacity(CustomColors.secondary, 0.04),
                    }
                ]}
            >
                <View style={styles.headerWrapper}>
                    <View style={styles.titleContainer}>

                        {/* Number of step in right */}
                        <View style={styles.numberContainer}>
                            {Array.from({ length: currentStep }, (_, i) => (
                                <NumberCircle key={`completed-${i + 1}`} number={i + 1} />
                            ))}
                        </View>
                       
                        <Animated.View 
                            style={[
                                styles.textTitleWrapper,
                                { opacity: titleTextAnim }
                            ]}
                        >
                            <ThemedText type='defaultSemiBold'>
                                {selectedTitle?.title}
                            </ThemedText>
                            <ThemedText type='small'>
                                {selectedTitle?.subtitle}
                            </ThemedText>
                        </Animated.View>
                    </View>

                    {/* Number of step in left */}
                    <View style={styles.numberContainer}>
                        {currentStep < 3 && 
                            Array.from({ length: 3 - currentStep }, (_, i) => (
                                <NumberCircle key={`remaining-${currentStep + i + 1}`} number={currentStep + i + 1} />
                            ))
                        }
                    </View>
                </View>
            </View>

            {/* Progress Bar */}
            <ThemedText style={styles.progressBackground}>
                <Animated.View  
                    style={[
                        styles.progressFill, 
                        { width: animatedWidth },
                    ]} 
                />
            </ThemedText>

            {/* Registration Form */}
            <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : undefined}
               keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust the offset 
               style={{ flex: 1 }}
            >
                <ScrollView keyboardShouldPersistTaps="handled">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Animated.View style={{ opacity: formAnim }}>
                            {currentStep === 1 &&  <AccountDetails />}
                            {currentStep === 2 &&  <AccountInformation />}
                            {currentStep === 3 &&  <AccountPreview />}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: { 
        paddingHorizontal: 15, 
        paddingVertical: 18, 
        // backgroundColor: '#F8F8F8', 
        // marginBottom: 10,
        // borderBottomWidth: 5,
        // borderBottomColor: CustomColors.primary,
        // borderStartWidth: 50,
    },

    headerWrapper: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },

    titleContainer: { 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
    },

    numberContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        gap: 5, 
    },
    numberWrapper: {
        // backgroundColor: ColorsWithOpacity(CustomColors.secondary, 0.20), 
        width: 40, 
        height: 40,
        borderRadius: 25,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    
    textTitleWrapper: { 
        flexDirection: 'column', 
        marginHorizontal: 10, 
    },
    
    progressBackground: {
        height: 6,
    },
    progressFill: {
        height: '100%',
        backgroundColor: CustomColors.primary,
        minWidth: 6, // Minimum width para makita kahit step 1
    },
});