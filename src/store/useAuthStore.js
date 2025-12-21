import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      _hasHydrated: false,

      login: (userData, token) => set({
        user: userData,
        token: token,
        isLoggedIn: true
      }),

      logout: () => set({
        user: null,
        token: null,
        isLoggedIn: false
      }),

      // Fungsi untuk menandai hydration selesai
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'squadup-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Dipanggil setelah rehydration selesai
        state?.setHasHydrated(true);
      },
    }
  )
);