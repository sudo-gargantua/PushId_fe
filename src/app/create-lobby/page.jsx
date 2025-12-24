"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function CreateLobby() {
  const router = useRouter();

  // ✅ Auth dari Zustand - termasuk _hasHydrated untuk menunggu data ready
  const { token, isLoggedIn, user, _hasHydrated } = useAuthStore();

  // Form State - PERBAIKAN: Ganti 'game' menjadi 'game_name' sesuai backend
  const [formData, setFormData] = useState({
    title: "",
    game_name: "Honor of Kings", // ⬅️ PERBAIKAN: Backend mengharapkan 'game_name'
    rank: "",
    description: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ PERBAIKAN: Proteksi halaman - tunggu hydration selesai dulu!
  useEffect(() => {
    // Hanya jalankan pengecekan setelah hydration selesai
    if (_hasHydrated && !isLoggedIn) {
      toast.error("Silakan login terlebih dahulu");
      router.push("/login");
    }
  }, [_hasHydrated, isLoggedIn, router]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit lobby (AXIOS)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token tidak ditemukan, silakan login ulang");
      return;
    }

    setLoading(true);

    // Debug: Log data yang akan dikirim
    console.log('[CREATE LOBBY] Token:', token);
    console.log('[CREATE LOBBY] Form Data:', formData);

    try {
      // API_URL is now defined at top level

      const response = await axios.post(`${API_URL}/api/lobbies`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log('[CREATE LOBBY] Success:', response.data);

      toast.success("Lobby berhasil diterbitkan!");
      router.push("/lobby");
    } catch (error) {
      console.error("CREATE LOBBY ERROR:", error.response?.data || error);
      toast.error(
        error.response?.data?.message ||
        "Gagal membuat lobby. Periksa data."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ PERBAIKAN: Tampilkan loading saat menunggu hydration
  if (!_hasHydrated) {
    return (
      <main className="min-h-screen bg-[#020617] text-slate-50 flex items-center justify-center">
        <div className="text-indigo-400 font-bold animate-pulse uppercase tracking-widest">
          Loading...
        </div>
      </main>
    );
  }

  // Jika sudah hydrated tapi belum login, jangan tampilkan form
  if (!isLoggedIn) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 p-4 md:p-10 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white italic uppercase tracking-tighter">
          Buat Lobby Baru
        </h1>
        <p className="text-slate-400 mb-8">
          Cari tim impianmu dengan kriteria spesifik.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Posting Sebagai */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300 uppercase tracking-widest">
              Posting Sebagai
            </label>
            <input
              type="text"
              disabled
              value={user?.name || ""}
              className="w-full bg-[#0b1121] border border-slate-800 rounded-lg p-3 text-slate-500 cursor-not-allowed italic"
            />
          </div>

          {/* Judul */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">
              Judul Postingan
            </label>
            <input
              required
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Butuh Tim Push Rank"
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Game */}
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">
                Pilih Game
              </label>
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

            {/* Rank */}
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-300">
                Minimal Rank
              </label>
              <input
                required
                name="rank"
                type="text"
                value={formData.rank}
                onChange={handleChange}
                placeholder="Contoh: Master"
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">
              Deskripsi / Syarat
            </label>
            <textarea
              required
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Jelaskan syarat mabar secara detail..."
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-300">
              Link WhatsApp / Discord
            </label>
            <input
              required
              name="link"
              type="url"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://wa.me/... atau https://discord.gg/..."
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading
              ? "bg-slate-600"
              : "bg-indigo-600 hover:bg-indigo-500"
              } text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all mt-4 uppercase tracking-widest`}
          >
            {loading ? "Memproses..." : "Terbitkan Lobby"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/lobby"
            className="text-slate-500 hover:text-indigo-400 font-bold text-sm transition-colors uppercase tracking-widest"
          >
            ← Batal & Kembali
          </Link>
        </div>
      </div>
    </main>
  );
}
