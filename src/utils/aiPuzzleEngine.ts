import { Puzzle, PuzzleCategory, PuzzleDifficulty } from '../types';
import { generateUniqueProceduralPuzzle, recordSeenSignature, getSeenSignatures, isSignatureSeen } from './proceduralPuzzles';

export interface CategoryOption {
  id: PuzzleCategory | 'all';
  name: string;
  icon: string;
  description: string;
}

export const PUZZLE_CATEGORIES: CategoryOption[] = [
  { id: 'all', name: 'جميع التصنيفات', icon: '✨', description: 'توليد ذكاء اصطناعي عشوائي ومتنوع' },
  { id: 'logic', name: 'تفكير استنتاجي وجانبي', icon: '🧠', description: 'مواقف ومفارقات عقلية غير مألوفة' },
  { id: 'visual', name: 'ألغاز بصرية وإيموجي', icon: '🪞', description: 'فك شفرات الرموز البصرية والأشياء' },
  { id: 'mystery', name: 'قضايا المحقق والغموض', icon: '🕵️‍♂️', description: 'كشف الجاني واكتشاف الثغرات بالأدلة' },
  { id: 'riddle', name: 'أحاجي لغوية وشعرية', icon: '📜', description: 'بلاغة عربية وتلاعب ذكي بالألفاظ' },
  { id: 'math', name: 'ذكاء رياضي وحسابي', icon: '🔢', description: 'ألغاز الأرقام والمتتاليات السريعة' },
  { id: 'wisdom', name: 'حِكم وأمثال تراثية', icon: '🏺', description: 'فطنة الحكماء وقصص الذكاء التراثي' },
  { id: 'science', name: 'أسرار علمية وطبيعية', icon: '🔬', description: 'ظواهر فيزيائية وبيئية مذهلة' },
];

/**
 * Procedurally generates a unique, guaranteed non-repeating puzzle out of hundreds of thousands of combinations
 */
export function generateProceduralPuzzle(
  preferredCategory?: PuzzleCategory | 'all',
  preferredDifficulty: PuzzleDifficulty = 'medium'
): Puzzle {
  return generateUniqueProceduralPuzzle(preferredCategory, preferredDifficulty);
}

/**
 * Requests a new AI-generated puzzle from the server with strict anti-repetition exclusion,
 * falling back smoothly to procedural generation if offline or rate limited.
 */
export async function fetchNewAiPuzzle(
  category: PuzzleCategory | 'all' = 'all',
  difficulty: PuzzleDifficulty = 'medium'
): Promise<Puzzle> {
  const seenSignatures = getSeenSignatures().slice(-25);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const groqKey = typeof window !== 'undefined' 
      ? localStorage.getItem('groq_api_key_custom') || localStorage.getItem('groq_api_key') || undefined 
      : undefined;

    const res = await fetch('/api/generate-puzzle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: category === 'all' ? undefined : category,
        difficulty,
        excludeAnswers: seenSignatures,
        seed: `${Date.now()}_${Math.random()}`,
        groqApiKey: groqKey
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.puzzle && data.puzzle.answer) {
        const sig = `${data.puzzle.title}_${data.puzzle.answer}`;
        // If somehow already seen, use guaranteed-unique procedural generation
        if (isSignatureSeen(sig)) {
          return generateUniqueProceduralPuzzle(category, difficulty);
        }
        recordSeenSignature(sig);
        return {
          ...data.puzzle,
          id: data.puzzle.id || `ai_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
          isAiGenerated: true
        };
      }
    }
  } catch (e) {
    console.warn('AI puzzle server request error, utilizing procedural generation:', e);
  }

  // Graceful, instantaneous procedural generation fallback guaranteeing uniqueness
  return generateUniqueProceduralPuzzle(category, difficulty);
}

