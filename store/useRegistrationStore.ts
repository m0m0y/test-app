import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegistraionStateProps {
    // Current step
    currentStep: number;

    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;

    saveDraft: () => void;
}

const initialState = {
    currentStep: 0,
    // nextStep: () => void
}

export const useRegistrationStore = create<RegistraionStateProps>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,
                
                nextStep: () => {
                    const { currentStep } = get();
                    if (currentStep === 1 ) {
                        set({ currentStep: 2 });
                        get().saveDraft();
                        console.log({ currentStep: 2 });
                    } else if (currentStep === 2) {
                        set({ currentStep: 3 }); // Preview step
                    }
                },
                prevStep: () => {
                    const { currentStep } = get();
                    if (currentStep > 1) {
                        set({ currentStep: currentStep - 1 });
                    }
                },
                goToStep: (step) => {   
                    set({ currentStep: step });
                },
                saveDraft: () => {
                    // This will be handled by persist middleware automatically
                    console.log('Draft saved automatically');
                },
            }),
            {
                name: 'registration-draft',
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
                    },
                },
                // partialize: (state) => ({
                //     currentStep: state.currentStep,
                //     accountInfo: state.accountInfo,
                //     personalInfo: state.personalInfo,
                // }),
            },
        ),
        {
            name: 'registration-store',
        }
    )
);

// Selectors for better performance
export const useCurrentStep = () => useRegistrationStore((state) => state.currentStep);