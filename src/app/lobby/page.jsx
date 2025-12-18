'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import { User, Bell, MoreVertical, Trash2, Flag, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const CATEGORIES = ['ALL', 'HOK', 'MLBB', 'VALORANT', 'PUBG', 'COD'];

export default function LobbyPage() {
  const router = useRouter();
  
  // --- STATE & STORE ---
  const { user, isLoggedIn, logout } = useAuthStore();
  const [lobbies, setLobbies] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLobbyId, setDeleteLobbyId] = useState(null);
  
  const dropdownRef = useRef(null);

  // --- INTEGRASI API: Ambil Data Lobi ---
  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/lobbies');
        const json = await res.json();
        setLobbies(json.data);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLobbies();
  }, []);

  // --- LOGIC: Logout ---
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout();
      router.push('/login');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (openDropdown && !event.target.closest('.lobby-dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Helper Waktu Relatif
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    if (minutes < 1) return 'Just Now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const filteredLobbies = lobbies.filter(lobby => 
    (activeCategory === 'ALL' || lobby.game.toUpperCase() === activeCategory) &&
    (lobby.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="grid grid-cols-3 items-center px-6 py-6 max-w-7xl mx-auto">
        <div></div>
        <div className="flex justify-center">
          <div className="flex gap-6 text-lg font-bold">
            <Link href="/" className="text-gray-300 hover:text-[#4a4ae0] transition">Home</Link>
            <Link href="/create-lobby" className="text-gray-300 hover:text-[#4a4ae0] transition">Create Team</Link>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            {/* Nama User Dinamis */}
            <span className="hidden md:block font-bold text-xl text-gray-200">
              Hello {isLoggedIn && user ? user.name : 'User'}
            </span>
            
            <div className="flex items-center gap-2">
                {/* Ikon User */}
                <div className="w-12 h-12 rounded-full border-2 border-[#5C5CFF] flex items-center justify-center hover:bg-[#5C5CFF]/20 transition group">
                  <User size={28} className="text-[#5C5CFF] group-hover:text-white transition" />
                </div>

                {/* Tombol Logout (Muncul hanya jika Login) */}
                {isLoggedIn && (
                  <button 
                    onClick={handleLogout}
                    className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        {/* Banner */}
        <div className="w-full h-48 md:h-[300px] rounded-3xl overflow-hidden mb-10 relative group border border-gray-800">
           <img src="/lobby-baner.png" alt="Banner" className="w-full h-full object-cover" />
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari lobby..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white focus:border-[#5C5CFF] outline-none transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-2 rounded-full text-sm font-bold border-2 transition-all ${activeCategory === cat ? 'bg-[#5C5CFF] border-[#5C5CFF] text-white shadow-lg' : 'bg-transparent border-[#1e2230] text-gray-400'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Lobby Grid */}
        {loading ? (
            <div className="text-center py-20 animate-pulse text-indigo-400 font-bold uppercase tracking-widest">Entering Arena...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLobbies.map((item) => (
                <div key={item.id} className="bg-[#0F172A] border border-[#1e2230] rounded-3xl p-6 hover:border-[#5C5CFF] transition-all flex flex-col justify-between h-full">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-900/50 text-indigo-300">
                        {item.game}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium">{getRelativeTime(item.created_at)}</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-sm text-yellow-500 font-medium">{item.rank}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 italic">By: {item.creator}</p>
                </div>
                
                <Link href={`/lobby/${item.slug}`}>
                    <button className="w-full py-3 rounded-xl border border-[#2a2f42] bg-[#131620] text-gray-400 text-sm font-bold hover:bg-[#5C5CFF] hover:text-white transition-all uppercase tracking-widest transform active:scale-95">
                    View Detail
                    </button>
                </Link>
                </div>
            ))}
            </div>
        )}

        {!loading && filteredLobbies.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest">No Lobbies Found</div>
        )}
      </main>
    </div>
  );
}