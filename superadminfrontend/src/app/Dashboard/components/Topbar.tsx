'use client';

import { LogOut, Bell, Search } from 'lucide-react';

interface TopbarProps {
  title: string;
  onLogout: () => void;
}

export default function Topbar({ title, onLogout }: TopbarProps) {
  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your GRC platform resources</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
          />
        </div>

        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>

        <div className="w-px h-8 bg-gray-700"></div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6b46c1] to-[#d53f8c] flex items-center justify-center">
            <span className="text-white font-semibold">DV</span>
          </div>
          <div className="hidden xl:block">
            <p className="text-white text-sm font-medium">Developer</p>
            <p className="text-gray-400 text-xs">dev@grc.com</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gradient-to-r hover:from-[#6b46c1] hover:to-[#d53f8c] text-gray-400 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden xl:inline text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
