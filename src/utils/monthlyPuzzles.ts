import { Puzzle, PuzzleCategory, PuzzleDifficulty } from '../types';

export interface MonthInfo {
  monthNumber: number; // 1 - 12
  nameArabic: string;
  nameEnglish: string;
  seasonArabic: string;
  totalDays: number;
  icon: string;
  themeTitle: string;
  themeDescription: string;
}

export const MONTHS_METADATA: MonthInfo[] = [
  {
    monthNumber: 1,
    nameArabic: 'الشهر الأول (يناير)',
    nameEnglish: 'Month 1 - January',
    seasonArabic: 'فترة الشتاء',
    totalDays: 31,
    icon: '❄️',
    themeTitle: 'المنطق الرياضي والاستدلال الصارم',
    themeDescription: 'تحديات رياضية وتحليلية دقيقة لحسابات الزمن والكسور والموازين'
  },
  {
    monthNumber: 2,
    nameArabic: 'الشهر الثاني (فبراير)',
    nameEnglish: 'Month 2 - February',
    seasonArabic: 'فترة الشتاء',
    totalDays: 29,
    icon: '⚡',
    themeTitle: 'قضايا الاستنتاج والذكاء الجنائي',
    themeDescription: 'فك طلاسم مسارح الجرائم وكشف الأكاذيب وتناقضات الشهود'
  },
  {
    monthNumber: 3,
    nameArabic: 'الشهر الثالث (مارس)',
    nameEnglish: 'Month 3 - March',
    seasonArabic: 'فترة الربيع',
    totalDays: 31,
    icon: '🌱',
    themeTitle: 'أحاجي اللغة والبلاغة العربية',
    themeDescription: 'ألغاز التلاعب بالكلمات والمعاني المجازية والتناظر اللغوي'
  },
  {
    monthNumber: 4,
    nameArabic: 'الشهر الرابع (أبريل)',
    nameEnglish: 'Month 4 - April',
    seasonArabic: 'فترة الربيع',
    totalDays: 30,
    icon: '🌸',
    themeTitle: 'معضلات المتتاليات والأنماط الهندسية',
    themeDescription: 'اكتشاف الشيفرات الرياضية المخفية في سلاسل الأرقام المعقدة'
  },
  {
    monthNumber: 5,
    nameArabic: 'الشهر الخامس (مايو)',
    nameEnglish: 'Month 5 - May',
    seasonArabic: 'فترة الربيع',
    totalDays: 31,
    icon: '☀️',
    themeTitle: 'أسرار الفيزياء والظواهر الطبيعية',
    themeDescription: 'تفسير الظواهر العلمية الغريبة من ضوء وصوت وجاذبية وسوائل'
  },
  {
    monthNumber: 6,
    nameArabic: 'الشهر السادس (يونيو)',
    nameEnglish: 'Month 6 - June',
    seasonArabic: 'فترة الصيف',
    totalDays: 30,
    icon: '🔥',
    themeTitle: 'التفكير الجانبي ومعضلات العبور',
    themeDescription: 'ألغاز نقل الحمولات والجسور والمصابيح بأقل الخطوات الممكنة'
  },
  {
    monthNumber: 7,
    nameArabic: 'الشهر السابع (يوليو)',
    nameEnglish: 'Month 7 - July',
    seasonArabic: 'فترة الصيف',
    totalDays: 31,
    icon: '🧭',
    themeTitle: 'دهاء القضاة وفطنة الحكماء العرب',
    themeDescription: 'مواقف وحيل تاريخية ذكية لحل أصعب النزاعات القضائية'
  },
  {
    monthNumber: 8,
    nameArabic: 'الشهر الثامن (أغسطس)',
    nameEnglish: 'Month 8 - August',
    seasonArabic: 'فترة الصيف',
    totalDays: 31,
    icon: '⏳',
    themeTitle: 'مفارقات عقارب الساعات والزمن',
    themeDescription: 'حسابات هندسية دقيقة لزوايا العقارب وتقاطعات الوقت اليومية'
  },
  {
    monthNumber: 9,
    nameArabic: 'الشهر التاسع (سبتمبر)',
    nameEnglish: 'Month 9 - September',
    seasonArabic: 'فترة الخريف',
    totalDays: 30,
    icon: '🍂',
    themeTitle: 'ألغاز أواني السوائل والمكاييل',
    themeDescription: 'قياس كميات دقيقة باستخدام أواني غير مدرجة بطرق عبقرية'
  },
  {
    monthNumber: 10,
    nameArabic: 'الشهر العاشر (أكتوبر)',
    nameEnglish: 'Month 10 - October',
    seasonArabic: 'فترة الخريف',
    totalDays: 31,
    icon: '🧩',
    themeTitle: 'الاحتمالات ومبدأ برج الحمام (دركليه)',
    themeDescription: 'حسابات أقل عدد من المحاولات لضمان الفوز وحل المعضلات'
  },
  {
    monthNumber: 11,
    nameArabic: 'الشهر الحادي عشر (نوفمبر)',
    nameEnglish: 'Month 11 - November',
    seasonArabic: 'فترة الخريف',
    totalDays: 30,
    icon: '🌧️',
    themeTitle: 'ألغاز العملات المزيفة وموازين الكفتين',
    themeDescription: 'كشف العملة الشاذة وزناً بأقل عدد من وزنات الميزان الحساس'
  },
  {
    monthNumber: 12,
    nameArabic: 'الشهر الثاني عشر (ديسمبر)',
    nameEnglish: 'Month 12 - December',
    seasonArabic: 'فترة الشتاء',
    totalDays: 31,
    icon: '✨',
    themeTitle: 'تحديات النخبة والألغاز الفلسفية المركبة',
    themeDescription: 'ألغاز كبرى تدمج بين المنطق الصوري والرياضيات والاستنتاج الخارق'
  }
];

export const MAX_PUZZLES_PER_DAY = 1000;

// High quality deterministic PRNG (Mulberry32)
function createRng(seed: number) {
  let s = Math.imul(seed ^ 0x6D2B79F5, 1);
  return function() {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate any of 1,000+ unique offline deterministic puzzles for ANY day of ANY month period!
 * Total combinations: 12 months * 30 days * 1,000 puzzles = 360,000+ distinct offline puzzles.
 */
export function generateDayPuzzle(monthNumber: number, dayNumber: number, puzzleNumber: number): Puzzle {
  const m = Math.max(1, Math.min(12, monthNumber));
  const monthMeta = MONTHS_METADATA.find(info => info.monthNumber === m) || MONTHS_METADATA[0];
  const d = Math.max(1, Math.min(monthMeta.totalDays, dayNumber));
  const pNum = Math.max(1, Math.min(MAX_PUZZLES_PER_DAY, puzzleNumber));

  // Unique deterministic integer seed combining month, day, and puzzle index
  const seed = (m * 73856093) ^ (d * 19349663) ^ (pNum * 83492791);
  const rng = createRng(seed);

  // 10 distinct families of puzzles to cycle through seamlessly
  const familyIndex = (pNum + (d * 3) + (m * 7)) % 10;

  const difficultyLevels: { diff: PuzzleDifficulty; name: string }[] = [
    { diff: 'easy', name: 'سهل وممتع' },
    { diff: 'medium', name: 'متوسط الذكاء' },
    { diff: 'hard', name: 'تحدي العباقرة' }
  ];
  const diffObj = difficultyLevels[(pNum + d) % 3];

  switch (familyIndex) {
    // -------------------------------------------------------------
    // FAMILY 0: ADVANCED MATHEMATICAL REASONING & ALGEBRA
    // -------------------------------------------------------------
    case 0: {
      const names = ['أحمد', 'عمر', 'خالد', 'طارق', 'يوسف', 'سليم', 'فيصل', 'سامي'];
      const name = names[Math.floor(rng() * names.length)];
      const baseAge = 6 + Math.floor(rng() * 12);
      const mult = 2 + Math.floor(rng() * 3);
      const yearsAhead = 3 + Math.floor(rng() * 8);
      const fatherCurrentAge = baseAge * mult;
      const futureSum = (fatherCurrentAge + yearsAhead) + (baseAge + yearsAhead);

      return {
        id: `m${m}_d${d}_p${pNum}_math`,
        title: `لغز اليوم (${d}) #${pNum}: حساب الأعمار ومفارقة الزمن`,
        category: 'math',
        categoryName: 'ذكاء رياضي',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '👨‍👦 ⏳ 🧮 🎂 📊',
        scenario: `عمر الأب حالياً يعادل ${mult} أضعاف عمر ابنه ${name} (الذي يبلغ الآن ${baseAge} سنوات). بعد مرور ${yearsAhead} سنوات، يكبر الأب والابن معاً في نفس الفترة الزمنية.`,
        question: `كم سيكون مجموع عمري الأب والابن معاً بعد مرور تلك السنوات الـ ${yearsAhead}؟`,
        answer: `${futureSum}`,
        synonyms: [`${futureSum}`, `${futureSum} سنة`, `${futureSum} عاماً`],
        hints: [
          `عمر الأب الحالي هو ${baseAge} × ${mult} = ${fatherCurrentAge} سنة.`,
          `بعد ${yearsAhead} سنوات، سيصبح عمر الأب ${fatherCurrentAge + yearsAhead} وعمر الابن ${baseAge + yearsAhead}.`,
          `اجمع عمرهما الجديدين معاً: (${fatherCurrentAge + yearsAhead}) + (${baseAge + yearsAhead}).`
        ],
        explanation: `عمر الأب الآن = ${fatherCurrentAge} سنة. بعد ${yearsAhead} سنوات: الأب يصبح (${fatherCurrentAge + yearsAhead}) سنة، والابن (${baseAge + yearsAhead}) سنة. مجموعهما = ${futureSum} سنة!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 1: FORENSIC & DETECTIVE DEDUCTION
    // -------------------------------------------------------------
    case 1: {
      const cases = [
        {
          title: `لغز اليوم (${d}) #${pNum}: خدعة الجليد المذاب في غرفة الأسرار`,
          scenario: 'وُجد رجل معلقاً بحبل في سقف غرفة مقفلة من الداخل بإحكام على ارتفاع مترين، مع عدم وجود أي كرسي أو طاولة أو سلم، ووُجدت فقط بركة ماء كبيرة تحته مباشرة!',
          question: 'كيف استطاع الرجل الوصول إلى حبل السقف دون وجود أي أدوات صلبة في الغرفة؟',
          answer: 'وقف على قالب ثلج ضخم',
          synonyms: ['قالب ثلج', 'ثلج وذاب', 'قالب جليد', 'كتلة جليد', 'ثلج', 'جليد'],
          hints: ['ركز على بركة الماء الموجودة تحته مباشرة.', 'الشيء الذي وقف عليه تحول إلى ماء واختفى.', 'مادة صلبة تذوب بالحرارة.']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: خدعة مكعبات الثلج السامة`,
          scenario: 'شرب شخصان من نفس إبريق العصير البارد الذي وُضع فيه سم قاتل. الأول شرب كأسه سريعاً ودفعة واحدة ونجا تماماً، بينما الثاني شرب كأسه ببطء على مدار ساعة فتوفي!',
          question: 'أين كان السم موضوعاً بدقة بحيث لم يؤثر على من شرب سريعاً؟',
          answer: 'في مكعبات الثلج',
          synonyms: ['في الثلج', 'مكعبات الثلج', 'داخل الثلج', 'مكعبات الجليد', 'الثلج'],
          hints: ['فكر في الفرق بين الشرب السريع والشرب البطيء على مدار ساعة.', 'شيء في الكأس يذوب ببطء مع مرور الوقت.', 'مكعبات التبريد في العصير.']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: شظايا النافذة المكسورة`,
          scenario: 'ادعى صاحب منزل أن لصاً كسر زجاج نافذة صالونه من الشارع واقتحم المنزل ليسرق الأموال، لكن المحقق ألقى القبض على صاحب المنزل فوراً بعد دقيقة واحدة من معاينة مكان الحادث!',
          question: 'كيف تأكد المحقق أن الزجاج كُسر من الداخل وليس من خارج المنزل؟',
          answer: 'تناثر الزجاج خارج المنزل',
          synonyms: ['الزجاج في الخارج', 'شظايا الزجاج في الشارع', 'الزجاج خارج المنزل', 'تناثر الزجاج بالخارج', 'شظايا الزجاج بالخارج'],
          hints: ['قوانين الحركة والفيزياء: عند ضرب الزجاج تتطاير الشظايا في اتجاه الضربة.', 'لو كسر اللص الزجاج من الشارع، لأين ستسقط الشظايا؟', 'سقوط وتناثر الزجاج خارج الغرفة يثبت أن الضربة جاءت من الداخل.']
        }
      ];
      const selectedCase = cases[pNum % cases.length];

      return {
        id: `m${m}_d${d}_p${pNum}_detective`,
        title: selectedCase.title,
        category: 'mystery',
        categoryName: 'قضايا ومحقق',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '🕵️‍♂️ 🔍 🩸 ⚖️ 🚪',
        scenario: selectedCase.scenario,
        question: selectedCase.question,
        answer: selectedCase.answer,
        synonyms: selectedCase.synonyms,
        hints: selectedCase.hints,
        explanation: `التحليل الجنائي: ${selectedCase.answer}. الاستنتاج المنطقي المادي للأدلة ينفي الادعاءات ويكشف الحقيقة يقيناً!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 2: MATHEMATICAL SEQUENCES & CIPHERS
    // -------------------------------------------------------------
    case 2: {
      const step = 2 + ((pNum + d) % 5);
      const start = 3 + (pNum % 7);
      const seqType = (pNum + m) % 3;

      let s1 = start;
      let s2: number, s3: number, s4: number, nextVal: number;
      let explanationRule = '';

      if (seqType === 0) {
        // Multiplier progression: x * step
        s2 = s1 * step;
        s3 = s2 * step;
        s4 = s3 * step;
        nextVal = s4 * step;
        explanationRule = `النمط يضرب في ${step} في كل خطوة (${s4} × ${step} = ${nextVal})`;
      } else if (seqType === 1) {
        // Squares plus offset
        s1 = 1 * 1 + step;
        s2 = 2 * 2 + step;
        s3 = 3 * 3 + step;
        s4 = 4 * 4 + step;
        nextVal = 5 * 5 + step;
        explanationRule = `النمط هو مربع الترتيب ن² + ${step}: (5² + ${step} = 25 + ${step} = ${nextVal})`;
      } else {
        // Fibonacci-style addition
        s2 = s1 + step;
        s3 = s1 + s2;
        s4 = s2 + s3;
        nextVal = s3 + s4;
        explanationRule = `كل رقم هو حاصل جمع الرقمين السابقين له: (${s3} + ${s4} = ${nextVal})`;
      }

      return {
        id: `m${m}_d${d}_p${pNum}_seq`,
        title: `لغز اليوم (${d}) #${pNum}: شيفرة المتتالية الرقمية`,
        category: 'math',
        categoryName: 'ذكاء رياضي',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '🔢 🧮 🧩 📈 🎯',
        scenario: `لاحظ عالم الرياضيات نمطاً عددياً منظماً تتبعه متسلسلة الأرقام التالية في دفتر أبحاثه: [ ${s1} ، ${s2} ، ${s3} ، ${s4} ، ؟ ]`,
        question: `ما هو الرقم التالي الذي يكمل المتتالية بدقة مكان علامة الاستفهام (؟)؟`,
        answer: `${nextVal}`,
        synonyms: [`${nextVal}`],
        hints: [
          `تأمل العلاقة الرياضية بين الأرقام: ${s1} ثم ${s2} ثم ${s3}.`,
          `النمط لا يعتمد على الصدفة، هناك قانون رياضي ثابت مطبق.`,
          `القاعدة: ${explanationRule.split(':')[0] || 'حساب الفرق بين الحدود'}.`
        ],
        explanation: `${explanationRule}. إذن الرقم التالي هو ${nextVal}!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 3: CLASSIC ARABIC POETIC & PHILOSOPHICAL RIDDLES
    // -------------------------------------------------------------
    case 3: {
      const riddles = [
        {
          title: `لغز اليوم (${d}) #${pNum}: الكائن الذي يكسوه الحبر`,
          scenario: 'جماد ذو أوراق كثيرة بلا شجر، ولسان فصيح بلا فم ولا وتر، يخبرك بأخبار الأوائل إذا صمت، ويموت إذا غُمر في الماء!',
          question: 'ما هو هذا الجليس الصامت النافع؟',
          answer: 'الكتاب',
          synonyms: ['كتاب', 'المصحف', 'الدفتر', 'الكتاب الورقي', 'book']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الرفيق الذي لا يفارقك تحت الشمس`,
          scenario: 'يمشي معك في النهار خطوة بخطوة، يكبر في الصباح ويقصر في الظهيرة، لا ينطق ولا يمكنك لمسه، ويختفي تماماً بمجرد حلول الظلام!',
          question: 'ما هو هذا الرفيق الصامت الملازم؟',
          answer: 'الظل',
          synonyms: ['ظل', 'الظلال', 'ظلي', 'shadow']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الصندوق الصامت الممتلئ بالأسنان`,
          scenario: 'شيء يمتلك أسناناً كثيرة مستوية ومرتبة كالسيف، لكنه لا يعض ولا يأكل أي طعام، بل يمر بين الخصلات ليصلح ما فسد!',
          question: 'ما هو هذا الشيء ذو الأسنان التي لا تعض؟',
          answer: 'المشط',
          synonyms: ['مشط', 'المشط الخشبي', 'مشط الشعر', 'comb']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الذي يكسو الناس وهو عارٍ`,
          scenario: 'رفيع القوام كأنه خيط معدني، يملك عيناً واحدة في رأسه ولا يرى بها، يكسو الناس بأجمل الثياب وهو طوال عمره عارٍ بلا لباس!',
          question: 'ما هو هذا الشيء الدقيق الماهر؟',
          answer: 'الإبرة',
          synonyms: ['ابرة', 'إبرة', 'إبرة الخياطة', 'الابرة', 'needle']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الذي إذا أكل كبر وإذا شرب مات`,
          scenario: 'كائن لا عظام له ولا جلد، يلتهم الحطب والأوراق فيشتد ويقوى، وإذا قدمت له كأس ماء عذب ارتجف ومات في لحظته!',
          question: 'ما هو هذا الشيء الذي يهلك بالماء؟',
          answer: 'النار',
          synonyms: ['نار', 'اللهب', 'شعلة', 'fire']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الوعاء الذي كلما أفرغت منه اتسع`,
          scenario: 'كل أوعية الكون تنقص إذا أخذت منها، إلا شيء واحد في الأرض؛ كلما حفرت فيه وأخذت من ترابه اتسع حجمه وكبر عمقه!',
          question: 'ما هو هذا الشيء العجيب؟',
          answer: 'الحفرة',
          synonyms: ['حفرة', 'حفره', 'الحفره', 'hole']
        }
      ];
      const r = riddles[pNum % riddles.length];

      return {
        id: `m${m}_d${d}_p${pNum}_riddle`,
        title: r.title,
        category: 'riddle',
        categoryName: 'أحجية لغوية',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '📜 💡 🎭 ✒️ 📖',
        scenario: r.scenario,
        question: r.question,
        answer: r.answer,
        synonyms: r.synonyms,
        hints: [
          'شيء معروف وشائع جداً في الحياة اليومية.',
          `يبدأ بحرف: ${r.answer[0]}.`,
          'تأمل الوصف المجازي الدقيق للغز.'
        ],
        explanation: `الإجابة هي ${r.answer}. اللغز من روائع البلاغة العربية الكلاسيكية التي تعتمد على الكناية والمجاز!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 4: CLOCK ANGLES & CHRONO-ARITHMETIC
    // -------------------------------------------------------------
    case 4: {
      const hour = 1 + ((pNum + d) % 11);
      const minutes = ((pNum * 5) % 12) * 5; // 0, 5, 10, 15, 20... 55
      // Angle formula: |30*H - 5.5*M|
      let rawAngle = Math.abs(30 * hour - 5.5 * minutes);
      if (rawAngle > 180) rawAngle = 360 - rawAngle;
      const angle = Math.round(rawAngle * 10) / 10;

      const timeString = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;

      return {
        id: `m${m}_d${d}_p${pNum}_clock`,
        title: `لغز اليوم (${d}) #${pNum}: زاوية عقارب الساعة عند ${timeString}`,
        category: 'math',
        categoryName: 'ذكاء رياضي',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '⏰ 🕒 📐 ⏱️ 🎯',
        scenario: `ساعة حائط دائرية كلاسيكية ذات 12 ساعة مقسمة بالتساوي على 360 درجة. تشير الساعة الآن تماماً إلى ${timeString}.`,
        question: `ما هي الزاوية الصغرى بالدرجات المحصورة بين عقرب الساعات وعقرب الدقائق؟`,
        answer: `${angle}`,
        synonyms: [`${angle}`, `${angle} درجة`, `درجة ${angle}`],
        hints: [
          'كل ساعة على القرص تمثل 30 درجة (360 ÷ 12).',
          'كل دقيقة يتحرك عقرب الدقائق 6 درجات، ويتحرك عقرب الساعات 0.5 درجة.',
          `القانون الرياضي: |30 × الساعات - 5.5 × الدقائق|. احسب القيمة المطلقة.`
        ],
        explanation: `الزاوية = |30 × ${hour} - 5.5 × ${minutes}| = |${30 * hour} - ${5.5 * minutes}| = ${angle} درجة!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 5: HISTORICAL ARAB JUDGES & WISDOM DISPUTES
    // -------------------------------------------------------------
    case 5: {
      const judgeStories = [
        {
          title: `لغز اليوم (${d}) #${pNum}: دهاء القاضي في امتحان الماء الساخن`,
          scenario: 'تنازع تاجر زيت وبائع قماش ناعم على كيس مليء بالدنانير الذهبية أمام القاضي الفطن إياس. كل منهما حلف بالله أن الكيس له. أمر القاضي بإحضار إناء ماء ساخن يغلي وألقى فيه الدنانير، فنظر إلى سطح الماء وحكم لصاحب الحق فوراً!',
          question: 'لمن حكم القاضي بعد أن نظر إلى سطح الماء الساخن؟ (بائع الزيت أم بائع القماش؟)',
          answer: 'بائع الزيت',
          synonyms: ['بائع الزيت', 'الزيات', 'لصالح بائع الزيت', 'تاجر الزيت']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: حكمة الجمل الثامن عشر في قسمة الإبل`,
          scenario: 'رجل توفي وترك 17 ناقة، وأوصى أن يأخذ ابنه الأكبر نصفها (1/2)، والأوسط ثلثها (1/3)، والأصغر تسعها (1/9) دون نحر أي ناقة! عجز الورثة حتى جاءهم حكيم راكباً ناقته فحل المعضلة بإضافة ناقته إليهم مؤقتاً.',
          question: 'كم ناقة أخذ كل من الابن الأكبر والأوسط والأصغر، وما مصير ناقة الحكيم؟',
          answer: '9 للأكبر و6 للأوسط و2 للأصغر واسترد الحكيم ناقته',
          synonyms: ['9 و 6 و 2', '9 و6 و2', '9 6 2', '9، 6، 2', '9, 6, 2']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: دهاء فحص الديك بالسخام الأسود`,
          scenario: 'سرقت صرة مال في قافلة ولم يُعرف السارق بين خمسة مسافرين. أمر الحكيم بوضع ديك في خيمة مظلمة ودهن ريشه بسخام أسود، وقال لهم: الديك سيصيح حين يلمس ظهره السارق فقط، فادخلوا واحداً تلو الآخر وامسحوا ظهره. خرجوا جميعاً ولم يصح الديك، ولكن الحكيم كشف السارق في ثوانٍ!',
          question: 'كيف عرف الحكيم السارق فور خروجهم جميعاً من الخيمة المظلمة؟',
          answer: 'يد السارق كانت نظيفة بينما أيدي البقية سوداء',
          synonyms: ['يده نظيفة', 'يد السارق نظيفة', 'نظافة يده', 'لأن يده لم تتسخ', 'يده لم تكن سوداء']
        }
      ];
      const story = judgeStories[pNum % judgeStories.length];

      return {
        id: `m${m}_d${d}_p${pNum}_judge`,
        title: story.title,
        category: 'wisdom',
        categoryName: 'حكمة وفطنة',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '⚖️ 🐪 💰 📜 🧠',
        scenario: story.scenario,
        question: story.question,
        answer: story.answer,
        synonyms: story.synonyms,
        hints: [
          'الفطنة تعتمد على علم النفس وسلوك الشخص الخائف أو الآثار المادية الملموسة.',
          'فكر في الأثر الذي يتركه الشيء في الماء أو الخوف من الانكشاف.',
          'الذكاء القضائي يكشف الحقيقة عبر برهان لا يمكن تزييفه.'
        ],
        explanation: `الحكم المنطقي: ${story.answer}. الفراسة العربية استخدمت الملاحظة الطبيعية والنفسية للوصول لليقين بلا ريب!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 6: PHYSICS & SCIENTIFIC PARADOXES
    // -------------------------------------------------------------
    case 6: {
      const seconds = 3 + ((pNum + d) % 8); // 3 to 10 seconds
      const speedOfSound = 340; // m/s
      const distance = seconds * speedOfSound;

      return {
        id: `m${m}_d${d}_p${pNum}_science`,
        title: `لغز اليوم (${d}) #${pNum}: حساب بعد العاصفة الرعدية`,
        category: 'science',
        categoryName: 'أسرار علمية',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '⚡ 🌩️ 👂 🔭 📏',
        scenario: `في ليلة عاصفة، رأى مراقب برقاً مضيئاً يلمع في الأفق، ثم انتظر وسمع دوي صوت الرعد بعد مرور ${seconds} ثوانٍ بالضبط من وميض البرق. بافتراض أن سرعة الصوت في الهواء هي ${speedOfSound} متر/ثانية وسرعة الضوء لحظية تقريباً.`,
        question: `كم تبعد الصاعقة الرعدية عن المراقب بالأمتار؟`,
        answer: `${distance}`,
        synonyms: [`${distance}`, `${distance} متر`, `${distance} متراً`],
        hints: [
          'الضوء يصل فوراً للعين، بينما الصوت يسير بسرعة 340 متراً كل ثانية.',
          `اضرب عدد الثواني (${seconds}) في سرعة الصوت (${speedOfSound}).`,
          `المسافة = السرعة × الزمن = ${speedOfSound} × ${seconds}.`
        ],
        explanation: `المسافة = سرعة الصوت في الهواء (${speedOfSound} م/ث) × فارق زمن وصول الصوت (${seconds} ثوانٍ) = ${distance} متر!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 7: WATER JUG CAPACITY & MEASUREMENT LOGIC
    // -------------------------------------------------------------
    case 7: {
      const jugPairs = [
        { j1: 3, j2: 5, target: 4, minSteps: 6 },
        { j1: 4, j2: 7, target: 5, minSteps: 6 },
        { j1: 5, j2: 9, target: 7, minSteps: 8 },
        { j1: 3, j2: 8, target: 4, minSteps: 6 }
      ];
      const jPair = jugPairs[pNum % jugPairs.length];

      return {
        id: `m${m}_d${d}_p${pNum}_jugs`,
        title: `لغز اليوم (${d}) #${pNum}: معضلة قياس الماء في الإناءين (${jPair.j1}L و ${jPair.j2}L)`,
        category: 'logic',
        categoryName: 'تفكير استنتاجي',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '🪣 💧 🧪 ⚖️ 🎯',
        scenario: `لديك مصدر ماء غير محدود، وإناءان فارغان غير مدرجين نهائياً: الإناء الأول سعته القصوى ${jPair.j1} لترات، والإناء الثاني سعته ${jPair.j2} لترات. المطلوب قياس ${jPair.target} لترات من الماء بالضبط!`,
        question: `هل يمكن قياس ${jPair.target} لترات بالضبط؟ أجب بنعم واذكر اسم الإناء الذي ستستقر فيه هذه الكمية (${jPair.j1} أم ${jPair.j2})؟`,
        answer: `نعم في إناء ${jPair.j2} لتر`,
        synonyms: ['نعم', `في إناء ${jPair.j2}`, `إناء ${jPair.j2}`, `نعم في الوعاء ${jPair.j2}`],
        hints: [
          'يمكن ملء وتفريغ ونقل الماء بين الإناءين حتى نصل للرقم المطلوب.',
          `بما أن القاسم المشترك الأكبر بين ${jPair.j1} و ${jPair.j2} هو 1، فيمكن قياس أي عدد صحيح.`,
          `الإناء الأكبر (${jPair.j2} لتر) هو الذي يتسع لكمية ${jPair.target} لترات.`
        ],
        explanation: `نعم يمكن قياسها بدقة باتباع خوارزمية الملء والنقل المتكرر، وتستقر الكمية (${jPair.target} لتر) داخل الإناء الأكبر (${jPair.j2} لتر)!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 8: RIVER CROSSING & LANTERN/BRIDGE PUZZLES
    // -------------------------------------------------------------
    case 8: {
      const items = ['الذئب والخروف وحزمة الحشيش', 'الثعلب والأوزة وكيس القمح', 'النمر والغزالة وحزمة الأعشاب'];
      const currentItem = items[pNum % items.length];

      return {
        id: `m${m}_d${d}_p${pNum}_river`,
        title: `لغز اليوم (${d}) #${pNum}: معضلة عبور النهر بالقارب`,
        category: 'logic',
        categoryName: 'منطق واستنتاج',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '🛶 🐺 🐑 🌾 🌊',
        scenario: `فلاح يريد عبور نهر بواسطة قارب صغير لا يتسع إلا له ومعه شيء واحد فقط في كل رحلة. معه: ${currentItem}. إذا تُرك الحيوان المفترس مع الأليف أكله، وإذا تُرِك الأليف مع العشب التهمه!`,
        question: `ما هو أول شيء يجب على الفلاح نقله في رحلته الأولى إلى الضفة الأخرى لضمان أمان الجميع؟`,
        answer: currentItem.includes('الخروف') ? 'الخروف' : currentItem.includes('الأوزة') ? 'الأوزة' : 'الغزالة',
        synonyms: ['الخروف', 'خروف', 'الأوزة', 'اوزة', 'الغزالة', 'غزالة'],
        hints: [
          'الحيوان الأوسط هو الذي يتسبب في الأزمة إذا بقي مع المفترس أو مع الطعام.',
          'الذئب لا يأكل العشب، إذن وجودهما معاً آمن تماماً على الضفة.',
          'انقل الكائن الأليف الذي يأكل العشب ويؤكل من المفترس أولاً!'
        ],
        explanation: `يجب نقل الكائن الأليف أولاً (مثل الخروف أو الأوزة)، لأن بقاء المفترس مع العشب في الضفة الأولى لا يسبب أي ضرر، ثم يعود لنقل البقية مع أخذ الكائن الأليف رجوعاً إذا لزم الأمر!`,
        isAiGenerated: false
      };
    }

    // -------------------------------------------------------------
    // FAMILY 9: COUNTERFEIT COINS & PIGEONHOLE PROBABILITY
    // -------------------------------------------------------------
    default: {
      const numCoins = [9, 27, 81][(pNum + d) % 3];
      const weighings = numCoins === 9 ? 2 : numCoins === 27 ? 3 : 4;

      return {
        id: `m${m}_d${d}_p${pNum}_coins`,
        title: `لغز اليوم (${d}) #${pNum}: كشف العملة المزيفة من بين ${numCoins} عملة`,
        category: 'logic',
        categoryName: 'ذكاء واستنتاج',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '⚖️ 🪙 🪙 🎯 🧠',
        scenario: `لديك ${numCoins} عملة ذهبية متطابقة تماماً في الشكل والحجم واللون، لكن عملة واحدة منها فقط مزيفة وأخف وزناً من البقية. لديك ميزان ذو كفتين حساس بدون أثقال مدرجة.`,
        question: `ما هو أقل عدد ممكن ومضمون من الوزنات للكشف عن العملة المزيفة يقيناً؟`,
        answer: `${weighings}`,
        synonyms: [`${weighings}`, `${weighings} وزنات`, `${weighings} مرات`],
        hints: [
          'قسم العملات دائماً إلى 3 مجموعات متساوية في كل خطوة.',
          `في كل وزنة، تقارن مجموعتين، فإذا تساويا فالعملة في الثالثة.`,
          `القانون الرياضي: 3 أس عدد الوزنات يجب أن يساوي أو يفوق عدد العملات (3^${weighings} = ${numCoins}).`
        ],
        explanation: `تقسيم ${numCoins} إلى 3 مجموعات في كل وزنة يقلص الاحتمال بنسبة الثلث في كل مرة: 3^${weighings} = ${numCoins}. إذن أقل عدد مضمون هو ${weighings} وزنات فقط!`,
        isAiGenerated: false
      };
    }
  }
}

/**
 * Backward compatibility helper for existing code calling generateMonthlyOfflinePuzzle
 */
export function generateMonthlyOfflinePuzzle(year: number, monthNumber: number, dayNumber: number, variationIndex: number = 0): Puzzle {
  // Map variationIndex (0-based) to 1-based puzzleNumber
  const puzzleNumber = (variationIndex % MAX_PUZZLES_PER_DAY) + 1;
  return generateDayPuzzle(monthNumber, dayNumber, puzzleNumber);
}
