"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore'; // Pastikan path benar
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CreateLobby() {
  const router = useRouter();
  
  // --- INTEGRASI: Ambil State dari Zustand ---
  const { token, isLoggedIn, user } = useAuthStore();

  // State Form
  const [formData, setFormData] = useState({
    title: '',
    game_name: 'Honor of Kings', // Default value
    rank: '',
    description: '',
    link: ''
  });
  const [loading, setLoading] = useState(false);

  // --- INTEGRASI: Proteksi Halaman ---
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Silakan login terlebih dahulu!");
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- INTEGRASI: Submit ke Laravel ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const res = await fetch(`${API_URL}/lobbies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` // Kirim token di header
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Lobby berhasil diterbitkan!");
        router.push('/lobby');
      } else {
        toast.error(data.message || "Gagal membuat lobby. Periksa kembali inputan Anda.");
      }
    } catch (err) {
      console.error("Error creating lobby:", err);
      toast.error("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  // Jika belum login, tampilkan layar kosong sebentar sebelum redirect
  if (!isLoggedIn) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white italic uppercase tracking-tighter">Buat Lobby Baru</h1>
        <p className="text-slate-400 mb-8">Cari tim impianmu dengan kriteria spesifik.</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Info User (Read Only dari Store) */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300 uppercase tracking-widest">Posting Sebagai</label>
            <input 
              type="text" 
              disabled
              value={user?.name || ""}
              className="w-full bg-[#0b1121] border border-slate-800 rounded-lg p-3 text-slate-500 cursor-not-allowed italic"
            />
          </div>

          {/* Input Judul */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">Judul Postingan</label>
            <input 
              required
              name="title"
              type="text" 
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Mabar Push Rank Mythic" 
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Input Game */}
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">Pilih Game</label>
              <select 
                name="game_name"
                value={formData.game_name}
                onChange={handleChange}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 appearance-none"
              >
                <option value="Honor of Kings">Honor of Kings</option>
                <option value="Mobile Legends">Mobile Legends</option>
                <option value="Valorant">Valorant</option>
                <option value="PUBG">PUBG</option>
                <option value="COD">COD</option>
              </select>
            </div>

            {/* Input Rank */}
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">Minimal Rank</label>
              <input 
                required
                name="rank"
                type="text" 
                value={formData.rank}
                onChange={handleChange}
                placeholder="Contoh: Diamond" 
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Input Deskripsi */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">Deskripsi / Syarat</label>
            <textarea 
              required
              name="description"
              rows="4" 
              value={formData.description}
              onChange={handleChange}
              placeholder="Jelaskan syarat mabar secara detail... (Gunakan titik untuk memisahkan poin)" 
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          {/* Input Kontak */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">Link WhatsApp / Discord</label>
            <input 
              required
              name="link"
              type="url" 
              value={formData.link}
              onChange={handleChange}
              placeholder="https://wa.me/62... atau https://discord.gg/..." 
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full ${loading ? 'bg-slate-600' : 'bg-indigo-600 hover:bg-indigo-500'} text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all mt-4 uppercase tracking-widest`}
          >
            {loading ? "Memproses..." : "Terbitkan Lobby"}
          </button>
        </form>

        <div className="mt-6 text-center">
            <Link href="/lobby" className="text-slate-500 hover:text-indigo-400 font-bold text-sm transition-colors uppercase tracking-widest">
                ← Batal & Kembali
            </Link>
        </div>
      </div>
    </main>
  );
}