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
  duration: string;
  image: string;
  price: number;
  oldPrice: number;
  time?: string;
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
    // MRCPsych Paper A Live Course
    {
      id: '01',
      title: 'MRCPsych Paper A Live Course',
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
  '338': [
    // MRCPsych Paper A Live Course
    {
      id: '01',
      title: 'MRCPsych Paper A Live Course',
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
          id: 'mrcpsych-paper-a',
          name: 'MRCPsych Paper A Live Course',
          code: 'PAPER-A',
          date: "Starts: 28th July",
          duration: "6 Weeks",
          time: "Live Sessions: Twice weekly (interactive and engaging), Reading Journey: Twice weekly (targeted review and self-study resources)",
          image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
          price: 450,
          oldPrice: 600,
          description:
            'A dynamic and structured 6-week live course designed to comprehensively cover the MRCPsych Paper A syllabus.',
          about:
      "This course prepares candidates for the challenges of MRCPsych Paper A by focusing on fundamental sciences, including neuroscience, psychology, and psychopharmacology. Sessions are curated to help you build mastery of concepts and perform confidently in the exam.",
    objectives: [
      {
        id: 1,
        content: "Develop strong understanding of Paper A domains",
      },
      {
        id: 2,
        content: "Reinforce core neuroscience and psychopharmacology knowledge",
      },
      {
        id: 3,
        content: "Practice with exam-style questions and time-based strategies",
      },
      {
        id: 4,
        content: "Build exam confidence and conceptual clarity",
      },
    ],
          merits: [
            {
        id: 1,
        content: "Individuals planning to sit for MRCPsych Paper A",
      },
      {
        id: 2,
        content: "Early-stage psychiatry trainees seeking structured preparation",
      },
          ],
          instructor: 'Dr. Sarah Johnson',
          syllabus: [
      {
        id: "1",
        title: "Fundamental Sciences",
        content: ["Neuroscience Foundations", "Basic Psychology Principles", "Psychopharmacology Essentials"],
      },
      {
        id: "2",
        title: "Exam Preparation",
        content: ["Question Analysis Techniques", "Time Management Strategies", "Mock Assessments and Feedback"],
      },
    ],
        },
        {
          id: 'mrcpsych-paper-b',
          name: 'MRCPsych Paper B Live Course',
          code: 'PAPER-B',
          date: "Starts: 21st July",
          duration: "6 Weeks",
          time: 'Live Sessions: Twice weekly (case-based learning and discussions), Reading Journey: Twice weekly (critical review and evidence-based focus)',
          image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
          price: 450,
          oldPrice: 600,
          description: 'A targeted 6-week live course focused on clinical psychiatry and critical appraisal skills needed to excel in MRCPsych Paper B.',
          about:
            "Tailored for the Paper B exam, this course focuses on applied clinical knowledge and evidence-based psychiatry. It offers in-depth preparation through clinical case discussions, critical appraisal strategies, and mock assessments to build speed and accuracy.",
          objectives: [
      {
        id: 1,
        content: "Enhance understanding of clinical psychiatry and related topics",
      },
      {
        id: 2,
        content: "Build critical appraisal and data interpretation skills",
      },
      {
        id: 3,
        content: "Practice high-yield exam techniques with live feedback",
      },
      {
        id: 4,
        content: "Strengthen clinical thinking aligned with RCPsych standards",
      },
    ],
    merits: [
      {
        id: 1,
        content: "Candidates preparing for MRCPsych Paper B",
      },
      {
        id: 2,
        content: "Psychiatry trainees advancing through the membership pathway",
      },
    ],
    
          instructor: 'Dr. Michael Chen',
          syllabus: [
      {
        id: "1",
        title: "Clinical Psychiatry",
        content: ["Applied Clinical Knowledge", "Evidence-based Psychiatry", "Clinical Case Discussions"],
      },
      {
        id: "2",
        title: "Critical Appraisal",
        content: ["Data Interpretation Skills", "Research Methodology", "Statistical Analysis"],
      },
      {
        id: "3",
        title: "Exam Techniques",
        content: ["High-yield Strategies", "Mock Assessments", "Live Feedback Sessions"],
      },
          ],
        },
      ],
      cartItems:[],
      expandedSections: {
        '234': ['01'], // AKT Ultimate Package starts with first section expanded
        '235': [],
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