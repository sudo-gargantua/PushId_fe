'use client'; 

import React, { useState } from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';

// Data Mockup
const ALL_LOBBIES = [
  {
    id: 1,
    game: 'HOK',
    title: 'Push Rank : ROAD TO LEGEND',
    rank: 'Grandmaster',
    createdAt: new Date(),
    tagColor: 'bg-indigo-900/50 text-indigo-300',
    creator: 'ProGamer123'
  },
  {
    id: 2,
    game: 'MLBB',
    title: 'Cari Team untuk Push rank',
    rank: 'Mythical Glory',
    createdAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    tagColor: 'bg-blue-900/50 text-blue-300',
    creator: 'MLBBMaster'
  },
  {
    id: 3,
    game: 'Valorant',
    title: 'Cari Teman Untuk mabar ',
    rank: 'Radiant',
    createdAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    tagColor: 'bg-purple-900/50 text-purple-300',
    creator: 'ValorantAce'
  },
  {
    id: 4,
    game: 'PUBG',
    title: 'Bantu Push sampai Ace',
    rank: 'Crown',
    createdAt: new Date(Date.now() - 12 * 60 * 60000), // 12 hours ago
    tagColor: 'bg-yellow-900/50 text-yellow-300',
    creator: 'PUBGKing'
  },
  {
    id: 5,
    game: 'COD',
    title: 'Push Rank Sampai LEGEND!',
    rank: 'Grandmaster',
    createdAt: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    tagColor: 'bg-green-900/50 text-green-300',
    creator: 'CODLegend'
  },
  {
    id: 6,
    game: 'HOK',
    title: 'Mabar santai Classic',
    rank: 'Platinum',
    createdAt: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
    tagColor: 'bg-indigo-900/50 text-indigo-300',
    creator: 'HOKChill'
  },
];

const CATEGORIES = ['ALL', 'HOK', 'MLBB', 'VALORANT', 'PUBG', 'COD'];

export default function LobbyPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to get relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just Now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Logic Filter
  const filteredLobbies = ALL_LOBBIES.filter(lobby => 
    (activeCategory === 'ALL' || lobby.game.toUpperCase() === activeCategory) &&
    (lobby.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     lobby.creator.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="grid grid-cols-3 items-center px-6 py-6 max-w-7xl mx-auto">
        {/* Kosong Kiri */}
        <div></div>

        {/* Menu Tengah */}
        <div className="flex justify-center">
          <div className="flex gap-6 text-lg font-bold">
            {/* Menggunakan <a> untuk kompatibilitas preview. Gunakan <Link> di project Next.js asli */}
            <a href="/" className="text-gray-300 hover:text-[#4a4ae0] transition">
              Home
            </a>
            
            {/* 2. PERBAIKAN DISINI: Link ke /create-lobby */}
            <a 
              href="/create-lobby" 
              className="text-gray-300 hover:text-[#4a4ae0] transition cursor-pointer"
            >
              Create Team
            </a>

            <button className="text-gray-300 hover:text-[#4a4ae0] transition">All Games</button>
          </div>
        </div>

        {/* User Kanan */}
        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            <span className="hidden md:block font-bold text-xl text-gray-200">Hello Users</span>
            
            <a href="/login" className="w-12 h-12 rounded-full border-2 border-[#5C5CFF] flex items-center justify-center cursor-pointer hover:bg-[#5C5CFF]/20 transition group">
               <User size={28} className="text-[#5C5CFF] group-hover:text-white transition" />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        
        {/* --- HERO BANNER --- */}
        <div className="w-full h-48 md:h-[300px] rounded-3xl overflow-hidden mb-10 relative group border border-gray-800">
           <img 
            src="/lobby-baner.png" 
            alt="Lobby Banner" 
            className="w-full h-full object-cover"
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)'; 
            }}
           />
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari lobby berdasarkan judul atau pembuat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
          />
        </div>

        {/* --- FILTERS --- */}
        <div className="flex flex-wrap gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 rounded-full text-sm font-bold border-2 transition-all duration-300 uppercase tracking-wider ${
                activeCategory === cat
                  ? 'bg-[#5C5CFF] border-[#5C5CFF] text-white shadow-[0_0_15px_rgba(92,92,255,0.5)]'
                  : 'bg-transparent border-[#1e2230] text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- CARD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLobbies.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#0F172A] border border-[#1e2230] rounded-3xl p-6 hover:border-[#5C5CFF] hover:shadow-[0_0_20px_rgba(92,92,255,0.15)] transition-all duration-300 group flex flex-col justify-between h-full"
            >
              <div>
                {/* Header Card: Tag & Time */}
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${item.tagColor} bg-opacity-20`}>
                    {item.game}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{getRelativeTime(item.createdAt)}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                    {item.title}
                </h3>

                {/* Rank Indicator */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-yellow-500 font-medium">{item.rank}</span>
                </div>

                {/* Creator */}
                <p className="text-sm text-gray-400 mb-4">Oleh: {item.creator}</p>
              </div>

              {/* Button Detail */}
              <Link href={`/lobby/${item.id}`}>
                <button className="w-full py-3 rounded-xl border border-[#2a2f42] bg-[#131620] text-gray-400 text-sm font-bold hover:bg-[#5C5CFF] hover:text-white hover:border-[#5C5CFF] transition-all duration-300">
                  Lihat detail
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLobbies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Tidak ada lobby ditemukan untuk kategori ini.</p>
          </div>
        )}
      </main>
    </div>
  );
}