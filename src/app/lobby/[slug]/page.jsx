'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Game theme mapping inline (tanpa dependency eksternal)
const GAME_THEMES = {
  'honor of kings': { label: 'Honor of Kings', className: 'bg-purple-500/20 text-purple-400 border border-purple-500/50' },
  'mobile legends': { label: 'Mobile Legends', className: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' },
  'valorant': { label: 'Valorant', className: 'bg-rose-500/20 text-rose-400 border border-rose-500/50' },
  'pubg': { label: 'PUBG', className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' },
  'cod': { label: 'COD', className: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' },
};

const getGameTheme = (gameName) => {
  if (!gameName) return { label: 'Unknown', className: 'bg-gray-500/20 text-gray-400 border border-gray-500/50' };
  const key = gameName.toLowerCase();
  return GAME_THEMES[key] || { label: gameName, className: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' };
};

export default function LobbyDetail() {
  const params = useParams();
  const slug = params?.slug;

  const [lobby, setLobby] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLobby = async () => {
      if (!slug) {
        setError("Slug tidak ditemukan");
        setLoading(false);
        return;
      }

      try {
        console.log('[LOBBY DETAIL] Fetching lobby with slug:', slug);

        const response = await fetch(`http://localhost:8000/api/lobbies/${slug}`);

        console.log('[LOBBY DETAIL] Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Lobby tidak ditemukan`);
        }

        const result = await response.json();
        console.log('[LOBBY DETAIL] API Result:', result);

        // Parse response - API returns { status, data: {...} }
        const lobbyData = result.data || result;

        if (!lobbyData || !lobbyData.id) {
          throw new Error("Data lobby tidak valid");
        }

        console.log('[LOBBY DETAIL] Lobby data:', lobbyData);
        setLobby(lobbyData);
        setError(null);
      } catch (err) {
        console.error('[LOBBY DETAIL] Error:', err);
        setError(err.message);
        setLobby(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLobby();
  }, [slug]);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] text-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#5C5CFF] border-t-transparent rounded-full animate-spin" />
          <p className="font-bold tracking-widest animate-pulse">LOADING DATA...</p>
        </div>
      </main>
    );
  }

  // --- ERROR STATE ---
  if (error || !lobby) {
    return (
      <main className="min-h-screen bg-[#020617] text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Lobby tidak ditemukan
          </h1>
          {error && <p className="text-gray-500 mb-4 text-sm">{error}</p>}
          <Link href="/lobby" className="text-[#5C5CFF] hover:underline">
            Kembali ke Lobby
          </Link>
        </div>
      </main>
    );
  }

  // --- SUCCESS: RENDER LOBBY DETAIL ---
  const gameName = lobby.game || lobby.game_name || 'Unknown';
  const gameTheme = getGameTheme(gameName);
  const creatorName = lobby.creator || lobby.user?.name || 'ANONYMOUS';
  const descriptionPoints = lobby.description
    ? lobby.description.split('.').filter((d) => d.trim())
    : [];

  // Determine CTA button style based on link
  const link = lobby.link || '#';
  const isWhatsApp = link.includes('wa.me') || link.includes('whatsapp');
  const isDiscord = link.includes('discord');

  const buttonStyle = isWhatsApp
    ? 'bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)]'
    : isDiscord
      ? 'bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-[0_0_20px_rgba(88,101,242,0.4)]'
      : 'bg-slate-700 hover:bg-slate-600 text-white';

  const buttonText = isWhatsApp
    ? 'CHAT WHATSAPP NOW!'
    : isDiscord
      ? 'JOIN DISCORD NOW!'
      : 'KUNJUNGI LINK';

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

        {/* KIRI - Detail Lobby */}
        <div className="flex-1 p-8 md:p-12">
          {/* Game Badge */}
          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide ${gameTheme.className}`}>
              {gameTheme.label}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold uppercase mb-3">
            {lobby.title}
          </h1>

          {/* Rank */}
          <div className="mb-10">
            <span className="text-yellow-500 italic font-medium">
              Tier : {lobby.rank || 'Unranked'}
            </span>
          </div>

          {/* Ketentuan/Description */}
          <div className="bg-[#111625] border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-4 uppercase">Ketentuan</h3>
            <ul className="space-y-2">
              {descriptionPoints.length > 0 ? (
                descriptionPoints.map((point, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="mr-2 text-[#5C5CFF] font-bold">•</span>
                    {point.trim()}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic">
                  {lobby.description || 'Tidak ada deskripsi khusus.'}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* KANAN - Creator Info */}
        <div className="md:w-[400px] bg-[#0b1121] md:border-l border-slate-800 p-8 md:p-12 flex flex-col justify-between items-center">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-32 h-32 bg-slate-800 rounded-full mb-6 flex items-center justify-center text-5xl border-4 border-[#5C5CFF]/30">
              👤
            </div>

            {/* Creator Name */}
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8">
              {creatorName}
            </h2>

            {/* Game Badge */}
            <span className={`px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest ${gameTheme.className}`}>
              {gameTheme.label}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="w-full space-y-4 mt-8">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-4 rounded-xl font-bold text-center uppercase tracking-wider transition-all hover:scale-105 ${buttonStyle}`}
            >
              {buttonText}
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied!');
              }}
              className="w-full py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all font-medium"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/lobby"
          className="bg-[#1e2235] text-[#5C5CFF] hover:bg-[#2a304a] font-bold py-3 px-10 rounded-lg uppercase tracking-wide text-sm border border-slate-800"
        >
          Back to Arena
        </Link>
      </div>
    </main>
  );
}

