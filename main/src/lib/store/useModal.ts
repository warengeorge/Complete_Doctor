import { create } from 'zustand';

interface ModalState {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isMenuOpen: false,
  openMenu: () => {
    set({ isMenuOpen: true });
  },
  closeMenu: () => {
    set({ isMenuOpen: false });
  },
}));

export default useModalStore;