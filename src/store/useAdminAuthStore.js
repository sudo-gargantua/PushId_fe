import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAdminAuthStore = create(
    persist(
        (set, get) => ({
            admin: null,
            adminToken: null,
            isAdminLoggedIn: false,
            _hasHydrated: false,

            loginAdmin: (adminData, token) => set({
                admin: adminData,
                adminToken: token,
                isAdminLoggedIn: true
            }),

            logoutAdmin: () => set({
                admin: null,
                adminToken: null,
                isAdminLoggedIn: false
            }),

            // Fungsi untuk menandai hydration selesai
            setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
            name: 'pushid-admin-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                // Dipanggil setelah rehydration selesai
                state?.setHasHydrated(true);
            },
        }
    )
);
