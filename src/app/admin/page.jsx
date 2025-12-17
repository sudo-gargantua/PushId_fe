'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  GamepadIcon,
  Flag,
  TrendingUp,
  Activity,
  LogOut,
  Settings,
  Shield
} from 'lucide-react';
import Link from 'next/link';

// Mock data for dashboard
const DASHBOARD_STATS = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    color: 'text-blue-400'
  },
  {
    title: 'Active Lobbies',
    value: '156',
    change: '+8%',
    changeType: 'positive',
    icon: GamepadIcon,
    color: 'text-green-400'
  },
  {
    title: 'Total Reports',
    value: '23',
    change: '-5%',
    changeType: 'negative',
    icon: Flag,
    color: 'text-red-400'
  },
  {
    title: 'Server Uptime',
    value: '99.9%',
    change: '+0.1%',
    changeType: 'positive',
    icon: Activity,
    color: 'text-purple-400'
  }
];

const RECENT_ACTIVITIES = [
  { id: 1, action: 'User banned', user: 'ToxicPlayer123', time: '2 minutes ago', type: 'warning' },
  { id: 2, action: 'New lobby created', user: 'ProGamer456', time: '5 minutes ago', type: 'info' },
  { id: 3, action: 'Report resolved', user: 'AdminUser', time: '10 minutes ago', type: 'success' },
  { id: 4, action: 'Server maintenance', user: 'System', time: '1 hour ago', type: 'system' },
  { id: 5, action: 'New user registered', user: 'NewbieGamer', time: '2 hours ago', type: 'info' }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    // Mock logout
    alert('Logout berhasil! (Mock)');
    // Redirect to login would happen here
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      {/* Header */}
      <header className="bg-[#0F172A] border-b border-[#1e2230] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Shield size={32} className="text-[#5C5CFF]" />
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-sm text-gray-400">Dashboard Overview</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-[#1e2230] transition-colors">
              <Settings size={20} className="text-gray-400" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-6 mb-8 border-b border-[#1e2230]">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'lobbies', label: 'Lobbies', icon: GamepadIcon },
            { id: 'reports', label: 'Reports', icon: Flag },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#5C5CFF] text-[#5C5CFF]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {DASHBOARD_STATS.map((stat, index) => (
            <div
              key={index}
              className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6 hover:border-[#5C5CFF]/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon size={24} className={stat.color} />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/admin/users"
                    className="p-4 rounded-xl bg-[#1e2230] hover:bg-[#2a2f42] transition-colors border border-[#1e2230] hover:border-[#5C5CFF]/50"
                  >
                    <Users size={24} className="text-[#5C5CFF] mb-2" />
                    <h4 className="font-semibold text-white mb-1">Manage Users</h4>
                    <p className="text-sm text-gray-400">View and manage user accounts</p>
                  </Link>

                  <Link
                    href="/admin/manage-lobbies"
                    className="p-4 rounded-xl bg-[#1e2230] hover:bg-[#2a2f42] transition-colors border border-[#1e2230] hover:border-[#5C5CFF]/50"
                  >
                    <GamepadIcon size={24} className="text-[#5C5CFF] mb-2" />
                    <h4 className="font-semibold text-white mb-1">Manage Lobbies</h4>
                    <p className="text-sm text-gray-400">Monitor and moderate lobbies</p>
                  </Link>

                  <Link
                    href="/admin/handle-reports"
                    className="p-4 rounded-xl bg-[#1e2230] hover:bg-[#2a2f42] transition-colors border border-[#1e2230] hover:border-[#5C5CFF]/50"
                  >
                    <Flag size={24} className="text-[#5C5CFF] mb-2" />
                    <h4 className="font-semibold text-white mb-1">Handle Reports</h4>
                    <p className="text-sm text-gray-400">Review and resolve user reports</p>
                  </Link>

                  <Link
                    href="/admin/analytics"
                    className="p-4 rounded-xl bg-[#1e2230] hover:bg-[#2a2f42] transition-colors border border-[#1e2230] hover:border-[#5C5CFF]/50"
                  >
                    <TrendingUp size={24} className="text-[#5C5CFF] mb-2" />
                    <h4 className="font-semibold text-white mb-1">Analytics</h4>
                    <p className="text-sm text-gray-400">View detailed statistics</p>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">User Management</h3>
                <Link
                  href="/admin/users"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C5CFF] text-white font-bold rounded-xl hover:bg-[#4a4ae0] transition-colors"
                >
                  Go to Users Page
                </Link>
              </div>
            )}

            {activeTab === 'lobbies' && (
              <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Lobby Management</h3>
                <Link
                  href="/admin/manage-lobbies"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C5CFF] text-white font-bold rounded-xl hover:bg-[#4a4ae0] transition-colors"
                >
                  Go to Manage Lobbies
                </Link>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Report Management</h3>
                <Link
                  href="/admin/handle-reports"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C5CFF] text-white font-bold rounded-xl hover:bg-[#4a4ae0] transition-colors"
                >
                  Go to Handle Reports
                </Link>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Analytics Dashboard</h3>
                <Link
                  href="/admin/analytics"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5C5CFF] text-white font-bold rounded-xl hover:bg-[#4a4ae0] transition-colors"
                >
                  Go to Analytics
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar - Recent Activities */}
          <div className="bg-[#0F172A] border border-[#1e2230] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-[#1e2230] last:border-b-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'warning' ? 'bg-red-500' :
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'system' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}