
import React from 'react';
import { Bot } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-20 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] ring-1 ring-indigo-400/30">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight text-white uppercase leading-none">
              Meta <span className="text-indigo-500 italic">Architect</span>
            </span>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">SOP + Automation Sync</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Engine_V4.0_Stable</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
