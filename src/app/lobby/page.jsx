'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import { User, Bell, MoreVertical, Trash2, Flag } from 'lucide-react';
import Link from 'next/link';

// Data Mockup
const ALL_LOBBIES = [
  {
    id: 1,
    game: 'HOK',
    title: 'Push Rank : ROAD TO LEGEND',
    rank: 'Grandmaster',
    createdAt: new Date(),
    tagColor: 'bg-indigo-900/50 text-indigo-300',
    creator: 'ProGamer123'
  },
  {
    id: 2,
    game: 'MLBB',
    title: 'Cari Team untuk Push rank',
    rank: 'Mythical Glory',
    createdAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    tagColor: 'bg-blue-900/50 text-blue-300',
    creator: 'MLBBMaster'
  },
  {
    id: 3,
    game: 'Valorant',
    title: 'Cari Teman Untuk mabar ',
    rank: 'Radiant',
    createdAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    tagColor: 'bg-purple-900/50 text-purple-300',
    creator: 'ValorantAce'
  },
  {
    id: 4,
    game: 'PUBG',
    title: 'Bantu Push sampai Ace',
    rank: 'Crown',
    createdAt: new Date(Date.now() - 12 * 60 * 60000), // 12 hours ago
    tagColor: 'bg-yellow-900/50 text-yellow-300',
    creator: 'PUBGKing'
  },
  {
    id: 5,
    game: 'COD',
    title: 'Push Rank Sampai LEGEND!',
    rank: 'Grandmaster',
    createdAt: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    tagColor: 'bg-green-900/50 text-green-300',
    creator: 'CODLegend'
  },
  {
    id: 6,
    game: 'HOK',
    title: 'Mabar santai Classic',
    rank: 'Platinum',
    createdAt: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
    tagColor: 'bg-indigo-900/50 text-indigo-300',
    creator: 'HOKChill'
  },
];

const CATEGORIES = ['ALL', 'HOK', 'MLBB', 'VALORANT', 'PUBG', 'COD'];

export default function LobbyPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportLobbyId, setReportLobbyId] = useState(null);
  const [deleteLobbyId, setDeleteLobbyId] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [showNotificationDetail, setShowNotificationDetail] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [readNotifications, setReadNotifications] = useState(new Set());
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      // Close lobby dropdown if clicking outside
      if (openDropdown && !event.target.closest('.lobby-dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Handle delete lobby
  const handleDeleteLobby = (lobbyId) => {
    setDeleteLobbyId(lobbyId);
    setShowDeleteModal(true);
    setOpenDropdown(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    // Mock delete - in real app, this would call an API
    console.log('Deleting lobby:', deleteLobbyId);
    alert(`Lobby ${deleteLobbyId} telah dihapus`);
    
    // Reset modal
    setShowDeleteModal(false);
    setDeleteLobbyId(null);
  };

  // Handle report lobby
  const handleReportLobby = (lobbyId) => {
    setReportLobbyId(lobbyId);
    setShowReportModal(true);
    setOpenDropdown(null);
  };

  // Handle submit report
  const handleSubmitReport = () => {
    if (!reportReason) {
      alert('Silakan pilih alasan report');
      return;
    }
    
    const finalReason = reportReason === 'other' ? customReason : reportReason;
    if (reportReason === 'other' && !finalReason.trim()) {
      alert('Silakan isi alasan report lainnya');
      return;
    }

    // Mock submit report - in real app, this would call an API
    console.log('Reporting lobby:', reportLobbyId, 'Reason:', finalReason);
    alert(`Lobby ${reportLobbyId} telah dilaporkan dengan alasan: ${finalReason}`);
    
    // Reset modal
    setShowReportModal(false);
    setReportLobbyId(null);
    setReportReason('');
    setCustomReason('');
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationDetail(true);
    setShowNotifications(false);
    // Mark as read
    setReadNotifications(prev => new Set([...prev, notification.id]));
  };

  // Handle delete notification
  const handleDeleteNotification = (notificationId, e) => {
    e.stopPropagation(); // Prevent triggering notification click
    if (confirm('Apakah Anda yakin ingin menghapus notifikasi ini?')) {
      console.log('Deleting notification:', notificationId);
      // In real app, this would call an API
      alert('Notifikasi telah dihapus');
    }
  };

  // Handle mark all notifications as read
  const handleMarkAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    setReadNotifications(new Set(allIds));
    alert('Semua notifikasi telah ditandai sebagai sudah dibaca');
  };

  // Get unread count
  const getUnreadCount = () => {
    return notifications.filter(n => !readNotifications.has(n.id)).length;
  };

  // Report reasons
  const reportReasons = [
    { value: 'spam', label: 'Spam atau iklan tidak diinginkan' },
    { value: 'harassment', label: 'Perundungan atau pelecehan' },
    { value: 'inappropriate', label: 'Konten tidak pantas' },
    { value: 'scam', label: 'Penipuan atau scam' },
    { value: 'other', label: 'Lainnya' }
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'admin',
      message: 'Server maintenance scheduled for tonight at 10 PM',
      time: '2h ago',
      details: 'We will be performing scheduled maintenance on our servers tonight from 10 PM to 2 AM. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience this may cause.',
      priority: 'high'
    },
    {
      id: 2,
      type: 'system',
      message: 'New lobby "Epic Battle" has been created',
      time: '1h ago',
      details: 'A new lobby titled "Epic Battle" has been successfully created in the HOK category. Check it out and join the action!',
      priority: 'normal'
    },
    {
      id: 3,
      type: 'admin',
      message: 'Update: New game modes available in HOK',
      time: '30m ago',
      details: 'We\'ve added exciting new game modes to Honor of Kings! Try out the new "Ranked Duo" and "Team Deathmatch" modes. These modes offer fresh gameplay experiences and new rewards.',
      priority: 'normal'
    },
    {
      id: 4,
      type: 'system',
      message: 'Your lobby "Push Rank" is now active',
      time: '15m ago',
      details: 'Great news! Your lobby "Push Rank" is now live and active. Other players can now see and join your lobby. Good luck with your ranking push!',
      priority: 'normal'
    }
  ];

  // Function to get relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just Now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Logic Filter
  const filteredLobbies = ALL_LOBBIES.filter(lobby => 
    (activeCategory === 'ALL' || lobby.game.toUpperCase() === activeCategory) &&
    (lobby.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     lobby.creator.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="grid grid-cols-3 items-center px-6 py-6 max-w-7xl mx-auto">
        {/* Kosong Kiri */}
        <div></div>

        {/* Menu Tengah */}
        <div className="flex justify-center">
          <div className="flex gap-6 text-lg font-bold">
            {/* Menggunakan <a> untuk kompatibilitas preview. Gunakan <Link> di project Next.js asli */}
            <a href="/" className="text-gray-300 hover:text-[#4a4ae0] transition">
              Home
            </a>
            
            {/* 2. PERBAIKAN DISINI: Link ke /create-lobby */}
            <a 
              href="/create-lobby" 
              className="text-gray-300 hover:text-[#4a4ae0] transition cursor-pointer"
            >
              Create Team
            </a>

          </div>
        </div>

        {/* User Kanan */}
        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-12 h-12 rounded-full border-2 border-[#5C5CFF] flex items-center justify-center cursor-pointer hover:bg-[#5C5CFF]/20 transition group relative"
              >
                <Bell size={24} className="text-[#5C5CFF] group-hover:text-white transition" />
                {getUnreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getUnreadCount()}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute top-14 right-0 w-80 bg-[#0F172A] border border-[#1e2230] rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-[#1e2230]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">Notifications</h3>
                      {getUnreadCount() > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-sm text-[#5C5CFF] hover:text-[#4a4ae0] transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-2">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        className={`p-3 border-b border-[#1e2230] last:border-b-0 hover:bg-[#1e2230] transition cursor-pointer group ${
                          readNotifications.has(notif.id) ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notif.type === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-300">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                          <button
                            onClick={(e) => handleDeleteNotification(notif.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-all"
                            title="Delete notification"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span className="hidden md:block font-bold text-xl text-gray-200">Hello Users</span>
            
            <a href="/login" className="w-12 h-12 rounded-full border-2 border-[#5C5CFF] flex items-center justify-center cursor-pointer hover:bg-[#5C5CFF]/20 transition group">
               <User size={28} className="text-[#5C5CFF] group-hover:text-white transition" />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        
        {/* --- HERO BANNER --- */}
        <div className="w-full h-48 md:h-[300px] rounded-3xl overflow-hidden mb-10 relative group border border-gray-800">
           <img 
            src="/lobby-baner.png" 
            alt="Lobby Banner" 
            className="w-full h-full object-cover"
            onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)'; 
            }}
           />
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari lobby berdasarkan judul atau pembuat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-xl border border-[#1e2230] bg-[#0F172A] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
          />
        </div>

        {/* --- FILTERS --- */}
        <div className="flex flex-wrap gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 rounded-full text-sm font-bold border-2 transition-all duration-300 uppercase tracking-wider ${
                activeCategory === cat
                  ? 'bg-[#5C5CFF] border-[#5C5CFF] text-white shadow-[0_0_15px_rgba(92,92,255,0.5)]'
                  : 'bg-transparent border-[#1e2230] text-gray-400 hover:border-gray-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- CARD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLobbies.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#0F172A] border border-[#1e2230] rounded-3xl p-6 hover:border-[#5C5CFF] hover:shadow-[0_0_20px_rgba(92,92,255,0.15)] transition-all duration-300 group flex flex-col justify-between h-full"
            >
              <div>
                {/* Header Card: Tag & Time & Menu */}
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${item.tagColor} bg-opacity-20`}>
                    {item.game}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">{getRelativeTime(item.createdAt)}</span>
                      <div className="relative lobby-dropdown">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                          className="p-1 rounded-full hover:bg-[#1e2230] transition-colors"
                        >
                          <MoreVertical size={16} className="text-gray-400 hover:text-white" />
                        </button>
                        {openDropdown === item.id && (
                          <div className="absolute top-8 right-0 w-48 bg-[#0F172A] border border-[#1e2230] rounded-xl shadow-2xl z-50">
                            <div className="py-2">
                              <button
                                onClick={() => handleDeleteLobby(item.id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[#1e2230] flex items-center gap-2 transition-colors"
                              >
                                <Trash2 size={14} />
                                Hapus Lobby
                              </button>
                              <button
                                onClick={() => handleReportLobby(item.id)}
                                className="w-full px-4 py-2 text-left text-sm text-yellow-400 hover:bg-[#1e2230] flex items-center gap-2 transition-colors"
                              >
                                <Flag size={14} />
                                Report Lobby
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                    {item.title}
                </h3>

                {/* Rank Indicator */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-yellow-500 font-medium">{item.rank}</span>
                </div>

                {/* Creator */}
                <p className="text-sm text-gray-400 mb-4">Oleh: {item.creator}</p>
              </div>

              {/* Button Detail */}
              <Link href={`/lobby/${item.id}`}>
                <button className="w-full py-3 rounded-xl border border-[#2a2f42] bg-[#131620] text-gray-400 text-sm font-bold hover:bg-[#5C5CFF] hover:text-white hover:border-[#5C5CFF] transition-all duration-300">
                  Lihat detail
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLobbies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Tidak ada lobby ditemukan untuk kategori ini.</p>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0F172A]/90 backdrop-blur-md border border-[#1e2230]/50 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-400 text-sm mb-6">Apakah Anda yakin untuk menghapus lobby ini?</p>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteLobbyId(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-[#1e2230]/50 bg-transparent/50 backdrop-blur-sm text-gray-400 hover:bg-[#1e2230]/50 transition-colors"
              >
                Tidak
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600/90 backdrop-blur-sm text-white font-bold hover:bg-red-700/90 transition-colors shadow-lg"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0F172A]/90 backdrop-blur-md border border-[#1e2230]/50 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Report Lobby</h3>
            <p className="text-gray-400 text-sm mb-6">Pilih alasan untuk melaporkan lobby ini:</p>
            
            <div className="space-y-3 mb-6">
              {reportReasons.map((reason) => (
                <label key={reason.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason.value}
                    checked={reportReason === reason.value}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-4 h-4 text-[#5C5CFF] bg-[#0F172A] border-[#1e2230] focus:ring-[#5C5CFF] focus:ring-2"
                  />
                  <span className="text-gray-300 text-sm">{reason.label}</span>
                </label>
              ))}
            </div>

            {reportReason === 'other' && (
              <div className="mb-6">
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Jelaskan alasan report..."
                  className="w-full px-4 py-3 rounded-xl border border-[#1e2230]/50 bg-[#0F172A]/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all resize-none"
                  rows={3}
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportLobbyId(null);
                  setReportReason('');
                  setCustomReason('');
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-[#1e2230]/50 bg-transparent/50 backdrop-blur-sm text-gray-400 hover:bg-[#1e2230]/50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitReport}
                className="flex-1 py-3 px-4 rounded-xl bg-[#5C5CFF]/90 backdrop-blur-sm text-white font-bold hover:bg-[#4a4ae0]/90 transition-colors shadow-lg"
              >
                Kirim Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Detail Modal */}
      {showNotificationDetail && selectedNotification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0F172A]/90 backdrop-blur-md border border-[#1e2230]/50 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Notification Detail</h3>
              <button
                onClick={() => {
                  setShowNotificationDetail(false);
                  setSelectedNotification(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${selectedNotification.type === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                <span className="text-sm font-bold text-gray-300 uppercase">
                  {selectedNotification.type === 'admin' ? 'Admin' : 'System'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  selectedNotification.priority === 'high' ? 'bg-red-900/50 text-red-300' : 'bg-gray-900/50 text-gray-300'
                }`}>
                  {selectedNotification.priority === 'high' ? 'High Priority' : 'Normal'}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">Message</h4>
                <p className="text-gray-300 leading-relaxed">{selectedNotification.message}</p>
              </div>

              {selectedNotification.details && (
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Details</h4>
                  <p className="text-gray-400 leading-relaxed text-sm">{selectedNotification.details}</p>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                <span>{selectedNotification.time}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>From: {selectedNotification.type === 'admin' ? 'Administrator' : 'System'}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowNotificationDetail(false);
                  setSelectedNotification(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl border border-[#1e2230]/50 bg-transparent/50 backdrop-blur-sm text-gray-400 hover:bg-[#1e2230]/50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleDeleteNotification(selectedNotification.id, { stopPropagation: () => {} })}
                className="px-4 py-3 rounded-xl bg-red-600/90 backdrop-blur-sm text-white font-bold hover:bg-red-700/90 transition-colors shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}