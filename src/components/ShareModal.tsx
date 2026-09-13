import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Send, Twitter, Trophy, Flame, Sparkles, X } from 'lucide-react';
import { Puzzle, PlayerStats } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  puzzle: Puzzle;
  attemptsCount: number;
  maxAttempts: number;
  hintsUsed: number;
  isWon: boolean;
  stats: PlayerStats;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  puzzle,
  attemptsCount,
  maxAttempts,
  hintsUsed,
  isWon,
  stats
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  
  // Build Wordle-like grid representation
  const generateGrid = () => {
    let grid = '';
    for (let i = 0; i < maxAttempts; i++) {
      if (i < attemptsCount - 1) {
        grid += '🟥 ';
      } else if (i === attemptsCount - 1 && isWon) {
        grid += '🟩 ';
      } else {
        grid += '⬜ ';
      }
    }
    return grid.trim();
  };

  const gridText = generateGrid();
  const dayLabel = puzzle.dayNumber ? `#${puzzle.dayNumber}` : 'تحدي الذكاء';
  
  const shareText = isWon
    ? `🧠 تحدي BrainRush AI ${dayLabel}
🎉 تم حل اللغز بنجاح (${attemptsCount}/${maxAttempts})!
${gridText}
💡 التلميحات: ${hintsUsed}
🔥 سلسلتي اليومية: ${stats.currentStreak} أيام متتالية!

هل يمكنك التفوق عليّ وحل لغز اليوم؟ جرب مجاناً الآن 👇
${currentUrl}`
    : `🧩 تحدي BrainRush AI ${dayLabel}
واجهت لغزاً ذكياً ومثيراً! هل تستطيع أنت حله واختبار سرعة بديهتك؟ 💡
${currentUrl}`;

  const handleCopy = async () => {
    try {
      if (typeof window !== 'undefined') {
        window.focus();
      }

      let success = false;

      // Try modern Async Clipboard API first if permitted and document has focus
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function' &&
        typeof document !== 'undefined' &&
        document.hasFocus &&
        document.hasFocus()
      ) {
        try {
          await navigator.clipboard.writeText(shareText);
          success = true;
        } catch {
          // Document focus or permission issue, proceed to textarea fallback
        }
      }

      // Fallback for iframes or when document focus is restricted
      if (!success && typeof document !== 'undefined') {
        try {
          const textArea = document.createElement('textarea');
          textArea.value = shareText;
          textArea.style.position = 'fixed';
          textArea.style.top = '-9999px';
          textArea.style.left = '-9999px';
          textArea.style.opacity = '0';
          textArea.setAttribute('readonly', '');
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          textArea.setSelectionRange(0, shareText.length);
          success = document.execCommand('copy');
          document.body.removeChild(textArea);
        } catch {
          success = false;
        }
      }

      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.warn("Clipboard copy handled gracefully:", e);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: "BrainRush AI - تحدي الذكاء والألغاز اليومية",
          text: shareText,
          url: currentUrl
        });
      } catch (err: any) {
        // If user cancelled the share dialog or dismissed it, do not fall back to copy
        if (err && err.name === 'AbortError') {
          return;
        }
        await handleCopy();
      }
    } else {
      await handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;

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

        <div className="text-center mb-5">
          <div className="relative inline-block mx-auto mb-3">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-500 rounded-2xl blur-xs opacity-80 animate-glow"></div>
            <img
              src="/app-icon.jpg"
              alt="BrainRush AI"
              referrerPolicy="no-referrer"
              className="relative w-16 h-16 rounded-2xl object-cover shadow-xl border-2 border-indigo-400/50"
            />
            {isWon && (
              <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-lg">
                <Trophy className="w-4 h-4 fill-current" />
              </span>
            )}
          </div>
          <h2 className="text-xl font-black text-white">
            {isWon ? "رائع! أحسنت صنعاً يا بطل 👏" : "محاولة رائعة! التحدي القادم بانتظارك"}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            شارك نتيجتك مع أصدقائك وتحدّهم لمعرفة من هو الأسرع ذكاءً!
          </p>
        </div>

        {/* Share preview box */}
        <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 border-b border-slate-800 pb-2">
            <span className="font-semibold text-indigo-400">بطاقة النتيجة للمشاركة:</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{stats.currentStreak} أيام</span>
            </div>
          </div>
          <pre className="text-xs font-sans text-slate-300 whitespace-pre-wrap leading-relaxed text-right">
            {shareText}
          </pre>
        </div>

        {/* Quick Social Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-4 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold py-2.5 px-2 rounded-xl transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>واتساب</span>
            </a>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-bold py-2.5 px-2 rounded-xl transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>تليجرام</span>
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold py-2.5 px-2 rounded-xl transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>فيسبوك</span>
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold py-2.5 px-2 rounded-xl transition-all border border-slate-700"
            >
              <Twitter className="w-4 h-4 fill-current" />
              <span>منصة X</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold py-3 px-4 rounded-xl border border-slate-700 transition-all active:scale-98"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "تم النسخ بنجاح!" : "نسخ رابط التحدي"}</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-98"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة مع الأصدقاء</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
