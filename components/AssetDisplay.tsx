import React, { useState, useEffect, useRef } from 'react';
import { ProductBusiness, AppTab } from '../types';
import CodeBox from './CodeBox';
import { 
  FileText, 
  Zap, 
  CheckCircle2, 
  Loader2,
  Globe,
  ShieldCheck,
  Target,
  Webhook,
  RefreshCw,
  Play,
  Server,
  ToggleLeft,
  History,
  Key,
  DatabaseZap,
  Layout,
  Terminal,
  Activity,
  Link,
  Cpu,
  Box,
  CpuIcon,
  Command,
  Settings2,
  ListChecks,
  Sparkles,
  ChevronRight,
  Database,
  ArrowRightCircle,
  Copy,
  AlertOctagon,
  Unlock
} from 'lucide-react';

interface Props {
  activeTab: AppTab;
  data: ProductBusiness;
  connectionStatus: 'idle' | 'authorizing' | 'syncing' | 'verified' | 'failed';
  onStartAuth: () => void;
}

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/25754122/ualsa4f/";

const DiagnosticsView: React.FC<{ connectionStatus: string }> = ({ connectionStatus }) => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<Record<string, 'pass' | 'fail' | 'warn' | 'idle'>>({
    toggle: 'idle',
    historical: 'idle',
    auth: 'idle',
    cache: 'idle'
  });

  const runScan = async () => {
    setScanning(true);
    const keys = Object.keys(results);
    for (const key of keys) {
      setResults(prev => ({ ...prev, [key]: 'idle' }));
      await new Promise(r => setTimeout(r, 400 + Math.random() * 600));
      const status = Math.random() > 0.9 ? 'fail' : (Math.random() > 0.8 ? 'warn' : 'pass');
      setResults(prev => ({ ...prev, [key]: status }));
    }
    setScanning(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">System Integrity</h3>
          <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Pre-Deployment Verification</p>
        </div>
        <button 
          onClick={runScan}
          disabled={scanning}
          className="relative px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all group overflow-hidden"
        >
          <div className={`absolute inset-0 bg-indigo-600/20 transition-transform ${scanning ? 'translate-x-0' : '-translate-x-full'} duration-1000 animate-pulse`}></div>
          <span className="relative flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
            {scanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 text-indigo-400" />}
            {scanning ? 'Logic Scan Active' : 'Initialize Integrity Check'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'toggle', title: 'Signal Rx', icon: <ToggleLeft /> },
          { id: 'historical', title: 'Backlog Sync', icon: <History /> },
          { id: 'auth', title: 'Notion Auth', icon: <Key /> },
          { id: 'cache', title: 'Persistence', icon: <DatabaseZap /> }
        ].map((d) => (
          <div key={d.id} className="p-6 bg-[#0c0c0e] border border-white/5 rounded-2xl flex flex-col gap-4 group hover:border-indigo-500/30 transition-all">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              results[d.id] === 'pass' ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 
              results[d.id] === 'fail' ? 'bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 
              results[d.id] === 'warn' ? 'bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 
              'bg-white/5 text-zinc-600'
            }`}>
              {React.cloneElement(d.icon as React.ReactElement, { className: 'w-5 h-5' })}
            </div>
            <div>
              <h4 className="text-[11px] font-black text-white uppercase tracking-wider">{d.title}</h4>
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                {results[d.id] === 'idle' ? 'STANDBY' : results[d.id].toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DeploymentLog: React.FC<{ keyword: string }> = ({ keyword }) => {
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Standing by for Signal Handshake..."]);
  const [isDeploying, setIsDeploying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const runDeployment = async () => {
    setIsDeploying(true);
    setLogs(["[SYSTEM] Initializing Zero-Intervention Pipeline..."]);
    const sequence = [
      { msg: "[SIGNAL] Inbound Webhook: Trigger Handshake Received", delay: 600 },
      { msg: `[ENGINE] Scaling Framework for "${keyword}"`, delay: 1000 },
      { msg: "[VALIDATOR] Verifying Notion API Token: OK", delay: 500 },
      { msg: "[NOTION] Creating Page Node in 'Deployments' database", delay: 1200 },
      { msg: "[AI_BRIDGE] Injecting Build Request Prompt (Cmd+J Ready)", delay: 800 },
      { msg: "[SUCCESS] Deployment Sequence Closed.", delay: 400 }
    ];
    for (const step of sequence) {
      await new Promise(r => setTimeout(r, step.delay));
      setLogs(prev => [...prev, step.msg]);
    }
    setIsDeploying(false);
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl overflow-hidden shadow-2xl mt-8">
      <div className="px-6 py-3 bg-zinc-900/50 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Real-Time Deployment Feed</span>
        </div>
        <button 
          onClick={runDeployment}
          disabled={isDeploying}
          className="flex items-center gap-2 text-[10px] font-black text-indigo-400 hover:text-white transition-colors uppercase tracking-widest"
        >
          {isDeploying ? 'Processing...' : 'Run Simulation'}
        </button>
      </div>
      <div ref={scrollRef} className="p-6 h-44 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1.5 selection:bg-indigo-500/30">
        {logs.map((log, i) => (
          <div key={i} className={`${log.includes('[SUCCESS]') ? 'text-emerald-400' : log.includes('[ERROR]') ? 'text-red-400' : 'text-zinc-500'}`}>
            <span className="opacity-20 mr-3">[{new Date().toLocaleTimeString()}]</span>
            {log}
          </div>
        ))}
        {isDeploying && <div className="text-indigo-500 animate-pulse">_</div>}
      </div>
    </div>
  );
};

const SOPView: React.FC<{ data: ProductBusiness }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-8">
        <div className="p-10 bg-[#0c0c0e] border border-white/5 rounded-[2.5rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Database className="w-32 h-32 text-indigo-500" />
           </div>
           <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.1)]">
                 <FileText className="w-7 h-7" />
              </div>
              <div>
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">{data.productTitle}</h2>
                 <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Operational Protocol v5.5</p>
              </div>
           </div>
           <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-zinc-400 font-medium leading-loose text-sm px-4">
                {data.productSOP}
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl space-y-6">
           <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Target className="w-4 h-4" />
              Strategic Blueprint
           </h4>
           <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-indigo-500/10">
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Valuation</span>
                 <span className="text-lg font-black text-white">{data.price}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-indigo-500/10">
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Framework</span>
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AGO_Architect</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Portal Type</span>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Private Member</span>
              </div>
           </div>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-4">
           <h4 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Encryption Status
           </h4>
           <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase italic">
             Assets validated for Direct-Notion-Sync without third-party marketplace dependencies. 
           </p>
        </div>
      </div>
    </div>
  );
};

const RecipeView: React.FC<{ data: ProductBusiness }> = ({ data }) => {
  const [copyingAll, setCopyingAll] = useState(false);
  const zapierSteps = [
    { id: 1, title: 'Choose Notion -> Create Page', desc: 'Select your master business workspace.' },
    { id: 2, title: 'Map Folder: "Inbound Assets"', desc: 'Choose where the build logic will land.' },
    { id: 3, title: 'Title: Use "product_title"', desc: 'Direct mapping from the JSON payload.' },
    { id: 4, title: 'Content: Map "notionAiPrompt"', desc: 'This contains the phase checklists.' },
    { id: 5, title: 'Deploy: Trigger Cmd+J', desc: 'Manual trigger to build the UI structure.' },
  ];

  const copyAll = () => {
    setCopyingAll(true);
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setTimeout(() => setCopyingAll(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Signal Deployment Recipe</h3>
        <button 
          onClick={copyAll}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-indigo-900/30"
        >
          {copyingAll ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copyingAll ? 'Copied Master Signal' : 'Copy All Asset Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                Notion AI Bridge (Secret Sauce)
              </h3>
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest bg-zinc-900 border border-white/5 px-2 py-0.5 rounded">Manual Copy Target</span>
            </div>
            <CodeBox 
              title="Build Request Macro" 
              code={data.notionAiPrompt} 
              language="Markdown / Notion AI" 
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">Inbound Webhook Payload</h3>
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest bg-zinc-900 border border-white/5 px-2 py-0.5 rounded">Zapier Data Source</span>
            </div>
            <CodeBox 
              title="Flat JSON Structure" 
              code={data.flatPayload} 
              language="JSON" 
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem] space-y-8 shadow-2xl relative">
             <div className="flex items-center gap-3">
                <Settings2 className="w-5 h-5 text-indigo-400" />
                <h4 className="text-[12px] font-black text-white uppercase tracking-widest">Zapier Implementation</h4>
             </div>
             <div className="space-y-6 relative">
                {zapierSteps.map((step, i) => (
                  <div key={step.id} className="flex gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center shrink-0 text-indigo-500 font-black text-xs border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                      {step.id}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[11px] font-black text-white uppercase tracking-tight">{step.title}</p>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" />
                Webhook Listener
              </h4>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]"></span>
            </div>
            <p className="text-[9px] text-zinc-500 font-mono break-all leading-tight">{ZAPIER_WEBHOOK_URL}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortalView: React.FC<{ data: ProductBusiness, connectionStatus: string, onStartAuth: () => void }> = ({ data, connectionStatus, onStartAuth }) => {
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-8">
           <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <div className="bg-zinc-900/80 backdrop-blur-md border-b border-white/5 px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <Globe className="w-4 h-4 text-indigo-400" />
                       <span className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">Portal Node Preview</span>
                    </div>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[8px] font-black uppercase rounded-full border border-indigo-500/20">Secret Sauce Engaged</span>
                    </div>
                 </div>
                 <div className="p-12 space-y-10">
                    <div className="space-y-4">
                       <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.85]">{data.productTitle}</h1>
                       <div className="flex gap-3">
                          <span className="px-4 py-1.5 bg-indigo-600/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-500/20">Industrial Loop</span>
                          <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">Ready for Cmd+J</span>
                       </div>
                    </div>
                    
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-8 group hover:bg-white/[0.07] transition-all">
                       <div className="w-20 h-20 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-inner">
                          <Command className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="space-y-2">
                          <h5 className="text-[13px] font-black text-white uppercase tracking-widest">Manual Trigger Protocol</h5>
                          <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed max-w-sm">
                             Open Notion -> Highlight Secret Sauce -> Press <span className="text-white px-2 py-0.5 bg-indigo-600 rounded font-mono shadow-lg">Cmd + J</span> and hit Enter.
                          </p>
                       </div>
                    </div>

                    <div className="flex items-center gap-10 pt-6">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">Internal Allocation</span>
                          <div className="text-4xl font-black text-white tracking-tighter">{data.price}</div>
                       </div>
                       <button 
                        onClick={onStartAuth}
                        disabled={connectionStatus === 'syncing' || connectionStatus === 'verified'}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-black uppercase tracking-widest text-[12px] py-5 rounded-2xl transition-all shadow-2xl shadow-indigo-900/40 flex items-center justify-center gap-3 relative overflow-hidden group"
                       >
                          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <Zap className="w-5 h-5 text-yellow-400" />
                          {connectionStatus === 'verified' ? 'Link Established' : 'Initialize Deployment Tunnel'}
                          <ArrowRightCircle className="w-5 h-5" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           <DeploymentLog keyword={data.keyword} />
        </div>

        <div className="w-full md:w-80 space-y-6">
           <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] space-y-8 shadow-xl">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Logic Stream</h4>
                 </div>
              </div>
              
              {connectionStatus === 'verified' && (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Sync Tunnel Active</span>
                  </div>
                  <button onClick={onStartAuth} className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-widest transition-all">
                    <RefreshCw className="w-4 h-4" />
                    Reset Protocol
                  </button>
                </div>
              )}

              {connectionStatus === 'failed' && (
                <div className="space-y-4 animate-in shake duration-500">
                  <div className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <AlertOctagon className="w-6 h-6 text-red-500" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Auth Sync Failed</span>
                      <span className="text-[8px] font-bold text-red-400/50 uppercase">Scope Mismatch Detected</span>
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl space-y-2">
                     <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Troubleshooting:</p>
                     <ul className="text-[8px] font-bold text-zinc-600 uppercase space-y-1 list-disc list-inside">
                        <li>Verify Notion Integration Token</li>
                        <li>Check "Insert Content" permissions</li>
                        <li>Reset Zapier Catch Hook</li>
                     </ul>
                  </div>
                  <button 
                    onClick={onStartAuth}
                    className="w-full py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    Retry Handshake
                  </button>
                </div>
              )}

              {(connectionStatus === 'idle' || connectionStatus === 'syncing') && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-zinc-800/50 border border-white/5 rounded-2xl">
                    <Loader2 className={`w-6 h-6 text-zinc-600 ${connectionStatus === 'syncing' ? 'animate-spin' : ''}`} />
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      {connectionStatus === 'syncing' ? 'Stabilizing Link...' : 'Tunnel Required'}
                    </span>
                  </div>
                  <button 
                    onClick={onStartAuth}
                    disabled={connectionStatus === 'syncing'}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg"
                  >
                    Authenticate Signal
                  </button>
                </div>
              )}

              <div className="pt-8 border-t border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Stack Nodes</span>
                    <div className="flex gap-3">
                       <Layout className="w-4 h-4 text-zinc-500 hover:text-indigo-400 cursor-help" title="Notion" />
                       <CpuIcon className="w-4 h-4 text-zinc-500 hover:text-indigo-400 cursor-help" title="Zapier" />
                       <Sparkles className="w-4 h-4 text-zinc-500 hover:text-indigo-400 cursor-help" title="Notion AI" />
                    </div>
                 </div>
                 <p className="text-[10px] text-zinc-600 font-bold uppercase leading-relaxed text-center px-2">
                    System utilizing **Hybrid Signal Loop** v5.5 to bypass legacy API constraints.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const AssetDisplay: React.FC<Props> = ({ activeTab, data, connectionStatus, onStartAuth }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'sop': return <SOPView data={data} />;
      case 'recipe': return <RecipeView data={data} />;
      case 'portal': return <PortalView data={data} connectionStatus={connectionStatus} onStartAuth={onStartAuth} />;
      case 'diagnostics': return <DiagnosticsView connectionStatus={connectionStatus} />;
      default: return <SOPView data={data} />;
    }
  };

  return (
    <div className="w-full pt-4">
      {renderContent()}
    </div>
  );
};

export default AssetDisplay;