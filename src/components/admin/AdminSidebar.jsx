'use client';

import React from 'react';
import { Users, AlertTriangle, Bell, ShieldAlert, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAdminAuthStore } from '@/store/useAdminAuthStore';
import { useToast } from '@/components/Toast';

export default function AdminSidebar({ activePage }) {
  const router = useRouter();
  const toast = useToast();
  const { admin, logoutAdmin } = useAdminAuthStore();

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      logoutAdmin();
      toast.success('Berhasil logout dari panel admin');
      router.push('/admin/login');
    }
  };

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-[#1e2230] hidden md:flex flex-col p-6 fixed h-full top-0 left-0 z-40">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
          <ShieldAlert className="text-white" />
        </div>
        <span className="font-black text-xl tracking-wider text-white">
          ADMIN<span className="text-red-500">PANEL</span>
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-4 flex-1">

        {/* LAPORAN MASUK */}
        <a href="/admin" className="block w-full">
          <div
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${activePage === 'reports'
                ? 'bg-[#1e2230] text-red-400 border border-red-900/30'
                : 'text-slate-400 hover:text-white hover:bg-[#1e2230]'
              }`}
          >
            <AlertTriangle size={20} />
            Laporan Masuk
          </div>
        </a>

        {/* MANAGE LOBBIES */}
        <a href="/admin/manage-lobbies" className="block w-full">
          <div
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${activePage === 'manage-lobbies'
                ? 'bg-[#1e2230] text-green-400 border border-green-900/30'
                : 'text-slate-400 hover:text-white hover:bg-[#1e2230]'
              }`}
          >
            <Users size={20} />
            Manage Lobbies
          </div>
        </a>

        {/* USER LIST */}
        <a href="/admin/users" className="block w-full">
          <div
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${activePage === 'users'
                ? 'bg-[#1e2230] text-blue-400 border border-blue-900/30'
                : 'text-slate-400 hover:text-white hover:bg-[#1e2230]'
              }`}
          >
            <Users size={20} />
            User List
          </div>
        </a>

        {/* BROADCAST */}
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#1e2230] rounded-xl transition-colors"
        >
          <Bell size={20} />
          Broadcast Info
        </button>

      </nav>

      {/* FOOTER - ADMIN INFO & LOGOUT */}
      <div className="border-t border-[#1e2230] pt-4 mt-4">
        {admin && (
          <div className="mb-4 px-4">
            <p className="text-white font-bold text-sm truncate">{admin.name}</p>
            <p className="text-slate-500 text-xs truncate">{admin.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-white hover:bg-red-900/30 rounded-xl transition-all font-bold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
