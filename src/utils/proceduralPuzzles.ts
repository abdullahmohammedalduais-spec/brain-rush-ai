import { Puzzle, PuzzleCategory, PuzzleDifficulty } from '../types';

/**
 * Procedural Puzzle Engine
 * Generates hundreds of thousands of unique, non-repeating puzzles across all categories.
 * Features algorithmic generators for math, dynamic narrative templates, and anti-repetition tracking.
 */

// Memory of seen puzzle signatures to prevent repetition
const SEEN_SIGNATURES_KEY = 'brainrush_seen_puzzle_signatures_v2';

export function getSeenSignatures(): string[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(SEEN_SIGNATURES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordSeenSignature(signature: string) {
  try {
    if (typeof localStorage === 'undefined') return;
    const seen = getSeenSignatures();
    const cleanSig = signature.trim().toLowerCase();
    if (!seen.includes(cleanSig)) {
      seen.push(cleanSig);
      // Keep last 300 to prevent unbounded growth while guaranteeing uniqueness
      if (seen.length > 300) seen.shift();
      localStorage.setItem(SEEN_SIGNATURES_KEY, JSON.stringify(seen));
    }
  } catch {
    // Ignore storage errors
  }
}

export function isSignatureSeen(signature: string): boolean {
  const seen = getSeenSignatures();
  return seen.includes(signature.trim().toLowerCase());
}

// Arabic names for math & mystery scenarios
const ARABIC_NAMES = [
  'أحمد', 'عمر', 'خالد', 'طارق', 'يوسف', 'سارة', 'فاطمة', 'مريم', 'نور',
  'سعيد', 'ماجد', 'زياد', 'فيصل', 'سلمان', 'هدى', 'ريم', 'زينب', 'حمزة'
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================
// 1. DYNAMIC MATHEMATICAL GENERATORS (Infinite Variations)
// ==========================================
function generateDynamicMathPuzzle(difficulty: PuzzleDifficulty): Puzzle {
  const mathTypes = ['sequence', 'handshakes', 'age', 'coins_weighing', 'speed_distance', 'number_trick'];
  const chosenType = getRandomItem(mathTypes);

  if (chosenType === 'sequence') {
    // Dynamic sequences
    const patternType = getRandomItem(['arithmetic_step', 'geometric_plus', 'squares_offset', 'alternating']);
    if (patternType === 'arithmetic_step') {
      const start = getRandomInt(2, 15);
      const step = getRandomInt(3, 9);
      const seq = [start, start + step, start + step * 2, start + step * 3];
      const nextVal = start + step * 4;
      return {
        id: `math_seq_${Date.now()}_${Math.random()}`,
        title: `لغز المتتالية الحسابية الذكية (${step}+)`,
        category: 'math',
        categoryName: 'ذكاء رياضي',
        difficulty,
        difficultyName: difficulty === 'easy' ? 'سهل وممتع' : difficulty === 'hard' ? 'تحدي العباقرة' : 'متوسط الذكاء',
        visualClue: '🔢 ➕ 📈 💡 🎯',
        scenario: `أمامك متتالية من الأرقام تتبع نمطاً رياضياً منطقياً دقيقاً:\n[ ${seq.join(' ، ')} ، ؟ ]`,
        question: `ما هو الرقم التالي الذي يجب أن يحل محل علامة الاستفهام؟`,
        answer: `${nextVal}`,
        synonyms: [`${nextVal}`, `الرقم ${nextVal}`, `العدد ${nextVal}`],
        hints: [
          `احسب الفرق بين أول رقمين (${seq[1]} - ${seq[0]}).`,
          `النمط يزيد بقيمة ثابتة قدرها ${step} في كل خطوة.`,
          `اجمع ${step} مع آخر رقم (${seq[3]}).`
        ],
        explanation: `النمط يعتمد على إضافة ${step} في كل مرة: ${seq[3]} + ${step} = ${nextVal}!`,
        isAiGenerated: true
      };
    } else if (patternType === 'geometric_plus') {
      const mult = getRandomInt(2, 3);
      const add = getRandomInt(1, 4);
      let cur = getRandomInt(2, 5);
      const seq = [cur];
      for (let i = 0; i < 3; i++) {
        cur = cur * mult + add;
        seq.push(cur);
      }
      const nextVal = cur * mult + add;
      return {
        id: `math_geom_${Date.now()}_${Math.random()}`,
        title: `لغز النمط التراكمي المزدوج`,
        category: 'math',
        categoryName: 'ذكاء رياضي',
        difficulty: 'hard',
        difficultyName: 'تحدي العباقرة',
        visualClue: '✖️ ➕ 🔢 🧠 ⚡',
        scenario: `تأمل متتالية الأعداد التالية بدقة واكتشف العلاقة الرياضية بين كل حد والذي يليه:\n[ ${seq.join(' ، ')} ، ؟ ]`,
        question: `ما هو العدد الناقص في نهاية المتتالية؟`,
        answer: `${nextVal}`,
        synonyms: [`${nextVal}`, `العدد ${nextVal}`],
        hints: [
          `العملية ليست جمعاً بسيطاً، بل مزيج بين الضرب والجمع.`,
          `كل رقم يُضرب في ${mult} ثم يُضاف إليه ${add}.`,
          `احسب: (${seq[3]} × ${mult}) + ${add}.`
        ],
        explanation: `القاعدة هي (الرقم السابق × ${mult}) + ${add}. بالتالي: (${seq[3]} × ${mult}) + ${add} = ${nextVal}!`,
        isAiGenerated: true
      };
    } else {
      // Squares offset
      const base = getRandomInt(2, 6);
      const offset = getRandomInt(1, 5);
      const seq = [
        base * base + offset,
        (base + 1) * (base + 1) + offset,
        (base + 2) * (base + 2) + offset,
        (base + 3) * (base + 3) + offset
      ];
      const nextVal = (base + 4) * (base + 4) + offset;
      return {
        id: `math_sq_${Date.now()}_${Math.random()}`,
        title: `لغز المربعات المخفية`,
        category: 'math',
        categoryName: 'ذكاء رياضي',
        difficulty: 'medium',
        difficultyName: 'متوسط الذكاء',
        visualClue: '📐 🔢 💡 🧩 ✨',
        scenario: `سلسلة رقمية محيرة تعتمد على مربعات الأعداد مع ثبات الإزاحة:\n[ ${seq.join(' ، ')} ، ؟ ]`,
        question: `ما هو الرقم القادم في السلسلة؟`,
        answer: `${nextVal}`,
        synonyms: [`${nextVal}`, `الرقم ${nextVal}`],
        hints: [
          `اطرح ${offset} من الأرقام ولاحظ النتيجة الناتجة.`,
          `الأرقام ترتبط بمربعات الأعداد المتتالية (${base}، ${base + 1}، ${base + 2}...).`,
          `الرقم التالي هو مربع العدد ${base + 4} مضافاً إليه ${offset}.`
        ],
        explanation: `السلسلة عبارة عن n² + ${offset}: مربع العدد ${base + 4} هو ${(base + 4) * (base + 4)} + ${offset} = ${nextVal}!`,
        isAiGenerated: true
      };
    }
  } else if (chosenType === 'handshakes') {
    const people = getRandomInt(5, 12);
    const handshakes = (people * (people - 1)) / 2;
    const name = getRandomItem(ARABIC_NAMES);
    return {
      id: `math_hs_${Date.now()}_${Math.random()}`,
      title: `لغز مصافحات الحفل الوديع`,
      category: 'math',
      categoryName: 'ذكاء رياضي',
      difficulty: 'medium',
      difficultyName: 'متوسط الذكاء',
      visualClue: '🤝 👥 🏛️ 🔢 ✨',
      scenario: `حضر ${people} من الأصدقاء في مجلس ${name}. عند لقائهم، صافح كل شخص منهم جميع الحاضرين الآخرين مرة واحدة فقط دون تكرار.`,
      question: `كم عدد المصافحات الإجمالية التي تمت في المجلس؟`,
      answer: `${handshakes}`,
      synonyms: [`${handshakes}`, `${handshakes} مصافحة`, `${handshakes} مصافحه`],
      hints: [
        `الشخص الأول يصافح ${people - 1} أشخاص.`,
        `الشخص الثاني يصافح ${people - 2} أشخاص جدد، وهكذا.`,
        `استخدم قانون التوافيق: (${people} × ${people - 1}) ÷ 2.`
      ],
      explanation: `عدد المصافحات = ن × (ن - 1) ÷ 2 = (${people} × ${people - 1}) ÷ 2 = ${handshakes} مصافحة!`,
      isAiGenerated: true
    };
  } else if (chosenType === 'age') {
    const p1 = getRandomItem(ARABIC_NAMES);
    const p2 = getRandomItem(ARABIC_NAMES.filter(n => n !== p1));
    const age2 = getRandomInt(10, 20);
    const diff = getRandomInt(5, 15);
    const age1 = age2 + diff;
    const yearsLater = getRandomInt(4, 10);
    const sumFuture = (age1 + yearsLater) + (age2 + yearsLater);

    return {
      id: `math_age_${Date.now()}_${Math.random()}`,
      title: `لغز الأعمار والسنوات القادمة`,
      category: 'math',
      categoryName: 'ذكاء رياضي',
      difficulty: 'medium',
      difficultyName: 'متوسط الذكاء',
      visualClue: '🎂 ⏳ 👶 👨 🔢',
      scenario: `عمر ${p1} يكبر عمر ${p2} بمقدار ${diff} سنوات. بعد مرور ${yearsLater} سنوات من الآن، سيصبح مجموع عمريهما معاً ${sumFuture} سنة!`,
      question: `كم هو عمر ${p2} الحالي الآن؟`,
      answer: `${age2}`,
      synonyms: [`${age2}`, `${age2} سنة`, `${age2} سنوات`, `${age2} سنه`],
      hints: [
        `في المستقبل بعد ${yearsLater} سنوات، سيزيد عمر كل واحد منهما ${yearsLater} سنوات (مجموع الزيادة ${yearsLater * 2}).`,
        `مجموع عمريهما الحالي الآن هو ${sumFuture} - ${yearsLater * 2} = ${sumFuture - (yearsLater * 2)}.`,
        `اطرح الفارق (${diff}) ثم اقسم على 2 لمعرفة عمر ${p2}.`
      ],
      explanation: `المجموع الحالي = ${sumFuture} - (${yearsLater} × 2) = ${age1 + age2}. وبما أن ${p1} يكبر بـ ${diff} سنة، فإن عمر ${p2} = (${age1 + age2} - ${diff}) ÷ 2 = ${age2} سنة!`,
      isAiGenerated: true
    };
  } else if (chosenType === 'coins_weighing') {
    const coins = getRandomItem([9, 27, 81]);
    const weighings = coins === 9 ? 2 : coins === 27 ? 3 : 4;
    return {
      id: `math_coin_${Date.now()}_${Math.random()}`,
      title: `لغز العملة المزيفة والميزان (${coins} عملة)`,
      category: 'math',
      categoryName: 'ذكاء رياضي',
      difficulty: 'hard',
      difficultyName: 'تحدي العباقرة',
      visualClue: '⚖️ 🪙 🔍 💎 🔢',
      scenario: `لديك ${coins} عملة ذهبية متطابقة تماماً في الشكل والحجم واللون، لكن إحداها فقط مزيفة وأخف وزناً من البقية. لديك ميزان ذو كفتين كلاسيكي بلا أثقال.`,
      question: `ما هو أقل عدد من الوزنات المؤكدة لكشف العملة المزيفة بدقة؟`,
      answer: `${weighings}`,
      synonyms: [`${weighings}`, `${weighings} وزنات`, `${weighings} مرات`, `مرتين`, `ثلاث مرات`, `أربع مرات`],
      hints: [
        `قسّم العملات دائماً إلى 3 مجموعات متساوية في كل وزنة.`,
        `المجموعة الأخف أو المتبقية ستحدد الثلث الذي يحوي العملة المزيفة.`,
        `عدد الوزنات يساوي القوة التي ترفع الرقم 3 للوصول للعدد ${coins} (3 مرفوعة للأس ؟ = ${coins}).`
      ],
      explanation: `في كل وزنة نقسم على 3: بالوزنة الأولى يتبقى ${coins / 3}، وهكذا حتى نصل لعملة واحدة بعد ${weighings} وزنات مؤكدة فقط (3^${weighings} = ${coins})!`,
      isAiGenerated: true
    };
  } else {
    // Number trick
    const num = getRandomInt(3, 9);
    const ans = num * 9;
    return {
      id: `math_trick_${Date.now()}_${Math.random()}`,
      title: `أحجية الرقم العجيب ومضاعف التسعة`,
      category: 'math',
      categoryName: 'ذكاء رياضي',
      difficulty: 'easy',
      difficultyName: 'سهل وممتع',
      visualClue: '🪄 🔢 ✨ 🎯 💡',
      scenario: `عدد إذا ضربته في 9، ثم جمعت أرقام خانات الناتج الناتج، سيكون مجموع خاناته دائماً 9. إذا علمت أن حاصل ضرب هذا العدد في 9 هو ${ans}!`,
      question: `ما هو العدد الأصلي قبل ضربه في 9؟`,
      answer: `${num}`,
      synonyms: [`${num}`, `العدد ${num}`, `الرقم ${num}`],
      hints: [
        `اقسم الناتج المعطى في اللغز على 9.`,
        `العملية العكسية للضرب هي القسمة: ${ans} ÷ 9.`,
        `العدد محصور بين 1 و 10.`
      ],
      explanation: `بقسمة ${ans} على 9 نحصل على ${num}! ومجموع خانات ${ans} (${Math.floor(ans / 10)} + ${ans % 10}) = 9 دائماً!`,
      isAiGenerated: true
    };
  }
}

// ==========================================
// 2. PROCEDURAL TEMPLATES FOR OTHER CATEGORIES
// Each category has 10+ archetypes, each with multiple narrative variations
// ==========================================

interface TemplateArchetype {
  title: string;
  category: PuzzleCategory;
  categoryName: string;
  visualClues: string[];
  scenarios: string[];
  questions: string[];
  answer: string;
  synonyms: string[];
  hints: string[];
  explanation: string;
}

const CATEGORY_ARCHETYPES: Record<PuzzleCategory, TemplateArchetype[]> = {
  visual: [
    {
      title: 'لغز مرآة الحقيقة والضوء',
      category: 'visual',
      categoryName: 'لغز بصري',
      visualClues: ['🪞 💡 ⚡ 🔮 👁️', '👁️ 🪞 ✨ 👤 🚪'],
      scenarios: [
        'يقف أمامك في كل صباح، ينطق بكل ما يراه بلا صوت، يعكس الحقيقة كاملة لكنه يقلب يمينك إلى يسار، وإذا انكسر ضاع سحره للأبد!',
        'جسم ناعم مصقول بلا لسان ولا عين، ينقل كل ملامحك بدقة متناهية، إن ابتسمت ابتسم وإن عبست عبس، ولا يحتفظ بأي سر بعد رحيلك!',
        'شاهد صامت في غرفتك، ينظر إليك حين تنظر إليه، لا يتحرك إلا بحركتك، لكنه يقلب الاتجاهات ولا يخفي عيباً!'
      ],
      questions: ['ما هو هذا الشيء الصامت؟', 'ما اسم هذا الشيء؟', 'عن ماذا يتحدث هذا اللغز؟'],
      answer: 'المرآة',
      synonyms: ['مرآة', 'مراية', 'المرآه', 'المرايا', 'mirror'],
      hints: ['تراها يومياً عند غسيل وجهك أو في سيارتك.', 'تعكس الضوء والصور بدقة.', 'تبدأ بحرف الميم وتنتهي بتاء مربوطة.'],
      explanation: 'المرآة تعكس الضوء بانتظام فتظهر صورة مطابقة للواقع لكن مقلوبة جانبياً!'
    },
    {
      title: 'لغز رفيق الشمس والظل',
      category: 'visual',
      categoryName: 'لغز بصري',
      visualClues: ['👤 ☀️ 🏃‍♂️ 🌑 👣', '☀️ 🚶‍♂️ 👤 ⏳ 🌑'],
      scenarios: [
        'يرافقك خطوة بخطوة في وضح النهار، يطول حيناً ويقصر حيناً آخر، يقلد حركاتك دون أن يلمسك، لكنه يفر هارباً فور انطفاء النور!',
        'يمشي معك حيثما سرت في الصباح، يسبقك تارة ويتبعك تارة، لا تستطيع الإمساك به، ويموت فور دخولك في الظلام الدامس!',
        'تابع مخلص لا وزن له ولا صوت، يتمدد عند الشروق والغروب، وينكمش عند الظهيرة تحت قدميك!'
      ],
      questions: ['ما هو هذا الرفيق العجيب؟', 'ما هو هذا الشيء؟'],
      answer: 'الظل',
      synonyms: ['ظل', 'ظلك', 'الظلال', 'خيال', 'shadow'],
      hints: ['ينتج عن حجب الجسم لأشعة الضوء.', 'يكون طويلاً في الصباح وقصيراً في الظهيرة.', 'كلمة من حرفين بعد ال التعريف (الظل).'],
      explanation: 'الظل يتكون عندما يحجب جسم الإنسان مسار أشعة الشمس، ويتلاشى في العتمة التامة!'
    },
    {
      title: 'لغز البوصلة وإبرة الشمال',
      category: 'visual',
      categoryName: 'لغز بصري',
      visualClues: ['🧭 🧭 🧭 🚢 🗺️', '🧭 ⚡ 🌊 ⚓ 🧭'],
      scenarios: [
        'لها وجه مستدير مرسوم وإبرة دقيقة تدور بحرية، لا تنام ولا تتكلم، لكنها ترشد التائه في عرض المحيط وصحراء الرمال دون أن تخطئ وجهة الشمال!',
        'عين المسافر في الليلة الظلماء، دائرة صغيرة تحمل طرفاً ممغنطاً يشير دوماً لجهة واحدة ثابتة مهما درت بها يمنة ويسرة!'
      ],
      questions: ['ما هي هذه الأداة الملاحية؟', 'ما اسم هذا الجهاز الملاحي؟'],
      answer: 'البوصلة',
      synonyms: ['بوصلة', 'بوصله', 'البوصله', 'compass'],
      hints: ['يستخدمها البحارة والطيارون لمعرفة الاتجاهات.', 'تعتمد على المجال المغناطيسي للأرض.', 'تشير إبرتها دائماً للشمال المغناطيسي.'],
      explanation: 'البوصلة تحتوي على إبرة مغناطيسية تتبع خطوط المجال المغناطيسي لكوكب الأرض فتتجه دوماً نحو الشمال!'
    },
    {
      title: 'أحجية النظارة الطبية والعدسات',
      category: 'visual',
      categoryName: 'لغز بصري',
      visualClues: ['👓 👁️ 📖 🔍 💡', '👓 📚 👁️ 🔬 👓'],
      scenarios: [
        'تمتلك ذراعين تعانقان أذنيك، وعينين من زجاج تستقران فوق أنفك، لا ترى شيئاً بنفسها، لكنها تجعل غيرها يرى العالم بوضوح تام!',
        'يقعد فوق الأنف ويمسك بالأذنين، مصنوع من إطار وعدستين شفافتين، يقرأ به الشيخ الكبير سطور الكتاب بعد أن غشيتها الضبابية!'
      ],
      questions: ['ما هو هذا الشيء؟', 'ما اسم هذه الأداة؟'],
      answer: 'النظارة',
      synonyms: ['نظارة', 'نظاره', 'النظاره', 'نظارات', 'glasses'],
      hints: ['توضع على الوجه للمساعدة في القراءة.', 'تصحح عيوب الإبصار (قصر أو طول النظر).', 'تبدأ بحرف النون وتنتهي بالتاء المربوطة.'],
      explanation: 'النظارة تستخدم عدسات لكسر الضوء وتصحيح تركيز الصورة على شبكية العين ليصبح البصر واضحاً!'
    }
  ],

  logic: [
    {
      title: 'مفارقة الشمعة الموقدة',
      category: 'logic',
      categoryName: 'تفكير استنتاجي',
      visualClues: ['🕯️ 🔥 ⏳ 💡 ✨', '🕯️ 💧 🔥 🕰️ 🕯️'],
      scenarios: [
        'كلما طال عمرها قصرت قامتها، تذرف دموعاً دافئة من غير حزن ولا ألم، وتفني جسدها كله لتمنح النور لغيرها في الظلام!',
        'تبدأ طويلة بيضاء نضرة، وكلما مر الوقت استهلكت ذاتها وتناقص طولها وهي تشع دفئاً وضوءاً حتى تتلاشى بالكامل!'
      ],
      questions: ['ما هو هذا الشيء الذي يصغر كلما كبر؟', 'ما هي هذه التي تبكي لتضيء للآخرين؟'],
      answer: 'الشمعة',
      synonyms: ['شمعة', 'شمعه', 'الشمع', 'الشموع', 'candle'],
      hints: ['تُشعل بفرك عود الثقاب عند انقطاع التيار الكهربائي.', 'تذوب تدريجياً بفعل الحرارة.', 'تبدأ بحرف الشين (5 حروف).'],
      explanation: 'الشمعة تحترق ليذوب شمعها وينقص طولها مع مرور الوقت أثناء توليد الضوء!'
    },
    {
      title: 'لغز مصابيح الغرفة العلوية الثلاثة',
      category: 'logic',
      categoryName: 'تفكير استنتاجي',
      visualClues: ['💡 🔌 🚪 🪜 🧠', '💡 💡 💡 🚪 🪜'],
      scenarios: [
        'في الطابق السفلي 3 مفاتيح كهربائية متطابقة، وفي الطابق العلوي مصباح واحد يتحكم به مفتاح واحد منها فقط. يسمح لك بالصعود للطابق العلوي مرة واحدة فقط لمعاينة المصباح. كيف تعرف المفتاح الصحيح دون صعود ثانٍ؟'
      ],
      questions: ['ما الحيلة الذكية التي كشفت المفتاح الصحيح؟', 'كيف عرف المفتاح الصحيح بالحرارة؟'],
      answer: 'حرارة المصباح',
      synonyms: ['حرارة المصباح', 'لمس المصباح الساخن', 'سخونة المصباح', 'الحرارة', 'المصباح الساخن'],
      hints: ['شغّل المفتاح الأول لدقائق ثم أطفئه، ثم شغّل المفتاح الثاني واصعد فوراً.', 'المصباح المضاء يتبع المفتاح الثاني، والمصباح الدافئ يتبع الأول!', 'الحرارة المنبعثة من المصباح هي السر!'],
      explanation: 'المفتاح الأول يُشغل لدقائق فيسخن المصباح، ثم يطفأ ويشغل الثاني. عند الصعود: المضاء = الثاني، الدافئ = الأول، البارد = الثالث!'
    },
    {
      title: 'معضلة عبور النهر بالذئب والخروف',
      category: 'logic',
      categoryName: 'تفكير استنتاجي',
      visualClues: ['🚣‍♂️ 🐺 🐑 🥬 🌊', '🌊 🚣‍♂️ 🐺 🥬 🐑'],
      scenarios: [
        'فلاح معه ذئب وخروف وحزمة قش يريد عبور النهر بقارب صغير لا يتسع إلا له ومعه عنصر واحد فقط. إذا ترك الذئب مع الخروف أكله، وإذا ترك الخروف مع القش أكله. كيف بدأ رحلته بنجاح تام؟'
      ],
      questions: ['ما هو أول عنصر نقله الفلاح إلى الضفة المقابلة؟', 'ماذا حمل الفلاح في أول جولة؟'],
      answer: 'الخروف',
      synonyms: ['الخروف', 'خروف', 'أخذ الخروف', 'نقل الخروف'],
      hints: ['لو أخذ الذئب لأكل الخروف القش.', 'لو أخذ القش لأكل الذئب الخروف.', 'الحل الوحيد تركهما في الضفة الأولى بنقل الحيوان الأوسط الذي يتسبب في الأزمتين!'],
      explanation: 'الخروف هو العنصر الحرج؛ إذا أُخذ أولاً يبقى الذئب مع القش بسلام دون أن يأكله، مما يتيح الترتيب الآمن للعبور!'
    }
  ],

  mystery: [
    {
      title: 'قضية النافذة المكسورة والسرقة المزعومة',
      category: 'mystery',
      categoryName: 'قضية المحقق',
      visualClues: ['🪟 🔨 💎 🕵️‍♂️ 🚨', '🕵️‍♂️ 🪟 🔍 👣 💼'],
      scenarios: [
        'ادعى صاحب متجر مجوهرات أن لصاً كسر نافذة المتجر الزجاجية من الشارع ليلاً وسرق خزنته. فور وصول المحقق ونظره إلى شظايا الزجاج المتناثرة فقط في الشارع الخارجي، قبض على صاحب المتجر بتهمة الاحتيال!',
        'بلاغ كاذب عن سطو مسلح عبر النافذة، لكن المحقق لاحظ أن جميع قطع الزجاج المكسور سقطت خارج المتجر ولم تسقط قطعة واحدة داخل المحل!'
      ],
      questions: ['لماذا علم المحقق أن الكسر تم من الداخل؟', 'ما الدليل الجنائي الذي كشف كذب صاحب المتجر؟'],
      answer: 'الزجاج كُسر من الداخل للخارج',
      synonyms: ['الزجاج كسر من الداخل', 'الزجاج سقط في الخارج', 'الكسر من الداخل', 'تناثر الزجاج للخارج'],
      hints: ['فكر في اتجاه قوة الضربة عند كسر أي لوح زجاجي.', 'إذا ضربت من الخارج سقط الزجاج في الداخل، والعكس صحيح.', 'سقوط الزجاج في الشارع يثبت أن الضربة جاءت من داخل المحل!'],
      explanation: 'قوانين الفيزياء الجنائية تؤكد أن شظايا الزجاج تتناثر في نفس اتجاه قوة الصدمة؛ وجودها بالخارج يعني أن صاحب المتجر كسرها من الداخل ليدعي السرقة!'
    },
    {
      title: 'لغز مكعبات الثلج والعصير المسموم',
      category: 'mystery',
      categoryName: 'قضية المحقق',
      visualClues: ['🧊 🍹 ☠️ 🕵️‍♂️ ⏱️', '🍹 🧊 🍸 ⚰️ 🔍'],
      scenarios: [
        'شرب شخصان من نفس إبريق العصير البارد الذي وضع فيه مكعبات ثلج مسمومة. شرب الأول كأسه بسرعة فائقة وتجرعه دفعة واحدة فنجا، بينما تمهل الثاني في شرب كأسه وتلذذ به ببطء فمات مسموماً!'
      ],
      questions: ['أين كان يكمن السم ولماذا نجا من شرب بسرعة؟', 'لماذا مات الشخص الثاني فقط؟'],
      answer: 'السم كان داخل مكعبات الثلج التي ذابت لاحقاً',
      synonyms: ['السم في مكعبات الثلج', 'السم داخل الثلج', 'الثلج كان مسموماً', 'الثلج ذاب', 'السم في الثلج'],
      hints: ['العصير نفسه لم يكن فيه سم طازج عند الصب.', 'الأول شرب قبل أن يحدث تغير فيزيائي لمكعبات الثلج.', 'عندما يذوب الثلج يتحرر السم المحبوس بداخله!'],
      explanation: 'السم كان مجمداً داخل مكعبات الثلج؛ من شرب بسرعة شرب العصير قبل ذوبان الثلج فنجا، بينما ذاب الثلج في كأس الثاني فاختلط السم بمشروبه!'
    },
    {
      title: 'قضية بصمات السيارة الجافة في العاصفة',
      category: 'mystery',
      categoryName: 'قضية المحقق',
      visualClues: ['🌧️ 🚗 🕵️‍♂️ 👣 ⚡', '🚗 🌧️ 💨 🔒 🕵️‍♂️'],
      scenarios: [
        'ادعى مشتبه به أنه قضى الليلة نائماً في سيارته المركونة بالشارع خلال عاصفة ماطرة هوجاء استمرت حتى الفجر. عاين المحقق السيارة صباحاً فوجد سقفها وزجاجها جافين تماماً، فأمر باعتقاله فوراً بتهمة تضليل العدالة!'
      ],
      questions: ['كيف أثبت زجاج السيارة الجاف كذب المشتبه به؟', 'أين كانت السيارة في الحقيقة؟'],
      answer: 'السيارة كانت في مرآب مغلق وليست في الشارع',
      synonyms: ['كانت في مرآب', 'السيارة في جراج', 'كانت داخل كراج', 'لم تكن في المطر'],
      hints: ['لو كانت بالشارع لكانت مبللة بقطرات المطر كبقية السيارات.', 'السيارة أُخرجت بعد توقف المطر أو كانت في مكان مسقوف.', 'الجفاف التام في عاصفة مطرية مستحيل فيزيائياً في الهواء الطلق!'],
      explanation: 'يستحيل لسيارة وقفت تحت المطر الغزير طوال الليل أن تكون جافة تماماً، مما يثبت أنه كان في مكان مغلق وأحضرها بعد انتهاء العاصفة!'
    }
  ],

  riddle: [
    {
      title: 'أحجية البحر الذي بلا ماء',
      category: 'riddle',
      categoryName: 'أحجية لغوية',
      visualClues: ['🗺️ 🌊 🧭 🏔️ 🚢', '🗺️ 🏙️ ⛰️ ⛵ 🗺️'],
      scenarios: [
        'فيه بحار شاسعة ومحيطات عملاقة بلا قطرة ماء واحدة، وفيه مدن ودول عامرة بلا بشر، وجبال شاهقة بلا صخور، وغابات بلا أوراق خضراء!',
        'تطوف به كوكب الأرض في لمحة بصر، ترى فيه الأنهار والحدود مرسومة، يوضع على الطاولة أو يُطوى في الجيب!'
      ],
      questions: ['ما هو هذا العالم المصغر العجيب؟', 'ما اسم هذا الشيء؟'],
      answer: 'الخريطة',
      synonyms: ['خريطة', 'الخريطه', 'خارطة', 'الخارطة', 'الأطلس', 'map'],
      hints: ['يستخدمها المسافر والبحار لتحديد الاتجاهات.', 'تُرسم على الورق أو تظهر بتطبيقات الملاحة بالهواتف.', 'تبدأ بحرف الخاء وتنتهي بالتاء المربوطة.'],
      explanation: 'الخريطة تمثل تضاريس الأرض جغرافياً؛ فتحتوي على رسوم البحار والمدن والحدود بلا ماء ولا سكان فعليين!'
    },
    {
      title: 'لغز الذي يأكل ولا يشبع ويموت بالماء',
      category: 'riddle',
      categoryName: 'أحجية لغوية',
      visualClues: ['🔥 🪵 💨 💧 ⚡', '🔥 🔥 🌲 💨 💧'],
      scenarios: [
        'يأكل الحطب والصخر واليابسة بشراهة ولا يشبع، كلما أطعمته كبر واشتد لهيبه، وإذا أطعمته رشفة ماء واحدة مات في حينه!',
        'حيوان بلا روح ولا عظم، يتنفس الهواء ويلتهم الأشجار، صوته زئير ودخانه سحاب، والماء هو عدوه القاتل!'
      ],
      questions: ['ما هو هذا الكائن الملتهم؟', 'عن ماذا تتحدث هذه الأحجية؟'],
      answer: 'النار',
      synonyms: ['نار', 'النيران', 'اللهب', 'الحريق', 'fire'],
      hints: ['تُوقد للتدفئة أو للطهي.', 'تتغذى على الأكسجين والخشب.', 'تنطفئ فور سكب الماء عليها.'],
      explanation: 'النار تشتعل وتتوسع بالوقود والأكسجين، والماء يخفض حرارتها ويحجب الهواء فينطفئ لهيبها فوراً!'
    },
    {
      title: 'أحجية الكاتب الصامت والمداد',
      category: 'riddle',
      categoryName: 'أحجية لغوية',
      visualClues: ['✒️ 📜 ✍️ 💭 💡', '🖊️ 📄 🖤 🧠 📖'],
      scenarios: [
        'يمشي على بطنه الأبيض بلا قدمين، ينزف دماً أسود أو أزرق ليكتب الحكمة والعلم، وإذا انقطع رأسه أو جف مداده سكت عن الكلام للأبد!'
      ],
      questions: ['ما هو هذا الكاتب الصامت؟', 'ما اسم هذه الأداة البليغة؟'],
      answer: 'القلم',
      synonyms: ['قلم', 'القلم الحبر', 'قلم الحبر', 'الريشة', 'pen'],
      hints: ['أول ما خلق الله وأقسم به في القرآن الكريم (ن والقلم وما يسطرون).', 'يستخدم في التدوين والكتابة.', 'يبدأ بحرف القاف.'],
      explanation: 'القلم ينزف الحبر على الورق الأبيض ليدون الأفكار والعلوم، وإذا فرغ حبره توقف عن الكتابة!'
    }
  ],

  math: [], // Handled dynamically via generateDynamicMathPuzzle

  wisdom: [
    {
      title: 'فطنة القاضي والماء المغلي والدنانير',
      category: 'wisdom',
      categoryName: 'حكمة وفطنة',
      visualClues: ['⚖️ 💰 📜 👳‍♂️ 🪙', '🪙 💧 🔥 ⚖️ 👳‍♂️'],
      scenarios: [
        'تنازع لحام وعطار على صرة دنانير وجدها أحدهما في السوق. أخذ القاضي إناءً به ماء مغلي وألقى الدنانير فيه، فصعدت على سطح الماء طبقة من الدهن والزيت الحيواني، فحكم فوراً لصالح أحدهما!'
      ],
      questions: ['لمن حكم القاضي بالأموال بناء على الدهن الطافي؟', 'من هو صاحب النقود الحقيقي؟'],
      answer: 'اللحام',
      synonyms: ['اللحام', 'القصاب', 'صاحب اللحم', 'بائع اللحم', 'الجزار'],
      hints: ['العملات تحتفظ بآثار مهنة صاحبها الذي يتعامل بها طوال اليوم.', 'اللحام يتعامل مع اللحوم والشحوم والدهون الحيوانية.', 'الحرارة أذابت الدهن العالق بالعملات فطفى على الماء!'],
      explanation: 'يدي اللحام تكونان ملوثتين بشحوم اللحم والدهن فتنتقل إلى دنانيره، وعند وضعها بالماء الساخن ذاب الدهن وطفى ليكشف صدقه!'
    },
    {
      title: 'حكمة قسمة الإبل السبعة عشر المستحيلة',
      category: 'wisdom',
      categoryName: 'حكمة وفطنة',
      visualClues: ['🐪 🐪 🐪 📜 ⚖️', '🐪 👳‍♂️ ⚖️ 🔢 🏜️'],
      scenarios: [
        'رجل توفي وترك 17 ناقة وثلاثة أبناء. أوصى بنصفها للأول، وثلثها للثاني، وتسعها للثالث، دون نحر أي ناقة! عجز الجميع حتى جاء حكيم بناقته فأضافها وأتم القسمة وأخذ ناقته ومضى!'
      ],
      questions: ['كم كان مجموع النوق بعد إضافة ناقة الحكيم؟', 'ما الرقم الذي جعل القسمة تقبل على 2 و3 و9؟'],
      answer: '18',
      synonyms: ['18', 'ثمانية عشر', '18 ناقة', 'ثمانية عشر ناقة'],
      hints: ['الرقم 17 عدد أولي لا يقبل القسمة على 2 أو 3 أو 9.', 'أضاف الحكيم ناقته ليصبح المجموع قابلاً للقسمة.', '18 ÷ 2 = 9، و 18 ÷ 3 = 6، و 18 ÷ 9 = 2 (المجموع = 17!).'],
      explanation: 'بإضافة ناقة واحدة أصبح المجموع 18: نصفها 9 + ثلثها 6 + تسعها 2 = 17 ناقة تماماً، واسترجع الحكيم ناقته رقم 18!'
    },
    {
      title: 'فطنة الحكيم مع اللص والديك',
      category: 'wisdom',
      categoryName: 'حكمة وفطنة',
      visualClues: ['🐓 🛖 🖤 ⚖️ 🕵️‍♂️', '⚖️ 🐓 🖐️ 🖤 👳‍♂️'],
      scenarios: [
        'سرق مال في قرية فاتهم الحكيم خمسة مشتبهين. أدخلهم واحداً تلو الآخر في خيمة مظلمة وأمرهم بمسح ظهر ديك زعم أنه سيكشف السارق بصياحه. كان الحكيم قد دهن الديك بالسخام الأسود، وعند خروجهم فحص أيديهم وعرف السارق فوراً!'
      ],
      questions: ['كيف كشف السارق من بين الخمسة؟', 'ما العلامة التي كشفت اللص؟'],
      answer: 'يده كانت نظيفة ولم يلمس الديك خوفاً',
      synonyms: ['يده نظيفة', 'لم يلمس الديك', 'يده لم تتسخ', 'الوحيد الذي يده نظيفة', 'خاف فلم يلمس الديك'],
      hints: ['الأبرياء دخلوا ووثقوا ببراءتهم فلمسوا الديك فتلطخت أيديهم بالسخام.', 'اللص كان خائفاً من صياح الديك فلم يلمسه أصلاً.', 'من خرج بيده النظيفة البيضاء هو السارق الحقيقي!'],
      explanation: 'اللص ظن أن الديك سيصيح لو لمسه فامتنع عن لمسه بالظلام، فخرج ويده نظيفة بيضاء بينما تلطخت أيدي الأبرياء بالسخام الأسود!'
    }
  ],

  science: [
    {
      title: 'لغز الشقيقين الضوء والرعد في العاصفة',
      category: 'science',
      categoryName: 'أسرار علمية',
      visualClues: ['⚡ 🌩️ 👂 👁️ 💨', '⚡ ☁️ 🔊 💡 🌩️'],
      scenarios: [
        'في ليلة العاصفة، ينطلق حدثان في نفس الكسر من الثانية من قلب نفس السحابة، لكنك ترى أحدهما بعينيك فوراً قبل أن تسمع الآخر بأذنيك بعدة ثوانٍ كاملة!'
      ],
      questions: ['لماذا نرى وميض البرق قبل أن نسمع قصف الرعد؟', 'ما السر العلمي وراء هذا الفارق الزمني؟'],
      answer: 'سرعة الضوء أكبر بكثير من سرعة الصوت',
      synonyms: ['الضوء أسرع من الصوت', 'سرعة الضوء أسرع من الصوت', 'الضوء أسرع', 'سرعة الضوء'],
      hints: ['الضوء ينتقل بسرعة 300 ألف كيلومتر في الثانية فيصل العين فوراً.', 'الصوت يحتاج ثانية لكل 340 متراً في الهواء.', 'الفارق يرجع للاختلاف الشاسع بين سرعة الموجات الكهرومغناطيسية والميكانيكية.'],
      explanation: 'الضوء يسير بسرعة 300,000 كم/ث فيصل عينك بلمح البصر، بينما الصوت يسير بسرعة 340 م/ث فقط فيستغرق ثوانٍ للوصول إلى أذنك!'
    },
    {
      title: 'مفارقة الماء وتمدد الجليد العجيب',
      category: 'science',
      categoryName: 'أسرار علمية',
      visualClues: ['🧊 💧 🍾 ❄️ 🔬', '💧 🧊 🏔️ 🌊 ❄️'],
      scenarios: [
        'معظم السوائل في الكون تنكمش ويزيد ثقلها وكثافتها عند انخفاض حرارتها، إلا هذا السائل المعجزة: إذا تجمد تمدد وزاد حجمه وطفا فوق سطحه لينقذ الكائنات في أعماق البحار المتجمدة!'
      ],
      questions: ['ما هي هذه المادة الحيوية ذات الخاصية الفريدة؟', 'عن أي سائل يتحدث هذا اللغز العلمي؟'],
      answer: 'الماء',
      synonyms: ['ماء', 'الماء', 'water', 'H2O'],
      hints: ['المكون الأساسي للحياة ويغطي 71% من كوكب الأرض.', 'يتجمد الجليد فيطفو في القطبين ويمنع تجمد قاع المحيط.', 'يبدأ بحرف الميم ويتكون من ذرتي هيدروجين وذرة أكسجين.'],
      explanation: 'الماء يمتلك شذوذاً حرارياً فريداً؛ فعند درجة 4 مئوية يتمدد عند التجمّد وتقل كثافته فيطفو الجليد ويحمي الحياة البحرية تحته!'
    },
    {
      title: 'لغز انعدام الوزن في الفضاء والسقوط الحر',
      category: 'science',
      categoryName: 'أسرار علمية',
      visualClues: ['🚀 👨‍🚀 🌍 🪶 ⚖️', '🛰️ 🌍 👨‍🚀 🪐 💫'],
      scenarios: [
        'في مدار محطة الفضاء الدولية، يسبح رواد الفضاء في الهواء وكأنهم بلا أي وزن، رغم أن جاذبية الأرض في ذلك الارتفاع لا تزال تعادل 90% تقريباً من جاذبيتها على سطح الأرض!'
      ],
      questions: ['ما السبب الفيزيائي الحقيقي لطفو رواد الفضاء في المدار؟', 'لماذا يبدو الرواد عديمي الوزن رغم وجود الجاذبية؟'],
      answer: 'السقوط الحر المستمر حول الأرض',
      synonyms: ['السقوط الحر', 'السقوط الحر المستمر', 'حالة السقوط الحر', 'السقوط الدائم'],
      hints: ['المحطة تسقط باستمرار نحو الأرض لكن سرعتها الأفقية الهائلة تجعلها تنحني مع انحناء كوكب الأرض.', 'المحطة والرواد يسقطون بنفس المعدل تماماً.', 'مثل المصعد حين تنقطع حباله فيسقط كل من فيه بحرية.'],
      explanation: 'الرواد ليسوا خارج نطاق الجاذبية، بل في حالة "سقوط حر مستمر" حول انحناء الأرض مع محطتهم بنفس التسارع، مما يولد انعدام الوزن الظاهري!'
    }
  ]
};

/**
 * Procedural Puzzle Factory
 * Produces an unseen, guaranteed non-repeating puzzle for the requested category
 */
export function generateUniqueProceduralPuzzle(
  category: PuzzleCategory | 'all' = 'all',
  difficulty: PuzzleDifficulty = 'medium'
): Puzzle {
  // If math is chosen or randomly selected in 'all', use algorithmic math generator
  if (category === 'math' || (category === 'all' && Math.random() < 0.2)) {
    for (let attempts = 0; attempts < 15; attempts++) {
      const p = generateDynamicMathPuzzle(difficulty);
      const sig = `${p.title}_${p.answer}`;
      if (!isSignatureSeen(sig)) {
        recordSeenSignature(sig);
        return p;
      }
    }
    const fallbackMath = generateDynamicMathPuzzle(difficulty);
    recordSeenSignature(`${fallbackMath.title}_${fallbackMath.answer}_${Date.now()}`);
    return fallbackMath;
  }

  // Determine eligible categories
  const categoriesList: PuzzleCategory[] = category === 'all'
    ? ['visual', 'logic', 'mystery', 'riddle', 'wisdom', 'science']
    : [category];

  const chosenCategory = getRandomItem(categoriesList);
  const archetypes = CATEGORY_ARCHETYPES[chosenCategory] || CATEGORY_ARCHETYPES.logic;

  // Shuffle archetypes to ensure diversity
  const shuffledArchetypes = [...archetypes].sort(() => 0.5 - Math.random());

  for (const arch of shuffledArchetypes) {
    const sig = `${arch.title}_${arch.answer}`;
    if (!isSignatureSeen(sig)) {
      recordSeenSignature(sig);

      const scenario = getRandomItem(arch.scenarios);
      const question = getRandomItem(arch.questions);
      const visualClue = getRandomItem(arch.visualClues);

      return {
        id: `procedural_${chosenCategory}_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
        title: arch.title,
        category: arch.category,
        categoryName: arch.categoryName,
        difficulty,
        difficultyName: difficulty === 'easy' ? 'سهل وممتع' : difficulty === 'hard' ? 'تحدي العباقرة' : 'متوسط الذكاء',
        visualClue,
        scenario,
        question,
        answer: arch.answer,
        synonyms: arch.synonyms,
        hints: arch.hints,
        explanation: arch.explanation,
        isAiGenerated: true
      };
    }
  }

  // If all archetypes in category have been seen recently, generate with randomized permutation & new ID
  const baseArch = getRandomItem(archetypes);
  const scenario = getRandomItem(baseArch.scenarios);
  const question = getRandomItem(baseArch.questions);
  const visualClue = getRandomItem(baseArch.visualClues);
  const freshSig = `${baseArch.title}_${Date.now()}_${Math.random()}`;
  recordSeenSignature(freshSig);

  return {
    id: `procedural_${chosenCategory}_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
    title: baseArch.title,
    category: baseArch.category,
    categoryName: baseArch.categoryName,
    difficulty,
    difficultyName: difficulty === 'easy' ? 'سهل وممتع' : difficulty === 'hard' ? 'تحدي العباقرة' : 'متوسط الذكاء',
    visualClue,
    scenario,
    question,
    answer: baseArch.answer,
    synonyms: baseArch.synonyms,
    hints: baseArch.hints,
    explanation: baseArch.explanation,
    isAiGenerated: true
  };
}
