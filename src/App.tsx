import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BannerAd } from './components/BannerAd';
import { PuzzleCard } from './components/PuzzleCard';
import { AnswerSection } from './components/AnswerSection';
import { HintModal } from './components/HintModal';
import { ShareModal } from './components/ShareModal';
import { StatsModal } from './components/StatsModal';
import { ArchiveModal } from './components/ArchiveModal';
import { AiCategoryBar } from './components/AiCategoryBar';
import { getDailyPuzzleForDate, CURATED_PUZZLES } from './data/dailyPuzzles';
import { Puzzle, PlayerStats, PuzzleCategory } from './types';
import { fetchNewAiPuzzle } from './utils/aiPuzzleEngine';
import { isAnswerCorrect } from './utils/arabic';
import { playSound } from './utils/audio';
import { Sparkles, Brain, Trophy, Share2 } from 'lucide-react';

const BASE_MAX_ATTEMPTS = 5;
const STATS_STORAGE_KEY = 'ai_puzzle_stats_v2';
const PROGRESS_STORAGE_KEY = 'ai_puzzle_progress_v2';

const INITIAL_STATS: PlayerStats = {
  played: 0,
  won: 0,
  currentStreak: 0,
  maxStreak: 0,
  hintsUsed: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  },
  history: {}
};

export default function App() {
  // Today's official daily puzzle
  const todayPuzzle = useMemo(() => getDailyPuzzleForDate(new Date()), []);

  // Multi-question navigation queue
  const [puzzlesQueue, setPuzzlesQueue] = useState<Puzzle[]>([todayPuzzle]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState<number>(0);

  const currentPuzzle = puzzlesQueue[currentQueueIndex] || todayPuzzle;
  const [isDaily, setIsDaily] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<PuzzleCategory | 'all'>('all');

  // Gameplay state
  const [attempts, setAttempts] = useState<string[]>([]);
  const [unlockedHints, setUnlockedHints] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [extraAttempts, setExtraAttempts] = useState<number>(0);

  const effectiveMaxAttempts = BASE_MAX_ATTEMPTS + extraAttempts;

  // Player Stats
  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STATS;
    } catch (e) {
      return INITIAL_STATS;
    }
  });

  // Modals
  const [rewardModalState, setRewardModalState] = useState<{
    isOpen: boolean;
    type: 'hint' | 'reveal' | 'extraAttempts';
    title?: string;
    desc?: string;
  }>({
    isOpen: false,
    type: 'hint'
  });

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);

  // AI Generation
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist stats to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
  }, [stats]);

  // Load / Restore progress for current puzzle
  useEffect(() => {
    if (!currentPuzzle?.id) return;
    try {
      const allProgress = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) || '{}');
      const puzzleProg = allProgress[currentPuzzle.id];
      if (puzzleProg) {
        setAttempts(puzzleProg.attempts || []);
        setUnlockedHints(puzzleProg.unlockedHints || []);
        setIsSolved(puzzleProg.isSolved || false);
        setIsFailed(puzzleProg.isFailed || false);
        setIsRevealed(puzzleProg.isRevealed || false);
        setExtraAttempts(puzzleProg.extraAttempts || 0);
      } else {
        setAttempts([]);
        setUnlockedHints([]);
        setIsSolved(false);
        setIsFailed(false);
        setIsRevealed(false);
        setExtraAttempts(0);
      }
    } catch (e) {
      setAttempts([]);
      setUnlockedHints([]);
      setIsSolved(false);
      setIsFailed(false);
      setIsRevealed(false);
      setExtraAttempts(0);
    }
  }, [currentPuzzle?.id]);

  // Save progress for current puzzle
  const savePuzzleProgress = (
    newAttempts: string[],
    newHints: string[],
    solved: boolean,
    failed: boolean,
    revealed: boolean = false,
    addedExtraAttempts: number = extraAttempts
  ) => {
    if (!currentPuzzle?.id) return;
    try {
      const allProgress = JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) || '{}');
      allProgress[currentPuzzle.id] = {
        attempts: newAttempts,
        unlockedHints: newHints,
        isSolved: solved,
        isFailed: failed,
        isRevealed: revealed,
        extraAttempts: addedExtraAttempts,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(allProgress));
    } catch (e) {
      console.error(e);
    }
  };

  // Reveal solution when user requests it
  const handleRevealSolution = () => {
    if (isSolved) return;
    setIsFailed(true);
    setIsRevealed(true);
    savePuzzleProgress(attempts, unlockedHints, false, true, true);
    recordGameResult(false, attempts.length);
    showToast("تم إظهار حل اللغز والإجابة النموذجية بنجاح");
  };

  // Handle guess submission
  const handleSubmitGuess = (guessText: string): boolean => {
    if (isSolved || isFailed) return false;

    const trimmed = guessText.trim();
    if (!trimmed) return false;

    const correct = isAnswerCorrect(trimmed, currentPuzzle.answer, currentPuzzle.synonyms);
    const newAttempts = [...attempts, trimmed];
    setAttempts(newAttempts);

    if (correct) {
      setIsSolved(true);
      playSound('correct');
      savePuzzleProgress(newAttempts, unlockedHints, true, false);
      recordGameResult(true, newAttempts.length);
      // Auto open share modal on win after brief moment
      setTimeout(() => setShareModalOpen(true), 1200);
      return true;
    } else {
      playSound('wrong');
      if (newAttempts.length >= effectiveMaxAttempts) {
        setIsFailed(true);
        savePuzzleProgress(newAttempts, unlockedHints, false, true);
        recordGameResult(false, newAttempts.length);
      } else {
        savePuzzleProgress(newAttempts, unlockedHints, false, false);
      }
      return false;
    }
  };

  // Record stats
  const recordGameResult = (won: boolean, attemptsCount: number) => {
    setStats((prev) => {
      const todayStr = new Date().toISOString().split('T')[0];
      const isNewPlay = !prev.history[currentPuzzle.id];

      // Calculate streak
      let newStreak = prev.currentStreak;
      if (isDaily && isNewPlay) {
        if (won) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (prev.lastPlayedDate === yesterdayStr) {
            newStreak += 1;
          } else if (prev.lastPlayedDate === todayStr) {
            // Already played today
          } else {
            newStreak = 1;
          }
        } else {
          newStreak = 0;
        }
      }

      const guessNum = Math.min(6, Math.max(1, attemptsCount)) as 1 | 2 | 3 | 4 | 5 | 6;
      const newDistribution = { ...prev.guessDistribution };
      if (won) {
        newDistribution[guessNum] = (newDistribution[guessNum] || 0) + 1;
      }

      return {
        played: isNewPlay ? prev.played + 1 : prev.played,
        won: won && isNewPlay ? prev.won + 1 : prev.won,
        currentStreak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        hintsUsed: prev.hintsUsed + unlockedHints.length,
        guessDistribution: newDistribution,
        lastPlayedDate: todayStr,
        history: {
          ...prev.history,
          [currentPuzzle.id]: {
            solved: won,
            attempts: attemptsCount,
            hintsUsed: unlockedHints.length,
            date: todayStr
          }
        }
      };
    });
  };

  // Unlock hint callback
  const handleUnlockHint = (hintText: string) => {
    if (!unlockedHints.includes(hintText)) {
      const newHints = [...unlockedHints, hintText];
      setUnlockedHints(newHints);
      savePuzzleProgress(attempts, newHints, isSolved, isFailed);
      playSound('unlock');
      showToast("🎁 تم فتح تلميح الذكاء الاصطناعي بنجاح!");
    }
  };

  // Reward claim router
  const handleClaimReward = () => {
    if (rewardModalState.type === 'reveal') {
      handleRevealSolution();
    } else if (rewardModalState.type === 'extraAttempts') {
      const updated = extraAttempts + 2;
      setExtraAttempts(updated);
      setIsFailed(false);
      savePuzzleProgress(attempts, unlockedHints, false, false, false, updated);
      playSound('unlock');
      showToast("🎉 حصلت على محاولتين إضافيتين! استمر في المحاولة");
    }
  };

  // Navigation Arrows: Next Question (⬅️)
  const handleNextQuestion = async () => {
    if (currentQueueIndex < puzzlesQueue.length - 1) {
      const nextIdx = currentQueueIndex + 1;
      setCurrentQueueIndex(nextIdx);
      setIsDaily(nextIdx === 0);
    } else {
      // Generate next AI question and append to queue
      setIsGeneratingAi(true);
      showToast("جاري توليد السؤال التالي بالذكاء الاصطناعي...");

      try {
        const newPuzzle = await fetchNewAiPuzzle(selectedCategory, 'medium');
        setPuzzlesQueue((prev) => [...prev, newPuzzle]);
        setCurrentQueueIndex((prev) => prev + 1);
        setIsDaily(false);
        showToast("✨ تم الانتقال إلى السؤال التالي!");
      } catch (e) {
        const nextIndex = Math.floor(Math.random() * CURATED_PUZZLES.length);
        const fallbackPuz: Puzzle = {
          ...CURATED_PUZZLES[nextIndex],
          id: `ai_${Date.now()}`,
          isAiGenerated: true
        };
        setPuzzlesQueue((prev) => [...prev, fallbackPuz]);
        setCurrentQueueIndex((prev) => prev + 1);
        setIsDaily(false);
      } finally {
        setIsGeneratingAi(false);
      }
    }
  };

  // Navigation Arrows: Previous Question (➡️)
  const handlePrevQuestion = () => {
    if (currentQueueIndex > 0) {
      const prevIdx = currentQueueIndex - 1;
      setCurrentQueueIndex(prevIdx);
      setIsDaily(prevIdx === 0);
    }
  };

  // Generate new AI puzzle (supporting dynamic categories & seeds)
  const handleGenerateAiPuzzle = async (overrideCategory?: PuzzleCategory | 'all') => {
    const catToUse = overrideCategory || selectedCategory;
    setIsGeneratingAi(true);
    showToast("جاري ابتكار سؤال ذكاء اصطناعي جديد ومتغير...");

    try {
      const newPuzzle = await fetchNewAiPuzzle(catToUse, 'medium');
      setPuzzlesQueue((prev) => [...prev, newPuzzle]);
      setCurrentQueueIndex(puzzlesQueue.length);
      setIsDaily(false);
      showToast("✨ تم إنشاء لغز الذكاء الاصطناعي بنجاح!");
    } catch (e) {
      const nextIndex = Math.floor(Math.random() * CURATED_PUZZLES.length);
      const fallbackPuz: Puzzle = {
        ...CURATED_PUZZLES[nextIndex],
        id: `ai_${Date.now()}`,
        isAiGenerated: true
      };
      setPuzzlesQueue((prev) => [...prev, fallbackPuz]);
      setCurrentQueueIndex(puzzlesQueue.length);
      setIsDaily(false);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleResetToDaily = () => {
    setCurrentQueueIndex(0);
    setIsDaily(true);
  };

  const handleSelectFromArchive = (selected: Puzzle) => {
    const existingIdx = puzzlesQueue.findIndex((p) => p.id === selected.id);
    if (existingIdx >= 0) {
      setCurrentQueueIndex(existingIdx);
    } else {
      setPuzzlesQueue((prev) => [...prev, selected]);
      setCurrentQueueIndex(puzzlesQueue.length);
    }
    setIsDaily(selected.id === todayPuzzle.id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xl border border-indigo-400/40 animate-in fade-in slide-in-from-top-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* Navigation & Header */}
        <Header
          stats={stats}
          onOpenStats={() => setStatsModalOpen(true)}
          onOpenArchive={() => setArchiveModalOpen(true)}
          onGenerateAiPuzzle={() => handleGenerateAiPuzzle()}
          isGeneratingAi={isGeneratingAi}
          isDaily={isDaily}
          onResetToDaily={handleResetToDaily}
        />

        {/* AI Category & Infinite Generation Bar */}
        <AiCategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleGenerateAiPuzzle(cat);
          }}
          onGenerateNew={() => handleGenerateAiPuzzle()}
          isGenerating={isGeneratingAi}
          isDaily={isDaily}
        />

        {/* Top Banner Ad (320x50 Non-intrusive) */}
        <BannerAd position="top" zoneId="11787291" />

        {/* Main Game Stage */}
        <main className="w-full">
          <PuzzleCard
            puzzle={currentPuzzle}
            attempts={attempts}
            maxAttempts={effectiveMaxAttempts}
            unlockedHints={unlockedHints}
            isSolved={isSolved}
            isDaily={isDaily}
            questionIndex={currentQueueIndex + 1}
            totalQuestionsCount={puzzlesQueue.length}
            onNextQuestion={handleNextQuestion}
            onPrevQuestion={handlePrevQuestion}
            canGoPrev={currentQueueIndex > 0}
            canGoNext={true}
            isGeneratingAi={isGeneratingAi}
          />

          <AnswerSection
            puzzle={currentPuzzle}
            onSubmitGuess={handleSubmitGuess}
            onOpenHintModal={() => setRewardModalState({
              isOpen: true,
              type: 'hint'
            })}
            onOpenRewardedSolutionModal={() => setRewardModalState({
              isOpen: true,
              type: 'reveal',
              title: "مشاهدة إعلان لكشف حل اللغز",
              desc: "شاهد إعلاناً تجارياً سريعاً لكشف الإجابة النموذجية وشرح اللغز كاملاً"
            })}
            onOpenExtraAttemptsModal={() => setRewardModalState({
              isOpen: true,
              type: 'extraAttempts',
              title: "كسب محاولتين إضافيتين",
              desc: "شاهد إعلاناً تجارياً لكسب محاولتين (+2) ومواصلة التحدي الآن"
            })}
            onOpenShareModal={() => setShareModalOpen(true)}
            onRevealSolution={handleRevealSolution}
            isSolved={isSolved}
            isFailed={isFailed}
            isRevealed={isRevealed}
            attempts={attempts}
            maxAttempts={effectiveMaxAttempts}
            unlockedHintsCount={unlockedHints.length}
            onNextPuzzle={handleNextQuestion}
            isDaily={isDaily}
          />
        </main>

        {/* Bottom Banner Ad (320x50 Non-intrusive) */}
        <BannerAd position="bottom" zoneId="11787291" />

        {/* SEO & Game Info Accordion / Explanatory Section */}
        <section className="w-full max-w-2xl mx-auto px-4 py-6 text-right text-xs text-slate-400 border-t border-slate-900 mt-6">
          <h3 className="font-bold text-slate-300 text-sm mb-2 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-indigo-400" />
            حول لعبة BrainRush AI وتحديات الذكاء اليومية
          </h3>
          <p className="leading-relaxed mb-3">
            لعبة <strong>BrainRush AI</strong> هي منصة ألغاز تفاعلية يومية مصممة لتنشيط التفكير المنطقي، مهارات التحليل والاستنتاج، وقوة الملاحظة البصرية. يتم تجديد اللغز تلقائياً كل 24 ساعة لضمان منافسة متجددة بين الأصدقاء في كافة أنحاء العالم، مع إمكانية توليد ألغاز إضافية لا نهائية بالذكاء الاصطناعي عبر مئات الآلاف من التركيبات المتنوعة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-900">
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="font-bold text-slate-200 block mb-0.5">🎯 عودة يومية مستمرة</span>
              حل لغز اليوم للحفاظ على سلسلة أيامك المتتالية (Streak).
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="font-bold text-slate-200 block mb-0.5">💡 تلميحات ومكافآت ذكية</span>
              شاهد إعلاناً تجارياً لفتح مساعدة الذكاء الاصطناعي أو كشف الحل عند التعثر.
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="font-bold text-slate-200 block mb-0.5">🚀 مشاركة وتحديات الأصدقاء</span>
              شارك التحدي مع أصدقائك عبر واتساب وتليجرام وتحدَّهم لمعرفة الأذكى!
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} BrainRush AI • منصة تحديات الذكاء والألغاز اليومية</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShareModalOpen(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة اللعبة مع الأصدقاء</span>
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setStatsModalOpen(true)}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              الإحصائيات
            </button>
          </div>
        </div>
      </footer>

      {/* Unified Multi-Reward Ad Modal */}
      <HintModal
        isOpen={rewardModalState.isOpen}
        onClose={() => setRewardModalState(prev => ({ ...prev, isOpen: false }))}
        puzzle={currentPuzzle}
        currentHintIndex={unlockedHints.length}
        onUnlockHint={handleUnlockHint}
        currentGuess={attempts[attempts.length - 1] || ""}
        customTitle={rewardModalState.title}
        customRewardDescription={rewardModalState.desc}
        onRewardClaimed={rewardModalState.type !== 'hint' ? handleClaimReward : undefined}
      />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        puzzle={currentPuzzle}
        attemptsCount={attempts.length}
        maxAttempts={effectiveMaxAttempts}
        hintsUsed={unlockedHints.length}
        isWon={isSolved}
        stats={stats}
      />

      <StatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        stats={stats}
        onOpenShare={() => setShareModalOpen(true)}
      />

      <ArchiveModal
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        onSelectPuzzle={handleSelectFromArchive}
        stats={stats}
        currentPuzzleId={currentPuzzle.id}
      />
    </div>
  );
}
