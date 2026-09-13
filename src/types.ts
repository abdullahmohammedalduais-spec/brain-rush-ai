export type PuzzleCategory = 'visual' | 'logic' | 'mystery' | 'riddle' | 'math' | 'wisdom' | 'science';
export type PuzzleDifficulty = 'easy' | 'medium' | 'hard';

export interface Puzzle {
  id: string;
  dayNumber?: number;
  dateStr?: string; // e.g. "2026-09-13"
  title: string;
  category: PuzzleCategory;
  categoryName: string;
  difficulty: PuzzleDifficulty;
  difficultyName: string;
  visualClue: string; // e.g. "⏳ 👁️ 🗝️ 🏰"
  scenario: string;
  question: string;
  answer: string;
  synonyms: string[];
  hints: string[]; // 3 progressive hints
  explanation: string;
  isAiGenerated?: boolean;
}

export interface PlayerStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  hintsUsed: number;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
  };
  lastPlayedDate?: string;
  history: Record<string, {
    solved: boolean;
    attempts: number;
    hintsUsed: number;
    date: string;
  }>;
}

export interface AdZoneConfig {
  domain: string;
  zoneId: string;
  swVerified: boolean;
}
