import React, { useState, useMemo } from 'react';
import {
  Calendar,
  CheckCircle,
  Play,
  X,
  Sparkles,
  Layers,
  Dices,
  ChevronRight,
  ChevronLeft,
  Search,
  Compass,
  Zap,
  Hash
} from 'lucide-react';
import { CURATED_PUZZLES } from '../data/dailyPuzzles';
import { Puzzle, PlayerStats } from '../types';
import { MONTHS_METADATA, generateDayPuzzle, MAX_PUZZLES_PER_DAY } from '../utils/monthlyPuzzles';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPuzzle: (puzzle: Puzzle) => void;
  stats: PlayerStats;
  currentPuzzleId: string;
  initialTab?: 'months' | 'curated';
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  isOpen,
  onClose,
  onSelectPuzzle,
  stats,
  currentPuzzleId,
  initialTab = 'months'
}) => {
  const [activeTab, setActiveTab] = useState<'months' | 'curated'>(initialTab);
  const currentMonthIndex = new Date().getMonth() + 1; // 1 to 12
  const currentDayNumber = Math.min(28, new Date().getDate());

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthIndex);
  const [selectedDay, setSelectedDay] = useState<number>(currentDayNumber);
  const [puzzleNumber, setPuzzleNumber] = useState<number>(1);
  const [jumpInput, setJumpInput] = useState<string>('1');

  const activeMonthMeta = useMemo(() => {
    return MONTHS_METADATA.find(m => m.monthNumber === selectedMonth) || MONTHS_METADATA[0];
  }, [selectedMonth]);

  // Generate deterministic puzzle for (selectedMonth, selectedDay, puzzleNumber)
  const previewPuzzle = useMemo(() => {
    return generateDayPuzzle(selectedMonth, selectedDay, puzzleNumber);
  }, [selectedMonth, selectedDay, puzzleNumber]);

  if (!isOpen) return null;

  const handleStartPuzzle = (p: Puzzle) => {
    onSelectPuzzle(p);
    onClose();
  };

  const handlePrevPuzzle = () => {
    setPuzzleNumber(prev => {
      const next = prev <= 1 ? MAX_PUZZLES_PER_DAY : prev - 1;
      setJumpInput(String(next));
      return next;
    });
  };

  const handleNextPuzzle = () => {
    setPuzzleNumber(prev => {
      const next = prev >= MAX_PUZZLES_PER_DAY ? 1 : prev + 1;
      setJumpInput(String(next));
      return next;
    });
  };

  const handleRandomDayPuzzle = () => {
    const rnd = Math.floor(Math.random() * MAX_PUZZLES_PER_DAY) + 1;
    setPuzzleNumber(rnd);
    setJumpInput(String(rnd));
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= MAX_PUZZLES_PER_DAY) {
      setPuzzleNumber(num);
    } else {
      setJumpInput(String(puzzleNumber));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-2.5 sm:p-4 overflow-y-auto" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[94vh] flex flex-col p-4 sm:p-6 shadow-2xl relative text-right text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors z-10"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-3 border-b border-slate-800 pb-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>بنك ألغاز فترات السنة (أوفلاين)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                1,000 لغز / اليوم
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              ألغاز منظمة لكل فترة شهر، وبما يقارب ألف لغز لليوم الواحد (أكثر من 360,000 لغز أوفلاين)
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/70 border border-slate-800/80 rounded-2xl mb-3">
          <button
            onClick={() => setActiveTab('months')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'months'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>فترات أشهر السنة (1,000 لغز/يوم)</span>
          </button>

          <button
            onClick={() => setActiveTab('curated')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'curated'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>الألغاز اليومية السريعة</span>
          </button>
        </div>

        {/* TAB 1: MONTHLY PERIODS WITH 1000 PUZZLES/DAY */}
        {activeTab === 'months' ? (
          <div className="overflow-y-auto space-y-3.5 pr-1 flex-1">
            
            {/* 1. Months Period Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  <span>اختر فترة الشهر:</span>
                </span>
                <span className="text-[11px] font-medium text-amber-300/90 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/20">
                  12 فترة شهرية متكاملة
                </span>
              </div>

              {/* 12 Months Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {MONTHS_METADATA.map((month) => {
                  const isSelected = month.monthNumber === selectedMonth;
                  return (
                    <button
                      key={month.monthNumber}
                      onClick={() => {
                        setSelectedMonth(month.monthNumber);
                        // clamp selected day if exceeds month days
                        if (selectedDay > month.totalDays) {
                          setSelectedDay(month.totalDays);
                        }
                      }}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border flex flex-col items-center justify-center gap-0.5 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-b from-indigo-900/70 to-purple-900/60 border-indigo-400 text-white shadow-md'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-base">{month.icon}</span>
                      <span className="truncate text-[11px]">{month.nameArabic.split(' ')[0]} {month.nameArabic.split(' ')[1]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Days of Selected Month */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-300">
                  أيام {activeMonthMeta.nameArabic} ({activeMonthMeta.totalDays} يوماً):
                </span>
                <span className="text-[11px] text-indigo-400 font-semibold">
                  اليوم المحدد: اليوم {selectedDay}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1.5 bg-slate-950/60 rounded-xl border border-slate-800">
                {Array.from({ length: activeMonthMeta.totalDays }, (_, i) => i + 1).map((day) => {
                  const isSelected = day === selectedDay;
                  return (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDay(day);
                      }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Puzzle Number of the Day Controller (1 to 1000) */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-indigo-500/30 shadow-inner space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                  <Hash className="w-4 h-4 text-amber-400" />
                  <span>ألغاز اليوم {selectedDay}: اللغز رقم #{puzzleNumber}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (من أصل {MAX_PUZZLES_PER_DAY} لغز متاح اليوم)
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleRandomDayPuzzle}
                    className="py-1 px-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-colors"
                    title="اختر لغزاً عشوائياً في هذا اليوم"
                  >
                    <Dices className="w-3.5 h-3.5" />
                    <span>لغز عشوائي</span>
                  </button>
                </div>
              </div>

              {/* Navigation arrows & jump form */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPuzzle}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 border border-slate-700"
                  title="اللغز السابق"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>السابق</span>
                </button>

                {/* Direct Jump Input */}
                <form onSubmit={handleJumpSubmit} className="flex-1 flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max={MAX_PUZZLES_PER_DAY}
                    value={jumpInput}
                    onChange={(e) => setJumpInput(e.target.value)}
                    className="w-full py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-indigo-500 text-center text-xs font-bold text-white"
                    placeholder="رقم اللغز (1 - 1000)"
                  />
                  <button
                    type="submit"
                    className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold whitespace-nowrap transition-colors"
                  >
                    انتقال
                  </button>
                </form>

                <button
                  onClick={handleNextPuzzle}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 border border-slate-700"
                  title="اللغز التالي"
                >
                  <span>التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Jump Chips */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] text-slate-400">
                <span className="shrink-0 font-medium">انتقال سريع:</span>
                {[1, 50, 100, 250, 500, 750, 1000].map(num => (
                  <button
                    key={num}
                    onClick={() => {
                      setPuzzleNumber(num);
                      setJumpInput(String(num));
                    }}
                    className={`px-2 py-0.5 rounded-md border shrink-0 transition-colors ${
                      puzzleNumber === num
                        ? 'bg-indigo-600 text-white border-indigo-400 font-bold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                    }`}
                  >
                    #{num}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Puzzle Preview Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {previewPuzzle.categoryName}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-amber-300">
                      {previewPuzzle.difficultyName}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      لغز #{puzzleNumber} لليوم {selectedDay}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-white">
                    {previewPuzzle.title}
                  </h4>
                </div>

                <div className="text-2xl shrink-0 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {previewPuzzle.visualClue.split(' ')[0] || '🧠'}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
                {previewPuzzle.scenario || previewPuzzle.question}
              </p>

              {/* Action Button: Start Puzzle */}
              <button
                onClick={() => handleStartPuzzle(previewPuzzle)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-98"
              >
                <Play className="w-4 h-4 fill-current text-amber-300" />
                <span>العب هذا اللغز الآن (لغز #{puzzleNumber} في اليوم {selectedDay})</span>
              </button>
            </div>
          </div>
        ) : (
          /* TAB 2: CURATED DAILY PUZZLES */
          <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
            {CURATED_PUZZLES.map((puzzle, index) => {
              const isCurrent = puzzle.id === currentPuzzleId;
              const historyItem = stats.history[puzzle.id];
              const isSolved = historyItem?.solved;

              return (
                <div
                  key={puzzle.id}
                  onClick={() => handleStartPuzzle(puzzle)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isCurrent
                      ? "bg-indigo-950/40 border-indigo-500/60 shadow-md shadow-indigo-900/20"
                      : isSolved
                      ? "bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/30"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl shrink-0 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                      {puzzle.visualClue.split(' ')[0] || '🧩'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">#{index + 1}</span>
                        <h3 className="text-sm font-bold text-slate-100">{puzzle.title}</h3>
                        {isCurrent && (
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium border border-indigo-500/30">
                            الحالي
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {puzzle.categoryName} • {puzzle.difficultyName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isSolved ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>محلول</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-indigo-400 font-semibold bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>ابدأ</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
