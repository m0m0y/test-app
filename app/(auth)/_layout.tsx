import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useContext } from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] =  useFonts(Fonts);
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack 
          screenOptions={{ 
            // headerShown: false,
            headerTitleStyle: { 
              fontFamily: 'popins-semibold'
            },
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
            },
            headerTitleAlign: 'left',
          }}
        >

          <Stack.Screen 
            name="signin" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="forgot-password" 
            options={{ 
              headerShown: false, 
              presentation: 'modal' 
            }} 
          />

          {/* Customize Header */}
          <Stack.Screen 
            name="change-password" 
            options={{ 
              // animation: 'slide_from_bottom',
              headerShown: true, 
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.push('/landing')}>
                    <Ionicons name="arrow-back-outline" size={24} style={{ 
                      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text, 
                    }} />
                  </TouchableOpacity>
              ),
              headerTitle: () => (
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <ThemedText style={{ fontSize: 19, fontFamily: 'popins-semibold' }}>Change Password</ThemedText>
                </View>
              ),
            }}
          />

          <Stack.Screen 
            name="registration"
            options={{
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.push('/landing')}>
                  <Ionicons name="arrow-back-outline" size={24} style={{ 
                    color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text, 
                  }} />
              </TouchableOpacity>
              ),
              headerTitle: () => (
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <ThemedText style={{ fontSize: 19, fontFamily: 'popins-semibold' }}>
                    Register
                  </ThemedText>
                </View>
              ),
              headerShadowVisible: false,
            }}
          />

          {/* <Stack.Screen 
            name="success" 
            options={{ 
              headerShown: false,
              presentation: 'modal' 
            }} 
          /> */}
        </Stack>
              
        <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
