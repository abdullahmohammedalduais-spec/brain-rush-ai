import React, { useState } from 'react';
import { Send, Lightbulb, CheckCircle2, XCircle, Share2, Sparkles, RefreshCw, HelpCircle } from 'lucide-react';
import { Puzzle } from '../types';

interface AnswerSectionProps {
  puzzle: Puzzle;
  onSubmitGuess: (guess: string) => boolean; // returns true if correct
  onOpenHintModal: () => void;
  onOpenShareModal: () => void;
  onRevealSolution: () => void;
  isSolved: boolean;
  isFailed: boolean;
  isRevealed?: boolean;
  attempts: string[];
  maxAttempts: number;
  unlockedHintsCount: number;
  onNextPuzzle?: () => void;
  isDaily: boolean;
}

export const AnswerSection: React.FC<AnswerSectionProps> = ({
  puzzle,
  onSubmitGuess,
  onOpenHintModal,
  onOpenShareModal,
  onRevealSolution,
  isSolved,
  isFailed,
  isRevealed = false,
  attempts,
  maxAttempts,
  unlockedHintsCount,
  onNextPuzzle,
  isDaily
}) => {
  const [inputVal, setInputVal] = useState('');
  const [shake, setShake] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showRevealModal, setShowRevealModal] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isSolved || isFailed) return;

    const correct = onSubmitGuess(inputVal);
    if (!correct) {
      setShake(true);
      setFeedback("إجابة غير صحيحة، حاول مجدداً أو اطلب تلميحاً!");
      setTimeout(() => setShake(false), 600);
    } else {
      setFeedback(null);
    }
    setInputVal('');
  };

  const isGameOver = isSolved || isFailed;

  return (
    <section aria-label="قسم الإجابة والتلميحات" className="w-full max-w-2xl mx-auto px-3 my-3 text-right">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        {/* If Game is still active */}
        {!isGameOver ? (
          <div>
            {/* Input form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="اكتب إجابتك هنا (مثال: الساعة، الظل...)"
                    dir="rtl"
                    className={`w-full bg-slate-950 border text-slate-100 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none transition-all placeholder:text-slate-500 font-medium ${
                      shake
                        ? 'border-rose-500 ring-2 ring-rose-500/20 animate-shake'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />
                  {inputVal.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setInputVal('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs p-1"
                    >
                      مسح
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-bold px-4 sm:px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/25 shrink-0 text-sm active:scale-95"
                >
                  <span>إرسال</span>
                  <Send className="w-4 h-4 rotate-180" />
                </button>
              </div>

              {/* Feedback text on wrong attempt */}
              {feedback && (
                <p className="text-xs text-rose-400 font-medium animate-in fade-in flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{feedback}</span>
                </p>
              )}
            </form>

            {/* Wrong attempts pills */}
            {attempts.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                <span className="text-[11px] text-slate-500">المحاولات السابقة:</span>
                {attempts.map((att, i) => (
                  <span
                    key={i}
                    className="bg-rose-950/40 text-rose-300 border border-rose-800/40 px-2 py-0.5 rounded-md line-through text-[11px]"
                  >
                    {att}
                  </span>
                ))}
              </div>
            )}

            {/* Rewarded Hint Action Button */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenHintModal}
                disabled={unlockedHintsCount >= puzzle.hints.length}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold py-3 px-4 rounded-xl transition-all text-xs sm:text-sm active:scale-98 shadow-sm"
              >
                <Lightbulb className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span>
                  {unlockedHintsCount >= puzzle.hints.length
                    ? "تم فتح جميع تلميحات هذا اللغز"
                    : `طلب تلميح ذكي / مشاهدة إعلان (متبقي ${puzzle.hints.length - unlockedHintsCount})`}
                </span>
              </button>
            </div>

            {/* Direct Solution Reveal Button */}
            <div className="mt-2.5 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setShowRevealModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 hover:from-indigo-900/80 hover:to-purple-900/80 active:scale-98 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 hover:text-white font-bold py-3 px-4 rounded-xl transition-all text-xs sm:text-sm shadow-sm"
              >
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>إذا لم تعرف الحل اضغط لمشاهدة حل سؤال اللغز</span>
              </button>
            </div>
          </div>
        ) : (
          /* Game Over State: Success, Revealed, or Failure Details */
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {isSolved ? (
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-1">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>إجابة صحيحة وذكية! أحسنت 🎯</span>
                </div>
                <p className="text-xs text-emerald-300/90">
                  الإجابة الصحيحة هي: <strong className="text-white text-sm">«{puzzle.answer}»</strong>
                </p>
              </div>
            ) : isRevealed ? (
              <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/70 border border-indigo-500/40 rounded-xl p-4 shadow-md">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-base mb-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  <span>حل سؤال اللغز والإجابة النموذجية الصحيحة:</span>
                </div>
                <div className="bg-slate-950/90 border border-indigo-500/30 rounded-xl p-3.5 my-2 text-center sm:text-right">
                  <span className="text-[11px] text-slate-400 block mb-1">الإجابة الصحيحة:</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide font-sans block">
                    «{puzzle.answer}»
                  </span>
                  {puzzle.synonyms && puzzle.synonyms.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
                      <span className="font-semibold text-slate-300">مرادفات مقبولة أيضاً:</span>
                      {puzzle.synonyms.map((syn, idx) => (
                        <span key={idx} className="bg-slate-800 text-indigo-200 px-2 py-0.5 rounded-md text-[11px]">
                          {syn}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base mb-1">
                  <XCircle className="w-5 h-5" />
                  <span>انتهت المحاولات! لكن لا بأس بالتعلم</span>
                </div>
                <p className="text-xs text-rose-300/90">
                  الإجابة الصحيحة كانت: <strong className="text-white text-sm">«{puzzle.answer}»</strong>
                </p>
                {puzzle.synonyms && puzzle.synonyms.length > 0 && (
                  <div className="mt-2 text-[11px] text-rose-200/70 flex flex-wrap items-center gap-1">
                    <span>إجابات مقبولة أيضاً:</span>
                    {puzzle.synonyms.map((syn, idx) => (
                      <span key={idx} className="bg-rose-900/40 text-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                        {syn}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Explanation box */}
            <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-bold text-indigo-400 block mb-1">💡 تفسير اللغز وفكرته:</span>
              {puzzle.explanation}
            </div>

            {/* Viral Social Share Promotion Banner */}
            <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
              <div>
                <p className="text-xs sm:text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                  <Share2 className="w-4 h-4 text-indigo-400" />
                  <span>تحدَّ أصدقاءك وانشر لغز اليوم!</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  انسخ نتيجتك أو شاركها مباشرة عبر واتساب وتليجرام لجذب منافسيك
                </p>
              </div>

              <button
                onClick={onOpenShareModal}
                className="shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-indigo-600/25 transition-all text-xs active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة التحدي مع الأصدقاء</span>
              </button>
            </div>

            {/* Action Buttons: Try Another Puzzle */}
            {onNextPuzzle && (
              <button
                onClick={onNextPuzzle}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold py-3 px-4 rounded-xl border border-slate-700 transition-all text-sm active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>بدء تحدي لغز ذكاء آخر بالـ AI</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Confirmation & Reveal Solution Modal */}
      {showRevealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-md w-full p-5 text-right shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  مشاهدة حل سؤال اللغز
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  إذا لم تتمكن من التوصل للحل، يمكنك مشاهدة الإجابة النموذجية
                </p>
              </div>
            </div>

            <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-200">
                السؤال: <span className="text-indigo-300">{puzzle.question}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                سيتم إظهار الإجابة الدقيقة مع المرادفات المقبولة والتفسير الكامل للغز لتتعلم كيف تم التوصل للحل.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowRevealModal(false);
                  onRevealSolution();
                }}
                className="w-full sm:flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
              >
                نعم، اعرض الإجابة والحل الكامل
              </button>
              <button
                type="button"
                onClick={() => setShowRevealModal(false)}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all"
              >
                المحاولة بنفسي
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
