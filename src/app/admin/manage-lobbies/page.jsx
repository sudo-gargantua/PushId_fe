'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { Search, Filter, Trash2, Users, AlertTriangle } from 'lucide-react';

const MOCK_LOBBIES = [
  {
    id: 1,
    game: 'HOK',
    title: 'Push Rank : ROAD TO LEGEND',
    rank: 'Grandmaster',
    creator: 'ProGamer123',
    status: 'active',
    createdAt: new Date(),
    players: 5,
    reports: 2,
  },
  {
    id: 2,
    game: 'MLBB',
    title: 'Cari Team untuk Push rank',
    rank: 'Mythical Glory',
    creator: 'MLBBMaster',
    status: 'active',
    createdAt: new Date(Date.now() - 5 * 60000),
    players: 3,
    reports: 0,
  },
  {
    id: 3,
    game: 'Valorant',
    title: 'Cari Teman Untuk mabar',
    rank: 'Radiant',
    creator: 'ValorantAce',
    status: 'inactive',
    createdAt: new Date(Date.now() - 15 * 60000),
    players: 1,
    reports: 1,
  },
  {
    id: 4,
    game: 'PUBG',
    title: 'Bantu Push sampai Ace',
    rank: 'Crown',
    creator: 'PUBGKing',
    status: 'active',
    createdAt: new Date(Date.now() - 12 * 60 * 60000),
    players: 4,
    reports: 0,
  },
];

export default function ManageLobbiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gameFilter, setGameFilter] = useState('all');

  const filteredLobbies = MOCK_LOBBIES.filter((lobby) => {
    const matchesSearch =
      lobby.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lobby.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || lobby.status === statusFilter;
    const matchesGame =
      gameFilter === 'all' ||
      lobby.game.toLowerCase() === gameFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesGame;
  });

  const handleDeleteLobby = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus lobby ini?')) {
      console.log('Deleting lobby:', id);
    }
  };

  const handleToggleStatus = (id) => {
    console.log('Toggling status:', id);
  };

  return (
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
              <option value="hok">HOK</option>
              <option value="mlbb">MLBB</option>
              <option value="valorant">Valorant</option>
              <option value="pubg">PUBG</option>
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
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        lobby.status === 'active'
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
  );
}
