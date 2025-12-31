
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Vault, 
  MessageSquare, 
  FileText, 
  Settings, 
  Wallet,
  TrendingUp,
  Plus
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import VaultUpload from './components/VaultUpload';
import NegotiatorHub from './components/NegotiatorHub';
import PlainLanguageContract from './components/PlainLanguageContract';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Vault, label: 'My Vault', path: '/vault' },
    { icon: MessageSquare, label: 'Negotiations', path: '/negotiate' },
    { icon: FileText, label: 'Legal Preview', path: '/legal' },
  ];

  return (
    <aside className="w-64 bg-[#111] border-r border-[#222] h-screen fixed left-0 top-0 flex flex-col p-4">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">C</div>
        <h1 className="text-xl font-bold tracking-tight">CreatorVault</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-[#222] pt-6 px-2">
        <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl border border-[#333]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">0x71C...492</p>
            <p className="text-xs text-indigo-400">Pro Creator</p>
          </div>
          <Wallet size={16} className="text-gray-500" />
        </div>
      </div>
    </aside>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#0a0a0a] text-gray-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vault" element={<VaultUpload />} />
            <Route path="/negotiate" element={<NegotiatorHub />} />
            <Route path="/legal" element={<PlainLanguageContract />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
