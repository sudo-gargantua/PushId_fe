'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, UserPlus, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import { useAdminAuthStore } from '@/store/useAdminAuthStore';

// Kode admin rahasia (6 digit)
const VALID_ADMIN_CODE = '177013';

export default function AdminRegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const { loginAdmin } = useAdminAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Untuk adminCode, hanya izinkan angka dan maksimal 6 digit
    if (name === 'adminCode') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    // Validasi password length
    if (formData.password.length < 8) {
      toast.error('Password minimal 8 karakter');
      setLoading(false);
      return;
    }

    // Validasi kode admin: harus 6 digit angka
    const adminCodeRegex = /^\d{6}$/;
    if (!adminCodeRegex.test(formData.adminCode)) {
      toast.error('Kode admin harus berupa 6 digit angka');
      setLoading(false);
      return;
    }

    // Validasi kode admin dengan kode yang valid
    if (formData.adminCode !== VALID_ADMIN_CODE) {
      toast.error('Kode admin tidak valid. Hubungi admin untuk mendapatkan kode yang benar.');
      setLoading(false);
      return;
    }

    try {
      // Untuk sementara, simpan data admin ke localStorage (tanpa backend)
      // Nanti bisa diganti dengan API call ke backend
      const adminData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: 'admin',
        createdAt: new Date().toISOString()
      };

      // Simpan ke store
      loginAdmin(adminData, 'mock-admin-token-' + Date.now());

      toast.success('Registrasi berhasil! Mengalihkan ke dashboard...');

      // Redirect ke dashboard admin setelah delay
      setTimeout(() => {
        router.push('/admin');
      }, 1500);

    } catch (err) {
      toast.error('Terjadi kesalahan saat registrasi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <Link href="/admin/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} />
          Kembali ke Login
        </Link>

        {/* Register Card */}
        <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#5C5CFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Register</h1>
            <p className="text-gray-400">Daftar akun admin baru</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Admin
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                placeholder="admin@pushid.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                  placeholder="Minimal 8 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                  placeholder="Ulangi password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Admin Code */}
            <div>
              <label htmlFor="adminCode" className="block text-sm font-medium text-gray-300 mb-2">
                Kode Admin
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="adminCode"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleInputChange}
                required
                maxLength={6}
                className="w-full px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all text-center text-2xl tracking-[0.5em] font-mono"
                placeholder="••••••"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Mail size={12} />
                Hubungi admin di <a href="mailto:greenwhite853@gmail.com" className="text-[#5C5CFF] hover:underline">greenwhite853@gmail.com</a> untuk mendapatkan kode
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#5C5CFF] text-white font-bold hover:bg-[#4a4ae0] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mendaftar...' : 'Daftar sebagai Admin'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Sudah punya akun admin?{' '}
              <Link href="/admin/login" className="text-[#5C5CFF] hover:text-[#4a4ae0] transition-colors">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}