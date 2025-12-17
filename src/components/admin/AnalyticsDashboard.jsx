'use client';

import React, { useState } from 'react';
import { Users, Activity, AlertTriangle, Server, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

const ANALYTICS_DATA = {
    totalUsers: 15420,
    activeLobbies: 89,
    totalReports: 234,
    serverUptime: '99.8%', // This would come from backend
    serverUptimeHours: 168, // hours
    userGrowth: 12.5, // percentage
    lobbyGrowth: 8.3,
    reportGrowth: -5.2,
    activeUsersToday: 1250,
    newUsersThisWeek: 450,
    lobbiesCreatedToday: 23,
    reportsResolvedToday: 15
};

export default function AnalyticsDashboard() {
    const [timeRange, setTimeRange] = useState('7d');
    const [uptimeStartTime] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // 7 days ago

    const calculateUptime = () => {
        const now = new Date();
        const diff = now - uptimeStartTime;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days}d ${hours}h`;
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const MetricCard = ({ title, value, icon: Icon, growth, color, bgColor }) => (
        <div className={`bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 hover:border-[#5C5CFF]/50 transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${bgColor}`}>
                    <Icon size={24} className={color} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {growth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {Math.abs(growth)}%
                </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">{formatNumber(value)}</div>
            <div className="text-sm text-gray-400">{title}</div>
        </div>
    );

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h2>
                <p className="text-sm text-gray-400">Pantau performa dan statistik platform</p>
            </div>

            {/* Time Range Selector */}
            <div className="mb-6">
                <div className="flex gap-2">
                    {[
                        { value: '1d', label: '1 Hari' },
                        { value: '7d', label: '7 Hari' },
                        { value: '30d', label: '30 Hari' },
                        { value: '90d', label: '90 Hari' }
                    ].map((range) => (
                        <button
                            key={range.value}
                            onClick={() => setTimeRange(range.value)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${timeRange === range.value
                                    ? 'bg-[#5C5CFF] text-white'
                                    : 'bg-[#0F172A] border border-[#1e2230] text-gray-400 hover:border-[#5C5CFF]/50'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Total Users"
                    value={ANALYTICS_DATA.totalUsers}
                    icon={Users}
                    growth={ANALYTICS_DATA.userGrowth}
                    color="text-blue-400"
                    bgColor="bg-blue-600/20"
                />
                <MetricCard
                    title="Active Lobbies"
                    value={ANALYTICS_DATA.activeLobbies}
                    icon={Activity}
                    growth={ANALYTICS_DATA.lobbyGrowth}
                    color="text-green-400"
                    bgColor="bg-green-600/20"
                />
                <MetricCard
                    title="Total Reports"
                    value={ANALYTICS_DATA.totalReports}
                    icon={AlertTriangle}
                    growth={ANALYTICS_DATA.reportGrowth}
                    color="text-yellow-400"
                    bgColor="bg-yellow-600/20"
                />
                <MetricCard
                    title="Server Uptime"
                    value={ANALYTICS_DATA.serverUptime}
                    icon={Server}
                    growth={0}
                    color="text-purple-400"
                    bgColor="bg-purple-600/20"
                />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-orange-600/20">
                            <Users size={20} className="text-orange-400" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{ANALYTICS_DATA.activeUsersToday}</div>
                            <div className="text-sm text-gray-400">Active Users Today</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-cyan-600/20">
                            <Calendar size={20} className="text-cyan-400" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{ANALYTICS_DATA.newUsersThisWeek}</div>
                            <div className="text-sm text-gray-400">New Users This Week</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-600/20">
                            <Activity size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{ANALYTICS_DATA.lobbiesCreatedToday}</div>
                            <div className="text-sm text-gray-400">Lobbies Created Today</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-rose-600/20">
                            <AlertTriangle size={20} className="text-rose-400" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">{ANALYTICS_DATA.reportsResolvedToday}</div>
                            <div className="text-sm text-gray-400">Reports Resolved Today</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Server Status */}
            <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-6">Server Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">{ANALYTICS_DATA.serverUptime}</div>
                        <div className="text-sm text-gray-400">Uptime Percentage</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-2">{calculateUptime()}</div>
                        <div className="text-sm text-gray-400">Uptime Duration</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <div className="text-3xl font-bold text-white">Online</div>
                        </div>
                        <div className="text-sm text-gray-400">Server Status</div>
                    </div>
                </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">User Growth</h3>
                    <div className="h-64 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                            <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Chart visualization would be implemented here</p>
                            <p className="text-sm mt-2">Using libraries like Chart.js or Recharts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Activity Overview</h3>
                    <div className="h-64 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                            <Activity size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Activity chart would be implemented here</p>
                            <p className="text-sm mt-2">Showing lobbies, reports, and user activity</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {[
                        { type: 'user', message: 'New user registered: Player123', time: '2 minutes ago', color: 'text-blue-400' },
                        { type: 'lobby', message: 'New lobby created: "Epic Battle Royale"', time: '5 minutes ago', color: 'text-green-400' },
                        { type: 'report', message: 'Report resolved for lobby ID: 45', time: '12 minutes ago', color: 'text-yellow-400' },
                        { type: 'system', message: 'Server maintenance completed successfully', time: '1 hour ago', color: 'text-purple-400' },
                        { type: 'user', message: 'User banned: TrollUser456', time: '2 hours ago', color: 'text-red-400' }
                    ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-[#1e2230]/50">
                            <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`}></div>
                            <div className="flex-1">
                                <p className="text-white text-sm">{activity.message}</p>
                                <p className="text-gray-400 text-xs">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
