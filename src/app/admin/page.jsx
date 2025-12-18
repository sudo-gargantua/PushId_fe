'use client';

import React, { useState } from 'react';
import { 
  Users, AlertTriangle, Trash2, Ban, MessageSquare, 
  Search, CheckCircle, X, ShieldAlert, Bell 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Data Mockup Laporan (Nanti diganti API Backend)
const MOCK_REPORTS = [
  {
    id: 101,
    reporter: 'GoodPlayer01',
    reportedUser: 'ToxicKing99',
    lobbyTitle: 'Joki Rank Murah',
    reason: 'spam',
    detail: 'Dia spam iklan joki di lobby terus menerus, sangat mengganggu.',
    status: 'pending',
    date: '2024-03-20 14:30'
  },
  {
    id: 102,
    reporter: 'SilentKiller',
    reportedUser: 'NoobMaster69',
    lobbyTitle: 'Cari Cewek Only',
    reason: 'inappropriate',
    detail: 'Judul lobby tidak pantas dan mengandung unsur pelecehan.',
    status: 'pending',
    date: '2024-03-20 15:45'
  },
  {
    id: 103,
    reporter: 'ProGamer_ID',
    reportedUser: 'ScammerAlert',
    lobbyTitle: 'Free Skin Legend',
    reason: 'scam',
    detail: 'Link di deskripsi mengarah ke web phising.',
    status: 'resolved',
    date: '2024-03-19 09:00'
  }
];

export default function AdminPage() {
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(''); // 'delete' | 'ban'
  const [adminMessage, setAdminMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');

  // Filter Reports
  const filteredReports = reports.filter(r => 
    filterStatus === 'all' ? true : r.status === filterStatus
  );

  // Handle Klik Aksi (Buka Modal)
  const handleActionClick = (report, type) => {
    setSelectedReport(report);
    setActionType(type);
    // Template pesan default
    setAdminMessage(
      type === 'delete' 
        ? `Lobby "${report.lobbyTitle}" Anda telah dihapus karena melanggar aturan komunitas kami terkait: ${report.reason}.`
        : `Akun Anda telah dinonaktifkan sementara karena laporan berulang terkait: ${report.reason}.`
    );
    setShowActionModal(true);
  };

  // Handle Konfirmasi Aksi
  const confirmAction = () => {
    if (!adminMessage.trim()) {
      toast.error("Wajib isi pesan untuk user!");
      return;
    }

    // Simulasi API Call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Memproses tindakan...',
        success: () => {
          // Update status laporan jadi 'resolved'
          setReports(reports.map(r => 
            r.id === selectedReport.id ? { ...r, status: 'resolved' } : r
          ));
          setShowActionModal(false);
          return actionType === 'delete' ? 'Lobby berhasil dihapus & User dinotifikasi!' : 'User berhasil di-Banned!';
        },
        error: 'Gagal memproses.',
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex">
      <Toaster position="top-right" />

      {/* SIDEBAR SEDERHANA */}
      <aside className="w-64 bg-[#0F172A] border-r border-[#1e2230] hidden md:flex flex-col p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <ShieldAlert className="text-white" />
          </div>
          <span className="font-black text-xl tracking-wider">ADMIN<span className="text-red-500">PANEL</span></span>
        </div>

        <nav className="space-y-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1e2230] text-red-400 rounded-xl font-bold">
            <AlertTriangle size={20} />
            Laporan Masuk
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {reports.filter(r => r.status === 'pending').length}
            </span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#1e2230] rounded-xl transition-colors">
            <Users size={20} />
            User List
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-[#1e2230] rounded-xl transition-colors">
            <Bell size={20} />
            Broadcast Info
          </button>
        </nav>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 md:ml-64 p-8">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Moderasi</h1>
            <p className="text-slate-400">Pantau dan kelola laporan pelanggaran komunitas.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${filterStatus === 'pending' ? 'bg-red-600 text-white' : 'bg-[#1e2230] text-slate-400'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilterStatus('resolved')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${filterStatus === 'resolved' ? 'bg-green-600 text-white' : 'bg-[#1e2230] text-slate-400'}`}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* List Laporan */}
        <div className="grid gap-4">
          {filteredReports.length === 0 ? (
            <div className="text-center py-20 bg-[#0F172A] rounded-2xl border border-[#1e2230]">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white">Semua Aman!</h3>
              <p className="text-slate-400">Tidak ada laporan dengan status ini.</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-slate-600 transition-colors">
                
                {/* Info Utama */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      report.reason === 'scam' ? 'bg-red-900/50 text-red-400' : 
                      report.reason === 'harassment' ? 'bg-orange-900/50 text-orange-400' : 
                      'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      {report.reason}
                    </span>
                    <span className="text-slate-500 text-xs">{report.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1">
                    Laporan pada Lobby: <span className="text-blue-400">"{report.lobbyTitle}"</span>
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Dilaporkan oleh <span className="text-white font-bold">{report.reporter}</span> terhadap <span className="text-red-400 font-bold">{report.reportedUser}</span>
                  </p>

                  <div className="bg-[#020617] p-4 rounded-xl border border-[#1e2230]">
                    <p className="text-slate-300 text-sm italic">"{report.detail}"</p>
                  </div>
                </div>

                {/* Tombol Aksi (Hanya jika status Pending) */}
                {report.status === 'pending' && (
                  <div className="flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-[#1e2230] pt-4 md:pt-0 md:pl-6">
                    <button 
                      onClick={() => handleActionClick(report, 'delete')}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1e2230] hover:bg-red-900/30 text-red-400 hover:text-red-300 font-bold rounded-xl transition-all w-full"
                    >
                      <Trash2 size={18} />
                      Hapus Lobby
                    </button>
                    
                    <button 
                      onClick={() => handleActionClick(report, 'ban')}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1e2230] hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl transition-all w-full"
                    >
                      <Ban size={18} />
                      Ban User
                    </button>
                  </div>
                )}
                
                {/* Tanda Selesai */}
                {report.status === 'resolved' && (
                  <div className="flex flex-col justify-center items-center px-8 border-l border-[#1e2230]">
                    <CheckCircle size={32} className="text-green-500 mb-2" />
                    <span className="text-green-500 font-bold text-sm">Diselesaikan</span>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </main>

      {/* MODAL AKSI (Delete / Ban) */}
      {showActionModal && selectedReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className={`p-6 ${actionType === 'delete' ? 'bg-red-900/20' : 'bg-slate-800'} border-b border-[#1e2230] flex justify-between items-center`}>
              <h3 className={`text-xl font-bold ${actionType === 'delete' ? 'text-red-400' : 'text-white'}`}>
                {actionType === 'delete' ? 'Konfirmasi Hapus Lobby' : 'Konfirmasi Ban User'}
              </h3>
              <button onClick={() => setShowActionModal(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-slate-300 mb-6">
                Anda akan melakukan tindakan pada user <span className="font-bold text-white">{selectedReport.reportedUser}</span>.
                Silakan tulis pesan notifikasi yang akan muncul di dashboard mereka.
              </p>

              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Pesan Notifikasi ke User</label>
                <textarea 
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  className="w-full bg-[#020617] border border-[#1e2230] rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 h-32 resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowActionModal(false)}
                  className="flex-1 py-3 bg-transparent border border-[#1e2230] text-slate-400 font-bold rounded-xl hover:text-white hover:border-slate-500 transition-colors"
                >
                  Batal
                </button>
                <button 
                  onClick={confirmAction}
                  className={`flex-1 py-3 font-bold rounded-xl text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                    actionType === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {actionType === 'delete' ? <Trash2 size={18} /> : <Ban size={18} />}
                  {actionType === 'delete' ? 'Hapus & Kirim' : 'Ban & Kirim'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}