import { GoogleGenAI } from "@google/genai";
import { generateUniqueProceduralPuzzle } from "../src/utils/proceduralPuzzles";
import { PuzzleCategory, PuzzleDifficulty } from "../src/types";

let genAI: GoogleGenAI | null = null;
function getAIClient() {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAI;
}

const CANDIDATE_MODELS = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];

export default async function handler(req: any, res: any) {
  // Allow GET and POST for flexibility
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const query = req.query || {};
  const body = req.body || {};

  const category = (query.category || body.category || 'logic') as PuzzleCategory;
  const difficulty = (query.difficulty || body.difficulty || 'medium') as PuzzleDifficulty;
  const dateStr = query.date || body.date || new Date().toISOString().split('T')[0];

  try {
    const ai = getAIClient();

    // If Gemini AI is configured, attempt intelligent generation
    if (ai) {
      const prompt = `أنت محرك الذكاء الاصطناعي لتطبيق BrainRush AI العربي.
المهمة: توليد لغز ذكاء عربي جديد تماماً وفريد وغير مكرر لتاريخ اليوم: ${dateStr}.
التصنيف: ${category}
مستوى الصعوبة: ${difficulty}

شروط صارمة:
1. السؤال يجب أن يكون مشوقاً وذكياً وقائماً على الفطنة أو المنطق أو الحساب الدقيق.
2. لا تكرر الألغاز الشائعة.
3. قدم الناتج بتنسيق JSON حصراً بدون أي كود ماركداون خارجي، بالحقول التالية:
{
  "title": "عنوان اللغز المثير",
  "scenario": "قصة أو سياق اللغز بأسلوب سردي ممتع",
  "question": "السؤال المباشر والمحدد المطلوب الإجابة عنه",
  "visualClue": "إيموجي معبر أو رسم توضيحي نصي",
  "answer": "الإجابة الصحيحة والدقيقة بكلمة أو عبارة قصيرة جداً",
  "synonyms": ["مرادف 1", "مرادف 2", "مرادف 3"],
  "hints": ["تلميح ذكي خفيف 1", "تلميح أقوى 2", "تلميح يوضح نصف الحل 3"],
  "explanation": "شرح علمي ومنطقي مبسط لسبب صحة هذا الحل"
}`;

      for (const model of CANDIDATE_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              responseMimeType: "application/json"
            }
          });

          if (response && response.text) {
            const parsed = JSON.parse(response.text.trim());
            const puzzle = {
              id: `daily_ai_${category}_${dateStr}_${Date.now()}`,
              title: parsed.title,
              category,
              categoryName: getCategoryArabicName(category),
              difficulty,
              difficultyName: difficulty === 'easy' ? 'سهل وممتع' : difficulty === 'hard' ? 'تحدي العباقرة' : 'متوسط الذكاء',
              visualClue: parsed.visualClue || '🧠⚡',
              scenario: parsed.scenario,
              question: parsed.question,
              answer: parsed.answer,
              synonyms: Array.isArray(parsed.synonyms) ? parsed.synonyms : [],
              hints: Array.isArray(parsed.hints) ? parsed.hints : ['فكر خارج الصندوق'],
              explanation: parsed.explanation,
              isAiGenerated: true,
              date: dateStr
            };

            return res.status(200).json({
              success: true,
              source: 'gemini_ai',
              puzzle
            });
          }
        } catch {
          // Try next model
        }
      }
    }

    // High-performance procedural generator fallback (produces millions of non-repeating permutations)
    const fallbackPuzzle = generateUniqueProceduralPuzzle(category, difficulty);
    return res.status(200).json({
      success: true,
      source: 'procedural_ai_engine',
      puzzle: {
        ...fallbackPuzzle,
        date: dateStr
      }
    });

  } catch (error: any) {
    // Guaranteed fallback
    const emergencyPuzzle = generateUniqueProceduralPuzzle(category, difficulty);
    return res.status(200).json({
      success: true,
      source: 'emergency_procedural',
      puzzle: emergencyPuzzle
    });
  }
}

function getCategoryArabicName(cat: string): string {
  const names: Record<string, string> = {
    visual: 'بصري وتدقيق',
    logic: 'منطق واستنتاج',
    mystery: 'قضايا ومحقق',
    riddle: 'أحاجي لغوية',
    math: 'ذكاء رياضي',
    wisdom: 'فطنة وحكمة',
    science: 'أسرار علمية'
  };
  return names[cat] || 'تحدي الذكاء';
}
