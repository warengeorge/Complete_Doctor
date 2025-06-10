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
  registerUser: (user: User) => void;
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      registerUser: (user) => {
        set((state) => ({
          users: [...state.users, user],
          currentUser: user,
        }));
      },
      loginUser: (email, password) => {
        const { users } = get();
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          set({ currentUser: user });
          return true;
        }

        return false;
      },
      logoutUser: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: 'qartt-user-storage',
    }
  )
);
