import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Zap, ShieldCheck, Play, Flame } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('تهيئة الشبكة العصبية الذكية...');

  useEffect(() => {
    // Play a gentle welcome sound if audio is enabled
    try {
      playSound('unlock');
    } catch {
      // Audio context might be restricted before interaction
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(100, prev + step);

        if (next < 30) {
          setStatusText('تنشيط محرك الذكاء الاصطناعي 🧠...');
        } else if (next < 65) {
          setStatusText('تجهيز بنك التحديات والألغاز الذكية ⚡...');
        } else if (next < 90) {
          setStatusText('ضبط مستويات الصعوبة والتلميحات 🎯...');
        } else {
          setStatusText('اكتملت التهيئة! جاهز للانطلاق 🚀...');
        }

        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    playSound('correct');
    onFinish();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-gradient-to-b from-slate-950 via-[#070b19] to-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden select-none"
      dir="rtl"
    >
      {/* Background Animated Neon Glow Aura */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Sparkles & Cyber Grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
        
        {/* Animated 3D Holographic App Icon with Energy Halo */}
        <div className="relative mb-6 group cursor-pointer" onClick={handleStart}>
          {/* Pulsing Energy Rings */}
          <motion.div
            animate={{
              scale: [1, 1.22, 1],
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 blur-xl opacity-60"
          />

          <motion.div
            animate={{
              rotate: [0, -360],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-3xl border border-indigo-400/40 border-dashed"
          />

          {/* Holographic 3D Icon Container */}
          <motion.div
            animate={{
              y: [-6, 6, -6],
              rotateZ: [-1.5, 1.5, -1.5],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl p-1 bg-gradient-to-b from-indigo-400/50 via-purple-500/30 to-amber-400/50 shadow-[0_0_40px_rgba(99,102,241,0.5)] overflow-hidden"
          >
            <img
              src="/app-icon.jpg"
              alt="BrainRush AI Icon"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl shadow-inner brightness-105 contrast-110"
            />
            {/* Glossy sweep shine */}
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
            />
          </motion.div>

          {/* Floating Live Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-full shadow-lg border border-amber-300/80 flex items-center gap-1"
          >
            <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
            <span>AI 2026</span>
          </motion.div>
        </div>

        {/* Epic App Title & Typography */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-1 mb-5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-semibold shadow-inner mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>المنصة الأقوى لتحديات العقول</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-amber-300 drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
            BrainRush AI
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            تحدي الذكاء الخارق والألغاز اليومية اللانهائية
          </p>
        </motion.div>

        {/* Excitement Feature Tags */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap justify-center gap-1.5 mb-6 text-[11px] font-semibold text-slate-300"
        >
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 flex items-center gap-1 text-amber-300">
            <Zap className="w-3 h-3 text-amber-400" />
            توليد ذكاء اصطناعي فوري
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 flex items-center gap-1 text-indigo-300">
            <Brain className="w-3 h-3 text-indigo-400" />
            تحديات ذكاء متجددة
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 flex items-center gap-1 text-emerald-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            تفكير واستنتاج منطقي
          </span>
        </motion.div>

        {/* Interactive Progress Bar & Status Text */}
        <div className="w-full space-y-2 mb-6">
          <div className="flex justify-between items-center text-xs font-semibold px-1">
            <span className="text-indigo-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              {statusText}
            </span>
            <span className="text-amber-400 font-mono font-bold">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-slate-900 rounded-full border border-indigo-950 p-0.5 overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleStart}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 ${
            progress >= 100
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 text-white shadow-indigo-500/30 hover:shadow-indigo-500/50 border border-amber-400/40 animate-pulse'
              : 'bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-400/30'
          }`}
        >
          <Play className="w-4 h-4 fill-current text-amber-300" />
          <span>{progress >= 100 ? 'ابدأ التحدي الآن وانطلق!' : 'تخطي والدخول للعبة مباشرة'}</span>
        </motion.button>
      </div>

      {/* Bottom version & badge */}
      <div className="absolute bottom-4 text-center text-[10px] text-slate-500 font-medium">
        BrainRush AI Engine • Powered by Antigravity & Gemini
      </div>
    </motion.div>
  );
};
