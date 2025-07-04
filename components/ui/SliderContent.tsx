import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
const { width, height } = Dimensions.get('window');

interface SliderObj { 
    id?: string,
    title?: string,
    description?: string,
    backgroundColor?: string,
};

interface SlideProps {
    slidesItemData: SliderObj,
}

export default function SliderContent({ slidesItemData }: SlideProps) {
    return (
        <View style={[styles.slide]}>
            <Image
                source={{ uri: 'https://nyc-sk.com/assets/img/front-pages/landing-page/nyc-logo.png' }}
                style={styles.nycLogo}
            />

            <View style={styles.textContainer}>
                <ThemedText type='subtitle'>{slidesItemData.title}</ThemedText>
                <ThemedText type='default'>{slidesItemData.description}</ThemedText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slide: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    nycLogo: {
        position: 'relative',
        width: '100%',
        height: '25%',
        resizeMode: 'contain',
        marginBottom: 15,
    },
    textContainer: {
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    // textTitle: {
    //     fontSize: 28,
    //     color: 'black',
    //     fontFamily: 'popins-bold',
    //     marginBottom: 10,
    //     marginTop: 10,
    // },
    // textDescription: {
    //     fontSize: 16,
    //     color: 'black',
    //     fontFamily: 'popins-regular',
    //     textAlign: 'center',
    //     marginBottom: 10,
    // },
});