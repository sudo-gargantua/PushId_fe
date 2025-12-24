'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminAuthGuard from '../../../components/admin/AdminAuthGuard';
import { Search, Filter, Trash2, Users, AlertTriangle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function ManageLobbiesPage() {
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gameFilter, setGameFilter] = useState('all');

  // Fetch lobbies dari API
  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/api/admin/lobbies`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        if (res.ok) {
          const data = await res.json();
          setLobbies(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch lobbies:', err);
        toast.error('Gagal memuat data lobby');
      } finally {
        setLoading(false);
      }
    };
    fetchLobbies();
  }, []);

  const filteredLobbies = lobbies.filter((lobby) => {
    const matchesSearch =
      lobby.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lobby.creator?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || lobby.status === statusFilter;

    // Fix: Game filter - handle both full names and abbreviations
    let matchesGame = gameFilter === 'all';
    if (!matchesGame && lobby.game) {
      const gameLower = lobby.game.toLowerCase();
      const filterLower = gameFilter.toLowerCase();

      // Map filter values to possible game name patterns
      const gamePatterns = {
        'honor of kings': ['honor of kings', 'hok'],
        'mobile legends': ['mobile legends', 'mlbb', 'mobile legend'],
        'valorant': ['valorant'],
        'pubg': ['pubg', 'pubg mobile'],
        'genshin impact': ['genshin impact', 'genshin'],
        'cod': ['cod', 'call of duty']
      };

      // Check if the lobby game matches the selected filter
      for (const [key, patterns] of Object.entries(gamePatterns)) {
        if (patterns.includes(filterLower) || key === filterLower) {
          matchesGame = patterns.some(p => gameLower.includes(p)) || gameLower.includes(key);
          if (matchesGame) break;
        }
      }
    }

    return matchesSearch && matchesStatus && matchesGame;
  });

  const handleDeleteLobby = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus lobby ini?')) {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/api/admin/lobbies/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        if (res.ok) {
          setLobbies(lobbies.filter(l => l.id !== id));
          toast.success('Lobby berhasil dihapus');
        } else {
          const errorData = await res.json();
          toast.error(errorData.message || 'Gagal menghapus lobby');
        }
      } catch (err) {
        console.error('Delete error:', err);
        toast.error('Terjadi kesalahan');
      }
    }
  };

  const handleToggleStatus = (id) => {
    console.log('Toggling status:', id);
  };

  return (
    <AdminAuthGuard>
      <Toaster position="top-right" />
      <div className="flex">
        {/* SIDEBAR */}
        <AdminSidebar activePage="manage-lobbies" />

        {/* CONTENT */}
        <main className="ml-64 p-6 w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Manage Lobbies</h1>
            <p className="text-gray-400">
              Kelola semua lobby yang ada di platform
            </p>
          </div>

          {/* FILTER */}
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari lobby..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>

              <select
                value={gameFilter}
                onChange={(e) => setGameFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white"
              >
                <option value="all">Semua Game</option>
                <option value="honor of kings">Honor of Kings</option>
                <option value="mobile legends">Mobile Legends</option>
                <option value="valorant">Valorant</option>
                <option value="pubg">PUBG</option>
                <option value="genshin impact">Genshin Impact</option>
              </select>

              <button className="px-6 py-3 rounded-xl bg-[#5C5CFF] text-white font-bold flex items-center justify-center gap-2">
                <Filter size={20} />
                Filter
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1e2230]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-300">Lobby</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-300">Game</th>
                  <th className="px-6 py-4 text-left text-xs text-gray-300">
                    Creator
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-300">
                    Players
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-300">
                    Reports
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1e2230]">
                {filteredLobbies.map((lobby) => (
                  <tr key={lobby.id}>
                    <td className="px-6 py-4 text-white font-bold">
                      {lobby.title}
                      <div className="text-sm text-gray-400">{lobby.rank}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{lobby.game}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {lobby.creator}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(lobby.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${lobby.status === 'active'
                          ? 'bg-green-900/50 text-green-300'
                          : 'bg-red-900/50 text-red-300'
                          }`}
                      >
                        {lobby.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <Users size={16} className="inline mr-2" />
                      {lobby.players}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      <AlertTriangle
                        size={16}
                        className="inline mr-2 text-yellow-400"
                      />
                      {lobby.reports}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteLobby(lobby.id)}
                        className="p-2 bg-red-600/20 text-red-400 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLobbies.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Tidak ada lobby ditemukan.
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}
