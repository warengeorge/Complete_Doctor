import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  avatar: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  email: string
  password: string
  resetEmail: string | null
  setLoginCredentials: (email: string, password: string) => void
  login: (user: User) => void
  logout: () => void
  initializeUser: () => void
  setResetEmail: (email: string) => void
  resetPassword: (newPassword: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      email: "",
      password: "",
      resetEmail: null,
      setLoginCredentials: (email, password) => {
        set({ email, password })
      },
      login: (user) => {
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, email: "", password: "", resetEmail: null })
      },
      initializeUser: () => {
        // Retrieve user from localStorage on app initialization
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          set({ user: JSON.parse(storedUser) });
        }
      },
      setResetEmail: (email) => {
        set({ resetEmail: email })
      },
      resetPassword: (newPassword) => {
        set((state) => {
          if (state.user) {
            return { password: newPassword }
          }
          return { password: newPassword }
        })
      },
    }),
    {
      name: "qartt-auth-storage",
    },
  ),
)
