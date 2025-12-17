'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Shield,
  ArrowLeft,
  Mail,
  Calendar,
  GamepadIcon
} from 'lucide-react';
import Link from 'next/link';

// Mock user data
const MOCK_USERS = [
  {
    id: 1,
    name: 'ProGamer123',
    email: 'progamer@example.com',
    status: 'active',
    role: 'user',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    lobbiesCreated: 5,
    reportsCount: 0
  },
  {
    id: 2,
    name: 'ToxicPlayer',
    email: 'toxic@example.com',
    status: 'banned',
    role: 'user',
    joinDate: '2024-02-20',
    lastActive: '1 week ago',
    lobbiesCreated: 2,
    reportsCount: 3
  },
  {
    id: 3,
    name: 'MLBBMaster',
    email: 'mlbb@example.com',
    status: 'active',
    role: 'user',
    joinDate: '2024-01-10',
    lastActive: '30 minutes ago',
    lobbiesCreated: 8,
    reportsCount: 1
  },
  {
    id: 4,
    name: 'AdminUser',
    email: 'admin@pushid.com',
    status: 'active',
    role: 'admin',
    joinDate: '2023-12-01',
    lastActive: '5 minutes ago',
    lobbiesCreated: 0,
    reportsCount: 0
  },
  {
    id: 5,
    name: 'NewbieGamer',
    email: 'newbie@example.com',
    status: 'active',
    role: 'user',
    joinDate: '2024-12-15',
    lastActive: '1 day ago',
    lobbiesCreated: 1,
    reportsCount: 0
  }
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on search and filters
  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleUserAction = (userId, action) => {
    // Mock actions - in real app, these would call APIs
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) return;

    switch (action) {
      case 'ban':
        alert(`User ${user.name} telah dibanned (Mock)`);
        break;
      case 'unban':
        alert(`User ${user.name} telah diunban (Mock)`);
        break;
      case 'promote':
        alert(`User ${user.name} telah dipromosikan ke admin (Mock)`);
        break;
      case 'demote':
        alert(`User ${user.name} telah diturunkan ke user biasa (Mock)`);
        break;
      default:
        break;
    }
    setSelectedUser(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20';
      case 'banned': return 'text-red-400 bg-red-900/20';
      case 'inactive': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-purple-400 bg-purple-900/20';
      case 'moderator': return 'text-blue-400 bg-blue-900/20';
      case 'user': return 'text-gray-400 bg-gray-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      {/* Header */}
      <header className="bg-[#0F172A] border-b border-[#1e2230] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <Shield size={32} className="text-[#5C5CFF]" />
            <div>
              <h1 className="text-xl font-bold text-white">User Management</h1>
              <p className="text-sm text-gray-400">Manage user accounts and permissions</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters and Search */}
        <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari user berdasarkan nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
            >
              <option value="all">Semua Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
            >
              <option value="all">Semua Role</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1e2230]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Last Active</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Lobbies</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Reports</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2230]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#1e2230]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#5C5CFF] flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.lastActive}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.lobbiesCreated}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{user.reportsCount}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative">
                        <button
                          onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                          className="p-2 rounded-lg hover:bg-[#2a2f42] transition-colors"
                        >
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>

                        {selectedUser === user.id && (
                          <div className="absolute right-0 top-8 w-48 bg-[#0F172A] border border-[#1e2230] rounded-xl shadow-2xl z-50">
                            <div className="py-2">
                              {user.status === 'banned' ? (
                                <button
                                  onClick={() => handleUserAction(user.id, 'unban')}
                                  className="w-full px-4 py-2 text-left text-sm text-green-400 hover:bg-[#1e2230] flex items-center gap-2 transition-colors"
                                >
                                  <UserCheck size={14} />
                                  Unban User
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUserAction(user.id, 'ban')}
                                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[#1e2230] flex items-center gap-2 transition-colors"
                                >
                                  <UserX size={14} />
                                  Ban User
                                </button>
                              )}

                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleUserAction(user.id, 'promote')}
                                  className="w-full px-4 py-2 text-left text-sm text-purple-400 hover:bg-[#1e2230] flex items-center gap-2 transition-colors"
                                >
                                  <Shield size={14} />
                                  Promote to Admin
                                </button>
                              )}

                              {user.role === 'admin' && user.id !== 4 && ( // Don't allow demoting the main admin
                                <button
                                  onClick={() => handleUserAction(user.id, 'demote')}
                                  className="w-full px-4 py-2 text-left text-sm text-yellow-400 hover:bg-[#1e2230] flex items-center gap-2 transition-colors"
                                >
                                  <UserCheck size={14} />
                                  Demote to User
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Tidak ada user ditemukan dengan filter yang dipilih.</p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-[#5C5CFF] mb-2">{MOCK_USERS.length}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {MOCK_USERS.filter(u => u.status === 'active').length}
            </div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-red-400 mb-2">
              {MOCK_USERS.filter(u => u.status === 'banned').length}
            </div>
            <div className="text-sm text-gray-400">Banned Users</div>
          </div>
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              {MOCK_USERS.filter(u => u.role === 'admin').length}
            </div>
            <div className="text-sm text-gray-400">Admin Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}