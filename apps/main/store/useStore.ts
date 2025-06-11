import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Course {
  id: string;
  name: string;
  code: string;
  date: string;
  time: string;
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
          code: 'MRCGP AKT',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
          description: 'Description for Course 1',
          instructor: 'Instructor 1',
          price: 100,
        },
        {
          id: '235',
          name: 'AKT Live Course',
          code: 'MSRA 235',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
          description: 'Description for Course 2',
          instructor: 'Instructor 2',
          price: 200,
        },
        {
          id: '236',
          name: 'AKT Video Course',
          code: 'UKMLA 357',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
          description: 'Description for Course 2',
          instructor: 'Instructor 2',
          price: 200,
        },
        {
          id: '237',
          name: 'AKT Audiobook',
          code: 'PLAB 187',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
          description: 'Description for Course 2',
          instructor: 'Instructor 2',
          price: 200,
        },
        {
          id: '238',
          name: 'AKT Mock Exams',
          code: 'FY2W 135',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
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
