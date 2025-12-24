'use client';

import React, { useState, useEffect } from 'react';
import {
  Trash2, Ban, CheckCircle, AlertTriangle
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
// Impor dari komponen yang baru saja dibuat di atas
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminAuthGuard from '../../components/admin/AdminAuthGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export default function AdminPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [adminMessage, setAdminMessage] = useState('');

  // Default 'all' agar semua data terlihat (termasuk yang resolved)
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch reports dari API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/api/admin/reports`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        if (res.ok) {
          const data = await res.json();
          setReports(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch reports:', err);
        toast.error('Gagal memuat data laporan');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports.filter(r =>
    filterStatus === 'all' ? true : r.status === filterStatus
  );

  const handleReportActionClick = (report, type) => {
    setSelectedReport(report);
    setActionType(type);
    setAdminMessage(
      type === 'delete_lobby'
        ? `Lobby "${report.lobbyTitle}" Anda telah dihapus karena melanggar aturan komunitas kami terkait: ${report.reason}.`
        : `Akun Anda telah dinonaktifkan sementara karena laporan berulang terkait: ${report.reason}.`
    );
    setShowActionModal(true);
  };

  const confirmReportAction = async () => {
    if (!adminMessage.trim()) {
      toast.error("Wajib isi pesan untuk user!");
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');

      // Jika aksi adalah hapus lobby, hapus lobby terlebih dahulu
      if (actionType === 'delete_lobby' && selectedReport.lobby_id) {
        const deleteLobbyRes = await fetch(`${API_URL}/api/admin/lobbies/${selectedReport.lobby_id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });

        if (!deleteLobbyRes.ok) {
          toast.error('Gagal menghapus lobby');
          return;
        }
      }

      // Mark report as resolved
      const res = await fetch(`${API_URL}/api/admin/reports/${selectedReport.id}/resolve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (res.ok) {
        setReports(reports.map(r => r.id === selectedReport.id ? { ...r, status: 'resolved' } : r));
        setShowActionModal(false);
        toast.success(actionType === 'delete_lobby' ? 'Lobby berhasil dihapus & Report diselesaikan!' : 'User di-Banned!');
      } else {
        toast.error('Gagal memproses tindakan');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Terjadi kesalahan');
    }
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#020617] text-white font-sans flex">
        <Toaster position="top-right" />

        {/* SIDEBAR COMPONENT */}
        <AdminSidebar activePage="reports" />

        {/* KONTEN UTAMA */}
        <main className="flex-1 md:ml-64 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard Moderasi</h1>
              <p className="text-slate-400">Pantau dan kelola laporan pelanggaran komunitas.</p>
            </div>
            <div className="flex gap-2 bg-[#0F172A] p-1 rounded-xl border border-[#1e2230]">
              <button onClick={() => setFilterStatus('all')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${filterStatus === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>Semua</button>
              <button onClick={() => setFilterStatus('pending')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${filterStatus === 'pending' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}>Pending</button>
              <button onClick={() => setFilterStatus('resolved')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${filterStatus === 'resolved' ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-white'}`}>Selesai</button>
            </div>
          </div>

          {/* LIST LAPORAN */}
          <div className="grid gap-4">
            {filteredReports.length === 0 ? (
              <div className="text-center py-20 bg-[#0F172A] rounded-2xl border border-[#1e2230]">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-xl font-bold text-white">Tidak ada laporan</h3>
              </div>
            ) : (
              filteredReports.map((report) => (
                <div key={report.id} className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-slate-600 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${report.reason === 'scam' ? 'bg-red-900/50 text-red-400' : 'bg-yellow-900/50 text-yellow-400'}`}>{report.reason}</span>
                      <span className="text-slate-500 text-xs">{report.date}</span>
                      {report.status === 'resolved' && <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded border border-green-900">Selesai</span>}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Laporan: <span className="text-blue-400">"{report.lobbyTitle}"</span></h3>
                    <p className="text-sm text-slate-400 mb-4">Oleh <span className="text-white font-bold">{report.reporter}</span> vs <span className="text-red-400 font-bold">{report.reportedUser}</span></p>
                    <div className="bg-[#020617] p-4 rounded-xl border border-[#1e2230]"><p className="text-slate-300 text-sm italic">"{report.detail}"</p></div>
                  </div>

                  {/* Tombol Aksi */}
                  {report.status === 'pending' && (
                    <div className="flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-[#1e2230] pt-4 md:pt-0 md:pl-6">
                      <button onClick={() => handleReportActionClick(report, 'delete_lobby')} className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1e2230] hover:bg-red-900/30 text-red-400 hover:text-red-300 font-bold rounded-xl transition-all w-full"><Trash2 size={18} /> Hapus Lobby</button>
                      <button onClick={() => handleReportActionClick(report, 'ban_user')} className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1e2230] hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl transition-all w-full"><Ban size={18} /> Ban User</button>
                    </div>
                  )}

                  {/* Status Selesai */}
                  {report.status === 'resolved' && (
                    <div className="flex flex-col justify-center items-center px-8 border-l border-[#1e2230] min-w-[180px]">
                      <CheckCircle size={40} className="text-green-500 mb-3" />
                      <span className="text-green-500 font-bold text-sm">Masalah Selesai</span>
                      <span className="text-slate-500 text-xs mt-1">Tindakan Diambil</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>

        {/* MODAL AKSI */}
        {showActionModal && selectedReport && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl w-full max-w-lg shadow-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Konfirmasi Tindakan</h3>
                <AlertTriangle className="text-yellow-500" />
              </div>
              <p className="text-slate-300 mb-4">Kirim pesan notifikasi alasan tindakan kepada user:</p>
              <textarea value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} className="w-full bg-[#020617] border border-[#1e2230] rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 h-32 resize-none mb-6" />
              <div className="flex gap-4">
                <button onClick={() => setShowActionModal(false)} className="flex-1 py-3 bg-transparent border border-[#1e2230] text-slate-400 font-bold rounded-xl">Batal</button>
                <button onClick={confirmReportAction} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg">Konfirmasi</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}