
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Activity, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { MOCK_REVENUE } from '../constants';

const StatCard = ({ label, value, trend, icon: Icon }: any) => (
  <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-indigo-500/10 rounded-lg">
        <Icon size={20} className="text-indigo-500" />
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Good morning, Artist</h1>
          <p className="text-gray-400 mt-1">Your assets are generating value across 12 licenses.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors">
          <TrendingUp size={18} />
          Optimize Yield
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Revenue" value="12.5 ETH" trend={12.5} icon={Activity} />
        <StatCard label="Active Licenses" value="48" trend={5.2} icon={ShieldCheck} />
        <StatCard label="Unique Licensees" value="32" trend={8.1} icon={Users} />
        <StatCard label="Agent Success Rate" value="94%" trend={2.4} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111] border border-[#222] p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Revenue Forecast</h2>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-500/30 border border-indigo-500 border-dashed rounded-full"></div>
                <span>AI Projection</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="month" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}Ξ`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="forecast" stroke="#6366f1" strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111] border border-[#222] p-6 rounded-2xl flex flex-col">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="flex-1 space-y-6">
            {[
              { type: 'Payment', asset: 'Cyberpunk Soundscape', amount: '0.04 ETH', time: '2 mins ago' },
              { type: 'New License', asset: 'Neon Streets Loop', amount: '1.2 ETH', time: '1 hour ago' },
              { type: 'Negotiation', asset: 'Digital Drift', amount: 'Active', time: '3 hours ago' },
              { type: 'Royalty Release', asset: 'Bass Synth Pack', amount: '0.005 ETH', time: '5 hours ago' }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">{activity.asset}</p>
                  <p className="text-xs text-gray-500">{activity.type} • {activity.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-medium text-indigo-400">{activity.amount}</p>
                  <ArrowUpRight size={14} className="ml-auto text-gray-600" />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] rounded-xl text-sm transition-colors">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
