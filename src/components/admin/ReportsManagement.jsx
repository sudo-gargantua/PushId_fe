'use client';

import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

const MOCK_REPORTS = [
    {
        id: 1,
        lobbyId: 1,
        lobbyTitle: 'Push Rank : ROAD TO LEGEND',
        reporter: 'User123',
        reason: 'spam',
        description: 'Lobby ini berisi spam iklan',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 60 * 60000),
        priority: 'medium'
    },
    {
        id: 2,
        lobbyId: 3,
        lobbyTitle: 'Cari Teman Untuk mabar',
        reporter: 'Moderator456',
        reason: 'harassment',
        description: 'Pembuat lobby melakukan pelecehan verbal',
        status: 'investigating',
        createdAt: new Date(Date.now() - 4 * 60 * 60000),
        priority: 'high'
    },
    {
        id: 3,
        lobbyId: 2,
        lobbyTitle: 'Cari Team untuk Push rank',
        reporter: 'Player789',
        reason: 'inappropriate',
        description: 'Konten tidak pantas dalam deskripsi lobby',
        status: 'resolved',
        createdAt: new Date(Date.now() - 24 * 60 * 60000),
        priority: 'low'
    },
    {
        id: 4,
        lobbyId: 4,
        lobbyTitle: 'Bantu Push sampai Ace',
        reporter: 'Gamer101',
        reason: 'scam',
        description: 'Mencurigakan sebagai penipuan',
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 60 * 60000),
        priority: 'high'
    }
];

const REPORT_REASONS = {
    spam: 'Spam atau iklan tidak diinginkan',
    harassment: 'Perundungan atau pelecehan',
    inappropriate: 'Konten tidak pantas',
    scam: 'Penipuan atau scam',
    other: 'Lainnya'
};

export default function ReportsManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [selectedReport, setSelectedReport] = useState(null);

    const filteredReports = MOCK_REPORTS.filter(report => {
        const matchesSearch = report.lobbyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || report.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleStatusChange = (reportId, newStatus) => {
        console.log('Updating report', reportId, 'to status:', newStatus);
        // In real app, call API to update status
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-900/50 text-yellow-300';
            case 'investigating': return 'bg-blue-900/50 text-blue-300';
            case 'resolved': return 'bg-green-900/50 text-green-300';
            case 'dismissed': return 'bg-red-900/50 text-red-300';
            default: return 'bg-gray-900/50 text-gray-300';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-400';
            case 'medium': return 'text-yellow-400';
            case 'low': return 'text-green-400';
            default: return 'text-gray-400';
        }
    };

    const getRelativeTime = (date) => {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (hours < 1) return 'Baru saja';
        if (hours < 24) return `${hours} jam yang lalu`;
        return `${days} hari yang lalu`;
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2">Handle Reports</h2>
                <p className="text-sm text-gray-400">Kelola laporan dari pengguna tentang lobby</p>
            </div>

            {/* Filters */}
            <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari laporan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white placeholder-gray-400 focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                    >
                        <option value="all">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="investigating">Sedang Diselidiki</option>
                        <option value="resolved">Diselesaikan</option>
                        <option value="dismissed">Ditolak</option>
                    </select>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-[#1e2230] bg-[#131620] text-white focus:outline-none focus:border-[#5C5CFF] focus:ring-2 focus:ring-[#5C5CFF]/20 transition-all"
                    >
                        <option value="all">Semua Prioritas</option>
                        <option value="high">Tinggi</option>
                        <option value="medium">Sedang</option>
                        <option value="low">Rendah</option>
                    </select>

                    <button className="px-6 py-3 rounded-xl bg-[#5C5CFF] text-white font-bold hover:bg-[#4a4ae0] transition-colors flex items-center justify-center gap-2">
                        <Filter size={20} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Reports Table */}
            <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#1e2230]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Report</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Lobby</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Reporter</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1e2230]">
                            {filteredReports.map((report) => (
                                <tr key={report.id} className="hover:bg-[#1e2230]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-bold text-white">{REPORT_REASONS[report.reason]}</div>
                                            <div className="text-sm text-gray-400 truncate max-w-xs">{report.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-bold text-white">{report.lobbyTitle}</div>
                                            <div className="text-sm text-gray-400">ID: {report.lobbyId}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{report.reporter}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-bold ${getPriorityColor(report.priority)}`}>
                                            {report.priority.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(report.status)}`}>
                                            {report.status === 'pending' ? 'Pending' :
                                                report.status === 'investigating' ? 'Diselidiki' :
                                                    report.status === 'resolved' ? 'Diselesaikan' : 'Ditolak'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            {getRelativeTime(report.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedReport(report)}
                                                className="p-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            {report.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(report.id, 'investigating')}
                                                        className="p-2 rounded-lg bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 transition-colors"
                                                        title="Start Investigation"
                                                    >
                                                        <AlertTriangle size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(report.id, 'dismissed')}
                                                        className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
                                                        title="Dismiss Report"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                </>
                                            )}
                                            {report.status === 'investigating' && (
                                                <button
                                                    onClick={() => handleStatusChange(report.id, 'resolved')}
                                                    className="p-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors"
                                                    title="Resolve Report"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredReports.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Tidak ada laporan ditemukan.</p>
                    </div>
                )}
            </div>

            {/* Stats Footer */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-4">
                    <div className="text-2xl font-bold text-white">{MOCK_REPORTS.length}</div>
                    <div className="text-sm text-gray-400">Total Reports</div>
                </div>
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-4">
                    <div className="text-2xl font-bold text-yellow-400">{MOCK_REPORTS.filter(r => r.status === 'pending').length}</div>
                    <div className="text-sm text-gray-400">Pending</div>
                </div>
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-4">
                    <div className="text-2xl font-bold text-blue-400">{MOCK_REPORTS.filter(r => r.status === 'investigating').length}</div>
                    <div className="text-sm text-gray-400">Investigating</div>
                </div>
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-4">
                    <div className="text-2xl font-bold text-green-400">{MOCK_REPORTS.filter(r => r.status === 'resolved').length}</div>
                    <div className="text-sm text-gray-400">Resolved</div>
                </div>
            </div>

            {/* Report Detail Modal */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#0F172A]/90 backdrop-blur-md border border-[#1e2230]/50 rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-bold text-white">Report Details</h3>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-300">Lobby:</label>
                                <p className="text-white">{selectedReport.lobbyTitle} (ID: {selectedReport.lobbyId})</p>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-300">Reporter:</label>
                                <p className="text-white">{selectedReport.reporter}</p>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-300">Reason:</label>
                                <p className="text-white">{REPORT_REASONS[selectedReport.reason]}</p>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-300">Description:</label>
                                <p className="text-gray-300">{selectedReport.description}</p>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-300">Priority:</label>
                                <span className={`font-bold ${getPriorityColor(selectedReport.priority)}`}>
                                    {selectedReport.priority.toUpperCase()}
                                </span>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-300">Status:</label>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ml-2 ${getStatusColor(selectedReport.status)}`}>
                                    {selectedReport.status === 'pending' ? 'Pending' :
                                        selectedReport.status === 'investigating' ? 'Diselidiki' :
                                            selectedReport.status === 'resolved' ? 'Diselesaikan' : 'Ditolak'}
                                </span>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-300">Reported At:</label>
                                <p className="text-gray-300">{getRelativeTime(selectedReport.createdAt)}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="flex-1 py-3 px-4 rounded-xl border border-[#1e2230]/50 bg-transparent/50 backdrop-blur-sm text-gray-400 hover:bg-[#1e2230]/50 transition-colors"
                            >
                                Close
                            </button>
                            {selectedReport.status === 'pending' && (
                                <button
                                    onClick={() => {
                                        handleStatusChange(selectedReport.id, 'investigating');
                                        setSelectedReport(null);
                                    }}
                                    className="flex-1 py-3 px-4 rounded-xl bg-[#5C5CFF]/90 backdrop-blur-sm text-white font-bold hover:bg-[#4a4ae0]/90 transition-colors shadow-lg"
                                >
                                    Start Investigation
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
