import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from "@/store/useAuthStore";

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// Middleware that runs before requests and after responses.
api.interceptors.request.use(
  (config) => {
    // const token = AsyncStorage.getItem('auth-storage');
    const token = useAuthStore.getState().authToken?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('meron token');
    }
    return config;
  },
  (error) => {
    // console.log('walang token');
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response; // If the request was successful, just return the response.
  },
  async (error) => {
    // Handle network errors
    if (!error.response) {
      console.log('API - Network Error: ', error.message);
      return Promise.reject({
        ...error,
        message: 'Networ connection failed'
      });
    }

    // Handling 401 Unauthorized errors
    if (error.response.status === 401) {
      // Check if there's a token once the response on api triggered 401
      // const token = useAuthStore.getState().authToken?.accessToken;
      // console.log(token);

      // Triggered the logout out
      const onLogout = useAuthStore.getState().onLogout;
      await onLogout();

      // It's automatically redirect because i got authentication check in index
      // display Unauthenticated message
      console.log('API - Intercenptors response ' + error.response.data.message);
    }

    if (error.response.status >= 500) {
      console.log('API - Server Error: ', error.response.data.message);
    }

    return Promise.reject(error);
  }
)

export default api;