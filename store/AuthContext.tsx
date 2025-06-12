// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthProps } from "@/models/auth";
// import { UserProps } from "@/models/user";

// interface AuthState {
//     authToken?: AuthProps;
//     userInfo?: UserProps | null;
//     onLogin: (email: string, password: string) => Promise<any>;
//     onLogout: () => Promise<any>;
//     isLoading?: boolean | null;
// }

// const TOKEN_KEY = 'my-jwt';
// const baseURL = 'http://10.0.2.2:8000/api';
// const AuthContext = createContext<AuthState>({} as AuthState); // assertion to tell typescript that we know we're doing and that empty object will eventually be replaced by a valid AuthProps.


// export const useAuth = () => {
//     return useContext(AuthContext);
// }

// export const AuthProvider = ({children}: any) => {
//     const [isLoading, setLoading] = useState(false);
//     const [authToken, setAuthToken] = useState<AuthProps>({ 
//         accessToken: null, 
//         authenticated: false 
//     });
//     const [userInfo, setUserInfo] = useState<UserProps | null >(null);

//     useEffect(() => {
//         const loadToken = async () => {
//             setLoading(true);
//             try {
//                 const token = await AsyncStorage.getItem(TOKEN_KEY);
//                 const userObj = await AsyncStorage.getItem('userInfo');
    
//                 if (token) {
//                     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//                     setAuthToken({ accessToken: token, authenticated: true });
//                     if(userObj) {
//                         const user_data = JSON.parse(userObj);
//                         setUserInfo(user_data);
//                     }
//                     console.log("AuthContext:", token, "- (AUTHENTICATED)");
//                 } else {
//                     setAuthToken({ accessToken: null, authenticated: false });
//                     console.log("Retrieved Token:", token, "- (NOT AUTHENTICATED)");
//                 }
//             } catch (error: any) {
//                 setAuthToken({ accessToken: null, authenticated: false });
//                 console.log("AuthContext - Error loading token:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadToken();
//     }, []);

//     // // Update effect the authState for checking purpose only.
//     // useEffect(() => {
//     //     if (authState) {
//     //         console.log("Updated Auth State:", authState);
//     //     }
//     // }, [authState]);

//     const onLogin = async(email: string, password: string) => {
//         setLoading(true);
//         try {
//             const result = await axios.post(`${baseURL}/login`, { email, password });
//             const token = result.data.access_token;
//             const user_data = result.data.user_data as UserProps;

//             axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
//             await AsyncStorage.setItem(TOKEN_KEY, token);
//             await AsyncStorage.setItem('userInfo', JSON.stringify(user_data));

//             setAuthToken({ accessToken: token, authenticated: true, });
//             setUserInfo(user_data);

//             // console.log(authState);
//             // console.log(userInfo);

//             return result;
//         } catch(error: any) {
//             // console.log(error.response.data);
//             return { 
//                 error: true, 
//                 message: error.response.data.message
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     const onLogout = async() => {
//         try {
//             const result = await axios.post(`${baseURL}/logout`, {}, {
//                 headers: { Authorization: `Bearer ${ authToken.accessToken }` }
//             });
            
//             axios.defaults.headers.common['Authorization'] = '';
//             await AsyncStorage.removeItem(TOKEN_KEY);
//             await AsyncStorage.removeItem('userInfo');

//             setAuthToken({ accessToken: null, authenticated: false, });
//             setUserInfo(null);

//             // console.log(authState);
//             // console.log(userInfo);
            
//             return result;
//         } catch(error: any) {
//             return { 
//                 error: true, 
//                 message: error.response.data.message
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     const value = {
//         authToken,
//         userInfo,
//         onLogin,
//         onLogout,
//         isLoading,
//     };

//     return (
//         <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     );
// }

// export default AuthContext;