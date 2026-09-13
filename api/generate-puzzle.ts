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

const CATEGORY_SUBTHEMES: Record<string, string[]> = {
  visual: [
    "ألغاز المرآة وانعكاسات الضوء المضللة وزوايا الرؤية",
    "ألغاز الظلال وأطوالها المتغيرة مع مسار الشمس",
    "شفرات الإيموجي والرموز البصرية العبقرية",
    "العدسات والمجاهر والتلسكوبات وانكسار الضوء",
    "الخرائط والبوصلة وأسرار الملاحة الجغرافية"
  ],
  logic: [
    "مفارقات الشموع والوقت المستهلك في الظلام",
    "ألغاز الأبواب الموصدة وحروب الحصون والنجاة",
    "مفارقات التبديل والأواني ومستويات السوائل",
    "معضلات الانتقال بالقوارب والموازين والعملات"
  ],
  mystery: [
    "مسرح الجريمة وشظايا النوافذ المكسورة من الداخل أو الخارج",
    "مكعبات الثلج والمشروبات المسمومة مع ذوبان الجليد",
    "تناقضات الشهود والسيارات الجافة في ليالي العواصف الماطرة",
    "بصمات الأقدام في الرمال المتحركة وحبات الثلج"
  ],
  riddle: [
    "بلاغة التشبيه العربي الفصيح للأشياء الصامتة والمتحركة",
    "ألغاز الأشياء التي تبكي بلا عيون أو تمشي بلا أرجل",
    "أحاجي البحر الذي بلا ماء والمدن التي بلا سكان (الخريطة)",
    "ألغاز النار التي تأكل ولا تشبع وتموت برشفة ماء"
  ],
  math: [
    "متتاليات الأعداد والأنماط الحسابية والهندسية الخداعة",
    "معضلات الأعمار والسنوات المستقبلية بين الآباء والأبناء",
    "ألغاز مصافحات الحفلات وقوانين التوافيق والتباديل",
    "ألغاز الموازين والعملات المزيفة بأقل عدد وزنات مؤكدة"
  ],
  wisdom: [
    "فطنة القضاة وكشف مدعي الأموال بإلقاء الدنانير في الماء الساخن",
    "حكمة اقتسام الإبل السبعة عشر المستحيلة بإضافة ناقة الحكيم",
    "فراسة العرب في كشف السارق بدهن ظهر الديك بالسخام الأسود"
  ],
  science: [
    "فارق السرعة الهائل بين الضوء والصوت في العواصف الرعدية",
    "شذوذ الماء وتمدد الجليد العجيب عند التجمّد لحماية الكائنات",
    "انعدام الوزن الحقيقي وظاهرة السقوط الحر الدائم في المدار الفضائي",
    "الضغط الجوي وغليان السوائل في قمم الجبال الشاهقة"
  ]
};

const BACKUP_PUZZLES = [
  {
    title: "لغز مرآة الأسرار والضوء",
    category: "visual",
    categoryName: "لغز بصري",
    difficulty: "medium",
    difficultyName: "متوسط الذكاء",
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
    title: "مفارقة الشمعة الموقدة",
    category: "logic",
    categoryName: "تفكير استنتاجي",
    difficulty: "easy",
    difficultyName: "سهل وممتع",
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
    title: "لغز محقق البصمات في المطر",
    category: "mystery",
    categoryName: "قضية المحقق",
    difficulty: "hard",
    difficultyName: "تحدي العباقرة",
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const rawCategory = req.body?.category;
  const category = (!rawCategory || rawCategory === 'all') ? 'random' : rawCategory;
  const difficulty = req.body?.difficulty || "medium";
  const excludeAnswers = req.body?.excludeAnswers || [];
  const seed = req.body?.seed || `${Date.now()}_${Math.random()}`;

  const catKey = category === 'random' 
    ? ['visual', 'logic', 'mystery', 'riddle', 'math', 'wisdom', 'science'][Math.floor(Math.random() * 7)]
    : category;
  const subthemes = CATEGORY_SUBTHEMES[catKey] || CATEGORY_SUBTHEMES.logic;
  const randomTheme = subthemes[Math.floor(Math.random() * subthemes.length)];

  const ai = getAIClient();
  if (!ai) {
    const eligible = catKey === 'random' 
      ? BACKUP_PUZZLES 
      : BACKUP_PUZZLES.filter(p => p.category === catKey);
    const pool = eligible.length > 0 ? eligible : BACKUP_PUZZLES;
    const fallback = pool[Math.floor(Math.random() * pool.length)];
    return res.status(200).json({
      success: true,
      fallback: true,
      puzzle: {
        ...fallback,
        id: `ai_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
        isAiGenerated: true,
        generatedAt: new Date().toISOString()
      }
    });
  }

  const exclusionWarning = (excludeAnswers && excludeAnswers.length > 0)
    ? `\n- تنبيه صارم وحاسم لمكافحة التكرار: ممنوع منعاً باتاً تكرار أو محاكاة أي من هذه الألغاز أو الإجابات السابقة للاعب: [${excludeAnswers.slice(-15).join(' ، ')}]. ابتكر لغزاً جديداً 100% بفكرة مختلفة تماماً!`
    : '';

  const prompt = `أنت مصمم عبقري لألعاب الذكاء وتحديات الألغاز باللغة العربية مع بنك أفكار يضم مئات الآلاف من الألغاز الفريدة.
مهمتك: ابتكار لغز جديد تماماً وفريد من نوعه وغير مكرر على الإطلاق، يختلف جذرياً عن أي لغز تقليدي سابق.
- فكرة وزاوية اللغز المحددة: "${randomTheme}".
- نوع التصنيف المطلوب حصراً: ${catKey} (يمكن أن يكون: visual, logic, mystery, riddle, math, wisdom, science).
- مستوى الصعوبة: ${difficulty}.
- بصمة التنوع والفرادة: ${seed}.${exclusionWarning}
- استبعد الألغاز المتداولة أو التقليدية جداً، واصنع سؤالاً ذكياً ومبتكراً يجذب اللاعب مع خيارات تفكير ذكية.

أعد الإجابة بصيغة JSON حصراً بدون أي وسوم ماركداون:
{
  "title": "عنوان جذاب ومختصر للغز",
  "category": "${catKey}",
  "categoryName": "${catKey === 'visual' ? 'لغز بصري' : catKey === 'logic' ? 'تفكير استنتاجي' : catKey === 'mystery' ? 'قضية المحقق' : catKey === 'riddle' ? 'أحجية لغوية' : catKey === 'math' ? 'ذكاء رياضي' : catKey === 'wisdom' ? 'حكمة وفطنة' : 'أسرار علمية'}",
  "difficulty": "${difficulty}",
  "difficultyName": "${difficulty === 'easy' ? 'سهل وممتع' : difficulty === 'hard' ? 'تحدي العباقرة' : 'متوسط الذكاء'}",
  "visualClue": "3 إلى 5 رموز تعبيرية (إيموجي) معبرة بدقة عن فكرة اللغز",
  "scenario": "نص اللغز بأسلوب سردي عربي فصيح وشيق ومحبوك جيداً (2 إلى 3 أسطر)",
  "question": "السؤال المحدد الموجه للاعب (مثال: ما هو هذا الشيء؟ أو من هو الجاني؟ أو كيف تفسر ذلك؟)",
  "answer": "الإجابة الصحيحة المحددة بدقة (كلمة أو كلمتان فقط)",
  "synonyms": ["مرادفات صحيحة مقبولة", "طرق كتابة بديلة للكلمة"],
  "hints": [
    "تلميح فكري أولي يوجه التفكير دون حرق الحل",
    "تلميح أدق يكشف حرف البداية أو زاوية اللغز",
    "تلميح قوي وشبه حاسم يوضح الفكرة تماماً"
  ],
  "explanation": "شرح علمي أو منطقي شيق ومقنع يبين فكرة اللغز وكيف تم الوصول إلى الحل بذكاء"
}`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      if (response && response.text) {
        const cleaned = response.text.replace(/```json/g, "").replace(/```/g, "").trim();
        const puzzle = JSON.parse(cleaned);
        if (puzzle && puzzle.title && puzzle.answer) {
          return res.status(200).json({
            success: true,
            puzzle: {
              ...puzzle,
              id: `ai_${Date.now()}`,
              isAiGenerated: true,
              generatedAt: new Date().toISOString()
            }
          });
        }
      }
    } catch (_err) {
      // Continue to next candidate model
    }
  }

  const fallback = BACKUP_PUZZLES[Math.floor(Math.random() * BACKUP_PUZZLES.length)];
  return res.status(200).json({
    success: true,
    fallback: true,
    puzzle: {
      ...fallback,
      id: `ai_${Date.now()}`,
      isAiGenerated: true,
      generatedAt: new Date().toISOString()
    }
  });
}
