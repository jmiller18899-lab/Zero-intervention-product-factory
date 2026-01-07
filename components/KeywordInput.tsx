import React, { useState } from 'react';
import { Sparkles, ChevronRight, Mail, Cpu, Zap, Activity, Brain } from 'lucide-react';
import { FrameworkID } from '../types';
import { REASONING_FRAMEWORKS } from '../constants';

interface Props {
  onGenerate: (keyword: string) => void;
  selectedFramework: FrameworkID;
  onFrameworkChange: (id: FrameworkID) => void;
}

const KeywordInput: React.FC<Props> = ({ onGenerate, selectedFramework, onFrameworkChange }) => {
  const [keyword, setKeyword] = useState('');
  const [showFrameworks, setShowFrameworks] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onGenerate(keyword.trim());
    }
  };

  const currentFramework = REASONING_FRAMEWORKS.find(f => f.id === selectedFramework);

  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Framework Selector */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3 px-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
            <Cpu className="w-3 h-3" />
            Active Reasoning Engine
          </label>
          <button 
            onClick={() => setShowFrameworks(!showFrameworks)}
            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {showFrameworks ? 'Close Select' : 'Change Engine'}
          </button>
        </div>

        {showFrameworks ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            {REASONING_FRAMEWORKS.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  onFrameworkChange(f.id);
                  setShowFrameworks(false);
                }}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedFramework === f.id 
                    ? 'bg-indigo-600/20 border-indigo-500/50 ring-1 ring-indigo-500/30' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedFramework === f.id ? 'bg-indigo-400' : 'bg-zinc-600'}`}></div>
                  <span className="text-xs font-black text-white uppercase tracking-wider">{f.name}</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-medium leading-tight">{f.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl mb-6 flex items-center justify-between group cursor-pointer hover:bg-indigo-500/10 transition-colors" onClick={() => setShowFrameworks(true)}>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                   <Brain className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">{currentFramework?.name}</span>
                   <p className="text-[10px] text-zinc-500 font-medium">{currentFramework?.description}</p>
                </div>
             </div>
             <Activity className="w-4 h-4 text-indigo-500/40 group-hover:text-indigo-500 transition-colors" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex flex-col sm:flex-row gap-2 bg-[#121214] p-2 rounded-xl border border-white/10 ring-1 ring-white/5">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. '2025 AI Agency Launch'"
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder-zinc-600 font-medium"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-lg font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-900/20"
            disabled={!keyword.trim()}
          >
            <Sparkles className="w-4 h-4" />
            Deploy Architect
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>
      
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={() => setKeyword('Q1 Product Marketing Lifecycle')}
          className="text-[10px] font-bold text-zinc-500 hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
        >
          <Mail className="w-3 h-3" />
          Suggestion: Q1 Product Marketing Lifecycle
        </button>
      </div>
    </div>
  );
};

export default KeywordInput;