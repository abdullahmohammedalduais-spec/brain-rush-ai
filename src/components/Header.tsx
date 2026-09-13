import React from 'react';
import { Sparkles, Trophy, Calendar, Flame, RefreshCw } from 'lucide-react';
import { PlayerStats } from '../types';

interface HeaderProps {
  stats: PlayerStats;
  onOpenStats: () => void;
  onOpenArchive: () => void;
  onGenerateAiPuzzle: () => void;
  isGeneratingAi: boolean;
  isDaily: boolean;
  onResetToDaily: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  onOpenStats,
  onOpenArchive,
  onGenerateAiPuzzle,
  isGeneratingAi,
  isDaily,
  onResetToDaily
}) => {
  return (
    <header className="w-full max-w-2xl mx-auto px-4 py-3 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center justify-between gap-2">
        {/* Logo and branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/25 text-white font-black text-base select-none">
            🧠
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-sans">
                BrainRush <span className="text-indigo-400">AI</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              تحدي العقل والألغاز اليومية
            </p>
          </div>
        </div>

        {/* Action icons & Streak */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Daily Streak */}
          <button
            onClick={onOpenStats}
            title="سلسلة الأيام المتتالية"
            className="flex items-center gap-1 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-500/30 text-amber-300 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all shadow-sm"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
            <span>{stats.currentStreak}</span>
          </button>

          {/* AI Generator button */}
          <button
            onClick={onGenerateAiPuzzle}
            disabled={isGeneratingAi}
            title="توليد لغز ذكاء اصطناعي فوري"
            className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-2.5 py-1.5 rounded-xl shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">لغز بالـ AI</span>
          </button>

          {/* Archive / Calendar */}
          <button
            onClick={onOpenArchive}
            title="أرشيف التحديات السابقة"
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Stats Button */}
          <button
            onClick={onOpenStats}
            title="سجل الإحصائيات والإنجازات"
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors"
          >
            <Trophy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* If playing custom AI puzzle, show banner to return to daily */}
      {!isDaily && (
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-purple-300 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            تحدي غير محدود مولد بالذكاء الاصطناعي
          </span>
          <button
            onClick={onResetToDaily}
            className="text-indigo-400 hover:text-indigo-300 underline font-medium"
          >
            العودة للغز اليوم الرسمي
          </button>
        </div>
      )}
    </header>
  );
};
