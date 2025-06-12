import React, { useEffect } from 'react';
import { Stack, useRootNavigationState, useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
// import { useAuthStore } from '@/store/useAuthStore';

export default function IndexScreen() {
  
  // const router = useRouter();
  // const rootNavigationState = useRootNavigationState();
  // const hasHydrated = useAuthStore((state) => state.hasHydrated);
  // const isAuthenticated = useAuthStore((state) => state.authToken?.authenticated);

  // useEffect(() => {
  //   if (!hasHydrated || !rootNavigationState?.key) return;

  //   if (isAuthenticated) {
  //     router.replace('/(tabs)/home');
  //   } else {
  //     router.replace('/landing');
  //   }
    
  // }, [hasHydrated, rootNavigationState?.key, isAuthenticated]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    </>
  );
}


// import React, { useEffect } from 'react';
// import { View, Text, Image, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter, Redirect } from 'expo-router';
// import indexStyles from '@/styles/index-style';
// import CustomButton from '@/components/ui/Button';
// import { useAuthStore } from '@/store/useAuthStore';
// // import { useAuth } from './contexts/AuthContext';

// export default function Index() {
//     const router = useRouter();
//     const isAuthenticated  = useAuthStore((state) => state.authToken?.authenticated);
//     const hasHydrated = useAuthStore((state) => state.hasHydrated); // Zustand persistence
//     // const { authState } = useAuth();

//     function textLinkHandler() {
//         router.push('/terms-condition');
//     }

//     // check the authState if true to display the Loading screen. To prevent the showing the UI of index when re-open the app.
//     // if(isAuthenticated) {
//     //     return (
//     //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     //           <ActivityIndicator size="large" />
//     //         </View>
//     //     );
//     // }
    
//     return (
//       <SafeAreaView style={indexStyles.container}>

//         <View style={indexStyles.imgContainer}>
//             <Image source={require('../assets/images/nyc-logo.png')} style={indexStyles.imageLogo} />
//         </View>

//         <View style={indexStyles.contentContainer}>
//             <View style={indexStyles.textContent}>
//                 <Text style={indexStyles.textTitle}>
//                     Welcome 👋
//                 </Text>

//                 <Text style={indexStyles.textDescription}>
//                     Your journey to knowledge starts here! we are dedicated to empowering learners and educators with a seamless, interactive, and effective platform for learning.
//                 </Text>
//             </View>

//             <View style={indexStyles.buttonContainer}>
//                 <CustomButton
//                     title='Get Started'
//                     type='primary'
//                     onPress={() => router.push('/carousel')} // Correct path
//                     buttonStyle={indexStyles.button}
//                     textStyle={indexStyles.buttonText}
//                 />

//                 <CustomButton
//                     title='Register'
//                     type='outlineDark'
//                     onPress={() => console.log('test')}
//                     buttonStyle={indexStyles.button}
//                     textStyle={indexStyles.buttonText}
//                 />
//             </View>

//             <View style={indexStyles.privacyContainer}>
//                 <Text style={indexStyles.privacyContent}>
//                     By signing up, you confirm to have read and agree to our
//                     {' '}
//                     <Text style={indexStyles.textHighlight} onPress={textLinkHandler} selectable={false} suppressHighlighting={true}>
//                     Terms and Data Privacy Consent
//                     </Text>
//                 </Text>
//             </View>

//             <View style={indexStyles.copyRightContainer}>
//                 <Text style={indexStyles.copyRightText}>
//                     ©2024 Copyright 2024 National Youth Commission | All Rights Reserved
//                 </Text>
//             </View>
//         </View>

//       </SafeAreaView>
//     )
// }