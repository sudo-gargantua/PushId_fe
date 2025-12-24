'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, Trash2, Ban, Search, CheckCircle, MoreVertical, Check, AlertTriangle, X
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
// Impor Sidebar dari komponen yang sudah pasti dibuat
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminAuthGuard from '../../../components/admin/AdminAuthGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals State
  const [showBanModal, setShowBanModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  // Action State
  const [banDuration, setBanDuration] = useState('3_days');
  const [customBanReason, setCustomBanReason] = useState('');
  const [openUserDropdown, setOpenUserDropdown] = useState(null);

  // Fetch users dari API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/api/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
        toast.error('Gagal memuat data pengguna');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // --- LOGIC SEARCH / FILTER ---
  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- ACTIONS ---

  const handleBanClick = (user) => {
    setSelectedUser(user);
    setOpenUserDropdown(null);
    setShowBanModal(true);
    setCustomBanReason(`Akun Anda dinonaktifkan sementara karena pelanggaran komunitas.`);
  };

  const handleDeleteUserClick = (user) => {
    setSelectedUser(user);
    setOpenUserDropdown(null);
    setShowDeleteUserModal(true);
  };

  const handleUnbanUser = async (userId) => {
    if (confirm("Apakah Anda yakin ingin membuka blokir (Unban) user ini?")) {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/api/admin/users/${userId}/toggle-status`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        if (res.ok) {
          setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u));
          toast.success("User berhasil di-unban.");
        } else {
          toast.error("Gagal unban user");
        }
      } catch (err) {
        toast.error("Terjadi kesalahan");
      }
      setOpenUserDropdown(null);
    }
  };

  const confirmBanUser = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/api/admin/users/${selectedUser.id}/toggle-status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duration: banDuration,
          reason: customBanReason
        })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, status: 'banned' } : u));
        setShowBanModal(false);
        toast.success(`User ${selectedUser.username} berhasil di-banned.`);
      } else {
        toast.error("Gagal ban user");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan");
    }
  };

  const confirmDeleteUser = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/api/admin/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== selectedUser.id));
        setShowDeleteUserModal(false);
        toast.success(`Akun ${selectedUser.username} telah dihapus permanen.`);
      } else {
        toast.error("Gagal menghapus user");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#020617] text-white font-sans flex">
        <Toaster position="top-right" />

        {/* Sidebar Component */}
        <AdminSidebar activePage="users" />

        <main className="flex-1 md:ml-64 p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Manajemen User</h1>
              <p className="text-slate-400">Kelola status dan akses pengguna platform.</p>
            </div>
            <div className="relative">
              {/* Input Pencarian */}
              <input
                type="text"
                placeholder="Cari username atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0F172A] border border-[#1e2230] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-64 focus:w-80 transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
            </div>
          </div>

          {/* User Table */}
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-[#1e2230] text-slate-400 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Bergabung</th>
                  <th className="px-6 py-4 text-center">Pelanggaran</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2230]">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#1e2230]/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{user.username}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{user.email}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{user.joinDate}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.reportsCount > 3 ? 'bg-red-900/50 text-red-400' : 'bg-slate-800 text-slate-300'}`}>
                          {user.reportsCount}x
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {user.status === 'active' ? (
                          <span className="text-green-500 font-bold text-xs flex items-center justify-center gap-1 bg-green-900/20 px-2 py-1 rounded border border-green-900/50">
                            <CheckCircle size={14} /> Aktif
                          </span>
                        ) : (
                          <span className="text-red-500 font-bold text-xs flex items-center justify-center gap-1 bg-red-900/20 px-2 py-1 rounded border border-red-900/50">
                            <Ban size={14} /> Banned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center relative">
                        <button
                          onClick={() => setOpenUserDropdown(openUserDropdown === user.id ? null : user.id)}
                          className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {/* Dropdown Menu */}
                        {openUserDropdown === user.id && (
                          <div className="absolute right-8 top-10 w-48 bg-[#1e2230] border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                            {user.status === 'active' ? (
                              <button
                                onClick={() => handleBanClick(user)}
                                className="w-full text-left px-4 py-3 text-sm font-bold text-yellow-500 hover:bg-slate-700 flex items-center gap-2"
                              >
                                <Ban size={16} /> Ban Akun
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnbanUser(user.id)}
                                className="w-full text-left px-4 py-3 text-sm font-bold text-green-500 hover:bg-slate-700 flex items-center gap-2"
                              >
                                <Check size={16} /> Unban Akun
                              </button>
                            )}

                            <div className="border-t border-slate-700 my-1"></div>

                            <button
                              onClick={() => handleDeleteUserClick(user)}
                              className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-900/20 flex items-center gap-2"
                            >
                              <Trash2 size={16} /> Hapus Permanen
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                      Tidak ada user ditemukan dengan nama "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* --- MODAL BAN USER --- */}
        {showBanModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl w-full max-w-lg shadow-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">Ban User: <span className="text-yellow-500">{selectedUser.username}</span></h3>
                <button onClick={() => setShowBanModal(false)}><X size={20} className="text-slate-500 hover:text-white" /></button>
              </div>

              <p className="text-slate-400 text-sm mb-6">User ini tidak akan bisa login selama periode ban.</p>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Durasi Ban</label>
                <select
                  value={banDuration}
                  onChange={(e) => setBanDuration(e.target.value)}
                  className="w-full bg-[#020617] border border-[#1e2230] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="1_day">1 Hari</option>
                  <option value="3_days">3 Hari</option>
                  <option value="1_week">1 Minggu</option>
                  <option value="1_month">1 Bulan</option>
                  <option value="permanent">Permanen</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Alasan / Pesan ke User</label>
                <textarea
                  value={customBanReason}
                  onChange={(e) => setCustomBanReason(e.target.value)}
                  className="w-full bg-[#020617] border border-[#1e2230] rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button onClick={() => setShowBanModal(false)} className="flex-1 py-3 bg-transparent border border-[#1e2230] text-slate-400 font-bold rounded-xl hover:text-white">Batal</button>
                <button onClick={confirmBanUser} className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                  <Ban size={18} /> Eksekusi Ban
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL HAPUS USER (PERMANEN) --- */}
        {showDeleteUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F172A] border border-red-900/50 rounded-2xl w-full max-w-md shadow-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertTriangle size={120} className="text-red-500" />
              </div>

              <h3 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                <AlertTriangle size={24} /> HAPUS AKUN?
              </h3>
              <p className="text-slate-300 mb-2">
                Anda akan menghapus akun <span className="font-bold text-white">{selectedUser.username}</span> secara permanen.
              </p>
              <p className="text-slate-400 text-sm mb-6 bg-red-900/20 p-3 rounded-lg border border-red-900/30">
                Tindakan ini tidak dapat dibatalkan. Semua data user termasuk lobby dan riwayat akan hilang.
              </p>

              <div className="flex gap-4">
                <button onClick={() => setShowDeleteUserModal(false)} className="flex-1 py-3 bg-transparent border border-[#1e2230] text-slate-400 font-bold rounded-xl hover:text-white">Batal</button>
                <button onClick={confirmDeleteUser} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                  <Trash2 size={18} /> Ya, Hapus!
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminAuthGuard>
  );
}