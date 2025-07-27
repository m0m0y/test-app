import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Keyboard } from 'react-native';
import { useGenerateRandomCharacters } from '@/hooks/useGenerateRandCharacters'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '@/services/api';

const baseURL = 'http://10.0.2.2:8000/api';

// Step 1: Account Details
interface LocationProps {
    island?: string;
    region?: string;
    province?: string;
    municipality?: string;
    barangay?: string;
}

interface AccountDetailsProps {
    island?: string;
    region?: string;
    province?: string;
    municipality?: string;
    barangay?: string;
    email?: string;
    otp?: string;
    username?: string;
    birthday?: string; // Changed to string for consistency
    age?: string;
    password?: string;
    confirmPass?: string;
    file?: string;
}

interface RegistrationState {
    currentStep: number;

    // Form data
    accountDetails: AccountDetailsProps;

    // Validation Mesages
    validationMessages: AccountDetailsProps;
    hasAttemptedSubmit: boolean;
    validModal: boolean;

    // Verfied state
    isEmailVerified: boolean;
    isUsernameVerified: boolean;
    isOTPVerified: boolean | undefined;

    // Loading states
    isLoading: boolean;
    isSubmitting: boolean;

    // Error handling
    step1Errors: Record<string, string>;
    generalError: string | null;

    // Success state
    isRegistered: boolean;
    registeredUser: any;

    // Modal state
    otpModal: boolean;
    timeLeft: number;
    timeInterval: any;
    
    disabledEmail: boolean | undefined;
    disabledUsername: boolean | undefined;

    recentlyVerified: string | null, // 'username' | 'email' | null

    // Steps Navigations Actions
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;

    // Form Actions
    setLocationValues: (locationData: LocationProps) => void;
    setAccountDetails: (field: keyof AccountDetailsProps, value: string) => void;

    // Update Button Action
    handleUpdateEmail: () => void;
    handleUpdateUsername: () => void;

    // Error Actions
    clearValidationMessage: (field: keyof AccountDetailsProps) => void;
    setGeneralError: (error: string | null) => void;
    // setValidationMessages: (message: AccountDetailsProps) => void;
    // clearAllValidationMessages: () => void;
    // clearAllFieldsValue: () => void;

    // setStep1Errors: (errors: Record<string, string>) => void;
    // setGeneralError: (error: string | null) => void;
    // clearAllErrors: () => void;

    // Validation Actions
    // validateStep1: () => boolean;
    handleValidateEmail: (email: string) => void;
    handleValidateUsername: (username: string) => void;
    validateAccountField: (field: keyof AccountDetailsProps, value: string) => string | null;
    validateOTP: (code: string) => void;
    closeValidModal: () => void;

    // OTP Modal Action
    resendOTP: () => void;
    closeOtpModal: () => void;
    startTimer: (initialTime: number) => void;
    stopTimer: () => void;
    clearTimer: (second: number) => void;

    setRecentlyVerified: (val: string) => void,
    // setdisabledEmail: () => void;

    // Registration Actions
    submitRegistration: () => Promise<void>;

    // Draft Actions
    saveDraft: () => void;
    loadDraft: () => void;
    clearDraft: () => void;

    // Clear/Reset states
    resetRegistration: () => void;
}

const initialState = {
    currentStep: 1,
    accountDetails: {},
    // personalInfo: {},
    validationMessages: {},
    hasAttemptedSubmit: false,
    validModal: false,
    isEmailVerified: false,
    isUsernameVerified: false,
    isOTPVerified: undefined,
    isLoading: false,
    isSubmitting: false,
    step1Errors: {},
    // step2Errors: {},
    generalError: null,
    isRegistered: false,
    registeredUser: null,
    otpModal: false,
    timeLeft: 0,
    timeInterval: null,
    disabledEmail: undefined,
    disabledUsername: undefined,
    recentlyVerified: null,
};


export const useRegistrationStore = create<RegistrationState>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,
                
                //==============================================================//
                //======================== Steps Actions =======================//
                //==============================================================//
                nextStep: () => {
                    const { 
                        currentStep, 
                        accountDetails, 
                        validateAccountField,
                        isUsernameVerified,
                        isOTPVerified
                    } = get();
                    const validationMessage: AccountDetailsProps = {};
                    let isValid = true;

                    const fieldsToValidate: (keyof AccountDetailsProps)[] = [
                        'island', 'region', 'province', 'municipality', 'barangay',
                        'email', 'username', 'birthday', 'password', 'confirmPass', 'file'
                    ];

                    fieldsToValidate.forEach(field => {
                        const value = accountDetails[field] || '';
                        const errorMessage = validateAccountField(field, value);

                        if (errorMessage) {
                            validationMessage[field as keyof AccountDetailsProps] = errorMessage;
                            isValid = false;
                            return;
                        }
                    });

                    // Validation message if username and email is not already validate
                    if (accountDetails.email && !isOTPVerified) {
                        validationMessage.email = 'Please validate your email'
                    }

                    if (accountDetails.username && !isUsernameVerified) {
                        validationMessage.username = 'Please validate your username'
                    }
                    
                    set({ validationMessages: validationMessage });

                    if (currentStep === 1 && isValid) {
                        set({ currentStep: 2 });
                    }
                    
                    // =======================================================//
                    // const { currentStep, validateStep1, } = get();

                    // set({ hasAttemptedSubmit: true });

                    // if (currentStep === 1 && validateStep1()) {
                    //     set ({ currentStep: 2, hasAttemptedSubmit: false });
                    //     // get().saveDraft(); // Save progress
                    // } else if ( currentStep === 2 ) {
                    //     set({ currentStep: 3 }); // Preview step
                    // }
                },

                prevStep: () => {
                    const { currentStep } = get();
                    if (currentStep > 1) {
                        set({ 
                            currentStep: currentStep - 1,
                            hasAttemptedSubmit: false,
                            validationMessages: {}
                        });
                    }
                },

                goToStep: (step) => {
                    set({ 
                        currentStep: step,
                        hasAttemptedSubmit: false,
                        validationMessages: {}
                    });
                },

                //===============================================================//
                //========================= Form Actions ========================//
                //===============================================================//
                setLocationValues: (locationData) => {
                    const { validationMessages } = get();

                    set((state) => ({
                        accountDetails: { ...state.accountDetails, ...locationData }
                    }));

                    // Iterate over all key-value pairs for removing error message when user select in dropdown.
                    Object.entries(locationData).forEach(([key, value]) => {
                        if (value) {
                            validationMessages[key as keyof typeof validationMessages] = '';
                        }
                    });
                },

                setAccountDetails: (field, value) => {
                    set((state) => ({
                        accountDetails: { ...state.accountDetails, [field]: value },
                    }));
                },

                //===============================================================//
                //==================== Update Button Actions ====================//
                //===============================================================//
                handleUpdateEmail: () => {
                    set({ 
                        isEmailVerified: false,
                        isOTPVerified: undefined,
                        disabledEmail: undefined,
                        recentlyVerified: null,
                    });
                },

                handleUpdateUsername: () =>  {
                    set({
                        isUsernameVerified: false,
                        disabledUsername: undefined,
                    });
                },
                
                //===============================================================//
                //========================= Error Actions =======================//
                //===============================================================//
                
                clearValidationMessage: (field) => {
                    set((state) => ({
                        validationMessages: { ...state.validationMessages, [field]: undefined }
                    }));
                },  
                
                setGeneralError: (error) => set({ generalError: error }),

                // setValidationMessages: (messages) => set((state) => ({
                //     validationMessages: { ...state.validationMessages, ...messages }
                // })),
                // clearAllValidationMessages: () => set({ validationMessages: {} }),
                // clearAllFieldsValue: () => set({ accountDetails: {} }),

                // setStep1Errors: () => {},
                // setGeneralError: () => {},
                // clearAllErrors: () => {},

                //===============================================================//
                //====================== Validation Function ====================//
                //===============================================================//
                handleValidateEmail: async (email) => {
                    // Reset state
                    set({ 
                        isLoading: true, 
                        isEmailVerified: false,
                        validationMessages: {}, 
                    }); 

                    // Email format validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailRegex.test(email)) {
                        const emailRegexValidation = 'Please enter a valid email';
                        set({ 
                            isLoading: false,
                            isEmailVerified: false,
                            validationMessages: { email: emailRegexValidation } 
                        });
                        return false;
                    }

                    Keyboard.dismiss();

                    try {
                        // Check email availability
                        await api.post(`${baseURL}/check-availability`, {email});

                        const randomString = useGenerateRandomCharacters(6);
                        const otpResponse = await api.post(`${baseURL}/otp`, {
                            email, 
                            otp: randomString,
                        });
                        const otpSuccessMessage = otpResponse.data?.message;

                        // Update UI State
                        set({ 
                            isLoading: false,
                            isEmailVerified: true,
                            otpModal: true, 
                            timeLeft: 15,
                        });

                        // Trigger the timer
                        get().startTimer(15);

                        return {
                            success: true,
                            message: otpSuccessMessage,
                        }
                    } catch(error: any) {
                        const errorMessage = error.response?.data?.message?.email || 'Verification failed. Network connection failed!';

                        set({ 
                            isLoading: false,
                            isEmailVerified: false,
                            otpModal: false, 
                            validationMessages: {email: errorMessage} 
                        });

                        return {
                            success: false,
                            message: errorMessage,
                            status: error.response?.status
                        };
                    }
                },

                handleValidateUsername: async (username) => {
                    // Reset state
                    set({ 
                        isLoading: true, 
                        isUsernameVerified: false,
                        validationMessages: {}, 
                    }); 

                    // Username format validation
                    const regex = /^[a-zA-Z][a-zA-Z0-9._]{3,19}$/;
                    const hasConsecutive = /(\.\.|__)/.test(username);
                    const endsInvalid = /[._]$/.test(username);

                    if (!regex.test(username) || endsInvalid) {
                        const usernameValidation = 'Invalid username please enter again.';
                        set({ 
                            isLoading: false,
                            validationMessages: {username: usernameValidation} 
                        }); 

                        return false;
                    }

                    if (hasConsecutive) {
                        const usernameValidation = 'Consecutive special characters are not valid';
                        set({ 
                            isLoading: false,
                            validationMessages: {username: usernameValidation} 
                        }); 

                        return false;
                    }

                    Keyboard.dismiss();

                    try {
                        const response = await api.post(`${baseURL}/check-availability`, {username});
                        const successMessage = response.data?.message?.username;

                        // Update UI State
                        set({ 
                            isLoading: false,
                            validModal: true,
                            isUsernameVerified: true,
                            disabledUsername: true,
                        });

                        get().setRecentlyVerified('username');

                        return {
                            success: true,
                            message: successMessage,
                        };
                    } catch (error: any) {
                        const errorMessage = error.response?.data?.message?.username || 'Verification failed. Network connection failed!';

                        set({ 
                            isLoading: false,
                            validationMessages: {username: errorMessage} 
                        });
                        
                        return {
                            success: false,
                            message: errorMessage,
                            status: error.response?.status
                        };
                    }
                },

                validateAccountField: (field, value) => {
                    const { isUsernameVerified } = get();
                    switch (field) {
                        case 'island':
                            return !value ? 'Island is required' : null;
                        case 'region':
                            return !value ? 'Region is required' : null;
                        case 'province':
                            return !value ? 'Province is required' : null;
                        case 'municipality':
                            return !value ? 'Municipality is required' : null;
                        case 'barangay':
                            return !value ? 'Barangay is required' : null;
                        case 'email':
                            return !value ? 'Email is required' : null;
                        case 'username':
                            return !value ? 'Username is required' : null;
                        case 'birthday':
                            if (!value) return 'Birthday is required';
                            const birthDate = new Date(value);
                            const today = new Date();
                            const age = today.getFullYear() - birthDate.getFullYear();
                            return age < 18 ? 'You must be at least 18 years old' : null;
                        case 'password':
                            if (!value) return 'Password is required';
                            return null;
                        case 'confirmPass':
                            if (!value) return 'Please confirm your password';
                            const { accountDetails } = get();
                            return value !== accountDetails.password ? 'Passwords do not match' : null;
                        case 'file':
                            return !value ? 'Please upload a file' : null;
                        default:
                            return null;
                    }
                },

                validateOTP: async (code) => {
                    // Reset state
                    set({ 
                        isLoading: true, 
                        isOTPVerified: false,
                        disabledEmail: undefined,
                        recentlyVerified: null,
                    });

                    try {
                        // Get email from account details
                        const { accountDetails } = get();
                        const email = accountDetails.email;

                        if (!email) {
                            set({ 
                                isLoading: false,
                                disabledEmail: undefined,
                                validationMessages: {email: 'Email not found. Please try again'} 
                            });

                            get().clearTimer(0);

                            return {
                                success: false,
                                message: 'Email not found',
                            }
                        }

                        // Verify OTP
                        const result = await api.post(`${baseURL}/verify`, {
                            email,
                            otp: code,
                        });
                        const successMessage = result.data?.message;
                        
                        set({ 
                            isLoading: false, 
                            isOTPVerified: true,
                            disabledEmail: true,
                            validModal: true,
                        });

                        get().setRecentlyVerified('email');
                        get().clearTimer(0);
                        Keyboard.dismiss();

                        return {
                            success: true,
                            message: successMessage,
                        }
                    } catch (error: any) {
                        const { timeLeft } = get(); // Get current timer state
                        let errorMessage = error.response?.data?.message || 'Verification failed. Network connection failed!';

                        console.log(errorMessage);
                        set({ 
                            isLoading: false, 
                            isOTPVerified: false,
                            disabledEmail: timeLeft > 0 ? false : undefined,
                        });

                        // Don't clear timer if it's still running
                        if (timeLeft <= 0) {
                            get().clearTimer(0); // Only reset if timer expired
                        }

                        return {
                            success: false,
                            message: error,
                            status: error.response?.status
                        }
                    }
                },

                closeValidModal: () => {
                    get().closeOtpModal();
                    set({ validModal: false });
                },

                //===============================================================//
                //========================== OTP Actions ========================//
                //===============================================================//
                resendOTP: async () => {
                    // Reset state
                    set({ 
                        isLoading: true, 
                        isEmailVerified: false,
                        isOTPVerified: undefined,
                        validationMessages: {}, 
                    });
                    
                    try {
                        const { accountDetails } = get();
                        const email = accountDetails.email;
                        const randomString = useGenerateRandomCharacters(6);

                        if (!email) {
                            set({ 
                                isLoading: false,
                                isEmailVerified: false,
                                validationMessages: {email: 'Email not found. Please try again'} 
                            });

                            return {
                                success: false,
                                message: 'Email not found',
                            }
                        }

                        const otpResponse = await api.post(`${baseURL}/otp`, {
                            email, 
                            otp: randomString,
                        });
                        const otpSuccessMessage = otpResponse.data?.message;

                        set({ 
                            isLoading: false,
                            isEmailVerified: true,
                        });

                        // Trigger the timer
                        get().startTimer(15);

                        return {
                            success: true,
                            message: otpSuccessMessage,
                        }
                    } catch (error: any) {
                        let errorMessage = error.response?.data?.message?.email || 'Verification failed. Network connection failed!';

                        set({ 
                            isLoading: false,
                            isEmailVerified: false,
                            otpModal: false, 
                            validationMessages: {email: errorMessage} 
                        });

                        return {
                            success: false,
                            message: errorMessage,
                            status: error.response?.status
                        };
                    }
                },

                closeOtpModal: () => {
                    set({ otpModal: false });
                },

                startTimer: (initialTime) => {
                    const { timeInterval } = get();
                    if (timeInterval) {
                        clearInterval(timeInterval);
                    }

                    set({
                        timeLeft: initialTime,
                        disabledEmail: false, 
                    });

                    const interval = setInterval(() => {
                        const { timeLeft } = get();
                        
                        if (timeLeft <= 1) {
                            // Timer finished
                            clearInterval(interval);
                            set({ 
                                timeLeft: 0, 
                                disabledEmail: undefined, // Enable resend button
                                timeInterval: null 
                            });
                        } else {
                            // Decrease timer
                            set({ timeLeft: timeLeft - 1 });
                        }
                    }, 1000);
                    
                    // // Store interval reference
                    set({ timeInterval: interval });
                },

                stopTimer: () => {
                    const { timeInterval } = get();
                    if (timeInterval) {
                        clearInterval(timeInterval);
                        set({ timeInterval: null });
                    }
                },

                clearTimer: (seconds = 15) => {
                    const { timeInterval } = get();
                    if (timeInterval) {
                        clearInterval(timeInterval);
                    }
                    set({ 
                        timeLeft: seconds, 
                        timeInterval: null 
                    });
                },

                setRecentlyVerified: (val) => {
                    set({ recentlyVerified: val });
                },

                // setdisabledEmail: () => {
                //     set({ disabledEmail: false });
                // },

                // validateStep1: () => {
                    // const { accountDetails, validateAccountField } = get();
                    // const errors: AccountDetails = {};
                    // let isValid = true;

                    // // Validate all required fields
                    // const fieldsToValidate: (keyof AccountDetails)[] = [
                    //     'island', 'region', 'province', 'municipality', 'barangay',
                    //     'email', 'username', 'birthday', 'password', 'confirmPass', 'file'
                    // ];

                    // fieldsToValidate.forEach(field => {
                    //     const value = accountDetails[field] || '';
                    //     const error = validateAccountField(field, value);
                    //     if (error) {
                    //         errors[field as keyof AccountDetails] = error;
                    //         isValid = false;
                    //     }
                    // });

                    // // Set validation messages
                    // set({ validationMessages: errors });

                //     return isValid;
                // },

                //===============================================================//
                //================= Final Registration Submission ===============//
                //===============================================================//
                
                submitRegistration: async () => {},


                //===============================================================//
                //======================= Draft Management ======================//
                //===============================================================//
                saveDraft: () => {
                    console.log('Draft loaded automatically');
                },

                loadDraft: () => {
                    console.log('Draft loaded automatically');
                },

                clearDraft: () => {
                    set(initialState);
                },

                //===============================================================//
                //======================== Reset Actions ========================//
                //===============================================================//
                resetRegistration: () => {
                    set(initialState);
                    get().clearDraft();
                },
            }),
            {
                name: 'registration-store',
                storage: {
                    getItem: async (name) => {
                        try {
                            const value = await AsyncStorage.getItem(name);
                            return value ? JSON.parse(value) : null;
                        } catch (error) {
                            console.error('Error loading draft:', error);
                            return null;
                        }
                    },
                    setItem: async (name, value) => {
                        try {
                            await AsyncStorage.setItem(name, JSON.stringify(value));
                        } catch (error) {
                            console.error('Error saving draft:', error);
                        }
                    },
                    removeItem: async (name) => {
                        try {
                            await AsyncStorage.removeItem(name);
                        } catch (error) {
                            console.error('Error clearing draft:', error);
                        }
                    }
                },
            }
        ),
        {
            name: 'registration-store',
        }
    )
)

// interface FormLocationProps {
//     island?: string;
//     region?: string;
//     province?: string;
//     municipality?: string;
//     barangay?: string;
// }

// interface FormDataProps {
//     island: string;
//     region: string;
//     province: string;
//     municipality: string;
//     barangay: string;
//     email: string;
//     otp: string;
//     username: string;
//     birthday: Date;
//     age: string;
//     password: string;
//     confirmPass: string;
//     file: null;
// }

// interface FormErrorProps {
//     island?: string;
//     region?: string;
//     province?: string;
//     municipality?: string;
//     barangay?: string;
//     email?: string;
//     otp?: string;
//     username?: string;
//     birthday?: Date;
//     age?: string;
//     password?: string;
//     confirmPass?: string;
//     file?: null;
// }

// interface FormState {
//     currentStep: number;

//     formData: FormDataProps;
//     validationMessage: FormErrorProps;
//     isSubmitting: boolean;
//     isSuccess: boolean;

//     setLocationValues: (locationData: {
//         island?: string;
//         region?: string;
//         province?: string;
//         municipality?: string;
//         barangay?: string;
//     }) => void;
    
//     setAccountDetails: (field: keyof FormDataProps, value: string | Date) => void;

//     handleCheckUsername: (username: string) => void;

//     clearErrorMessage: (field: keyof FormDataProps) => void;
//     clearAllErrors: () => void;

//     submitForm: () => Promise<void>;
//     // resetForm: () => void;
//     nextStep: () =>void;
// }

// export const useRegistrationStore = create<FormState>((set, get) => ({
//     currentStep: 1,

//     // Form data
//     formData: {
//         island: '',
//         region: '',
//         province: '',
//         municipality: '',
//         barangay: '',
//         birthday: new Date(1990, 0, 1),
//         age: '',
//         email: '',
//         otp: '',
//         username: '',
//         password: '',
//         confirmPass: '',
//         file: null,
//     },

//     validationMessage: {},

//     // Form status
//     isSubmitting: false,
//     isSuccess: false,
//     validateStep1: false,

//     nextStep: () => {
//         const { currentStep } = get();

//         console.log(currentStep);
//     },

//     setLocationValues: (locationData) => set((state) => ({
//         formData: { ...state.formData, ...locationData }
//     })),

//     setAccountDetails: (field: keyof FormDataProps, value: string | Date) => set((state) => ({
//         formData: { ...state.formData, [field]: value }
//     })),

//     handleCheckUsername: async (username) => {
//         try {
//             const usernameValidation: FormErrorProps = {}; 
//             const response = await axios.post(`${baseURL}/check-username`, {username});

//             if (response?.data?.message) {
//                 usernameValidation.username = response?.data?.message;
//             }

//             set({ validationMessage: usernameValidation });
//         } catch (error: any) {
//             return {
//                 error: true,
//                 message: error.response?.data?.message,
//                 status: error.response.status
//             }
//             // console.log(error.response?.data?.message);
//         }
//     },

//     clearErrorMessage: (field: keyof FormDataProps) => set((state) => ({
//         validationMessage: { ...state.validationMessage, [field]: undefined }
//     })),

//     clearAllErrors: () => set({ validationMessage: {} }),

//     submitForm: async (): Promise<void> => {
//         const { formData } = get();
//         const errorMessage: FormErrorProps = {};

//         const validationMessages: any = {
//             // island: 'Please select island',
//             // region: 'Please select region',
//             // province: 'Please select province',
//             // municipality: 'Please select municipality',
//             // barangay: 'Please select barangay',
//             // email: 'Please enter email',
//             // username: 'Please enter username',
//             // password: 'Please enter password',
//             // confirmPass: 'Please confirm your password'
//         };        

//         (Object.keys(validationMessages) as Array<keyof FormDataProps>).forEach(field => {
//             if (!formData[field]) {
//                 errorMessage[field] = validationMessages[field];
//             }
//         });

//         if (formData.password !== formData.confirmPass) {
//             errorMessage.confirmPass = 'Your password did not match';
//         }

//         // If there are any errors, update state and exit
//         if (Object.keys(errorMessage).length > 0) {
//             set({ validationMessage: errorMessage });
//             return;
//         }

//         set({ 
//             isSubmitting: true,
//             isSuccess: false
//         });

//         try {
//             console.log('success');
//             set({ isSubmitting: false });
//         } catch (error) {
//             set({ isSubmitting: false });
//         }

//     }
// }));