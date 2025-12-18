"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ShareButton from "@/components/ShareButton";

export default function LobbyDetail() {
  const { slug } = useParams();
  const [lobby, setLobby] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- INTEGRASI: Fetch Detail Data dari Laravel ---
  useEffect(() => {
    const getLobbyDetail = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        const res = await fetch(`${API_URL}/lobbies/${slug}`);
        
        if (!res.ok) throw new Error("Lobby tidak ditemukan");
        
        const resData = await res.json();
        // resData.data diambil sesuai struktur LobbyResource di Laravel
        setLobby(resData.data);
      } catch (err) {
        console.error("Error fetching lobby:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getLobbyDetail();
    }
  }, [slug]);

  // --- LOADING STATE (Desain Minimalis) ---
  if (loading) {
    return (
      <main className="min-h-screen bg-[#020617] text-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#5C5CFF] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold tracking-widest animate-pulse">LOADING DATA...</p>
        </div>
      </main>
    );
  }

  // --- NOT FOUND STATE ---
  if (!lobby) {
    return (
      <main className="min-h-screen bg-[#020617] text-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Lobby tidak ditemukan</h1>
          <Link href="/lobby" className="text-[#5C5CFF] hover:underline">Kembali ke Lobby</Link>
        </div>
      </main>
    );
  }

  // --- LOGIK DESAIN (Dipertahankan dari Kode Asli) ---
  const link = lobby.link; // Mengambil field 'link' dari API

  function getButtonType(url) {
    if (!url) return "default";
    if (url.includes("wa.me") || url.includes("whatsapp.com")) return "whatsapp";
    if (url.includes("discord.gg") || url.includes("discord.com")) return "discord";
    return "default";
  }

  const btnType = getButtonType(link);

  const buttonStyle = {
    whatsapp: "bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] border border-[#25D366]",
    discord: "bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-[0_0_20px_rgba(88,101,242,0.4)] border border-[#5865F2]",
    default: "bg-slate-700 hover:bg-slate-600 text-white",
  }[btnType];

  const buttonText = {
    whatsapp: "CHAT WHATSAPP NOW!",
    discord: "JOIN DISCORD NOW!",
    default: "KUNJUNGI LINK",
  }[btnType];

  const getGameBadgeStyle = (gameName) => {
    const styles = {
      'Honor of Kings': 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)]',
      'HOK': 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)]',
      'MLBB': 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.6)]',
      'Mobile Legends': 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.6)]',
      'Valorant': 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]',
      'PUBG': 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.6)]',
      'COD': 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.6)]',
    };
    return styles[gameName] || 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]';
  };

  // Memecah deskripsi berdasarkan titik untuk list ketentuan
  const descriptionPoints = lobby.description ? lobby.description.split('.').filter(item => item.trim() !== '') : [];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-8 flex flex-col items-center justify-center">
      
      {/* Container Utama */}
      <div className="w-full max-w-5xl bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* KOLOM KIRI: Detail Info */}
        <div className="flex-1 p-8 md:p-12 relative">
            
            {/* Game Badge Kecil */}
            <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-lg bg-[#1e2235] text-[#5C5CFF] font-bold text-sm tracking-wide uppercase">
                    {lobby.game}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 uppercase leading-tight">
                {lobby.title}
            </h1>

            {/* Rank / Tier */}
            <div className="mb-10">
                <span className="text-yellow-500 font-medium text-lg italic">
                    Tier : {lobby.rank}
                </span>
            </div>

            {/* Box Ketentuan */}
            <div className="bg-[#111625] border border-slate-700/50 rounded-2xl p-6 md:p-8 min-h-[200px]">
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Ketentuan</h3>
                <ul className="space-y-2">
                    {descriptionPoints.length > 0 ? (
                        descriptionPoints.map((point, index) => (
                            <li key={index} className="flex items-start text-gray-300">
                                <span className="mr-2 text-[#5C5CFF] font-bold">•</span>
                                {point.trim()}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400 italic">Tidak ada deskripsi khusus.</li>
                    )}
                </ul>
            </div>
        </div>

        {/* KOLOM KANAN: Profil & Action */}
        <div className="md:w-[400px] bg-[#0b1121] md:border-l border-slate-800 p-8 md:p-12 flex flex-col items-center justify-between">
            
            <div className="flex flex-col items-center w-full">
                {/* Avatar Placeholder */}
                <div className="w-32 h-32 bg-slate-800 rounded-full mb-6 border-4 border-[#1e2235] flex items-center justify-center text-5xl">
                   👤
                </div>
                
                {/* Username Creator */}
                <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-8">
                  {lobby.creator || "ANONYMOUS"}
                </h2>

                {/* Game Tag Cerah */}
                <div className="w-full mb-8 flex justify-center">
                   <span className={`px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase transform hover:scale-105 transition-transform duration-300 ${getGameBadgeStyle(lobby.game)}`}>
                      {lobby.game}
                   </span>
                </div>
            </div>

            {/* CTA Button & Share */}
            <div className="w-full space-y-4">
                 <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 rounded-xl font-bold text-center uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ${buttonStyle}`}
                >
                  {buttonText}
                </a>
                <div className="flex justify-center">
                   <ShareButton />
                </div>
            </div>

        </div>
      </div>

      {/* Tombol Back */}
      <div className="mt-8">
        <Link href="/lobby" className="bg-[#1e2235] text-[#5C5CFF] hover:bg-[#2a304a] font-bold py-3 px-10 rounded-lg uppercase tracking-wide text-sm transition-colors border border-slate-800">
            Back to Arena
        </Link>
      </div>

    </main>
  );
}