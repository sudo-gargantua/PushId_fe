'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app, this would call an API
    console.log('Admin login attempt:', formData);
    alert('Login berhasil! (Mock)');
    // Redirect to dashboard would happen here
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} />
          Kembali ke Home
        </Link>

        {/* Login Card */}
        <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#5C5CFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Masuk ke panel administrasi</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Masukkan password"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#5C5CFF] text-white font-bold hover:bg-[#4a4ae0] transition-colors shadow-lg"
            >
              Masuk ke Admin Panel
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Belum punya akun admin?{' '}
              <Link href="/admin/register" className="text-[#5C5CFF] hover:text-[#4a4ae0] transition-colors">
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}