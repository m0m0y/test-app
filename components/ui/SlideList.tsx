import React, { useRef, useState } from 'react';
import { View, Dimensions, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { slides } from '@/components/data/sildeData';
import { useColorScheme } from '@/hooks/useColorScheme';

import CustomButton from '@/components/ui/Button';
import SliderContent from '@/components/ui/SliderContent';

const { width } = Dimensions.get('window');

export default function SlideList() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    function renderSliderContent(slideItems: { item: { id: string; title: string; description: string; backgroundColor: string; }; }) {
        return <SliderContent slidesItemData={slideItems.item} /> // convert this slidesData to array
    }

    function paginationDots() {
        return (
            <View style={styles.dotContainer}>
                {slides.map((_, index) => (
                    <View key={index} style={[
                        styles.dot, 
                        colorScheme === 'dark' ? 
                            index === currentIndex ? { backgroundColor: 'white' } : { backgroundColor: '#8f8f8f' } : 
                            index === currentIndex ? { backgroundColor: 'black' } : { backgroundColor: '#dedede' },
                    ]} />
                ))}
            </View>
        );
    }

    function handlerSkip() {
        router.replace('/(auth)/signin');
    }

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderSliderContent}
                // renderItem={({ item }) => (
                //     <View style={[styles.slide]}>
                //         <Text style={styles.textTitle}>{item.title}</Text>
                //         <Text style={styles.text}>{item.desc}</Text>
                //     </View>
                // )}
                onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />

            {/* Pagination Dots */}
            {paginationDots()}

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
                <CustomButton
                    title='Skip'
                    type={ colorScheme === 'dark' ? 'outlineLight' : 'outlineDark'}
                    onPress={handlerSkip} // Correct path
                    // buttonStyle={styles.button}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    dotContainer: {
        position: 'absolute',
        bottom: 170,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },

    buttonContainer: {
        width: '85%',
        marginHorizontal: 30,
        position: 'absolute',
        bottom: 25,
    },
    // button: {
    //     borderRadius: 100,
    //     padding: 10,
    //     borderWidth: 1,
    // },
    // buttonText: {
    //     height: 24,
    //     fontFamily: 'popins-regular',
    //     fontSize: 16,
    //     textAlign: 'center',
    // },
})