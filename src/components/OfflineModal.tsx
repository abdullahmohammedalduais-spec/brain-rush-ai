import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, RefreshCw, Sparkles, CheckCircle2, Zap, BrainCircuit, ArrowLeft, Calendar, Layers } from 'lucide-react';
import { playSound } from '../utils/audio';

interface OfflineModalProps {
  onDismissToCurrentPuzzle?: () => void;
  onOpenMonthlyVault?: () => void;
}

export const OfflineModal: React.FC<OfflineModalProps> = ({ onDismissToCurrentPuzzle, onOpenMonthlyVault }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isChecking, setIsChecking] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [reconnectedToast, setReconnectedToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setIsDismissed(false);
      setReconnectedToast(true);
      playSound('unlock');
      setTimeout(() => {
        setReconnectedToast(false);
      }, 4000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setIsDismissed(false);
      playSound('wrong');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleManualCheck = async () => {
    setIsChecking(true);
    try {
      // Test real network connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch('/api/health', {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        setIsOffline(false);
        setIsDismissed(false);
        setReconnectedToast(true);
        playSound('correct');
        setTimeout(() => setReconnectedToast(false), 4000);
      } else {
        playSound('wrong');
      }
    } catch {
      setIsOffline(true);
      playSound('wrong');
    } finally {
      setIsChecking(false);
    }
  };

  const handleContinueWithCached = () => {
    setIsDismissed(true);
    if (onDismissToCurrentPuzzle) {
      onDismissToCurrentPuzzle();
    }
  };

  return (
    <>
      {/* Reconnected Green Banner Toast */}
      <AnimatePresence>
        {reconnectedToast && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[10001] bg-emerald-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-2xl border border-emerald-400/50 flex items-center gap-2.5"
            dir="rtl"
          >
            <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
            <span>🎉 تم استعادة الاتصال بالإنترنت بنجاح! محرك الذكاء الاصطناعي متصل وجاهز.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Offline Pill if user dismissed the modal to view the current puzzle */}
      {isOffline && isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-2 left-1/2 -translate-x-1/2 z-40 bg-amber-950/90 backdrop-blur-md text-amber-200 text-[11px] font-bold px-3 py-1.5 rounded-full border border-amber-500/40 shadow-lg flex items-center gap-2 cursor-pointer hover:bg-amber-900 transition-colors"
          onClick={() => setIsDismissed(false)}
          dir="rtl"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
          <span>أنت في وضع عدم الاتصال • اضغط لإعادة الاتصال</span>
        </motion.div>
      )}

      {/* Full Holographic Offline Screen / Modal */}
      <AnimatePresence>
        {isOffline && !isDismissed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
            dir="rtl"
          >
            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center flex flex-col items-center overflow-hidden"
            >
              {/* Glowing Disconnect Badge Top */}
              <div className="relative mb-4 group">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -inset-3 rounded-full bg-rose-500/30 blur-lg"
                />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400 shadow-inner">
                  <WifiOff className="w-7 h-7 stroke-[2.2] animate-pulse" />
                </div>
              </div>

              {/* 3D Cyber Neural Disconnect Artwork */}
              <div className="relative w-full max-w-[240px] aspect-square rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.3)] mb-4 bg-slate-950">
                <img
                  src="/offline-art.jpg"
                  alt="انقطاع الإنترنت - BrainRush AI"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-2 inset-x-2 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-amber-300 flex items-center justify-center gap-1">
                  <BrainCircuit className="w-3 h-3 text-indigo-400" />
                  <span>محرك الذكاء الاصطناعي في انتظار الاتصال</span>
                </div>
              </div>

              {/* Requested User Catchphrase & Message */}
              <div className="space-y-2 mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-300">
                  انقطع اتصالك بالإنترنت! 📶
                </h2>

                <div className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30">
                  <p className="text-amber-300 font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>وصل النت واستمتع بالتحديات عبر الذكاء الاصطناعي!</span>
                  </p>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed px-2">
                  عند توفر اتصال بالإنترنت يمكنك توليد ألغاز الذكاء الاصطناعي وتقييم الإجابات المتقدمة، أو يمكنك الاستمتاع ببنك ألغاز أشهر السنة أوفلاين بدون نت.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-2.5">
                {onOpenMonthlyVault && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsDismissed(true);
                      onOpenMonthlyVault();
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 border border-emerald-400/40 flex items-center justify-center gap-2 transition-all"
                  >
                    <Layers className="w-4 h-4 text-emerald-200" />
                    <span>تصفح بنك ألغاز كل شهر (بدون نت)</span>
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleManualCheck}
                  disabled={isChecking}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md border border-indigo-400/40 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
                  <span>{isChecking ? 'جاري فحص الاتصال...' : 'إعادة فحص الاتصال بالإنترنت'}</span>
                </motion.button>

                <button
                  onClick={handleContinueWithCached}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>متابعة حل اللغز الحالي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
