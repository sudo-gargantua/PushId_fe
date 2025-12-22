'use client';

import React, { useState, useEffect } from 'react';
import { User, Flag, LogOut, X, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import toast, { Toaster } from 'react-hot-toast';

const CATEGORIES = ['ALL', 'HONOR OF KINGS', 'MOBILE LEGENDS', 'VALORANT', 'PUBG', 'COD'];

const GAME_COLORS = {
  'HONOR OF KINGS': 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]',
  'MOBILE LEGENDS': 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.6)]',
  'VALORANT': 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]',
  'PUBG': 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.6)]',
  'COD': 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.6)]',
};

export default function LobbyPage() {
  const router = useRouter();
  // ✅ Mengambil _hasHydrated dari store untuk mengetahui kapan data ready
  const { user, isLoggedIn, logout, token, _hasHydrated } = useAuthStore();
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedLobby, setSelectedLobby] = useState(null);
  const [reportData, setReportData] = useState({ reason: 'spam', description: '' });

  const fetchLobbies = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/lobbies');
      const json = await res.json();
      setLobbies(json.data || json);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLobbies();
    const closeDropdown = () => setOpenDropdownId(null);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const getRelativeTime = (dateString) => {
    if (!dateString) return 'Just Joined';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return 'Just Now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const handleReportSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("Anda harus login untuk melapor.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/lobbies/${selectedLobby.id}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reportData)
      });
      if (res.ok) {
        toast.success("Laporan dikirim ke Admin.");
        setShowReportModal(false);
        setReportData({ reason: 'spam', description: '' });
      }
    } catch (err) {
      toast.error("Gagal mengirim laporan.");
    }
  };

  // --- FUNGSI HAPUS: PROTEKSI KEPEMILIKAN ---
  const handleDeleteLobby = async (item) => {
    // Debug: Log data untuk troubleshooting
    console.log('[DELETE] User:', user);
    console.log('[DELETE] Item:', item);
    console.log('[DELETE] Comparing:', {
      itemCreator: item.creator,
      userName: user?.name,
      itemUserId: item.user_id,
      userId: user?.id
    });

    // PERBAIKAN: Compare by creator name OR user_id (support both API formats)
    const isOwner = (
      (item.creator && user?.name && item.creator.toLowerCase() === user.name.toLowerCase()) ||
      (item.user_id && user?.id && Number(item.user_id) === Number(user.id))
    );

    if (!isLoggedIn || !user || !isOwner) {
      toast.error("Gagal: Anda tidak memiliki izin untuk menghapus lobi ini!", {
        style: { background: '#1e2230', color: '#f87171', border: '1px solid #7f1d1d' },
        icon: '🚫'
      });
      return;
    }

    if (!confirm("Apakah Anda yakin ingin menghapus lobi Anda?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/lobbies/${item.slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (res.ok) {
        toast.success("Lobi Anda telah berhasil dihapus");
        setLobbies(lobbies.filter(l => l.id !== item.id));
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal menghapus lobi");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan jaringan");
    }
  };

  const filteredLobbies = Array.isArray(lobbies) ? lobbies.filter(lobby =>
    (activeCategory === 'ALL' || (lobby.game_name || lobby.game)?.toUpperCase() === activeCategory) &&
    (lobby.title.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <Toaster position="top-center" />

      {/* NAVBAR */}
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
            {/* ✅ PERBAIKAN: Menggunakan _hasHydrated dari store */}
            <span className="hidden md:block font-bold text-xl text-gray-200">
              Hello {_hasHydrated && isLoggedIn && user ? user.name : 'User'}
            </span>
            <div className="w-12 h-12 rounded-full border-2 border-[#5C5CFF] flex items-center justify-center">
              <User size={28} className="text-[#5C5CFF]" />
            </div>
            {/* ✅ PERBAIKAN: Tombol logout juga menggunakan _hasHydrated */}
            {_hasHydrated && isLoggedIn && (
              <button onClick={() => { logout(); router.push('/login'); }} className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all">
                <LogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        {/* Banner & Search */}
        <div className="w-full h-48 md:h-[300px] rounded-3xl overflow-hidden mb-10 border border-gray-800">
          <img src="/lobby-baner.png" alt="Banner" className="w-full h-full object-cover" />
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari lobby..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white focus:border-[#5C5CFF] outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-2 rounded-full text-sm font-bold border-2 transition-all ${activeCategory === cat ? 'bg-[#5C5CFF] border-[#5C5CFF] text-white shadow-lg' : 'bg-transparent border-[#1e2230] text-gray-400'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-indigo-400 font-bold animate-pulse uppercase tracking-widest">Entering Arena...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLobbies.map((item) => {
              const gameKey = (item.game_name || item.game || "").toUpperCase();

              return (
                <div key={item.id} className="bg-[#0F172A] border border-[#1e2230] rounded-3xl p-6 hover:border-[#5C5CFF] transition-all flex flex-col justify-between h-full relative">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${GAME_COLORS[gameKey] || 'bg-indigo-900/50 text-indigo-300'}`}>
                        {item.game_name || item.game}
                      </span>

                      <div className="flex flex-col items-end gap-1 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === item.id ? null : item.id);
                          }}
                          className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-all"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {/* --- MODIFIKASI DROPDOWN: SELALU TAMPILKAN KEDUA MENU --- */}
                        {openDropdownId === item.id && (
                          <div className="absolute right-0 top-10 w-40 bg-[#1e2230] border border-gray-700 rounded-xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in duration-150">
                            <button
                              onClick={() => handleDeleteLobby(item)}
                              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                            >
                              <Trash2 size={16} /> Hapus Lobi
                            </button>
                            <button
                              onClick={() => { setSelectedLobby(item); setShowReportModal(true); }}
                              className="w-full px-4 py-2 text-left text-sm text-yellow-500 hover:bg-yellow-500/10 flex items-center gap-2"
                            >
                              <Flag size={16} /> Laporkan
                            </button>
                          </div>
                        )}

                        <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">
                          {getRelativeTime(item.created_at || item.createdAt)}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 pr-10">{item.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-yellow-500 font-medium">{item.rank}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 italic">By: {item.user?.name || item.creator}</p>
                  </div>

                  <Link href={`/lobby/${item.slug}`}>
                    <button className="w-full py-3 rounded-xl border border-[#2a2f42] bg-[#131620] text-gray-400 text-sm font-bold hover:bg-[#5C5CFF] hover:text-white transition-all uppercase tracking-widest">
                      View Detail
                    </button>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* MODAL REPORT TETAP SAMA */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-3xl w-full max-w-md shadow-2xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Flag size={20} className="text-yellow-500" /> Laporkan Lobby</h3>
            <div className="space-y-4">
              <select
                value={reportData.reason}
                onChange={(e) => setReportData({ ...reportData, reason: e.target.value })}
                className="w-full bg-[#020617] border border-[#1e2230] rounded-xl px-4 py-3 text-white outline-none cursor-pointer"
              >
                <option value="spam">Spam / Iklan</option>
                <option value="harassment">Pelecehan / Toxic</option>
                <option value="scam">Penipuan</option>
                <option value="inappropriate">Konten Tidak Pantas</option>
              </select>
              <textarea
                value={reportData.description}
                onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                className="w-full bg-[#020617] border border-[#1e2230] rounded-xl px-4 py-3 text-white outline-none h-24 resize-none"
                placeholder="Detail laporan..."
              />
              <div className="flex gap-3">
                <button onClick={() => setShowReportModal(false)} className="flex-1 py-3 text-gray-400">Batal</button>
                <button onClick={handleReportSubmit} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl">Kirim</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}