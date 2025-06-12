// import config from '@/src/api/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useRouter } from 'expo-router';

// // interface AuthResponse {
// //     access_token: string;
// //     user: [];
// //     // Add other properties from your API response here
// // }

// export const handleLogin = async (formData: any) => {
//     try {
//         const response = await config.post('/login', formData);
//         const { access_token, user } = response.data;

//         await AsyncStorage.setItem('authToken', access_token);
//         await AsyncStorage.setItem('userData', JSON.stringify([user]));

//         return response.data; // Return the entire response data
        
//         // router.replace("/(tabs)/home");

//         // if (response.status === 200) {
//         //     const { access_token } = response.data;
//         //     const { user } = response.data;

//         //     await AsyncStorage.setItem('authToken', access_token);
//         //     await AsyncStorage.setItem('userData', JSON.stringify([user]));
//         //     // console.log(user);
//         //     router.replace("/(tabs)/home");
//         //     return true;
//         // } else {
//         //     console.log();
//         //     return false;
//         // }
//     } catch (error: any) {
//         if (error.response) {
//             return error.response.data; // Return error data
//         } else {
//             return {message: "Network Error"};
//         }
//     }
// }