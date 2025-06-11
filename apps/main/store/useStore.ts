import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  price: number;
}

interface CourseState {
  courses: Course[]; 
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: [
        {
          id: '234',
          name: 'AKT Ultimate Package',
          description: 'Description for Course 1',
          instructor: 'Instructor 1',
          price: 100,
        },
        {
          id: '235',
          name: 'AKT Live Course',
          description: 'Description for Course 2',
          instructor: 'Instructor 2',
          price: 200,
        },
        {
          id: '236',
          name: 'AKT Video Course',
          description: 'Description for Course 2',
          instructor: 'Instructor 2',
          price: 200,
        },
        {
          id: '237',
          name: 'AKT Audiobook',
          description: 'Description for Course 2',
          instructor: 'Instructor 2',
          price: 200,
        },
        {
          id: '238',
          name: 'AKT Mock Exams',
          description: 'Description for Course 2',
          instructor: 'Instructor 2',
          price: 200,
        },
      ],
    }),
    {
      name: 'course-storage', // Key for localStorage
    }
  )
);
