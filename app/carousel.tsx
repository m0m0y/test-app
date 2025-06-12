import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import SlideList from "@/components/ui/SlideList";

export default function FullScreenSlider() {
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <SlideList />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
});
