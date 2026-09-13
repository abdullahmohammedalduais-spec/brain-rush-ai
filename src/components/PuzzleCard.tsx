import React from 'react';
import { Puzzle } from '../types';
import { Sparkles, Eye, Brain, HelpCircle, Compass, Lightbulb } from 'lucide-react';
import { formatArabicDate } from '../utils/arabic';

interface PuzzleCardProps {
  puzzle: Puzzle;
  attempts: string[];
  maxAttempts: number;
  unlockedHints: string[];
  isSolved: boolean;
  isDaily: boolean;
}

export const PuzzleCard: React.FC<PuzzleCardProps> = ({
  puzzle,
  attempts,
  maxAttempts,
  unlockedHints,
  isSolved,
  isDaily
}) => {
  const getCategoryIcon = () => {
    switch (puzzle.category) {
      case 'visual':
        return <Eye className="w-3.5 h-3.5" />;
      case 'logic':
        return <Brain className="w-3.5 h-3.5" />;
      case 'mystery':
        return <Compass className="w-3.5 h-3.5" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5" />;
    }
  };

  const getDifficultyColor = () => {
    switch (puzzle.difficulty) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    }
  };

  const remainingAttempts = maxAttempts - attempts.length;

  return (
    <article className="w-full max-w-2xl mx-auto px-3 my-2 text-right">
      <div className="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {getCategoryIcon()}
              <span>{puzzle.categoryName}</span>
            </span>

            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${getDifficultyColor()}`}>
              {puzzle.difficultyName}
            </span>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            {isDaily ? (
              <span>تحدي {formatArabicDate()} {puzzle.dayNumber ? `(#${puzzle.dayNumber})` : ''}</span>
            ) : (
              <span className="text-purple-400 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3" />
                لغز الذكاء الاصطناعي
              </span>
            )}
          </div>
        </div>

        {/* Puzzle Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4 tracking-tight">
          {puzzle.title}
        </h2>

        {/* Visual Scene / Emojis & Clue Arena */}
        <div className="relative my-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[140px] shadow-inner">
          <div className="text-4xl sm:text-5xl tracking-widest animate-bounce duration-1000 mb-2">
            {puzzle.visualClue}
          </div>
          <span className="text-[11px] font-semibold text-indigo-400/90 uppercase tracking-wider bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-900/40">
            🔍 تمعن في الرموز والمشهد البصري
          </span>
        </div>

        {/* Scenario / Story */}
        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/80 mb-4">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {puzzle.scenario}
          </p>
        </div>

        {/* Question prompt */}
        <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-3.5 mb-4 text-sm sm:text-base font-bold text-indigo-200 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
          <span>{puzzle.question}</span>
        </div>

        {/* Attempts indicator dots */}
        <div className="flex items-center justify-between text-xs text-slate-400 py-1">
          <div className="flex items-center gap-1.5">
            <span>المحاولات المتبقية:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: maxAttempts }).map((_, idx) => {
                const isAttempted = idx < attempts.length;
                return (
                  <div
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isAttempted
                        ? isSolved && idx === attempts.length - 1
                          ? 'bg-emerald-500 ring-2 ring-emerald-400/40'
                          : 'bg-rose-500'
                        : 'bg-slate-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <span className="font-mono text-slate-400 font-semibold">
            {remainingAttempts} من {maxAttempts}
          </span>
        </div>

        {/* Unlocked Hints Section if user unlocked any */}
        {unlockedHints.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>التلميحات المفتوحة ({unlockedHints.length}):</span>
            </div>
            {unlockedHints.map((hint, i) => (
              <div
                key={i}
                className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2 animate-in fade-in"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {i + 1}
                </span>
                <span>{hint}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
