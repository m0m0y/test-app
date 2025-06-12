export interface CourseProps {
    id: number;
    course_category_id: number;
    course_title: string;
    course_description: string;
    course_thumbnail: string;
    is_active: number;
    course_duration: string;
    category: {
        id: number;
        cat_title: string;
        cat_description: string;
    }
}