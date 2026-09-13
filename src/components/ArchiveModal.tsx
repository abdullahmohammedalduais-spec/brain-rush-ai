import React from 'react';
import { Calendar, CheckCircle, Circle, Play, X, Lock, Sparkles } from 'lucide-react';
import { CURATED_PUZZLES } from '../data/dailyPuzzles';
import { Puzzle, PlayerStats } from '../types';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPuzzle: (puzzle: Puzzle) => void;
  stats: PlayerStats;
  currentPuzzleId: string;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  isOpen,
  onClose,
  onSelectPuzzle,
  stats,
  currentPuzzleId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col p-6 shadow-2xl relative text-right text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">أرشيف الألغاز والتحديات</h2>
            <p className="text-xs text-slate-400">العب ألغاز الأيام السابقة واختبر ذكاءك في أي وقت</p>
          </div>
        </div>

        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
          {CURATED_PUZZLES.map((puzzle, index) => {
            const isCurrent = puzzle.id === currentPuzzleId;
            const historyItem = stats.history[puzzle.id];
            const isSolved = historyItem?.solved;

            return (
              <div
                key={puzzle.id}
                onClick={() => {
                  onSelectPuzzle(puzzle);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isCurrent
                    ? "bg-indigo-950/40 border-indigo-500/60 shadow-md shadow-indigo-900/20"
                    : isSolved
                    ? "bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/30"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl shrink-0">
                    {puzzle.visualClue.split(' ')[0] || '🧩'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">#{index + 1}</span>
                      <h3 className="text-sm font-bold text-slate-100">{puzzle.title}</h3>
                      {isCurrent && (
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">
                          الحالي
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {puzzle.categoryName} • {puzzle.difficultyName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
};
