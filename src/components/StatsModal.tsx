import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Target, Clock, X, Sparkles, Share2 } from 'lucide-react';
import { PlayerStats } from '../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  onOpenShare?: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onOpenShare
}) => {
  const [timeUntilNext, setTimeUntilNext] = useState<string>("");

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimeUntilNext(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
  const maxGuesses = Math.max(1, ...(Object.values(stats.guessDistribution) as number[]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-right text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5 border-b border-slate-800 pb-4">
          <Trophy className="w-6 h-6 text-amber-400" />
          <div>
            <h2 className="text-lg font-bold text-white">إحصائياتك وإنجازاتك</h2>
            <p className="text-xs text-slate-400">سجل الأداء ومستوى الذكاء اليومي</p>
          </div>
        </div>

        {/* High-level stats counters */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-center">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="block text-xl font-extrabold text-indigo-400">{stats.played}</span>
            <span className="text-[11px] text-slate-400 font-medium">الألعاب</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="block text-xl font-extrabold text-emerald-400">{winRate}%</span>
            <span className="text-[11px] text-slate-400 font-medium">نسبة الفوز</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-extrabold text-amber-400">{stats.currentStreak}</span>
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">سلسلة اليوم</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="block text-xl font-extrabold text-purple-400">{stats.maxStreak}</span>
            <span className="text-[11px] text-slate-400 font-medium">أفضل سلسلة</span>
          </div>
        </div>

        {/* Guess Distribution Bars */}
        <div className="mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-400" />
            توزيع عدد محاولات الحل الناجحة:
          </h3>
          <div className="space-y-1.5">
            {([1, 2, 3, 4, 5, 6] as const).map((guessNum) => {
              const count = stats.guessDistribution[guessNum] || 0;
              const percentage = Math.max(8, (count / maxGuesses) * 100);

              return (
                <div key={guessNum} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-slate-400 font-mono">{guessNum}</span>
                  <div className="flex-1 bg-slate-900 rounded-md overflow-hidden h-6">
                    <div
                      className="bg-indigo-600 h-full rounded-md flex items-center justify-end px-2 text-white font-bold text-[11px] transition-all duration-500"
                      style={{ width: `${count > 0 ? percentage : 8}%` }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Countdown to Next Daily Challenge */}
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-800/40 rounded-xl p-3.5 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-300 font-semibold">تحدي الغد متاح بعد:</p>
              <p className="text-lg font-black text-amber-400 font-mono tracking-wider dir-ltr text-right">
                {timeUntilNext}
              </p>
            </div>
          </div>

          {onOpenShare && (
            <button
              onClick={() => {
                onClose();
                onOpenShare();
              }}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة النتيجة</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
