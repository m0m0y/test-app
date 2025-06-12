import { create } from "zustand";
import { CourseProps } from "@/models/course";
import api from "@/services/api";

// import { persist } from "zustand/middleware";
// import axios from "axios";
// import { useAuthStore } from './useAuthStore';

interface CourseStateProps {
    courses: CourseProps[];
    isLoading: boolean;
    fetchCourse: () => void;
}

export const useCourseState = create<CourseStateProps>((set) => ({
    courses: [],
    isLoading: false,

    fetchCourse: async () => {
        set({ isLoading: true }); 
        try {
            const result = await api.get('/course');
            set({ courses: result.data, isLoading: false });
            
            return { success: true }
        } catch (error: any) {
            return {
                error: true,
                message: error.response?.data?.message,
                status: error.response.status
            };
        } finally {
            set({ isLoading: false });
        }
    }
}));



// export const useCourseState = create<CourseState>()(
//     persist(
//         (set) => ({
//             courses: [],
//             isLoading: false,

//             fetchCourse: async () => {
//                 set({ isLoading: true });
//                 try {
//                     const result = await axios.get(`${baseURL}/course`);
//                     set({ courses: result.data, isLoading: false });
//                 } catch (error: any) {
//                     return {
//                         error: true,
//                         message: error.response?.data?.message || '',
//                     }
//                 }
//             }
//         }),
//         {
//             name: 'course-storage', // 👈 storage key in AsyncStorage
//         }
//     )
// );