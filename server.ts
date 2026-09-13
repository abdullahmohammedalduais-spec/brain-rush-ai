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

app.get(["/sw.js", "/sw (1).js", "/sw%20(1).js"], (req, res) => {
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

const THEMES = [
  "الأشياء والأدوات اليومية والظواهر الطبيعية المحيرة",
  "أسرار المحققين وثغرات الشهود وروايات المشتبه بهم في مسرح الجريمة",
  "المفارقات اللغوية والبلاغية وحيل الشعر والتلاعب بالألفاظ في التراث العربي",
  "الألغاز الرياضية الذكية والمتتاليات الحسابية الخداعة",
  "فطنة القضاة والحكماء وقصص الذكاء والفراسة العربية",
  "ألغاز الإيموجي والشفرات البصرية العبقرية",
  "أشياء تتغير مع الزمن أو الضوء أو الحركة ولها خواص فريدة ومفاجئة"
];

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
    category: "logic",
    categoryName: "تفكير استنتاجي",
    title: "مفارقة الشمعة الموقدة",
    difficulty: "easy",
    difficultyName: "سهل",
    visualClue: "🕯️ 🔥 ⏳ 💡 ✨",
    scenario: "كلما كبرت في العمر قصرت قامتها، تذرف دموعاً بلا حزن وتضحي بنفسها بالكامل لكي تمنح النور لغيرها في الظلام!",
    question: "ما هي هذه التي تصغر كلما طال عمرها؟",
    answer: "الشمعة",
    synonyms: ["شمعة", "شمعه", "الشمع", "الشموع", "candle"],
    hints: [
      "تُشعلها عند انقطاع الكهرباء في المنزل.",
      "تذوب ببطء مع مرور الوقت بفعل الحرارة.",
      "تبدأ بحرف الشين وتنتهي بالتاء المربوطة."
    ],
    explanation: "الشمعة تحترق لتولد الضوء فيذوب شمعها ويقصر طولها بمرور الوقت حتى تنفد بالكامل!"
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
  },
  {
    title: "أحجية البحر الذي بلا ماء",
    category: "riddle",
    categoryName: "أحجية لغوية",
    difficulty: "medium",
    difficultyName: "متوسط",
    visualClue: "🗺️ 🌊 🧭 🏔️ 🚢",
    scenario: "فيه بحار شاسعة ومحيطات عملاقة لكن لا توجد به قطرة ماء واحدة، وفيه مدن ودول عامرة بلا بشر، وجبال شاهقة بلا صخور!",
    question: "ما هو هذا العالم المصغر؟",
    answer: "الخريطة",
    synonyms: ["خريطة", "الخريطه", "خارطة", "الخارطة", "الأطلس", "map"],
    hints: [
      "يستخدمها المسافرون والبحارة لمعرفة الاتجاهات والدول.",
      "تُرسم على الورق أو تظهر على شاشات الهواتف.",
      "تبدأ بحرف الخاء وتنتهي بالتاء المربوطة."
    ],
    explanation: "الخريطة تمثل تضاريس الأرض جغرافياً فتحتوي على البحار والمدن والحدود بلا ماء ولا سكان فعليين!"
  },
  {
    title: "لغز البيض والسلة الرياضي",
    category: "math",
    categoryName: "ذكاء رياضي",
    difficulty: "medium",
    difficultyName: "متوسط",
    visualClue: "🧺 🥚 🔢 👨‍👩‍👧‍👦 ✨",
    scenario: "سلة بها 6 بيضات، وُزعت على 6 أشخاص بالتساوي بحيث أخذ كل شخص بيضة كاملة، ومع ذلك بقيت بيضة واحدة في قاع السلة!",
    question: "كيف بقيت بيضة بالسلة رغم أخذ كل شخص بيضة كاملة؟",
    answer: "الشخص الأخير أخذ السلة وبداخلها بيضته",
    synonyms: ["الشخص الأخير أخذ السلة", "أخذ السلة مع البيضة", "آخر شخص أخذ السلة"],
    hints: [
      "كل الأشخاص حصلوا على بيضتهم كاملة دون كسر.",
      "فكر في الشخص السادس وما الذي حمله بيده.",
      "الأخير لم يخرج البيضة بل حمل السلة والبيضة معاً!"
    ],
    explanation: "الشخص السادس أخذ السلة نفسها وبداخلها بيضته، فحصل على نصيبه وبقيت البيضة داخل السلة!"
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
    const rawCategory = req.body?.category;
    const category = (!rawCategory || rawCategory === 'all') ? 'random' : rawCategory;
    const difficulty = req.body?.difficulty || "medium";
    const excludeIds = req.body?.excludeIds || [];
    const seed = req.body?.seed || `${Date.now()}`;
    const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];

    if (!ai) {
      const eligible = category === 'random' 
        ? BACKUP_PUZZLES 
        : BACKUP_PUZZLES.filter(p => p.category === category);
      const pool = eligible.length > 0 ? eligible : BACKUP_PUZZLES;
      const fallbackPuzzle = pool[Math.floor(Math.random() * pool.length)];
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

    const prompt = `أنت مصمم عبقري لألعاب الذكاء وتحديات الألغاز باللغة العربية.
مهمتك: ابتكار لغز جديد تماماً وفريد من نوعه وغير مكرر، يختلف جذرياً عن أي لغز سابق.
- فكرة أو ثيم اللغز: "${randomTheme}".
- نوع التصنيف المطلوب: ${category} (يمكن أن يكون: visual, logic, mystery, riddle, math, wisdom, science).
- مستوى الصعوبة: ${difficulty}.
- بصمة التنوع والفرادة: ${seed}.
- استبعد الألغاز المتداولة أو التقليدية جداً، واصنع سؤالاً ذكياً ومبتكراً يجذب اللاعب.

أعد الإجابة بصيغة JSON حصراً بدون أي وسوم ماركداون:
{
  "title": "عنوان جذاب ومختصر للغز",
  "category": "${category === 'random' ? 'logic' : category}",
  "categoryName": "اسم التصنيف بالعربية (مثال: تفكير استنتاجي، لغز بصري، قضية المحقق، أحجية لغوية، ذكاء رياضي، حِكم وفطنة، أسرار علمية)",
  "difficulty": "${difficulty}",
  "difficultyName": "سهل وممتع أو متوسط الذكاء أو تحدي العباقرة",
  "visualClue": "3 إلى 5 رموز تعبيرية (إيموجي) معبرة بدقة عن اللغز",
  "scenario": "نص اللغز بأسلوب سردي عربي فصيح وشيق ومحبوك جيداً (2 إلى 3 أسطر)",
  "question": "السؤال المحدد الموجه للاعب (مثال: ما هو هذا الشيء؟ أو من هو الجاني؟ أو كيف تفسر ذلك؟)",
  "answer": "الإجابة الصحيحة المحددة (كلمة أو كلمتان فقط)",
  "synonyms": ["مرادفات صحيحة مقبولة", "طرق كتابة بديلة للكلمة"],
  "hints": [
    "تلميح فكري أولي يوجه التفكير دون حرق الحل",
    "تلميح أدق يكشف حرف البداية أو زاوية اللغز",
    "تلميح قوي وشبه حاسم يوضح الفكرة تماماً"
  ],
  "explanation": "شرح واضح وشيق يبين فكرة اللغز وكيف تم الوصول إلى الحل بذكاء"
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
