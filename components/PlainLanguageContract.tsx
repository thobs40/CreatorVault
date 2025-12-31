
import React, { useState } from 'react';
import { FileText, Shield, Zap, RefreshCw, ChevronRight } from 'lucide-react';
import { summarizeContract } from '../services/geminiService';
import { CONTRACT_BYTECODE_SAMPLE } from '../constants';

const PlainLanguageContract: React.FC = () => {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await summarizeContract(CONTRACT_BYTECODE_SAMPLE);
      setSummary(result || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Plain Language Contracts</h1>
          <p className="text-gray-400 mt-1">Audit and translate blockchain bytecode into human-readable agreements.</p>
        </div>
        <button 
          onClick={handleSummarize}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
          Analyze Recent Agreement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111] border border-[#222] rounded-3xl p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6 text-indigo-400">
            <FileText size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Solidity Bytecode</h2>
          </div>
          <pre className="flex-1 bg-black/50 border border-[#222] rounded-2xl p-6 font-mono text-xs text-gray-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {CONTRACT_BYTECODE_SAMPLE}
          </pre>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-3xl p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6 text-emerald-400">
            <Shield size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">AI Audit Summary</h2>
          </div>
          
          {summary ? (
            <div className="prose prose-invert max-w-none space-y-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl mb-6">
                <p className="text-xs font-bold text-emerald-400 uppercase mb-1">Status: Verified Secure</p>
                <p className="text-sm text-gray-300">This contract accurately reflects the negotiated terms for "Cyberpunk Soundscape Vol 1".</p>
              </div>
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {summary}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-600 mb-4">
                <Zap size={32} />
              </div>
              <p className="text-gray-500 text-sm">Click "Analyze Recent Agreement" to generate a human-readable legal summary of the latest on-chain license.</p>
            </div>
          )}

          {summary && (
            <div className="mt-auto pt-8 flex gap-4">
              <button className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">Download PDF Summary</button>
              <button className="flex-1 py-3 bg-[#1a1a1a] border border-[#333] font-bold rounded-xl hover:bg-[#222] transition-colors">Sign & Deploy</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlainLanguageContract;
