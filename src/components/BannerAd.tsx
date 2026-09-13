import React, { useEffect, useRef } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface BannerAdProps {
  position?: 'top' | 'middle' | 'bottom' | 'sticky';
  zoneId?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({
  position = 'top',
  zoneId = '11787291'
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  return (
    <aside 
      aria-label="مساحة إعلانية" 
      className={`w-full max-w-2xl mx-auto px-3 my-3 transition-all ${
        position === 'sticky' ? 'sticky bottom-2 z-20 shadow-2xl' : ''
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900/90 via-slate-900 to-indigo-950/30 p-2.5 sm:p-3 text-slate-300 shadow-md">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1.5 px-1">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span>إعلان ممول</span>
          </span>
          <span className="bg-slate-800/80 text-slate-400 px-1.5 py-0.5 rounded text-[10px] tracking-wider font-mono uppercase">
            AD
          </span>
        </div>

        {/* Real ad container targeting Monetag */}
        <div 
          ref={adContainerRef}
          id={`ad-placement-${position}`}
          data-zone={zoneId}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/70 rounded-xl p-3 border border-slate-800/70 hover:border-indigo-500/40 transition-all"
        >
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">
                تحديات الذكاء والألعاب التفاعلية اليومية
              </p>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                اكتشف أقوى العروض الحصرية والفرص المميزة عبر شركائنا المعتمدين
              </p>
            </div>
          </div>

          <a
            href="https://3nbf4.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold py-2 px-4 rounded-xl shadow-md shadow-indigo-600/20 transition-all"
          >
            <span>استكشف الآن</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </aside>
  );
};
