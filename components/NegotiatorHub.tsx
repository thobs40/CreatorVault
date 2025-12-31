
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CheckCircle, XCircle, AlertCircle, Check, RefreshCw } from 'lucide-react';
import { startNegotiation } from '../services/geminiService';
import { MOCK_ASSETS } from '../constants';
import { NegotiationMessage } from '../types';

const formatTime = (timestamp: number) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(timestamp);
};

const NegotiatorHub: React.FC = () => {
  const [selectedAsset] = useState(MOCK_ASSETS[0]);
  const [messages, setMessages] = useState<NegotiationMessage[]>([
    { role: 'system', content: 'Potential licensee "0xAb...c12" has initiated a request for "Cyberpunk Soundscape Vol 1".', timestamp: Date.now() - 1000 * 60 * 5 },
    { role: 'user', content: 'Hi, I would like to license this track for an indie game trailer. Can you offer 0.15 ETH? I am willing to go up to 7% royalty.', timestamp: Date.now() - 1000 * 60 * 4 }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'online' | 'offline'>('online');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg: NegotiationMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setAgentStatus('online'); // Reset status on new attempt

    try {
      const responseText = await startNegotiation(
        selectedAsset.name,
        selectedAsset.params,
        input,
        messages
      );
      
      const agentMsg: NegotiationMessage = { role: 'agent', content: responseText || "I encountered an error processing that offer.", timestamp: Date.now() };
      setMessages(prev => [...prev, agentMsg]);
      setAgentStatus('online');
    } catch (error) {
      console.error(error);
      setAgentStatus('offline');
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: 'Agent communication failure. The neural link has been severed.', 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReconnect = () => {
    setAgentStatus('online');
    setMessages(prev => [...prev, { 
      role: 'system', 
      content: 'System rebooting... Neural link re-established.', 
      timestamp: Date.now() 
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group cursor-help">
            <div className={`w-14 h-14 bg-gradient-to-br ${agentStatus === 'online' ? 'from-indigo-500 to-purple-600' : 'from-gray-700 to-gray-800'} rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:shadow-indigo-500/40`}>
              <Bot size={28} className={agentStatus === 'offline' ? 'opacity-50' : ''} />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${agentStatus === 'online' ? 'bg-emerald-500' : 'bg-rose-500'} border-2 border-[#0a0a0a] rounded-full transition-colors duration-500`}></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Negotiator <span className="text-indigo-500">#8192</span></h1>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              Managing <span className="text-gray-200 font-medium">{selectedAsset.name}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className={`flex items-center gap-2 px-3 py-1 ${agentStatus === 'online' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'} border rounded-full text-[10px] font-bold tracking-wider transition-all duration-500`}>
            <div className={`w-1.5 h-1.5 ${agentStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'} rounded-full`}></div>
            {agentStatus === 'online' ? 'NEGOTIATOR ONLINE' : 'AGENT OFFLINE'}
          </div>
          <div className="flex items-center gap-2">
            {agentStatus === 'offline' && (
              <button 
                onClick={handleReconnect}
                className="text-[9px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
              >
                <RefreshCw size={10} />
                Reconnect Link
              </button>
            )}
            <span className="text-[10px] text-gray-500 font-mono">SECURE TUNNEL: 0xF2...91A</span>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 bg-[#111] border border-[#222] rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scroll-smooth relative z-10"
          style={{ scrollbarWidth: 'thin' }}
        >
          {messages.map((msg, i) => (
            <div 
              key={`${msg.timestamp}-${i}`} 
              className={`flex w-full animate-message-pop ${
                msg.role === 'user' ? 'justify-end' : 
                msg.role === 'system' ? 'justify-center' : 'justify-start'
              }`}
            >
              {msg.role === 'system' ? (
                <div className="my-2 bg-[#1a1a1a]/90 backdrop-blur-md border border-[#333] px-5 py-2 rounded-2xl text-[11px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-2 shadow-sm">
                  <AlertCircle size={14} className={msg.content.includes('failure') ? 'text-rose-500' : 'text-indigo-500'} />
                  {msg.content}
                </div>
              ) : (
                <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center shadow-md ${
                      msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-[#1a1a1a] border border-[#333] text-indigo-400'
                    }`}>
                      {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    
                    {/* Bubble */}
                    <div className={`relative p-4 md:p-5 rounded-2xl text-sm leading-relaxed shadow-lg break-words w-full ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-[#1a1a1a] border border-[#222] text-gray-200 rounded-bl-none'
                    }`}>
                      {msg.content}
                      
                      {/* Agreement Overlay */}
                      {msg.content.includes("OFFER ACCEPTED") && (
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 text-emerald-300 font-bold bg-emerald-500/10 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl border-b border-x border-emerald-500/30">
                          <CheckCircle size={18} className="animate-pulse" />
                          <span className="uppercase tracking-wide text-[10px]">On-Chain Agreement Prepared</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Meta (Time + Read Receipt) */}
                  <div className={`flex items-center gap-3 mt-2 px-1 text-[10px] font-medium text-gray-500 tracking-tighter uppercase ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                    {msg.role === 'user' && (
                      <div className="flex items-center text-indigo-400">
                        <Check size={12} strokeWidth={3} />
                        <Check size={12} strokeWidth={3} className="-ml-1.5" />
                        <span className="ml-1 text-[9px] font-bold">Confirmed</span>
                      </div>
                    )}
                    <span>{formatTime(msg.timestamp)}</span>
                    {msg.role === 'agent' && <span className="text-indigo-500/40">Verified Agent Response</span>}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing State Bubble */}
          {isTyping && (
            <div className="flex justify-start animate-message-pop">
              <div className="flex items-end gap-3 max-w-[85%] md:max-w-[70%]">
                <div className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-indigo-400 animate-pulse">
                    <Bot size={18} />
                </div>
                <div className="bg-[#1a1a1a] border border-[#222] p-5 rounded-2xl rounded-bl-none flex items-center gap-4 shadow-xl">
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.3s]"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest animate-pulse">Evaluating Market Value...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar Section */}
        <div className="p-6 bg-[#0d0d0d] border-t border-[#222] relative z-20">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-5 group-focus-within:opacity-20 blur-sm transition duration-300"></div>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={agentStatus === 'online' ? "Submit counter-offer or question..." : "Agent connection lost..."}
              disabled={agentStatus === 'offline'}
              className="relative w-full bg-[#111] border border-[#222] focus:border-indigo-500/50 rounded-2xl px-6 py-5 pr-16 text-sm focus:outline-none transition-all placeholder:text-gray-600 shadow-inner disabled:opacity-50"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping || agentStatus === 'offline'}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-indigo-600/20"
              title="Send Message"
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex gap-6">
                <button 
                  disabled={agentStatus === 'offline'}
                  className="text-[10px] font-bold text-gray-500 hover:text-rose-500 disabled:hover:text-gray-500 disabled:opacity-30 transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                    <XCircle size={14} />
                    Reject Deal
                </button>
                <button 
                  disabled={agentStatus === 'offline'}
                  className="text-[10px] font-bold text-gray-500 hover:text-emerald-400 disabled:hover:text-gray-500 disabled:opacity-30 transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                    <CheckCircle size={14} />
                    Approve Last
                </button>
            </div>
            <div className="text-[10px] font-mono text-gray-700 flex items-center gap-2 bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#222]">
                <span className={`w-1.5 h-1.5 ${agentStatus === 'online' ? 'bg-indigo-500/50 animate-pulse' : 'bg-rose-500/20'} rounded-full`}></span>
                {agentStatus === 'online' ? 'AI REASONING ACTIVE' : 'AI NEURAL LINK SEVERED'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiatorHub;
