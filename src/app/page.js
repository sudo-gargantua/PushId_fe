"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Gamepad2, Menu, X } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menggunakan gambar yang lebih mendekati karakter di desain (Vertical Portrait)
  const characters = [
    {
      id: 1,
      src: "/Ahri-img.jpg", // Wanita mirip Ahri/Mage
      alt: "Mage Character",
    },
    {
      id: 2,
      src: "/pubg-img.jpg", // Tactical/PUBG style
      alt: "Soldier Character",
    },
    {
      id: 3,
      src: "/Mayene.jpg", // Anime/Futuristic style
      alt: "Anime Character",
    },
    {
      id: 4,
      src: "/valo-png.jpg", // Sniper/Assassin style
      alt: "Sniper Character",
    }
  ];

  return (
    <div className="min-h-screen bg-[#020410] text-white font-sans overflow-x-hidden relative flex flex-col">
      
      {/* Background Ambient Glows - Disesuaikan agar lebih gelap dan subtle */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[150px]" />
      </div>

      {/* Navbar - Layout diperbaiki: Logo Kiri, Menu Tengah, User Kanan */}
      <nav className="relative z-50 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer w-[200px]">
          <div className="relative">
            <Gamepad2 className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
          </div>
          <div className="flex flex-col leading-none">
            <h1 className="text-2xl font-black tracking-widest text-white drop-shadow-md">
              PUSH<span className="text-[#6366f1]">ID</span>
            </h1>
          </div>
        </div>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex items-center justify-center gap-12 font-bold text-base tracking-wide flex-1">
          <a href="/home" className="text-[#6366f1] hover:text-[#818cf8] transition-colors drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">Home</a>
          <a href="about" className="text-gray-400 hover:text-white transition-colors">About</a>
        </div>

        {/* User Profile - Right Aligned */}
        <div className="hidden md:flex items-center justify-end gap-4 w-[200px]">
          <span className="font-bold text-gray-200 tracking-wide text-lg">Hello Users</span>
          <div className="w-11 h-11 rounded-full border-2 border-[#6366f1] flex items-center justify-center bg-[#6366f1]/20 text-[#6366f1] shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <User size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#020410]/95 z-50 flex flex-col items-center justify-center gap-8 md:hidden backdrop-blur-sm">
          <button className="absolute top-8 right-8 text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <a className="text-3xl font-bold text-[#6366f1]">Home</a>
          <a href="#" className="text-3xl font-bold text-white">About</a>
        </div>
      )}

      {/* Main Hero Section - Struktur 4 Panel Vertikal */}
      <main className="flex-1 relative w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center py-10 px-4 md:px-0">
        
        {/* Container Gambar (4 Cards) */}
        <div className="relative w-full h-[600px] md:h-[650px] grid grid-cols-2 md:grid-cols-4 gap-4 px-2 md:px-0">
          {characters.map((char, index) => (
            <div key={char.id} className="relative w-full h-full overflow-hidden rounded-sm group">
              {/* Image */}
              <img 
                src={char.src} 
                alt={char.alt} 
                className="w-full h-full object-cover opacity-60 md:opacity-70 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Gradient Gelap di Atas Gambar agar Teks Terbaca */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#020410]/80 via-transparent to-[#020410]/90" />
              <div className="absolute inset-0 bg-[#020410]/40" /> {/* General darkening */}
            </div>
          ))}

          {/* ABSOLUTE OVERLAY untuk Text dan Button (Di tengah-tengah grid) */}
          {/* Ini kunci agar text menimpa gambar seperti di desain */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none">

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.1] md:leading-[1.1] drop-shadow-2xl text-white mx-auto pointer-events-auto select-none">
              Find your team and become
              <br />
              <span className="text-[#6366f1] drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                 the Winner!
              </span>
            </h1>

            {/* CTA Button */}
            <div className="mt-12 pointer-events-auto">
              <Link href="/login">
                <button className="group relative px-10 py-4 bg-[#5865F2] hover:bg-[#4d5bf0] text-white text-lg font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(88,101,242,0.6)] hover:shadow-[0_0_40px_rgba(88,101,242,0.8)] active:scale-95">
                  <span className="tracking-widest uppercase">Join Squad!</span>
                  {/* Button Glow */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                </button>
              </Link>
            </div>

          </div>
        </div>

      </main>

      {/* Decorative Footer Area / Bottom Fade */}
      <div className="h-24 w-full bg-gradient-to-t from-[#020410] to-transparent pointer-events-none" />

    </div>
  );
};

export default App;