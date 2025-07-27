import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'; 
import { useFonts } from 'expo-font';
import { Stack, useRootNavigationState, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Fonts } from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { useAuthStore } from '@/store/useAuthStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts(Fonts);
  const router = useRouter();

  const rootNavigationState = useRootNavigationState();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.authToken?.authenticated);

  useEffect(() => {
    if (!hasHydrated || !rootNavigationState?.key) return;

    if (isAuthenticated) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/landing');
    }
    
  }, [hasHydrated, rootNavigationState?.key, isAuthenticated]);
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  
  if (!loaded) {
    return null;
  }
  
return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <AuthProvider> */}
        <Stack // Stack is rendered here, within RootLayoutInner
          screenOptions={{
            headerShown: false,
            headerTitleStyle: { 
              fontFamily: 'popins-semibold'
            },
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
            }
          }}
        >
          <Stack.Screen name="landing" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" 
            options={{ 
              headerShown: false,
              gestureEnabled: false, 
          }} />
          <Stack.Screen name="(tabs)" 
            options={{ 
              headerShown: false,
              gestureEnabled: false, // disabled the back button in home screen after login
          }} />
          <Stack.Screen
            name="terms-condition"
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
                <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row' }}>
                  <ThemedText type='headerTitle'>
                    Terms and Condition
                  </ThemedText>
                </View>
              ),
            }}
          />
          <Stack.Screen name="carousel" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        {/* </AuthProvider> */}
        <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts(Fonts);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <SafeAreaProvider>
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         <AuthProvider>
//           <RootLayoutInner />
//         </AuthProvider>
//         <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
//       </ThemeProvider>
//     </SafeAreaProvider>
//   );
// }