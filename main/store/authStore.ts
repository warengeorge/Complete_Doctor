import { api } from "@/lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  roles?: string[];
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  bio?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Registration temporary data
  pendingRegistration: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  } | null;

  // Reset Password temporary data
  resetEmail: string | null;
  resetToken: string | null;

  // Actions
  login: (credentials: { email: string; password: string }) => Promise<void>;
  registerStart: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  registerComplete: (token: string, role?: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
  logout: () => void;
  setPendingRegistration: (
    data: Partial<AuthState["pendingRegistration"]>,
  ) => void;
  setResetEmail: (email: string) => void;
  setResetToken: (token: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      pendingRegistration: null,
      resetEmail: null,
      resetToken: null,

      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const loginResponse = await api.post<any>("/api/auth/login", {
            email,
            password,
          });

          // Handle both { user, accessToken } and flat response structures
          const { user: userFromApi } = loginResponse.data.data;
          const profile = userFromApi.profile ?? {};

          const user: User = {
            id: userFromApi.id,
            email: userFromApi.email,
            roles: userFromApi.roles ?? [],
            isEmailVerified: userFromApi.isEmailVerified ?? false,
            firstName: profile.firstName ?? "",
            lastName: profile.lastName ?? "",
            fullName:
              profile.displayName ??
              `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim(),
            avatarUrl: profile.profileUrl ?? "",
            phoneNumber: profile.phoneNumber ?? "",
            bio: profile.bio ?? "",
          };

          console.log("Login successful:", {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            // accessToken: !!accessToken,
            roles: user.roles,
          });

          // Log the full response structure to debug
          console.log("Full login response:", loginResponse);
          console.log("loginResponse.data:", loginResponse.data);
          console.log("loginResponse.data.data:", loginResponse.data.data);

          // The backend returns the token in the 'token' field
          const accessToken =
            loginResponse.data.data.token ||
            loginResponse.data.data.accessToken ||
            loginResponse.data.data.access_token ||
            loginResponse.data.accessToken ||
            loginResponse.accessToken;
          const refreshToken =
            loginResponse.data.data.refreshToken ||
            loginResponse.data.data.refresh_token ||
            loginResponse.data.refreshToken ||
            loginResponse.refreshToken;

          console.log(
            "Extracted tokens - accessToken:",
            !!accessToken,
            "refreshToken:",
            !!refreshToken,
          );

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
          }
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }

          console.log(
            "Login successful. User data:",
            user.email,
            user.fullName,
            user.lastName,
            user.roles,
          );

          set({
            user,
            isAuthenticated: !!accessToken,
            isLoading: false,
          });

          console.log(
            "Auth state updated: isAuthenticated =",
            !!accessToken,
            "user =",
            user ? user.email : null,
          );
        } catch (error: any) {
          console.warn("Login error:", error);
          set({ error: error.message || "Login failed", isLoading: false });
          throw error;
        }
      },

      registerStart: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/api/auth/register-start", { email });
          set({
            isLoading: false,
            pendingRegistration: { ...get().pendingRegistration, email },
          });
        } catch (error: any) {
          set({
            error: error.message || "Failed to send verification code",
            isLoading: false,
          });
          throw error;
        }
      },

      verifyEmail: async (token) => {
        set({ isLoading: true, error: null });
        const { pendingRegistration } = get();

        if (!pendingRegistration?.email) {
          set({ error: "Missing email for verification", isLoading: false });
          throw new Error("Missing email for verification");
        }

        try {
          await api.post("/api/auth/verify-email", {
            email: pendingRegistration.email,
            token,
          });
          // Do not set isLoading to false here if we intend to chain calls later,
          // but strictly speaking we should just let the chaining handle it or set it to false.
          // Setting it to false is safer.
          set({ isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || "Email verification failed",
            isLoading: false,
          });
          throw error;
        }
      },

      registerComplete: async (token, role = "LEARNER") => {
        set({ isLoading: true, error: null });
        const { pendingRegistration } = get();

        if (!pendingRegistration?.email || !pendingRegistration?.password) {
          set({ error: "Missing registration data", isLoading: false });
          throw new Error("Missing registration data");
        }

        try {
          // 1. Register User
          const registerResponse = await api.post<{ user: User }>(
            "/api/auth/register",
            {
              email: pendingRegistration.email,
              firstName: pendingRegistration.firstName || "",
              lastName: pendingRegistration.lastName || "",
              password: pendingRegistration.password,
              token,
              role,
            },
          );

          // 2. Login to get access token
          const loginResponse = await api.post<any>("/api/auth/login", {
            email: pendingRegistration.email,
            password: pendingRegistration.password,
          });

          // Extract token from the correct location in response
          const accessToken =
            loginResponse.data.data.token ||
            loginResponse.data.data.accessToken;
          const refreshToken = loginResponse.data.data.refreshToken;

          localStorage.setItem("accessToken", accessToken);
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }

          const finalUser = {
            ...registerResponse.user,
            firstName: pendingRegistration.firstName,
            lastName: pendingRegistration.lastName,
          };

          // Log user details as requested
          console.log("Registration complete:", {
            email: finalUser.email,
            firstName: finalUser.firstName,
            lastName: finalUser.lastName,
            token: accessToken,
            roles: finalUser.roles,
          });

          set({
            user: finalUser,
            isAuthenticated: true,
            isLoading: false,
            pendingRegistration: null,
          });
        } catch (error: any) {
          set({
            error: error.message || "Registration failed",
            isLoading: false,
          });
          throw error;
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) throw new Error("No access token found");

          await api.post("/api/users/profiles", data, { token });
          set((state) => ({
            user: state.user ? { ...state.user, ...data } : null,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.message || "Failed to update profile",
            isLoading: false,
          });
          throw error;
        }
      },

      requestPasswordReset: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/api/auth/request-password-reset", { email });
          set({ resetEmail: email, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || "Failed to request password reset",
            isLoading: false,
          });
          throw error;
        }
      },

      resetPassword: async (newPassword) => {
        set({ isLoading: true, error: null });
        const { resetEmail, resetToken } = get();

        if (!resetEmail || !resetToken) {
          set({ error: "Missing reset information", isLoading: false });
          throw new Error("Missing reset information");
        }

        try {
          await api.post("/api/auth/reset-password", {
            email: resetEmail,
            token: resetToken,
            newPassword,
          });
          set({ isLoading: false, resetEmail: null, resetToken: null });
        } catch (error: any) {
          set({
            error: error.message || "Failed to reset password",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({
          user: null,
          isAuthenticated: false,
          pendingRegistration: null,
          resetEmail: null,
          resetToken: null,
        });
      },

      setPendingRegistration: (data) => {
        set((state) => ({
          pendingRegistration: { ...state.pendingRegistration, ...data },
        }));
      },

      setResetEmail: (email) => set({ resetEmail: email }),
      setResetToken: (token) => set({ resetToken: token }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "complete-doc-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pendingRegistration: state.pendingRegistration,
        resetEmail: state.resetEmail,
        resetToken: state.resetToken,
      }),
    },
  ),
);
