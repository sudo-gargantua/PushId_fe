'use client';

import React, { useState } from 'react';
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
        reports: 2
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
        reports: 0
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
        reports: 1
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
        reports: 0
    }
];

export default function LobbiesManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [gameFilter, setGameFilter] = useState('all');

    const filteredLobbies = MOCK_LOBBIES.filter(lobby => {
        const matchesSearch = lobby.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lobby.creator.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || lobby.status === statusFilter;
        const matchesGame = gameFilter === 'all' || lobby.game.toLowerCase() === gameFilter.toLowerCase();
        return matchesSearch && matchesStatus && matchesGame;
    });

    const handleDeleteLobby = (lobbyId) => {
        if (confirm('Apakah Anda yakin ingin menghapus lobby ini?')) {
            console.log('Deleting lobby:', lobbyId);
            // In real app, call API to delete
        }
    };

    const handleToggleStatus = (lobbyId) => {
        console.log('Toggling status for lobby:', lobbyId);
        // In real app, call API to update status
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2">Manage Lobbies</h2>
                <p className="text-sm text-gray-400">Kelola semua lobby yang ada di platform</p>
            </div>

            {/* Filters */}
            <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari lobby..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                    >
                        <option value="all">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Tidak Aktif</option>
                    </select>

                    <select
                        value={gameFilter}
                        onChange={(e) => setGameFilter(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                    >
                        <option value="all">Semua Game</option>
                        <option value="hok">HOK</option>
                        <option value="mlbb">MLBB</option>
                        <option value="valorant">Valorant</option>
                        <option value="pubg">PUBG</option>
                        <option value="cod">COD</option>
                    </select>

                    <button className="px-6 py-3 rounded-xl bg-[#5C5CFF] text-white font-bold hover:bg-[#4a4ae0] transition-colors flex items-center justify-center gap-2">
                        <Filter size={20} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Lobby Table */}
            <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#1e2230]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Lobby</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Game</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Creator</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Players</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Reports</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1e2230]">
                            {filteredLobbies.map((lobby) => (
                                <tr key={lobby.id} className="hover:bg-[#1e2230]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-bold text-white">{lobby.title}</div>
                                            <div className="text-sm text-gray-400">{lobby.rank}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-900/50 text-indigo-300">
                                            {lobby.game}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{lobby.creator}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleStatus(lobby.id)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${lobby.status === 'active'
                                                    ? 'bg-green-900/50 text-green-300'
                                                    : 'bg-red-900/50 text-red-300'
                                                }`}
                                        >
                                            {lobby.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} className="text-gray-400" />
                                            <span className="text-sm text-gray-300">{lobby.players}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle size={16} className="text-yellow-400" />
                                            <span className="text-sm text-gray-300">{lobby.reports}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteLobby(lobby.id)}
                                            className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLobbies.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Tidak ada lobby ditemukan.</p>
                    </div>
                )}
            </div>

            {/* Stats Footer */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-4">
                    <div className="text-2xl font-bold text-white">{MOCK_LOBBIES.length}</div>
                    <div className="text-sm text-gray-400">Total Lobbies</div>
                </div>
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-4">
                    <div className="text-2xl font-bold text-green-400">{MOCK_LOBBIES.filter(l => l.status === 'active').length}</div>
                    <div className="text-sm text-gray-400">Active Lobbies</div>
                </div>
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-4">
                    <div className="text-2xl font-bold text-blue-400">{MOCK_LOBBIES.reduce((sum, l) => sum + l.players, 0)}</div>
                    <div className="text-sm text-gray-400">Total Players</div>
                </div>
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-4">
                    <div className="text-2xl font-bold text-yellow-400">{MOCK_LOBBIES.reduce((sum, l) => sum + l.reports, 0)}</div>
                    <div className="text-sm text-gray-400">Total Reports</div>
                </div>
            </div>
        </div>
    );
}
