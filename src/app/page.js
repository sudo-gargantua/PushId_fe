"use client";
import React, { useState } from 'react';
import { User, Gamepad2, Menu, X } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- DATA ---
  
  // Data untuk Landing Page (Home)
  const homeCharacters = [
    { id: 1, src: "/ahri-artwork.jpg", alt: "League Of Legends" },
    { id: 2, src: "/pubg-home.jpg", alt: "PUBG" },
    { id: 3, src: "/Arli.jpg", alt: "Honor Of Kings" },
    { id: 4, src: "/Sage-home.jpg", alt: "Valorant" }
  ];

  // Data untuk About Page (Game Cards)
  const games = [
    { 
      id: 1, 
      name: "LEAGUE OF LEGENDS: WILD RIFT", 
      src: "/Ahri-img.jpg",
      logoColor: "text-blue-400"
    },
    { 
      id: 2, 
      name: "PLAYER UNKNOWN BATTLEGROUNDS", 
      src: "pubg-img.jpg",
      logoColor: "text-orange-200"
    },
    { 
      id: 3, 
      name: "VALORANT", 
      src: "valorant.png",
      logoColor: "text-red-500"
    },
    { 
      id: 4, 
      name: "HONOR OF KINGS", 
      src: "honor-of-kings.png",
      logoColor: "text-yellow-500"
    }
  ];

  // --- FUNCTIONS ---
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after click
    }
  };

  // --- COMPONENTS ---

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-300 backdrop-blur-sm bg-[#020410]/50">
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer w-[200px]"
        onClick={() => scrollToSection('home')}
      >
        <div className="relative">
          <Gamepad2 className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        </div>
        <div className="flex flex-col leading-none">
          <h1 className="text-2xl font-black tracking-widest text-white drop-shadow-md">
            PUSH<span className="text-[#6366f1]">ID</span>
          </h1>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center gap-12 font-bold text-base tracking-wide flex-1">
        <button 
          onClick={() => scrollToSection('home')}
          className="text-gray-300 hover:text-[#6366f1] transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
        >
          Home
        </button>
        <button 
          onClick={() => scrollToSection('about')}
          className="text-gray-300 hover:text-[#6366f1] transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
        >
          About
        </button>
      </div>

      {/* User Profile */}
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#020410]/95 z-50 flex flex-col items-center justify-center gap-8 md:hidden backdrop-blur-sm">
          <button className="absolute top-8 right-8 text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <button onClick={() => scrollToSection('home')} className="text-3xl font-bold text-white hover:text-[#6366f1]">Home</button>
          <button onClick={() => scrollToSection('about')} className="text-3xl font-bold text-white hover:text-[#6366f1]">About</button>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#020410] text-white font-sans overflow-x-hidden relative">
      
      {/* Background Ambient Glows (Fixed for entire page) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[150px]" />
      </div>

      <Navbar />

      {/* === SECTION 1: HOME === */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-0 scroll-mt-20">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="relative w-full h-[600px] md:h-[650px] grid grid-cols-2 md:grid-cols-4 gap-4 px-2 md:px-0">
            {homeCharacters.map((char) => (
              <div key={char.id} className="relative w-full h-full overflow-hidden rounded-sm group">
                <img src={char.src} alt={char.alt} className="w-full h-full object-cover opacity-60 md:opacity-70 group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020410]/80 via-transparent to-[#020410]/90" />
                <div className="absolute inset-0 bg-[#020410]/40" />
              </div>
            ))}
            
            {/* Home Overlay Text */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.1] md:leading-[1.1] drop-shadow-2xl text-white mx-auto pointer-events-auto select-none">
                Find your team and become <br />
                <span className="text-[#6366f1] drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">the Winner!</span>
              </h1>
              <div className="mt-12 pointer-events-auto">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="group relative px-10 py-4 bg-[#5865F2] hover:bg-[#4d5bf0] text-white text-lg font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(88,101,242,0.6)] hover:shadow-[0_0_40px_rgba(88,101,242,0.8)] active:scale-95"
                >
                  <span className="tracking-widest uppercase">Join Squad!</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2: ABOUT === */}
      <section id="about" className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-12 scroll-mt-20">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          
          {/* Title Section */}
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg tracking-wide">
              Temukan Teman Main mu di Setiap Match!
            </h2>
          </div>

          {/* Horizontal Glow Background Strip */}
          <div className="absolute top-[45%] left-0 w-full h-[200px] bg-gradient-to-r from-[#020410] via-indigo-600/20 to-[#020410] blur-[80px] -z-0 pointer-events-none" />
          <div className="absolute top-[50%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent blur-sm z-0 pointer-events-none" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full z-10">
            {games.map((game) => (
              <div key={game.id} className="group relative aspect-[3/5] rounded-xl overflow-hidden border border-white/5 hover:border-[#6366f1]/50 transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                {/* Image */}
                <img 
                  src={game.src} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020410] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020410]/50 via-transparent to-transparent opacity-60" />

                {/* Game Logo/Text Placeholder */}
                <div className="absolute bottom-8 left-0 w-full text-center px-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className={`font-black text-2xl uppercase tracking-tighter leading-none drop-shadow-lg ${game.logoColor}`}>
                    {game.name}
                  </h3>
                  <div className="h-1 w-12 bg-white/30 mx-auto mt-4 rounded-full group-hover:w-20 group-hover:bg-[#6366f1] transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <div className="mt-20 text-center relative z-10 max-w-3xl">
            <p className="text-lg md:text-xl text-gray-300 font-medium tracking-wide leading-relaxed">
              Temukan Teman Mabar mu di Game Yang kamu Mainkan dan menangkan
              <br />
              <span className="text-white font-bold drop-shadow-md">Pertandingan!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Fade (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#020410] to-transparent pointer-events-none z-40" />
    </div>
  );
};

export default App;