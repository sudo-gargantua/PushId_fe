'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuthStore } from '@/store/useAdminAuthStore';
import { useToast } from '@/components/Toast';
import { Shield, Loader2 } from 'lucide-react';

export default function AdminAuthGuard({ children }) {
    const router = useRouter();
    const toast = useToast();
    const { isAdminLoggedIn, _hasHydrated } = useAdminAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    // Use ref to track if toast has been shown to prevent duplicate/infinite calls
    const hasShownToast = useRef(false);

    useEffect(() => {
        // Tunggu sampai store ter-hydrate dari localStorage
        if (!_hasHydrated) return;

        if (!isAdminLoggedIn) {
            // Only show toast once
            if (!hasShownToast.current) {
                hasShownToast.current = true;
                toast.warning('Anda harus login terlebih dahulu untuk mengakses panel admin');
            }
            router.push('/admin/login');
        } else {
            setIsChecking(false);
        }
    }, [isAdminLoggedIn, _hasHydrated, router]); // Removed toast from dependencies

    // Loading state saat mengecek auth
    if (isChecking || !_hasHydrated) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#5C5CFF] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Shield size={32} className="text-white" />
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                        <Loader2 size={20} className="animate-spin" />
                        <span>Memverifikasi akses admin...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Jika sudah login, render children
    return children;
}
