import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import indexStyles from '@/styles/index-style';
import CustomButton from '@/components/ui/Button';

export default function Landing() {
    const router = useRouter();

    const handleTextLink = () => {
        router.push('/terms-condition');
    }

    const handleGetStart = () => {
        router.push('/carousel');
    }

    const handleRegister = () => {
        router.push('/(auth)/registration');
    }
    
    return (
        <SafeAreaView style={indexStyles.container}>
            <View style={indexStyles.imgContainer}>
                <Image source={require('../assets/images/nyc-logo.png')} style={indexStyles.imageLogo} />
            </View>

            <View style={indexStyles.contentContainer}>
                <View style={indexStyles.textContent}>
                    <Text style={indexStyles.textTitle}>
                        Welcome 👋
                    </Text>

                    <Text style={[indexStyles.textDescription]}>
                        Your journey to knowledge starts here! we’re dedicated to empowering learners and educators with a seamless, interactive, and effective platform for learning.
                    </Text>
                </View>

                <View style={indexStyles.buttonContainer}>
                    <CustomButton
                        title='Get Started'
                        type='primary'
                        onPress={handleGetStart} // Get start Button
                    />

                    <CustomButton
                        title='Register'
                        type='outlineDark'
                        onPress={handleRegister} // Registration Button
                    />
                </View>

                <View style={indexStyles.privacyContainer}>
                    <Text style={indexStyles.privacyContent}>
                        By signing up, you confirm to have read and agree to our
                        {' '}
                        <Text style={indexStyles.textHighlight} onPress={handleTextLink} selectable={false} suppressHighlighting={true}>
                        Terms and Data Privacy Consent
                        </Text>
                    </Text>
                </View>

                <View style={indexStyles.copyRightContainer}>
                    <Text style={indexStyles.copyRightText}>
                        ©2024 Copyright 2024 National Youth Commission | All Rights Reserved
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}