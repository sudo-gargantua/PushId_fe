'use client';

import { useState } from 'react';
import { ShieldAlert, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import { useAdminAuthStore } from '@/store/useAdminAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function AdminLoginPage() {
  const router = useRouter();
  const toast = useToast();
  const { loginAdmin, isAdminLoggedIn } = useAdminAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect jika sudah login
  if (isAdminLoggedIn) {
    router.push('/admin');
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call real backend API for admin login
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Debug: Log response dari backend
        console.log('[ADMIN LOGIN] Response data:', data);
        console.log('[ADMIN LOGIN] Token from API:', data.token);

        // Login berhasil - simpan token asli dari backend
        const adminData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          createdAt: data.user.created_at || new Date().toISOString()
        };

        // Simpan token ke localStorage untuk API calls
        localStorage.setItem('admin_token', data.token);

        // Debug: Verifikasi token tersimpan
        const savedToken = localStorage.getItem('admin_token');
        console.log('[ADMIN LOGIN] Token saved successfully:', !!savedToken);
        console.log('[ADMIN LOGIN] Saved token value:', savedToken?.substring(0, 20) + '...');

        // Update zustand store
        loginAdmin(adminData, data.token);
        toast.success('Login berhasil! Mengalihkan ke dashboard...');

        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        // Login gagal
        toast.error(data.message || 'Email atau password salah');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Terjadi kesalahan saat login. Pastikan server backend berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-md bg-[#0F172A] border border-[#1e2230] rounded-2xl p-8">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
            <ShieldAlert className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            ADMIN LOGIN
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Hanya untuk administrator
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#131620] border border-[#1e2230] text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password (min 8 karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#131620] border border-[#1e2230] text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-colors font-bold text-white disabled:opacity-50"
          >
            {loading ? 'Masuk...' : 'Login Admin'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-400">
            Belum punya akun admin?{' '}
            <Link href="/admin/register" className="text-red-500 hover:text-red-400 transition-colors font-bold">
              Daftar di sini
            </Link>
          </p>
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
