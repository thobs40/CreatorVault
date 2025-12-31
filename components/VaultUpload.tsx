
import React, { useState } from 'react';
import { Plus, Upload, Music, Film, Image as ImageIcon, Check, Info } from 'lucide-react';
import { MOCK_ASSETS } from '../constants';
import { CreatorParams } from '../types';

const VaultUpload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [newParams, setNewParams] = useState<CreatorParams>({
    minPrice: 0.1,
    royaltyPercentage: 5,
    durationDays: 365,
    allowCommercial: true,
    exclusive: false
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Secure Vault</h1>
          <p className="text-gray-400 mt-1">Manage your intellectual property and agent parameters.</p>
        </div>
        <button 
          onClick={() => setIsUploading(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Secure New Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ASSETS.map((asset) => (
          <div key={asset.id} className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div className="relative aspect-video">
              <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10">
                {asset.type}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-4">{asset.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Min. License</span>
                  <span className="font-mono text-indigo-400">{asset.params.minPrice} ETH</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Royalty</span>
                  <span className="text-white font-medium">{asset.params.royaltyPercentage}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Agent Mode</span>
                  <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    Autonomous
                  </span>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] rounded-xl text-sm font-medium transition-colors">
                Edit Agent Logic
              </button>
            </div>
          </div>
        ))}
      </div>

      {isUploading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#222] w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Register New Asset</h2>
                <button onClick={() => setIsUploading(false)} className="text-gray-500 hover:text-white transition-colors">✕</button>
              </div>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-[#333] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Drop your master files here</p>
                    <p className="text-sm text-gray-500">Supports WAV, MP4, JPEG (Max 1GB)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Base Price (ETH)</label>
                    <input 
                      type="number" 
                      value={newParams.minPrice}
                      onChange={(e) => setNewParams({...newParams, minPrice: Number(e.target.value)})}
                      className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Royalty %</label>
                    <input 
                      type="number" 
                      value={newParams.royaltyPercentage}
                      onChange={(e) => setNewParams({...newParams, royaltyPercentage: Number(e.target.value)})}
                      className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors" 
                    />
                  </div>
                </div>

                <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex gap-3">
                  <Info size={18} className="text-indigo-400 shrink-0" />
                  <p className="text-xs text-gray-400 leading-relaxed">
                    By registering this asset, CreatorVault will mint a soul-bound metadata NFT and initialize your 
                    Negotiator Agent with these parameters.
                  </p>
                </div>

                <button 
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
                  onClick={() => setIsUploading(false)}
                >
                  Mint & Initialize Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultUpload;
