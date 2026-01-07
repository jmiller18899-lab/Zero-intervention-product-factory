
import React, { useState, useEffect, useRef } from 'react';
import { AppState, ProductBusiness, PRODUCT_ENGINE_SOURCE, FrameworkID, AppTab } from './types';
import { generateProductBusiness } from './geminiService';
import Header from './components/Header';
import KeywordInput from './components/KeywordInput';
import AssetDisplay from './components/AssetDisplay';
import { Loader2, Bot, FileText, Zap, RotateCcw, CheckCircle2, X, AlertTriangle, ShieldCheck, Activity, Globe, Sparkles, ActivitySquare, Cpu, Command } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('last_meta_deployment');
    return {
      isGenerating: false,
      generationStep: "",
      businessData: saved ? JSON.parse(saved) : null,
      error: null,
      connectionStatus: 'idle',
      toast: null,
      selectedFramework: 'growth_engine' 
    };
  });

  const [activeTab, setActiveTab] = useState<AppTab>('sop');

  useEffect(() => {
    if (state.businessData) {
      localStorage.setItem('last_meta_deployment', JSON.stringify(state.businessData));
    }
  }, [state.businessData]);

  const handleGenerate = async (keyword: string) => {
    setState(prev => ({ 
      ...prev, 
      isGenerating: true, 
      generationStep: "Warming Engine Core...", 
      error: null, 
      businessData: null 
    }));
    
    try {
      await new Promise(r => setTimeout(r, 800));
      setState(prev => ({ ...prev, generationStep: `Establishing Signal Handshake...` }));
      
      await new Promise(r => setTimeout(r, 1000));
      setState(prev => ({ ...prev, generationStep: "Analyzing Market Entropy..." }));
      
      await new Promise(r => setTimeout(r, 900));
      setState(prev => ({ ...prev, generationStep: "Synthesizing Asset Architecture..." }));

      await new Promise(r => setTimeout(r, 700));
      setState(prev => ({ ...prev, generationStep: "Injecting Secret Sauce Bridge..." }));
      
      const data = await generateProductBusiness(keyword, state.selectedFramework);
      setState(prev => ({ ...prev, isGenerating: false, generationStep: "", businessData: data }));
      setActiveTab('sop');
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isGenerating: false, 
        generationStep: "",
        error: err.message || "Engine Error: The pipeline breach could not be contained." 
      }));
    }
  };

  const handleStartAuth = () => {
    setState(prev => ({ ...prev, connectionStatus: 'syncing' }));
    
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15;
      
      if (isSuccess) {
        setState(prev => ({ 
          ...prev, 
          connectionStatus: 'verified',
          toast: { message: "Sync Tunnel Established", type: 'success' }
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          connectionStatus: 'failed',
          toast: { message: "Authorization Error 0x77", type: 'error' }
        }));
      }
      setTimeout(() => setState(prev => ({ ...prev, toast: null })), 3000);
    }, 2500);
  };

  const handleReset = () => {
    localStorage.removeItem('last_meta_deployment');
    setState(prev => ({ ...prev, businessData: null, error: null, connectionStatus: 'idle' }));
  };

  const handleFrameworkChange = (id: FrameworkID) => {
    setState(prev => ({ ...prev, selectedFramework: id }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080809] text-zinc-400 selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden">
      {/* HUD Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-indigo-600/5 blur-[120px] rounded-full"></div>
         <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]"></div>
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      </div>

      <Header />

      {state.toast && (
        <div className="fixed top-24 right-8 z-[100] animate-in slide-in-from-right-8 fade-in duration-500">
          <div className={`flex items-center gap-4 bg-zinc-900/90 backdrop-blur-xl border-l-4 p-5 rounded-2xl shadow-2xl ${state.toast.type === 'success' ? 'border-emerald-500 shadow-emerald-500/20' : 'border-red-500 shadow-red-500/20'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${state.toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
              {state.toast.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div className="pr-8">
              <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{state.toast.message}</span>
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Core System Sync</p>
            </div>
            <button 
              onClick={() => setState(prev => ({ ...prev, toast: null }))}
              className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 z-10">
        {!state.businessData && !state.isGenerating ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="relative">
              <div className="absolute -inset-10 bg-indigo-600/10 blur-[80px] rounded-full opacity-60 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-indigo-600/5 rounded-[2.5rem] flex items-center justify-center border border-indigo-500/20 shadow-[0_0_50px_rgba(79,70,229,0.1)]">
                <Cpu className="w-16 h-16 text-indigo-500" />
              </div>
            </div>
            
            <div className="space-y-6 max-w-4xl">
              <div className="space-y-4">
                 <span className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.8em]">AGO_PROTOCOL_ID: {PRODUCT_ENGINE_SOURCE.slice(0, 8)}</span>
                 <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase select-none">
                   ASSET <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 italic">ARCHITECT</span>
                 </h1>
              </div>
              <p className="text-zinc-500 font-bold text-xl leading-relaxed px-16 uppercase tracking-tight max-w-3xl mx-auto">
                Deterministic asset deployment via Hybrid Signal Loop. <br/>
                <span className="text-indigo-500/50">Zero manual intervention requested.</span>
              </p>
            </div>

            <KeywordInput 
              onGenerate={handleGenerate} 
              selectedFramework={state.selectedFramework}
              onFrameworkChange={handleFrameworkChange}
            />

            <div className="flex items-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex flex-col items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Signal_Sync</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Command className="w-8 h-8 text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Notion_Macro</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Globe className="w-8 h-8 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Portal_Alpha</span>
              </div>
            </div>
          </div>
        ) : state.isGenerating ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-16 text-center animate-in fade-in duration-700">
            <div className="relative">
              <div className="w-56 h-56 border border-white/[0.03] rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-b-2 border-purple-500/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-8 border-r-2 border-emerald-500/20 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                <ActivitySquare className="w-20 h-20 text-indigo-500 animate-pulse" />
              </div>
              <div className="absolute -inset-16 bg-indigo-600/10 blur-[120px] rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-4">
                 <span className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.8em] animate-pulse">Initializing_Session</span>
                 <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">{state.generationStep}</h2>
              </div>
              <div className="w-80 h-1 bg-white/5 rounded-full mx-auto overflow-hidden relative">
                <div className="absolute inset-0 bg-indigo-600 animate-progress"></div>
              </div>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Encrypting structural nodes... OK</p>
            </div>
          </div>
        ) : state.businessData ? (
          <div className="space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
                <div className="flex flex-wrap p-1.5 bg-zinc-900/40 rounded-[2rem] border border-white/5 backdrop-blur-2xl">
                    {[
                      { id: 'sop', label: 'Protocol SOP' },
                      { id: 'recipe', label: 'Signal Recipe' },
                      { id: 'portal', label: 'Portal Preview' },
                      { id: 'diagnostics', label: 'Diagnostics' },
                    ].map((tab) => (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as AppTab)}
                        className={`px-8 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-500 hover:text-white'}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                </div>

                <button 
                  onClick={handleReset}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-red-400 border border-white/5 group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  Terminal Reset
                </button>
             </div>

             <AssetDisplay 
                activeTab={activeTab} 
                data={state.businessData} 
                connectionStatus={state.connectionStatus} 
                onStartAuth={handleStartAuth}
             />
          </div>
        ) : null}

        {state.error && (
          <div className="mt-8 p-16 bg-red-600/5 border border-red-500/10 rounded-[2.5rem] flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 backdrop-blur-md">
             <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                <AlertTriangle className="w-10 h-10 text-red-500" />
             </div>
             <div className="space-y-3">
                <h3 className="text-white font-black uppercase tracking-[0.4em] text-2xl">Pipeline Breach</h3>
                <p className="text-red-400/70 text-sm font-bold uppercase tracking-widest max-w-lg mx-auto leading-relaxed">{state.error}</p>
             </div>
             <button 
              onClick={() => setState(prev => ({ ...prev, error: null }))}
              className="px-12 py-5 bg-red-600 hover:bg-red-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl transition-all active:scale-95"
             >
               Purge & Re-Initialize
             </button>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-white/5 text-center mt-auto bg-[#080809]">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.8em]">
            INDUSTRIAL GRADE ASSET ARCHITECTURE // AGO_ENGINE_v5.5.0
          </p>
          <div className="flex items-center gap-4 text-[8px] font-bold text-zinc-800 uppercase tracking-[0.4em]">
             <span>CORE_STABLE</span>
             <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
             <span>HANDSHAKE_READY</span>
             <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
             <span>ENCRYPTION_ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
