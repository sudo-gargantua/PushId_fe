import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Store ini berfungsi menyimpan data user secara global
// persist akan menyimpannya ke LocalStorage browser agar tidak hilang saat refresh
export const useAuthStore = create(
  persist(
    (set) => ({
      // State Awal
      user: null,       // Data user (nama, email, dll)
      token: null,      // Token autentikasi dari backend
      isLoggedIn: false, // Status login

      // Aksi Login: Menyimpan data user & token
      login: (userData, token) => set({ 
        user: userData, 
        token: token, 
        isLoggedIn: true 
      }),

      // Aksi Logout: Menghapus data user & token
      logout: () => set({ 
        user: null, 
        token: null, 
        isLoggedIn: false 
      }),
    }),
    {
      name: 'squadup-storage', // Nama key unik di LocalStorage
    }
  )
);