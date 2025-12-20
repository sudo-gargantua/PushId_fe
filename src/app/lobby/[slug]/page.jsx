'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ShareButton from "@/components/ShareButton";
import { getGameTheme } from '@/lib/gameTheme';

export default function LobbyDetail() {
  const { slug } = useParams();
  const [lobby, setLobby] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA ---
  useEffect(() => {
    const getLobbyDetail = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        const res = await fetch(`${API_URL}/lobbies/${slug}`);
        if (!res.ok) throw new Error("Lobby tidak ditemukan");

        const resData = await res.json();
        setLobby(resData.data);
      } catch (err) {
        console.error("Error fetching lobby:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) getLobbyDetail();
  }, [slug]);

  // --- LOADING ---
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

  // --- NOT FOUND ---
  if (!lobby) {
    return (
      <main className="min-h-screen bg-[#020617] text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Lobby tidak ditemukan
          </h1>
          <Link href="/lobby" className="text-[#5C5CFF] hover:underline">
            Kembali ke Lobby
          </Link>
        </div>
      </main>
    );
  }

  // --- CTA BUTTON LOGIC ---
  const link = lobby.link;

  const getButtonType = (url) => {
    if (!url) return "default";
    if (url.includes("wa.me") || url.includes("whatsapp")) return "whatsapp";
    if (url.includes("discord")) return "discord";
    return "default";
  };

  const btnType = getButtonType(link);

  const buttonStyle = {
    whatsapp:
      "bg-[#25D366] hover:bg-[#128C7E] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)]",
    discord:
      "bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-[0_0_20px_rgba(88,101,242,0.4)]",
    default: "bg-slate-700 hover:bg-slate-600 text-white",
  }[btnType];

  const buttonText = {
    whatsapp: "CHAT WHATSAPP NOW!",
    discord: "JOIN DISCORD NOW!",
    default: "KUNJUNGI LINK",
  }[btnType];

  // --- GAME THEME (SATU SUMBER WARNA) ---
  const gameTheme = getGameTheme(lobby.game);

  const descriptionPoints = lobby.description
    ? lobby.description.split('.').filter((d) => d.trim())
    : [];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

        {/* KIRI */}
        <div className="flex-1 p-8 md:p-12">

          {/* GAME BADGE KECIL (POJOK KIRI ATAS) */}
          <div className="mb-6">
            <span
              className={`inline-block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide ${gameTheme.className}`}
            >
              {gameTheme.label}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold uppercase mb-3">
            {lobby.title}
          </h1>

          <div className="mb-10">
            <span className="text-yellow-500 italic font-medium">
              Tier : {lobby.rank}
            </span>
          </div>

          <div className="bg-[#111625] border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-4 uppercase">Ketentuan</h3>
            <ul className="space-y-2">
              {descriptionPoints.length ? (
                descriptionPoints.map((point, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="mr-2 text-[#5C5CFF] font-bold">•</span>
                    {point.trim()}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic">
                  Tidak ada deskripsi khusus.
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* KANAN */}
        <div className="md:w-[400px] bg-[#0b1121] md:border-l border-slate-800 p-8 md:p-12 flex flex-col justify-between items-center">

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-slate-800 rounded-full mb-6 flex items-center justify-center text-5xl">
              👤
            </div>

            <h2 className="text-xl font-bold tracking-widest uppercase mb-8">
              {lobby.creator || "ANONYMOUS"}
            </h2>

            {/* GAME BADGE BESAR (KANAN) */}
            <span
              className={`px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest ${gameTheme.className}`}
            >
              {gameTheme.label}
            </span>
          </div>

          <div className="w-full space-y-4 mt-8">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-4 rounded-xl font-bold text-center uppercase tracking-wider transition-all hover:scale-105 ${buttonStyle}`}
            >
              {buttonText}
            </a>

            <div className="flex justify-center">
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

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
