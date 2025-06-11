import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  registerUser: (user: User) => void;
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isAuthenticated: false,

      registerUser: (user) => {
        console.log('Registering user:', user); // Debugging
        set((state) => ({
          users: [...state.users, user],
          currentUser: user,
          isAuthenticated: true,
        }));
      },

      loginUser: (email, password) => {
        const { users } = get();
        console.log('Users:', users); // Debugging
        console.log('Email:', email, 'Password:', password); // Debugging

        const user = users.find(
          (u) =>
            u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
            u.password === password
        );

        if (user) {
          set({ currentUser: user, isAuthenticated: true });
          return true;
        }

        return false;
      },

      logoutUser: () => {
        set({ currentUser: null, isAuthenticated: false });
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
