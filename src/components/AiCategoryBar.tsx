import React from 'react';
import { Sparkles, RefreshCw, Layers } from 'lucide-react';
import { PUZZLE_CATEGORIES, CategoryOption } from '../utils/aiPuzzleEngine';
import { PuzzleCategory } from '../types';

interface AiCategoryBarProps {
  selectedCategory: PuzzleCategory | 'all';
  onSelectCategory: (cat: PuzzleCategory | 'all') => void;
  onGenerateNew: () => void;
  isGenerating: boolean;
  isDaily: boolean;
}

export const AiCategoryBar: React.FC<AiCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  onGenerateNew,
  isGenerating,
  isDaily
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-3 my-2 text-right">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-lg backdrop-blur-sm">
        {/* Header line */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>مولّد ألغاز الذكاء الاصطناعي اللانهائي</span>
            </span>
          </div>

          <button
            onClick={onGenerateNew}
            disabled={isGenerating}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-md shadow-purple-600/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            title="توليد لغز جديد وفريد تماماً"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'جاري التوليد...' : 'لغز جديد بالـ AI'}</span>
          </button>
        </div>

        {/* Scrollable category chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {PUZZLE_CATEGORIES.map((cat: CategoryOption) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (selectedCategory !== cat.id) {
                    onGenerateNew();
                  }
                }}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-medium transition-all text-xs cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25 border border-purple-400 font-bold'
                    : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/70'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
