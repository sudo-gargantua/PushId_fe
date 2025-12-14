"use client";

import React from 'react';

export default function CreateLobby() {
  // FLOW: Logic "Sudah Login?" 
  // Nanti pakai Session Check disini. Kalau belum login, redirect('/login').
  
  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white">Buat Lobby Baru</h1>
        <p className="text-slate-400 mb-8">Cari tim impianmu dengan kriteria spesifik.</p>

        {/* FLOW: Isi Form (Judul, Game, Syarat, Link) */}
        <form className="space-y-6">
          
          {/* --- BARU: Input Nama User --- */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">Nama Username (In-Game)</label>
            <input 
              type="text" 
              placeholder="Contoh: ElGato_Pro" 
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Input Judul */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">Judul Postingan</label>
            <input 
              type="text" 
              placeholder="Contoh: Butuh Tank Fast Tournament" 
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Input Game (ENUM dari ERD) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">Pilih Game</label>
              <select className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500">
                <option>Honor of Kings</option>
                <option>Mobile Legends</option>
                <option>Valorant</option>
                <option>PUBG Mobile</option>
                <option>Call of Duty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">Minimal Rank</label>
              <input 
                type="text" 
                placeholder="Contoh: Mythic" 
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Input Deskripsi */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">Deskripsi / Syarat</label>
            <textarea 
              rows="4" 
              placeholder="Jelaskan syarat mabar secara detail..." 
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Input Kontak (WA) */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">Link WhatsApp / Discord</label>
            <input 
              type="text" 
              placeholder="https://wa.me/62... atau https://discord.gg/..." 
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* FLOW: Klik Submit -> Redirect */}
          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all mt-4"
          >
            Terbitkan Lobby
          </button>
        </form>

        {/* Tombol Kembali (Opsional) */}
        <div className="mt-6 text-center">
            <a href="/lobby" className="text-slate-500 hover:text-white text-sm transition">
                Kembali ke Lobby
            </a>
        </div>

      </div>
    </main>
  );
}