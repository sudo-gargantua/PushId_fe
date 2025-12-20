'use client';

import React from 'react';
import { Users, AlertTriangle, Bell, ShieldAlert } from 'lucide-react';

export default function AdminSidebar({ activePage }) {
  return (
    <aside className="w-64 bg-[#0F172A] border-r border-[#1e2230] hidden md:flex flex-col p-6 fixed h-full top-0 left-0 z-40">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
          <ShieldAlert className="text-white" />
        </div>
        <span className="font-black text-xl tracking-wider text-white">ADMIN<span className="text-red-500">PANEL</span></span>
      </div>

      <nav className="space-y-4">
        {/* Menggunakan tag <a> untuk navigasi aman di preview */}
        <a href="/admin" className="block w-full">
          <div 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${
              activePage === 'reports' 
                ? 'bg-[#1e2230] text-red-400 border border-red-900/30' 
                : 'text-slate-400 hover:text-white hover:bg-[#1e2230]'
            }`}
          >
            <AlertTriangle size={20} />
            Laporan Masuk
          </div>
        </a>
        
        <a href="/admin/users" className="block w-full">
          <div 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer ${
              activePage === 'users' 
                ? 'bg-[#1e2230] text-blue-400 border border-blue-900/30' 
                : 'text-slate-400 hover:text-white hover:bg-[#1e2230]'
            }`}
          >
            <Users size={20} />
            User List
          </div>
        </a>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#1e2230] rounded-xl transition-colors">
          <Bell size={20} />
          Broadcast Info
        </button>
      </nav>
    </aside>
  );
}