import React from 'react';
import { Puzzle, PuzzleCategory } from '../types';
import {
  Sparkles,
  Eye,
  Brain,
  HelpCircle,
  Compass,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Shuffle,
  Calendar,
  Layers
} from 'lucide-react';
import { formatArabicDate } from '../utils/arabic';

interface PuzzleCardProps {
  puzzle: Puzzle;
  attempts: string[];
  maxAttempts: number;
  unlockedHints: string[];
  isSolved: boolean;
  isDaily: boolean;
  // Navigation Arrows & Multi-question controls
  questionIndex?: number;
  totalQuestionsCount?: number;
  onNextQuestion?: () => void;
  onPrevQuestion?: () => void;
  canGoPrev?: boolean;
  canGoNext?: boolean;
  isGeneratingAi?: boolean;
}

const CATEGORY_THEMES: Record<
  PuzzleCategory,
  {
    gradient: string;
    border: string;
    glow: string;
    accentGlow: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    clueBg: string;
    icon: React.ReactNode;
  }
> = {
  visual: {
    gradient: 'from-cyan-950/40 via-slate-900 to-teal-950/30',
    border: 'border-cyan-500/35 hover:border-cyan-500/50',
    glow: 'bg-cyan-500/15',
    accentGlow: 'from-cyan-500/20 via-teal-500/10 to-emerald-500/20',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-300',
    badgeBorder: 'border-cyan-500/30',
    clueBg: 'from-slate-950 via-cyan-950/30 to-slate-950',
    icon: <Eye className="w-4 h-4 text-cyan-400" />
  },
  logic: {
    gradient: 'from-violet-950/40 via-slate-900 to-purple-950/30',
    border: 'border-violet-500/35 hover:border-violet-500/50',
    glow: 'bg-violet-500/15',
    accentGlow: 'from-violet-500/20 via-purple-500/10 to-indigo-500/20',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-300',
    badgeBorder: 'border-violet-500/30',
    clueBg: 'from-slate-950 via-violet-950/30 to-slate-950',
    icon: <Brain className="w-4 h-4 text-violet-400" />
  },
  mystery: {
    gradient: 'from-amber-950/40 via-slate-900 to-rose-950/30',
    border: 'border-amber-500/35 hover:border-amber-500/50',
    glow: 'bg-amber-500/15',
    accentGlow: 'from-amber-500/20 via-orange-500/10 to-rose-500/20',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-500/30',
    clueBg: 'from-slate-950 via-amber-950/30 to-slate-950',
    icon: <Compass className="w-4 h-4 text-amber-400" />
  },
  riddle: {
    gradient: 'from-rose-950/40 via-slate-900 to-pink-950/30',
    border: 'border-rose-500/35 hover:border-rose-500/50',
    glow: 'bg-rose-500/15',
    accentGlow: 'from-rose-500/20 via-pink-500/10 to-amber-500/20',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-500/30',
    clueBg: 'from-slate-950 via-rose-950/30 to-slate-950',
    icon: <HelpCircle className="w-4 h-4 text-rose-400" />
  },
  math: {
    gradient: 'from-orange-950/40 via-slate-900 to-amber-950/30',
    border: 'border-orange-500/35 hover:border-orange-500/50',
    glow: 'bg-orange-500/15',
    accentGlow: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20',
    badgeBg: 'bg-orange-500/10',
    badgeText: 'text-orange-300',
    badgeBorder: 'border-orange-500/30',
    clueBg: 'from-slate-950 via-orange-950/30 to-slate-950',
    icon: <Sparkles className="w-4 h-4 text-orange-400" />
  },
  wisdom: {
    gradient: 'from-emerald-950/40 via-slate-900 to-teal-950/30',
    border: 'border-emerald-500/35 hover:border-emerald-500/50',
    glow: 'bg-emerald-500/15',
    accentGlow: 'from-emerald-500/20 via-teal-500/10 to-amber-500/20',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-500/30',
    clueBg: 'from-slate-950 via-emerald-950/30 to-slate-950',
    icon: <Brain className="w-4 h-4 text-emerald-400" />
  },
  science: {
    gradient: 'from-blue-950/40 via-slate-900 to-indigo-950/30',
    border: 'border-blue-500/35 hover:border-blue-500/50',
    glow: 'bg-blue-500/15',
    accentGlow: 'from-blue-500/20 via-indigo-500/10 to-sky-500/20',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-300',
    badgeBorder: 'border-blue-500/30',
    clueBg: 'from-slate-950 via-blue-950/30 to-slate-950',
    icon: <Sparkles className="w-4 h-4 text-blue-400" />
  }
};

export const PuzzleCard: React.FC<PuzzleCardProps> = ({
  puzzle,
  attempts,
  maxAttempts,
  unlockedHints,
  isSolved,
  isDaily,
  questionIndex = 1,
  totalQuestionsCount = 1,
  onNextQuestion,
  onPrevQuestion,
  canGoPrev = false,
  canGoNext = true,
  isGeneratingAi = false
}) => {
  const theme = CATEGORY_THEMES[puzzle.category] || CATEGORY_THEMES.logic;

  const getDifficultyColor = () => {
    switch (puzzle.difficulty) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/25';
      case 'hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/25';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25';
    }
  };

  const remainingAttempts = maxAttempts - attempts.length;

  return (
    <article className="w-full max-w-2xl mx-auto px-3 my-2 text-right relative">
      {/* Navigation Arrows & Question Changer Bar */}
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        {/* Previous Question Arrow (Right in RTL) */}
        <button
          type="button"
          onClick={onPrevQuestion}
          disabled={!canGoPrev || isGeneratingAi}
          title="السؤال السابق"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95 cursor-pointer ${
            canGoPrev
              ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700/80 shadow-sm hover:border-indigo-400/50'
              : 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronRight className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">السؤال السابق</span>
          <span className="sm:hidden">السابق</span>
        </button>

        {/* Central Question Badge & Counter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-xl shadow-inner text-xs font-semibold text-slate-300">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>السؤال</span>
            <span className="font-mono text-indigo-300 font-bold">#{questionIndex}</span>
            {totalQuestionsCount > 1 && (
              <span className="text-slate-500 text-[11px]">من {totalQuestionsCount}</span>
            )}
          </div>

          {/* Quick Random AI Question Button */}
          {onNextQuestion && (
            <button
              type="button"
              onClick={onNextQuestion}
              disabled={isGeneratingAi}
              title="توليد سؤال بالذكاء الاصطناعي"
              className="p-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all active:scale-95 cursor-pointer"
            >
              <Shuffle className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        {/* Next Question Arrow (Left in RTL) */}
        <button
          type="button"
          onClick={onNextQuestion}
          disabled={!canGoNext || isGeneratingAi}
          title="السؤال التالي"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95 cursor-pointer ${
            canGoNext
              ? 'bg-gradient-to-l from-indigo-900/40 via-slate-900 to-purple-900/40 hover:from-indigo-800/60 hover:to-purple-800/60 text-indigo-200 hover:text-white border-indigo-500/40 shadow-sm hover:border-indigo-400'
              : 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed opacity-50'
          }`}
        >
          <span className="hidden sm:inline">
            {isGeneratingAi ? 'جاري التوليد...' : 'السؤال التالي'}
          </span>
          <span className="sm:hidden">{isGeneratingAi ? '...' : 'التالي'}</span>
          <ChevronLeft className={`w-4 h-4 text-indigo-400 ${isGeneratingAi ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Main Puzzle Card with dynamic category theme & colorful glows */}
      <div
        className={`bg-gradient-to-br ${theme.gradient} border ${theme.border} rounded-3xl p-4 sm:p-7 shadow-2xl relative overflow-hidden transition-all duration-300 backdrop-blur-sm`}
      >
        {/* Animated ambient glow orbs */}
        <div
          className={`absolute -top-12 -right-12 w-56 h-56 ${theme.glow} rounded-full blur-3xl pointer-events-none animate-float`}
        />
        <div
          className={`absolute -bottom-12 -left-12 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-glow`}
        />

        {/* Decorative Floating Geometric Shape */}
        <div className="absolute top-4 left-4 pointer-events-none opacity-20 hidden sm:block">
          <div className="w-12 h-12 rounded-2xl border border-indigo-400/40 rotate-12 animate-float" />
        </div>

        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800/80 pb-3.5 relative z-10">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} shadow-sm`}
            >
              {theme.icon}
              <span>{puzzle.categoryName}</span>
            </span>

            <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${getDifficultyColor()}`}>
              {puzzle.difficultyName}
            </span>
          </div>

          <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            {isDaily ? (
              <span className="flex items-center gap-1 text-slate-300 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/80">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>تحدي {formatArabicDate()} {puzzle.dayNumber ? `(#${puzzle.dayNumber})` : ''}</span>
              </span>
            ) : (
              <span className="bg-purple-950/60 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>مولّد بالذكاء الاصطناعي</span>
              </span>
            )}
          </div>
        </div>

        {/* Puzzle Title with vivid gradient */}
        <h2 className="text-xl sm:text-2xl font-black text-white mb-4 tracking-tight relative z-10 leading-snug">
          {puzzle.title}
        </h2>

        {/* Visual Scene / Emojis & Clue Arena */}
        <div
          className={`relative my-4 rounded-2xl bg-gradient-to-b ${theme.clueBg} border border-slate-800/90 p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[145px] shadow-inner relative overflow-hidden group`}
        >
          {/* Subtle light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-shimmer" />

          <div className="text-5xl sm:text-6xl tracking-widest transition-transform duration-300 group-hover:scale-110 mb-3 select-none">
            {puzzle.visualClue}
          </div>
          <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider bg-slate-900/90 px-3.5 py-1 rounded-full border border-indigo-500/30 shadow-sm flex items-center gap-1">
            <span>🔍 تأمل الرموز والمشهد البصري بذكاء</span>
          </span>
        </div>

        {/* Scenario / Story */}
        <div className="bg-slate-950/70 rounded-2xl p-4 sm:p-5 border border-slate-800/90 mb-4 relative z-10 shadow-sm">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {puzzle.scenario}
          </p>
        </div>

        {/* Question prompt with vivid highlight border */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900/90 to-purple-950/60 border border-indigo-500/40 rounded-2xl p-4 mb-4 text-sm sm:text-base font-extrabold text-indigo-100 flex items-center gap-2.5 relative z-10 shadow-md">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 shrink-0">
            <HelpCircle className="w-5 h-5 text-indigo-300" />
          </div>
          <span className="leading-snug">{puzzle.question}</span>
        </div>

        {/* Attempts indicator dots & counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 py-1 border-t border-slate-800/80 pt-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">المحاولات:</span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxAttempts }).map((_, idx) => {
                const isAttempted = idx < attempts.length;
                return (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isAttempted
                        ? isSolved && idx === attempts.length - 1
                          ? 'bg-emerald-400 ring-4 ring-emerald-500/30 scale-110'
                          : 'bg-rose-500 ring-2 ring-rose-500/30'
                        : 'bg-slate-800 border border-slate-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <span className="font-mono font-bold bg-slate-950/80 border border-slate-800 px-2.5 py-0.5 rounded-lg text-slate-300">
            {remainingAttempts} من {maxAttempts} متبقية
          </span>
        </div>

        {/* Unlocked Hints Section */}
        {unlockedHints.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 relative z-10 animate-in fade-in slide-in-from-bottom-2">
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>التلميحات المفتوحة ({unlockedHints.length}):</span>
            </div>
            {unlockedHints.map((hint, i) => (
              <div
                key={i}
                className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/95 leading-relaxed flex items-start gap-2 shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
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
