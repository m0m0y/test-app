import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthProps } from '@/models/auth';
import { UserProps } from '@/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '@/services/api';

// const TOKEN_KEY = 'my-jwt';
// const USER_KEY = 'userInfo';
const baseURL = 'http://10.0.2.2:8000/api';

interface AuthStateProps {
  authToken?: AuthProps,
  userInfo?: UserProps | null;
  isLoading?: boolean;
  hasHydrated: boolean;
  setHydrated: (value: boolean) => void;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStateProps>()(
  persist(
    (set, get) => ({
      authToken: { accessToken: null, authenticated: false },
      userInfo: null,
      isLoading: false,
      hasHydrated: false,
      setHydrated: (value) => set({ hasHydrated: value }),

      onLogin: async (email, password) => {
        set({ isLoading: true });
        try {
          const result = await api.post('/login', { email, password });
          const token = result.data.access_token;
          const user_data = result.data.user_data as UserProps;

          set({
            authToken: { accessToken: token, authenticated: true },
            userInfo: user_data,
          });

          return {
            success: true,
            data: result.data
          }; 
        } catch (error: any) {
          const errorMessage = 'Login failed! Network connection failed!';
          return {
            success: false, // Changed from error: true to success: false
            message: errorMessage,
            status: error.response?.status
          };
        } finally {
          set({ isLoading: false });
        }
      },

      onLogout: async () => {
        set({ isLoading: true });
        // const token = get().authToken?.accessToken;

        // Always do local cleanup first
        const performLocalCleanup = () => {
          delete axios.defaults.headers.common['Authorization'];
          set({
            authToken: { accessToken: null, authenticated: false },
            userInfo: null,
            isLoading: false
          });
        };

        try {
          // Sends logout request to backend.
          await api.post('/logout', {}, { timeout: 3000 });
          console.log('Backend logout successful');
        } catch (error: any) {
          console.log('Backend logout failed (but continuing with local logout):', error.message);
        }

        // Always perform local cleanup
        performLocalCleanup();
        return { success: true };
      },

      // Optional: force re-check token on app load (if needed)
      loadToken: async () => {
        const token = get().authToken?.accessToken;
        console.log('Loaded token:', token);
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      },
    }),
    {
      name: 'auth-storage', // name of AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Set the store data in AsyncStorage
      // This partialize save the data of state to AsyncStorage
      partialize: (state) => ({
        authToken: state.authToken,
        userInfo: state.userInfo,
      }),
      // This will called after AsyncStorage finishes loading the saved data.
      onRehydrateStorage: () => {
        return (state) => {
          // console.log(state?.checkToken);
          if (state?.authToken?.accessToken) {
            state?.setHydrated(true);
            console.log('Hydrated Message: User is authenticated!');
          } else {
            state?.setHydrated(true);
            console.log('Hydrated Message: No valid authToken, user is not authenticated');
          }
        }
      }
    }
  ),
);