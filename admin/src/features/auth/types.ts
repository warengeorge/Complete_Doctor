export type AuthUserProfile = {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  displayName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  profileImageId: string | null;
  coverImageId: string | null;
  phoneCountryCode: string | null;
  phoneNumber: string | null;
  phoneVerified: boolean;
  alternatePhoneCountryCode: string | null;
  alternatePhoneNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  bio: string | null;
  tagline: string | null;
  grade: string | null;
  specialty: string | null;
  hospital: string | null;
  examTarget: string | null;
  examDate: string | null;
  preferredStudyTime: string | null;
  website: string | null;
  linkedinUrl: string | null;
  twitterHandle: string | null;
  instagramHandle: string | null;
  language: string;
  timezone: string;
  notifEmailLessonReminders: boolean;
  notifEmailReadingReminders: boolean;
  notifEmailCourseAnnouncements: boolean;
  notifEmailProgressSummary: boolean;
  notifEmailCertificate: boolean;
  notifEmailMarketing: boolean;
  notifReminderLeadTime: string;
  privacyShowProfileToInstructors: boolean;
  privacyShowProgressToInstructors: boolean;
  privacyShowScoresToLearners: boolean;
  privacyAllowAnalytics: boolean;
  profileStrength: number;
  profileViews: number;
  lastLoginAt: string | null;
  lastActiveAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthUser = {
  id: string;
  email: string;
  roles: string[];
  isEmailVerified: boolean;
  refreshTokenHash: string | null;
  createdAt: string;
  updatedAt: string;
  learner: unknown;
  instructor: unknown;
  profile: AuthUserProfile | null;
};

export type LoginInput = {
  email: string;
  password: string;
};

// API Response Types - Backend Responses

export type BackendLoginResponse = {
  success: boolean;
  message: string;
  data: {
    data: {
      user: AuthUser;
      token: string;
      refreshToken: string;
    };
  };
  timestamp: string;
};

export type BackendRefreshResponse = {
  success: boolean;
  message: string;
  data: {
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
  timestamp: string;
};

export type BackendMeResponse = {
  success: boolean;
  message: string;
  data: {
    data: {
      user: AuthUser;
    };
  };
  timestamp: string;
};

// BFF Response Types - Frontend Server Responses

export type BFFLoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
};

export type BFFRefreshResponse = {
  success: boolean;
  message: string;
  data?: null;
};

export type BFFMeResponse = {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
};

// Session Types

export type AuthSessionData = {
  user: AuthUser;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};
