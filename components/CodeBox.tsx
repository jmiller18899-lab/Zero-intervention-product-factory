
import React from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  code: string;
  language: string;
  title: string;
  highlightedWords?: string[];
}

const CodeBox: React.FC<Props> = ({ code, language, title, highlightedWords = [] }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedCode = () => {
    let result = code;
    // Simple way to wrap highlighted words in a span for visual distinction
    highlightedWords.forEach(word => {
      const regex = new RegExp(word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
      result = result.replace(regex, `<span class="text-blue-400 font-bold underline bg-blue-400/10 px-1 rounded">${word}</span>`);
    });
    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0e] shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161618] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
          </div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{language} — {title}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-6 overflow-x-auto mono text-sm leading-relaxed text-zinc-400">
        {highlightedWords.length > 0 ? (
          <pre className="whitespace-pre-wrap">{renderHighlightedCode()}</pre>
        ) : (
          <pre className="whitespace-pre-wrap">{code}</pre>
        )}
      </div>
    </div>
  );
};

export default CodeBox;
