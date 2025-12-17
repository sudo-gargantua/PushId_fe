// src/lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const fetchLobbies = async () => {
  const res = await fetch(`${API_URL}/lobbies`);
  if (!res.ok) throw new Error("Gagal mengambil data lobi");
  return res.json();
};

export const fetchLobbyDetail = async (slug) => {
  const res = await fetch(`${API_URL}/lobbies/${slug}`);
  if (!res.ok) throw new Error("Lobi tidak ditemukan");
  return res.json();
};