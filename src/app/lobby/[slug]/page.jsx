// src/app/lobby/[slug]/page.jsx
"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ShareButton from "@/components/ShareButton";

// Data Mockup
const ALL_LOBBIES = [
  {
    id: 1,
    game: 'Honor of Kings',
    title: 'BUTUH JUNGLER YANG GAK ALERGI OBJECTIVE!',
    rank: 'Grandmaster v',
    time: 'Just Now',
    tagColor: 'bg-indigo-900/50 text-indigo-300',
    description: 'Objective harus menang. Bisa Pakai Augran. Bisa Baca Peta. Peka Terhadap informasi.',
    playersNeeded: 3,
    contact: 'https://discord.gg/abc123' // Link Discord (Akan jadi Ungu)
  },
  {
    id: 2,
    game: 'MLBB',
    title: 'Cari Team untuk Push rank',
    rank: 'Mythical Glory',
    time: 'Just Now',
    tagColor: 'bg-blue-900/50 text-blue-300',
    description: 'Butuh team solid untuk naik rank. Main reguler setiap hari.',
    playersNeeded: 2,
    contact: 'https://discord.gg/abc123'
  },
  {
    id: 3,
    game: 'Valorant',
    title: 'Cari Teman Untuk mabar ',
    rank: 'Radiant',
    time: 'Just Now',
    tagColor: 'bg-purple-900/50 text-purple-300',
    description: 'Mabar santai Valorant. Pemain Radiant mencari teman.',
    playersNeeded: 2,
    contact: 'https://wa.me/628987654321' // Link WhatsApp (Akan jadi Hijau)
  },
  {
    id: 4,
    game: 'PUBG',
    title: 'Bantu Push sampai Ace',
    rank: 'Crown',
    time: '5m ago',
    tagColor: 'bg-yellow-900/50 text-yellow-300',
    description: 'Push rank PUBG dari Crown ke Ace. Butuh squad yang kompak.',
    playersNeeded: 3,
    contact: 'https://discord.gg/def456'
  },
  {
    id: 5,
    game: 'COD',
    title: 'Push Rank Sampai LEGEND!',
    rank: 'Grandmaster',
    time: '12m ago',
    tagColor: 'bg-green-900/50 text-green-300',
    description: 'Team COD push rank ke Legend. Pemain berpengalaman.',
    playersNeeded: 4,
    contact: 'https://wa.me/628112233445'
  },
  {
    id: 6,
    game: 'HOK',
    title: 'Mabar santai Classic',
    rank: 'Platinum',
    time: '15m ago',
    tagColor: 'bg-indigo-900/50 text-indigo-300',
    description: 'Mabar santai mode Classic HOK. Tidak terlalu serius.',
    playersNeeded: 1,
    contact: 'https://wa.me/628556667788'
  },
];

export default function LobbyDetail() {
  const { slug } = useParams();
  const lobby = ALL_LOBBIES.find(l => l.id === parseInt(slug));

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

  const link = lobby.contact;

  // ---- Logic 1: Deteksi Link untuk Warna Button ----
  function getButtonType(url) {
    if (!url) return "default";
    if (url.includes("wa.me") || url.includes("whatsapp.com")) return "whatsapp";
    if (url.includes("discord.gg") || url.includes("discord.com")) return "discord";
    return "default";
  }

  const btnType = getButtonType(link);

  // Styling Button sesuai permintaan (Hijau WA, Ungu Discord)
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


  // ---- Logic 2: Warna Badge Game "Cerah" (Neon Style) ----
  const getGameBadgeStyle = (gameName) => {
    // Mapping warna cerah berdasarkan nama game
    const styles = {
      'Honor of Kings': 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)]',
      'HOK': 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)]',
      'MLBB': 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.6)]',
      'Valorant': 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]',
      'PUBG': 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.6)]',
      'COD': 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.6)]',
    };
    return styles[gameName] || 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'; // Default
  };

  const descriptionPoints = lobby.description.split('.').filter(item => item.trim() !== '');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-8 flex flex-col items-center justify-center">
      
      {/* Container Utama */}
      <div className="w-full max-w-5xl bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* KOLOM KIRI: Detail Info */}
        <div className="flex-1 p-8 md:p-12 relative">
            
            {/* Game Badge Kecil (Atas Kiri) */}
            <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-lg bg-[#1e2235] text-[#5C5CFF] font-bold text-sm tracking-wide">
                    {lobby.game}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 uppercase leading-tight">
                {lobby.title}
            </h1>

            {/* Rank / Tier */}
            <div className="mb-10">
                <span className="text-yellow-500 font-medium text-lg">
                    Tier : {lobby.rank}
                </span>
            </div>

            {/* Box Ketentuan */}
            <div className="bg-[#111625] border border-slate-700/50 rounded-2xl p-6 md:p-8 min-h-[200px]">
                <h3 className="text-xl font-bold text-white mb-4">Ketentuan</h3>
                <ul className="space-y-2">
                    {descriptionPoints.length > 0 ? (
                        descriptionPoints.map((point, index) => (
                            <li key={index} className="flex items-start text-gray-300">
                                <span className="mr-2 text-[#5C5CFF]">•</span>
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
                <div className="w-32 h-32 bg-gray-300 rounded-full mb-6 border-4 border-[#1e2235]"></div>
                
                {/* Username */}
                <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-8">EL'GATO</h2>

                {/* --- REVISI: Game Tag Tunggal & Cerah --- */}
                <div className="w-full mb-8 flex justify-center">
                   <span className={`px-6 py-2 rounded-lg font-bold text-sm tracking-widest uppercase transform hover:scale-105 transition-transform duration-300 ${getGameBadgeStyle(lobby.game)}`}>
                      {lobby.game}
                   </span>
                </div>
            </div>

            {/* --- REVISI: CTA Button (Dynamic Color) --- */}
            <div className="w-full">
                 <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 rounded-xl font-bold text-center uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ${buttonStyle}`}
                >
                  {buttonText}
                </a>
            </div>

        </div>
      </div>

      {/* Tombol Back */}
      <div className="mt-8">
        <Link href="/lobby" className="bg-[#1e2235] text-[#5C5CFF] hover:bg-[#2a304a] font-bold py-3 px-10 rounded-lg uppercase tracking-wide text-sm transition-colors border border-slate-800">
            Back
        </Link>
      </div>

    </main>
  );
}