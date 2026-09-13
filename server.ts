import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Monetag verification and service worker endpoint
const swContent = `self.options = {
    "domain": "3nbf4.com",
    "zoneId": 11787291
}
self.lary = ""
importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw')`;

app.get("/sw.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Service-Worker-Allowed", "/");
  res.send(swContent);
});

// Lazy-loaded Gemini client with User-Agent header
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

// Resilient helper to call Gemini with multi-model fallback on 503 / high demand
const CANDIDATE_MODELS = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];

async function generateWithFallback(prompt: string, jsonMode: boolean = false): Promise<string> {
  const ai = getAIClient();
  if (!ai) {
    throw new Error("Gemini client not initialized");
  }

  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: jsonMode ? { responseMimeType: "application/json" } : undefined
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        lastError = err;
        const isHighDemand = err?.status === 503 || err?.code === 503 || `${err?.message}`.includes('503');
        if (isHighDemand && attempt === 0) {
          await new Promise((r) => setTimeout(r, 500));
          continue;
        }
        break;
      }
    }
  }

  throw lastError || new Error("All candidate models failed");
}

// Server-side backup puzzle library for zero-downtime reliability
const BACKUP_PUZZLES = [
  {
    title: "لغز مرآة الأسرار والضوء",
    category: "visual",
    categoryName: "لغز بصري",
    difficulty: "medium",
    difficultyName: "متوسط",
    visualClue: "🪞 💡 ⚡ 🔮 👁️",
    scenario: "يقف أمامك في كل صباح، ينطق بكل ما يراه بلا صوت، يعكس الحقيقة كاملة لكنه يقلب يمينك إلى يسار، وإذا انكسر ضاع سحره للأبد!",
    question: "ما هو هذا الشيء؟",
    answer: "المرآة",
    synonyms: ["مرآة", "مراية", "المرآه", "المرايا", "mirror"],
    hints: [
      "تراها كل يوم في منزلك أو في سيارتك.",
      "تعكس صورتك وملامحك بدقة.",
      "تبدأ بحرف الميم وتنتهي بالتاء المربوطة."
    ],
    explanation: "المرآة تعكس الضوء بدقة متناهية فترى صورتك فيها بوضوح!"
  },
  {
    title: "مفارقة مفتاح القلوب والعقول",
    category: "logic",
    categoryName: "تفكير جانبي",
    difficulty: "easy",
    difficultyName: "سهل",
    visualClue: "🗝️ 🚪 🧠 💬 💡",
    scenario: "يفتح لك أعظم الأبواب المغلقة ويزيل الخلافات دون أن يلمس قفلاً واحداً، لا وزن له ولا ثمن، لكنه يرفع صاحبه إلى أعلى المراتب!",
    question: "ما هو هذا المفتاح السحري؟",
    answer: "الكلمة الطيبة",
    synonyms: ["الكلمة الطيبة", "الكلمه الطيبه", "الصدق", "الابتسامة", "حسن الخلق"],
    hints: [
      "شيء تنطق به بلسانك يؤلف بين القلوب.",
      "ورد في الأثر أنها صدقة وتفتح النفوس.",
      "تتكون من كلمتين تبدأن بأل التعريف."
    ],
    explanation: "الكلمة الطيبة تفتح مغاليق القلوب وتكسب محبة الجميع بلا مجهود مادي!"
  },
  {
    title: "لغز محقق البصمات في المطر",
    category: "mystery",
    categoryName: "لغز المحقق",
    difficulty: "hard",
    difficultyName: "عبقري",
    visualClue: "🌧️ 🕵️‍♂️ 👣 🚗 🩸",
    scenario: "حدثت عملية سطو في ليلة ماطرة شديدة العواصف. ادعى المشتبه به أنه كان نائماً في سيارته المركونة في الشارع طوال الليل. حينما فحص المحقق السيارة، وجد زجاج النوافذ جافاً تماماً وخالياً من قطرات المطر من الخارج، فعلم فوراً أنه يكذب!",
    question: "لماذا كشفه زجاج النوافذ الجاف؟",
    answer: "السيارة كانت في مرآب مغلق",
    synonyms: ["السيارة كانت في جراج", "السيارة في مرآب", "كانت داخل كراج", "وصل حديثاً", "كانت مغطاة"],
    hints: [
      "فكر في تأثير المطر الغزير على أي سيارة واقفة في الشارع المفتوح طوال الليل.",
      "لو كانت السيارة في الشارع لكانت مغطاة بقطرات المطر من الخارج.",
      "السيارة كانت في مكان مسقوف أو دخلت الشارع بعد توقف المطر!"
    ],
    explanation: "السيارة الواقفة في العاصفة بالشارع يستحيل أن تكون جافة تماماً، مما يثبت أنه كان في مكان آخر أو مرآب مغلق!"
  }
];

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGemini: !!process.env.GEMINI_API_KEY,
    monetag: {
      zoneId: "11787291",
      domain: "3nbf4.com",
      swVerified: true
    }
  });
});

// API: Generate new AI puzzle on demand
app.post("/api/generate-puzzle", async (req, res) => {
  try {
    const ai = getAIClient();
    const category = req.body?.category || "visual_rebus";
    const difficulty = req.body?.difficulty || "medium";

    if (!ai) {
      const fallbackPuzzle = BACKUP_PUZZLES[Math.floor(Math.random() * BACKUP_PUZZLES.length)];
      return res.status(200).json({
        success: true,
        fallback: true,
        puzzle: {
          ...fallbackPuzzle,
          id: `ai_${Date.now()}`,
          isAiGenerated: true,
          generatedAt: new Date().toISOString()
        }
      });
    }

    const prompt = `أنت خبير في تصميم ألعاب الذكاء والألغاز البصرية والتفكير الجانبي التفاعلية باللغة العربية.
صمم لغزاً جديداً ومثيراً جداً باللغة العربية مع خصائص واضحة.
نوع اللغز: ${category} (يمكن أن يكون لغز بصري/إيموجي، أو لغز تفكير جانبي وذكاء، أو لغز محقق وجريمة غامضة).
مستوى الصعوبة: ${difficulty}.

أعد الإجابة بصيغة JSON حصراً بدون أي كود ماركداون خارجي، بالشكل التالي:
{
  "title": "عنوان مشوق ومختصر للغز",
  "category": "visual" أو "logic" أو "mystery" أو "riddle",
  "categoryName": "لغز بصري" أو "تفكير جانبي" أو "لغز محقق" أو "حكمة وأمثال",
  "difficulty": "easy" أو "medium" أو "hard",
  "difficultyName": "سهل" أو "متوسط" أو "عبقري",
  "visualClue": "مجموعة من الرموز التعبيرية المعبرة (3 إلى 6 إيموجي مميزين يصفون اللغز بذكاء)",
  "scenario": "نص اللغز أو الموقف الغامض بأسلوب سردي مشوق وممتع (بين 2 إلى 4 أسطر باللغة العربية الفصحى السلسة)",
  "question": "السؤال المباشر والمحدد للمستخدم (مثال: من هو السارق؟ أو ما هو هذا الشيء؟)",
  "answer": "الكلمة أو العبارة الصحيحة بالضبط (موجزة جداً: كلمة واحدة أو كلمتين)",
  "synonyms": ["مرادفات مقبولة أخرى للإجابة", "بدائل محتملة"],
  "hints": [
    "تلميح فكري خفيف يساعد على توجيه التفكير",
    "تلميح أوضح يكشف زاوية الحل أو عدد الحروف",
    "تلميح قوي جداً شبه مباشر"
  ],
  "explanation": "شرح ذكي ورائع لكيفية حل اللغز والخدعة فيه ليقرأها اللاعب بعد الحل"
}`;

    try {
      const responseText = await generateWithFallback(prompt, true);
      const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const puzzle = JSON.parse(cleaned);

      if (puzzle && puzzle.title && puzzle.answer) {
        return res.json({
          success: true,
          puzzle: {
            ...puzzle,
            id: `ai_${Date.now()}`,
            isAiGenerated: true,
            generatedAt: new Date().toISOString()
          }
        });
      }
    } catch (_aiErr: any) {
      // Graceful fallback to backup puzzle library when AI model is temporarily busy
    }

    // Graceful fallback to backup puzzle library when AI model is temporarily experiencing high demand (503)
    const fallbackPuzzle = BACKUP_PUZZLES[Math.floor(Math.random() * BACKUP_PUZZLES.length)];
    return res.json({
      success: true,
      fallback: true,
      puzzle: {
        ...fallbackPuzzle,
        id: `ai_${Date.now()}`,
        isAiGenerated: true,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error("Error in /api/generate-puzzle:", error);
    const fallbackPuzzle = BACKUP_PUZZLES[0];
    return res.json({
      success: true,
      fallback: true,
      puzzle: {
        ...fallbackPuzzle,
        id: `ai_${Date.now()}`,
        isAiGenerated: true,
        generatedAt: new Date().toISOString()
      }
    });
  }
});

// API: Generate AI Hint tailored to the user's progress
app.post("/api/ai-hint", async (req, res) => {
  try {
    const ai = getAIClient();
    const { puzzleTitle, scenario, currentGuess, hintTier } = req.body;

    if (!ai) {
      return res.status(200).json({
        success: false,
        message: "Gemini API unavailable, using preset hint."
      });
    }

    const prompt = `أنت مساعد ذكي للعبة ألغاز ذكاء عربية.
اللغز هو: "${puzzleTitle}"
النص: "${scenario}"
محاولة اللاعب الحالية: "${currentGuess || 'لم يحاول بعد'}"
مستوى التلميح المطلوب: المستوى ${hintTier || 1} من 3.
قدم تلميحاً ذكياً ولطيفاً وموجزاً (جملة أو جملتين فقط) لا يحرق الحل مباشرة ولكن يوجه تفكير اللاعب بذكاء.`;

    try {
      const responseText = await generateWithFallback(prompt, false);
      return res.json({
        success: true,
        hint: responseText.trim()
      });
    } catch (_hintErr: any) {
      return res.json({
        success: false,
        fallback: true,
        message: "Model temporarily busy, using preset hint."
      });
    }
  } catch (_error: any) {
    return res.json({
      success: false,
      fallback: true,
      message: "Using preset hint."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
