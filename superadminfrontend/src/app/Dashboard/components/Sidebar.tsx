'use client';

import { Home, Building2, FileText, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'organizations', label: 'Organizations', icon: Building2 },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6b46c1] to-[#d53f8c] flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">GRC Platform</h1>
              <p className="text-gray-400 text-xs">Developer Portal</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-800 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6b46c1] to-[#d53f8c] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">DV</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Developer</p>
              <p className="text-gray-400 text-xs truncate">dev@grc.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
