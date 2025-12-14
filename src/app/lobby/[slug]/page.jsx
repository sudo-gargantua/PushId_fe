// app/lobby/[slug]/page.jsx
"use client";
import { useParams } from 'next/navigation';
import ShareButton from "@/components/ShareButton";

// Data Mockup (sama dengan lobby/page.jsx)
const ALL_LOBBIES = [
  {
    id: 1,
    game: 'HOK',
    title: 'Push Rank : ROAD TO LEGEND',
    rank: 'Grandmaster',
    time: 'Just Now',
    tagColor: 'bg-indigo-900/50 text-indigo-300',
    description: 'Mencari team untuk push rank dari Grandmaster ke Legend. Pemain aktif dan serius.',
    playersNeeded: 3,
    contact: 'https://wa.me/628123456789'
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
    contact: 'https://wa.me/628987654321'
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
          <a href="/lobby" className="text-[#5C5CFF] hover:underline">Kembali ke Lobby</a>
        </div>
      </main>
    );
  }

  const link = lobby.contact;

  // ---- Logic Deteksi Link ----
  function getButtonType(url) {
    if (!url) return "default";

    // WhatsApp
    if (url.includes("wa.me") || url.includes("whatsapp.com")) {
      return "whatsapp";
    }

    // Discord
    if (url.includes("discord.gg") || url.includes("discord.com")) {
      return "discord";
    }

    return "default";
  }

  const btnType = getButtonType(link);

  const buttonStyle = {
    whatsapp: "bg-green-600 hover:bg-green-500 text-white",
    discord: "bg-[#4f46e5] hover:bg-[#4338ca] text-white",
    default: "bg-slate-700 hover:bg-slate-600 text-white",
  }[btnType];

  const buttonText = {
    whatsapp: "Chat WhatsApp",
    discord: "Join Discord",
    default: "Kunjungi Link",
  }[btnType];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <a href="/lobby" className="text-[#5C5CFF] hover:underline text-lg">&larr; Kembali ke Lobby</a>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${lobby.tagColor} bg-opacity-20 mb-4`}>
                {lobby.game}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">{lobby.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-lg text-yellow-500 font-medium">{lobby.rank}</span>
              </div>
              <p className="text-sm text-gray-400">{lobby.time}</p>
            </div>
            <ShareButton />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Deskripsi</h2>
            <p className="text-gray-300 leading-relaxed">{lobby.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1e2230] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Pemain Dibutuhkan</h3>
              <p className="text-2xl font-bold text-[#5C5CFF]">{lobby.playersNeeded}</p>
            </div>
            <div className="bg-[#1e2230] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">Game</h3>
              <p className="text-xl text-gray-300">{lobby.game}</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex gap-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 ${buttonStyle}`}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}


