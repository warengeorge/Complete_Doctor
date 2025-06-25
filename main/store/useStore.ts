import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SyllabusSection {
  id: string;
  title: string;
  content: string[];
}

interface CartItem extends Course {
  quantity: number
}

export interface Course {
  id: string;
  name: string;
  code: string;
  date: string;
  image: string;
  price: number;
  oldPrice: number;
  time: string;
  about: string;
  objectives: { id: number; content: string }[];
  merits: { id: number; content: string }[];
  description: string;
  instructor: string;
  syllabus: SyllabusSection[];
}

interface CourseState {
  courses: Course[];
  cartItems: CartItem[]
  expandedSections: Record<string, string[]>; // courseId -> expanded section IDs
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  toggleSection: (courseId: string, sectionId: string) => void;
  expandSection: (courseId: string, sectionId: string) => void;
  collapseSection: (courseId: string, sectionId: string) => void;
  collapseAll: (courseId: string) => void;
  expandAll: (courseId: string) => void;
  getCourseById: (courseId: string) => Course | undefined;
  clearCart: () => void
  getCartTotal: () => number
  getCartSubtotal: () => number
  addToCart: (course: Course) => void
  removeFromCart: (courseId: string) => void
  updateCartItemQuantity: (courseId: string, quantity: number) => void
}

const defaultSyllabusData: Record<string, SyllabusSection[]> = {
  '234': [
    // AKT Ultimate Package
    {
      id: '01',
      title: 'Introduction to AKT',
      content: [
        'Understanding the AKT Format',
        'Exam Structure Overview',
        'Study Planning',
      ],
    },
    {
      id: '02',
      title: 'Clinical Knowledge',
      content: [
        'Common Conditions',
        'Differential Diagnosis',
        'Treatment Guidelines',
      ],
    },
    {
      id: '03',
      title: 'Evidence-Based Medicine',
      content: [
        'Research Methods',
        'Critical Appraisal',
        'Guidelines and Protocols',
      ],
    },
    {
      id: '04',
      title: 'Administrative Knowledge',
      content: ['NHS Structure', 'Quality Improvement', 'Patient Safety'],
    },
    {
      id: '05',
      title: 'Practice Questions',
      content: ['Mock Exams', 'Question Analysis', 'Time Management'],
    },
  ],
  '235': [
    // AKT Live Course
    {
      id: '01',
      title: 'Live Session Introduction',
      content: ['Course Overview', 'Interactive Learning Methods'],
    },
    {
      id: '02',
      title: 'Real-time Problem Solving',
      content: ['Case-based Learning', 'Group Discussions', 'Expert Q&A'],
    },
    {
      id: '03',
      title: 'Clinical Scenarios',
      content: ['Patient Presentations', 'Decision Making', 'Treatment Plans'],
    },
    {
      id: '04',
      title: 'Exam Techniques',
      content: ['Time Management', 'Question Strategies', 'Stress Management'],
    },
  ],
  '236': [
    // AKT Video Course
    {
      id: '01',
      title: 'Video Learning Introduction',
      content: ['Self-paced Learning', 'Video Navigation', 'Progress Tracking'],
    },
    {
      id: '02',
      title: 'Core Topics Coverage',
      content: [
        'Comprehensive Video Library',
        'Topic-wise Modules',
        'Visual Learning',
      ],
    },
    {
      id: '03',
      title: 'Practice Integration',
      content: ['Video Quizzes', 'Interactive Elements', 'Progress Assessment'],
    },
  ],
  '237': [
    // AKT Audiobook
    {
      id: '01',
      title: 'Audio Learning Basics',
      content: ['Effective Listening Techniques', 'Note-taking Strategies'],
    },
    {
      id: '02',
      title: 'Key Concepts Audio',
      content: [
        'Essential Topics',
        'Mnemonics and Memory Aids',
        'Revision Techniques',
      ],
    },
    {
      id: '03',
      title: 'Mobile Learning',
      content: ['On-the-go Study', 'Offline Access', 'Flexible Scheduling'],
    },
  ],
  '238': [
    // AKT Mock Exams
    {
      id: '01',
      title: 'Mock Exam Strategy',
      content: [
        'Exam Simulation',
        'Performance Analysis',
        'Weakness Identification',
      ],
    },
    {
      id: '02',
      title: 'Question Bank Access',
      content: [
        'Extensive Question Library',
        'Topic-wise Practice',
        'Difficulty Levels',
      ],
    },
    {
      id: '03',
      title: 'Results and Feedback',
      content: [
        'Detailed Explanations',
        'Performance Tracking',
        'Improvement Plans',
      ],
    },
  ],
};

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
          image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
          price: 355.99,
          oldPrice: 455.99,
          description:
            'Comprehensive AKT preparation package with all resources',
          about:
            'Welcome to Introduction to Clinical Medicine, a foundational course designed to equip medical students and professionals with the core principles of patient care, clinical reasoning, and diagnostic skills. This course covers essential topics such as patient history-taking, physical examination techniques, and the basics of differential diagnosis, setting the stage for clinical excellence.',
          objectives: [
            {
              id: 1,
              content:
                'Learn the fundamentals of patient care, clinical reasoning, and diagnostic skills.',
            },
            {
              id: 2,
              content: 'Understand evidence-based medicine principles.',
            },
            { id: 3, content: 'Master the AKT exam format and structure.' },
            {
              id: 4,
              content: 'Develop clinical reasoning and diagnostic skills.',
            },
            {
              id: 5,
              content: 'Gain knowledge of NHS administrative processes.',
            },
            {
              id: 6,
              content:
                'Practice with mock exams and time management strategies.',
            },
          ],
          merits: [
            { id: 1, content: 'Comprehensive syllabus coverage.' },
            { id: 2, content: 'Access to practice questions and mock exams.' },
            { id: 3, content: 'Expert guidance from experienced instructors.' },
            { id: 4, content: 'Detailed feedback on performance.' },
            { id: 5, content: 'Flexible learning options.' },
            { id: 6, content: 'Real-world clinical scenarios.' },
          ],
          instructor: 'Dr. Sarah Johnson',
          syllabus: defaultSyllabusData['234'],
        },
        {
          id: '235',
          name: 'AKT Live Course',
          code: 'MSRA 235',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
          image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
          price: 355.99,
          oldPrice: 455.99,
          description: 'Interactive live sessions with expert instructors',
          about:
            'Engage in real-time learning with live sessions designed to enhance your understanding of AKT topics through interactive discussions and problem-solving.',
          objectives: [
            { id: 1, content: 'Participate in live, interactive sessions.' },
            {
              id: 2,
              content: 'Solve real-world clinical problems in real time.',
            },
            {
              id: 3,
              content: 'Learn effective exam techniques and strategies.',
            },
            {
              id: 4,
              content:
                'Engage in group discussions and collaborative learning.',
            },
            { id: 5, content: 'Receive immediate feedback from instructors.' },
            { id: 6, content: 'Build confidence for the AKT exam.' },
          ],
          merits: [
            { id: 1, content: 'Direct interaction with expert instructors.' },
            {
              id: 2,
              content: 'Collaborative learning through group discussions.',
            },
            { id: 3, content: 'Immediate feedback on performance.' },
            { id: 4, content: 'Real-time problem-solving experience.' },
            { id: 5, content: 'Access to recorded live sessions for review.' },
            { id: 6, content: 'Enhanced understanding of clinical scenarios.' },
          ],
          instructor: 'Dr. Michael Chen',
          syllabus: defaultSyllabusData['235'],
        },
        {
          id: '236',
          name: 'AKT Video Course',
          code: 'UKMLA 357',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
          image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
          price: 355.99,
          oldPrice: 455.99,
          description: 'Self-paced video learning with comprehensive coverage',
          about:
            'Learn at your own pace with our comprehensive video course library. This course provides detailed visual explanations of AKT topics, allowing you to master complex concepts through engaging video content and interactive learning materials.',
          objectives: [
            {
              id: 1,
              content: 'Access a comprehensive library of video lessons.',
            },
            {
              id: 2,
              content: 'Learn core topics through visual aids and examples.',
            },
            { id: 3, content: 'Track progress and revisit topics as needed.' },
            {
              id: 4,
              content: 'Understand complex topics with visual explanations.',
            },
            {
              id: 5,
              content: 'Integrate video learning with practice questions.',
            },
            { id: 6, content: 'Prepare effectively for the AKT exam.' },
          ],
          merits: [
            { id: 1, content: 'Flexible, self-paced learning.' },
            {
              id: 2,
              content: 'High-quality video content with expert explanations.',
            },
            { id: 3, content: 'Progress tracking and assessment tools.' },
            {
              id: 4,
              content: 'Topic-wise video modules for focused learning.',
            },
            { id: 5, content: 'Interactive quizzes to reinforce learning.' },
            { id: 6, content: 'Accessible on multiple devices.' },
          ],
          instructor: 'Dr. Emily Rodriguez',
          syllabus: defaultSyllabusData['236'],
        },
        {
          id: '237',
          name: 'AKT Audiobook',
          code: 'PLAB 187',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
          image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
          price: 355.99,
          oldPrice: 455.99,
          description: 'Audio-based learning for flexible study schedules',
          about:
            'Enhance your learning experience with audio-based content, perfect for on-the-go study and flexible scheduling.',
          objectives: [
            { id: 1, content: 'Learn key concepts through audio lessons.' },
            {
              id: 2,
              content: 'Develop effective listening and note-taking skills.',
            },
            { id: 3, content: 'Study anytime, anywhere with mobile access.' },
            { id: 4, content: 'Reinforce learning with audio mnemonics.' },
            { id: 5, content: 'Improve retention through repetition.' },
            { id: 6, content: 'Access offline content for convenience.' },
          ],
          merits: [
            { id: 1, content: 'Convenient, on-the-go learning.' },
            {
              id: 2,
              content: 'Audio content designed for retention and recall.',
            },
            { id: 3, content: 'Flexible scheduling for busy professionals.' },
            { id: 4, content: 'Perfect for multitasking during commutes.' },
            { id: 5, content: 'Covers essential AKT topics in audio format.' },
            { id: 6, content: 'Easy to integrate with other study methods.' },
          ],
          instructor: 'Dr. James Wilson',
          syllabus: defaultSyllabusData['237'],
        },
        {
          id: '238',
          name: 'AKT Mock Exams',
          code: 'FY2W 135',
          date: 'Fri, 21 March, 2025',
          time: '07:00 AM - 09:00 AM',
          image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
          price: 355.99,
          oldPrice: 455.99,
          description: 'Extensive mock exam practice with detailed feedback',
          about:
            'Prepare for the AKT exam with a series of mock exams designed to simulate the real test environment and provide detailed feedback.',
          objectives: [
            { id: 1, content: 'Simulate the AKT exam experience.' },
            { id: 2, content: 'Identify strengths and areas for improvement.' },
            {
              id: 3,
              content: 'Receive detailed feedback and performance analysis.',
            },
            {
              id: 4,
              content: 'Practice time management under exam conditions.',
            },
            { id: 5, content: 'Build confidence with repeated practice.' },
            { id: 6, content: 'Understand question patterns and strategies.' },
          ],
          merits: [
            { id: 1, content: 'Realistic exam simulation.' },
            { id: 2, content: 'Comprehensive question bank.' },
            { id: 3, content: 'Detailed feedback for targeted improvement.' },
            { id: 4, content: 'Performance tracking and analytics.' },
            { id: 5, content: 'Covers all AKT exam domains.' },
            { id: 6, content: 'Boosts confidence for the actual exam.' },
          ],
          instructor: 'Dr. Lisa Thompson',
          syllabus: defaultSyllabusData['238'],
        },
      ],
      cartItems:[],
      expandedSections: {
        '234': ['01'], // AKT Ultimate Package starts with first section expanded
        '235': [],
        '236': [],
        '237': [],
        '238': [],
      },
      hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          hasHydrated: state,
        });
      },

      toggleSection: (courseId: string, sectionId: string) =>
        set((state) => {
          const currentExpanded = state.expandedSections[courseId] || [];
          const newExpanded = currentExpanded.includes(sectionId)
            ? currentExpanded.filter((id) => id !== sectionId)
            : [...currentExpanded, sectionId];

          return {
            expandedSections: {
              ...state.expandedSections,
              [courseId]: newExpanded,
            },
          };
        }),

      expandSection: (courseId: string, sectionId: string) =>
        set((state) => {
          const currentExpanded = state.expandedSections[courseId] || [];
          if (currentExpanded.includes(sectionId)) return state;

          return {
            expandedSections: {
              ...state.expandedSections,
              [courseId]: [...currentExpanded, sectionId],
            },
          };
        }),

      collapseSection: (courseId: string, sectionId: string) =>
        set((state) => ({
          expandedSections: {
            ...state.expandedSections,
            [courseId]: (state.expandedSections[courseId] || []).filter(
              (id) => id !== sectionId
            ),
          },
        })),

      collapseAll: (courseId: string) =>
        set((state) => ({
          expandedSections: {
            ...state.expandedSections,
            [courseId]: [],
          },
        })),

      expandAll: (courseId: string) =>
        set((state) => {
          const course = state.courses.find((c) => c.id === courseId);
          if (!course) return state;

          return {
            expandedSections: {
              ...state.expandedSections,
              [courseId]: course.syllabus.map((section) => section.id),
            },
          };
        }),

      getCourseById: (courseId: string) => {
        const state = get();
        return state.courses.find((course) => course.id === courseId);
      },
// Cart and utility methods moved inside the main store object
addToCart: (course: Course) =>
  set((state) => {
    const existingItem = state.cartItems.find((item) => item.id === course.id);

    if (existingItem) {
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    return {
      cartItems: [...state.cartItems, { ...course, quantity: 1 }],
    };
  }),

removeFromCart: (courseId: string) =>
  set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== courseId),
  })),

updateCartItemQuantity: (courseId: string, quantity: number) =>
  set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.id === courseId ? { ...item, quantity } : item
    ),
  })),

clearCart: () => set({ cartItems: [] }),

getCartSubtotal: () => {
  const { cartItems } = get();
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
},

getCartTotal: () => {
  return get().getCartSubtotal(); // No discount for now
},
}), 
    {
      name: 'course-storage', // Key for localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);