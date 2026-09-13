import React, { useState, useEffect, useRef } from 'react';
import {
  Lightbulb,
  Play,
  CheckCircle,
  Sparkles,
  X,
  ShieldCheck,
  Tv,
  Check
} from 'lucide-react';
import { Puzzle } from '../types';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzle: Puzzle;
  currentHintIndex: number;
  onUnlockHint: (hintText: string) => void;
  currentGuess?: string;
  customTitle?: string;
  customRewardDescription?: string;
  onRewardClaimed?: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  puzzle,
  currentHintIndex,
  onUnlockHint,
  currentGuess = "",
  customTitle,
  customRewardDescription,
  onRewardClaimed
}) => {
  const [adState, setAdState] = useState<'idle' | 'watching' | 'completed'>('idle');
  const [countdown, setCountdown] = useState<number>(5);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const adIframeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setAdState('idle');
      setCountdown(5);
    }
  }, [isOpen, currentHintIndex]);

  // Handle countdown during 'watching' state
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

  // Mount real commercial Adsterra iframe when state switches to 'watching'
  useEffect(() => {
    if (adState === 'watching' && adIframeContainerRef.current) {
      try {
        const iframe = document.createElement('iframe');
        iframe.width = '320';
        iframe.height = '50';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'no';
        iframe.title = 'إعلان مكافأة تجاري معتمد';
        iframe.srcdoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <base target="_blank">
    <style>
      body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; background: #020617; overflow: hidden; }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : 'cb538daa0dbcfa1519a78b30f3cd09b1',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://www.highrevenueformat.com/cb538daa0dbcfa1519a78b30f3cd09b1/invoke.js"></script>
  </body>
</html>`;
        adIframeContainerRef.current.innerHTML = '';
        adIframeContainerRef.current.appendChild(iframe);
      } catch (e) {
        console.warn('Adsterra rewarded ad mount exception:', e);
      }
    }
  }, [adState]);

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

    // Trigger Monetag Zone 11787291 real ad interaction
    try {
      if (typeof (window as any).show_11787291 === 'function') {
        const adPromise = (window as any).show_11787291();
        if (adPromise && typeof adPromise.then === 'function') {
          adPromise
            .then(() => {
              setAdState('completed');
            })
            .catch(() => {
              // Countdown continues normally
            });
        }
      }
    } catch (e) {
      console.log('Monetag session trigger:', e);
    }
  };

  const handleClaimReward = async () => {
    if (onRewardClaimed) {
      onRewardClaimed();
      onClose();
      return;
    }

    let finalHint = puzzle.hints[currentHintIndex] || "فكر خارج الصندوق!";

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
      } catch {
        // Fallback to pre-curated hint
      } finally {
        setLoadingAi(false);
      }
    }

    onUnlockHint(finalHint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative text-right text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {customTitle || "طلب مكافأة إعلان تجاري"}
            </h2>
            <p className="text-xs text-slate-400">
              {customRewardDescription || `${currentHintInfo.title} (مستوى ${currentHintIndex + 1} من 3)`}
            </p>
          </div>
        </div>

        {/* STATE 1: IDLE */}
        {adState === 'idle' && (
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800">
              <p className="text-xs sm:text-sm text-slate-300 mb-2 leading-relaxed">
                شاهد إعلاناً تجارياً سريعاً (5 ثوانٍ فقط) لفتح المكافأة واستكمال التحدي فوراً:
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/30">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  {customRewardDescription || `${currentHintInfo.title}: ${currentHintInfo.desc}`}
                </span>
              </div>
            </div>

            {/* Verified Ad Network Info */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300 font-medium text-[11px] sm:text-xs">
                  إعلانات تجارية موثقة ومعتمدة
                </span>
              </div>
              <span className="text-indigo-400 font-bold text-[10px] bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                Adsterra & Monetag
              </span>
            </div>

            <button
              onClick={handleStartWatchAd}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 active:scale-98 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>مشاهدة الإعلان لكسب المكافأة (5 ثوانٍ)</span>
            </button>
          </div>
        )}

        {/* STATE 2: WATCHING (REAL COMMERCIAL AD DISPLAY) */}
        {adState === 'watching' && (
          <div className="py-2 flex flex-col items-center justify-center text-center space-y-3.5">
            {/* Countdown Badge */}
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-slate-800"></div>
                <div
                  className="absolute inset-0 rounded-full border-2 border-amber-400 transition-all duration-1000"
                  style={{
                    clipPath: `polygon(50% 50%, 0 0, ${100 - (5 - countdown) * 20}% 0, 100% 100%, 0 100%)`
                  }}
                ></div>
                <span className="text-xl font-black text-amber-400 font-mono">{countdown}</span>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span>جاري عرض الإعلان التجاري...</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  سيتم احتساب المكافأة وفتحها تلقائياً بعد انتهاء العداد
                </p>
              </div>
            </div>

            {/* Real Commercial Ad Banner Display (320x50) */}
            <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center shadow-inner">
              <div className="w-full flex items-center justify-between text-[10px] text-slate-400 mb-2">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>إعلان تجاري معتمد (320x50)</span>
                </span>
                <span className="text-amber-400 flex items-center gap-1 font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                  {countdown} ثانية
                </span>
              </div>

              {/* Adsterra Real Iframe Mount Container */}
              <div 
                ref={adIframeContainerRef}
                className="w-[320px] h-[50px] bg-slate-950 rounded-lg overflow-hidden border border-slate-800/90 flex items-center justify-center shadow-md my-1"
              >
                <div className="text-[11px] text-slate-500 animate-pulse">جاري تحميل الإعلان التجاري...</div>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 bg-slate-800/80 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-1000"
                  style={{ width: `${(5 - countdown) * 20}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>إعلان شبكة تجارية موثقة بدون أي توجيه مزعج</span>
            </div>
          </div>
        )}

        {/* STATE 3: COMPLETED */}
        {adState === 'completed' && (
          <div className="py-3 text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">اكتملت المشاهدة بنجاح! 🎉</h3>
              <p className="text-xs text-slate-400 mt-1">
                تم تسجيل مشاهدة الإعلان، يمكنك الآن استلام المكافأة ومتابعة التحدي.
              </p>
            </div>

            <button
              onClick={handleClaimReward}
              disabled={loadingAi}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loadingAi ? "جاري استحضار النتيجة..." : "استلام المكافأة الآن"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
