import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { User } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-indigo-500 selection:text-white">
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center">
        
        {/* --- BACKGROUND IMAGES GRID (4 Columns) --- */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-4 px-4 h-full w-full max-w-7xl mx-auto py-20 opacity-60">
            
            {/* === KARTU 1 (AHRI) === */}
            <div className="relative rounded-2xl overflow-hidden group h-full w-full">
                <div className="absolute inset-0 bg-[url('/back-1.svg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-[url('/hero-1.svg')] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            </div>

            {/* === KARTU 2 (PUBG) === */}
            <div className="relative rounded-2xl overflow-hidden group h-full w-full mt-12">
                <div className="absolute inset-0 bg-[url('/back-2.svg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-[url('/hero-2.svg')] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            </div>

            {/* === KARTU 3 (MLBB) === */}
            <div className="relative rounded-2xl overflow-hidden group h-full w-full">
                <div className="absolute inset-0 bg-[url('/back-3.svg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-[url('/hero-3.svg')] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            </div>

            {/* === KARTU 4 (VALORANT) === */}
            <div className="relative rounded-2xl overflow-hidden group h-full w-full mt-12">
                <div className="absolute inset-0 bg-[url('/back-4.svg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-[url('/hero-4.svg')] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
            </div>

        </div>

        {/* User Kanan */}
        <div className="absolute top-6 right-8 z-50 flex items-center gap-4">
          <span className="hidden md:block font-bold text-xl text-gray-200">Hello Users</span>
          
          <Link href="/login" className="w-12 h-12 rounded-full border-2 border-[#5C5CFF] flex items-center justify-center cursor-pointer hover:bg-[#5C5CFF]/20 transition group">
             <User size={28} className="text-[#5C5CFF] group-hover:text-white transition" />
          </Link>
        </div>

        {/* GRADIENT OVERLAY (Biar bawahnya agak gelap menyatu) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50 pointer-events-none"></div>
        
        {/* BOTTOM GLOW (Efek Cahaya Biru di Bawah) */}
        <div className="absolute bottom-0 w-full h-32 bg-indigo-600 blur-[120px] opacity-30 pointer-events-none"></div>

        {/* --- MAIN CONTENT (TEXT) --- */}
        <div className="relative z-10 text-center max-w-4xl px-4 mt-10">
          <h1 className="font-heading text-5xl md:text-5xl font-bold leading-tight drop-shadow-2xl">
            Find your team and become <br />
            the <span className="text-indigo-500">Winner!</span>
          </h1>
          
          <p className="mt-6 text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium shadow-black drop-shadow-md">
            Platform pencarian teman mabar terpercaya untuk Honor of Kings, PUBG, dan Valorant.
          </p>

          {/* CTA BUTTON */}
          <div className="mt-10">
            <Link 
              href="/login" 
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(79,70,229,0.6)]"
            >
              JOIN SQUAD!
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}