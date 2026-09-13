import { GoogleGenAI } from "@google/genai";

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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const ai = getAIClient();
    const { puzzleTitle, scenario, currentGuess, hintTier } = req.body || {};

    if (!ai) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: "Using preset hint."
      });
    }

    const prompt = `أنت مساعد ذكي للعبة ألغاز ذكاء عربية.
اللغز هو: "${puzzleTitle || ''}"
النص: "${scenario || ''}"
محاولة اللاعب الحالية: "${currentGuess || 'لم يحاول بعد'}"
مستوى التلميح المطلوب: المستوى ${hintTier || 1} من 3.
قدم تلميحاً ذكياً ولطيفاً وموجزاً (جملة أو جملتين فقط) لا يحرق الحل مباشرة ولكن يوجه تفكير اللاعب بذكاء.`;

    let lastError: any = null;
    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt
        });
        if (response && response.text) {
          return res.status(200).json({
            success: true,
            hint: response.text.trim()
          });
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    return res.status(200).json({
      success: false,
      fallback: true,
      message: "Model temporarily busy."
    });
  } catch (_e) {
    return res.status(200).json({
      success: false,
      fallback: true,
      message: "Using preset hint."
    });
  }
}
