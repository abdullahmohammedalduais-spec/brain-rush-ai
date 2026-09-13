import React, { useState, useEffect } from 'react';
import { Lightbulb, Play, CheckCircle, Sparkles, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Puzzle } from '../types';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzle: Puzzle;
  currentHintIndex: number; // 0, 1, or 2
  onUnlockHint: (hintText: string) => void;
  currentGuess?: string;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  puzzle,
  currentHintIndex,
  onUnlockHint,
  currentGuess = ""
}) => {
  const [adState, setAdState] = useState<'idle' | 'watching' | 'completed'>('idle');
  const [countdown, setCountdown] = useState<number>(5);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setAdState('idle');
      setCountdown(5);
    }
  }, [isOpen, currentHintIndex]);

  useEffect(() => {
    let timer: any;
    if (adState === 'watching' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (adState === 'watching' && countdown === 0) {
      setAdState('completed');
    }
    return () => clearTimeout(timer);
  }, [adState, countdown]);

  if (!isOpen) return null;

  const hintLabels = [
    { title: "تلميح فكري أولي", desc: "توجيه ذكي لطريقة التفكير الصحيحة دون حرق الإجابة" },
    { title: "كشف أسرار الحروف", desc: "كشف أول حرف وعدد حروف الإجابة الصحيحة" },
    { title: "تلميح الذكاء الاصطناعي الحاسم", desc: "تحليل ذكي شبه مباشر يوضح لغز الموقف" }
  ];

  const currentHintInfo = hintLabels[currentHintIndex] || hintLabels[0];

  const handleStartWatchAd = () => {
    setAdState('watching');
    setCountdown(5);
  };

  const handleClaimHint = async () => {
    // Check if we can fetch AI-enhanced hint or use the predefined hint
    let finalHint = puzzle.hints[currentHintIndex] || "فكر خارج الصندوق!";

    // For the 3rd hint or if user has tried guesses, attempt to enrich with AI
    if (currentHintIndex === 2 || currentGuess) {
      try {
        setLoadingAi(true);
        const res = await fetch("/api/ai-hint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            puzzleTitle: puzzle.title,
            scenario: puzzle.scenario,
            currentGuess: currentGuess,
            hintTier: currentHintIndex + 1
          })
        });
        const data = await res.json();
        if (data.success && data.hint) {
          finalHint = data.hint;
        }
      } catch (e) {
        // Fallback to static hint
      } finally {
        setLoadingAi(false);
      }
    }

    onUnlockHint(finalHint);
    onClose();
  };

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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">فتح تلميح الذكاء الاصطناعي</h2>
            <p className="text-xs text-slate-400">{currentHintInfo.title} (مستوى {currentHintIndex + 1} من 3)</p>
          </div>
        </div>

        {adState === 'idle' && (
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <p className="text-sm text-slate-300 mb-2 leading-relaxed">
                هل تشعر بالحيرة؟ يمكنك فتح <span className="text-amber-400 font-bold">{currentHintInfo.title}</span> فوراً بمشاهدة إعلان قصير لدعم استمرار اللعبة مجاناً.
              </p>
              <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/40">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{currentHintInfo.desc}</span>
              </div>
            </div>

            {/* Clean Sponsor Spot */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-300 font-medium">مكافأة مشاهدة إعلان قصير</span>
              </div>
              <span className="text-indigo-400 font-semibold text-[11px]">مساعدة الذكاء الاصطناعي</span>
            </div>

            <button
              onClick={handleStartWatchAd}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-98 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>مشاهدة إعلان سريع لفتح التلميح (5 ثوانٍ)</span>
            </button>
          </div>
        )}

        {adState === 'watching' && (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-amber-400 transition-all duration-1000"
                style={{
                  clipPath: `polygon(50% 50%, 0 0, ${100 - (5 - countdown) * 20}% 0, 100% 100%, 0 100%)`
                }}
              ></div>
              <span className="text-3xl font-black text-amber-400 font-mono">{countdown}</span>
            </div>

            <div>
              <h3 className="font-bold text-white text-base">جاري تشغيل الإعلان التفاعلي...</h3>
              <p className="text-xs text-slate-400 mt-1">
                شكراً لدعمك للعبة! سيتم فتح التلميح تلقائياً بمجرد انتهاء العداد.
              </p>
            </div>

            {/* Partner Sponsor Banner in Rewarded Window */}
            <div className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between text-[11px] text-slate-500 mb-2">
                <span>إعلان ممول داخل اللعبة</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  جاري احتساب المكافأة
                </span>
              </div>
              
              {/* Sandboxed Adsterra Banner Container */}
              <div className="w-[320px] h-[50px] bg-slate-900/90 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center mx-auto">
                <iframe
                  width="320"
                  height="50"
                  title="إعلان مكافأة"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  srcDoc={`<!DOCTYPE html><html><head><meta charset="UTF-8"><base target="_blank"><style>body{margin:0;padding:0;display:flex;align-items:center;justify-content:center;background:transparent;overflow:hidden;}</style></head><body><script type="text/javascript">atOptions={'key':'cb538daa0dbcfa1519a78b30f3cd09b1','format':'iframe','height':50,'width':320,'params':{}};</script><script type="text/javascript" src="https://www.highrevenueformat.com/cb538daa0dbcfa1519a78b30f3cd09b1/invoke.js"></script></body></html>`}
                />
              </div>

              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-1000"
                  style={{ width: `${(5 - countdown) * 20}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {adState === 'completed' && (
          <div className="py-4 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">اكتملت المشاهدة بنجاح!</h3>
              <p className="text-xs text-slate-400 mt-1">
                تم فتح تلميح الذكاء الاصطناعي، يمكنك الآن قراءته ومواصلة التحدي.
              </p>
            </div>

            <button
              onClick={handleClaimHint}
              disabled={loadingAi}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>{loadingAi ? "جاري استحضار التلميح..." : "عرض التلميح الآن"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
