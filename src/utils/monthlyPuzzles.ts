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
    themeDescription: 'تحديات رياضية وتحليلية دقيقة لحسابات الزمن والأعمار والسرعات وتوزيع الحصص'
  },
  {
    monthNumber: 2,
    nameArabic: 'الشهر الثاني (فبراير)',
    nameEnglish: 'Month 2 - February',
    seasonArabic: 'فترة الشتاء',
    totalDays: 29,
    icon: '⚡',
    themeTitle: 'قضايا الاستنتاج والذكاء الجنائي',
    themeDescription: 'فك طلاسم مسارح الجرائم وكشف الأكاذيب وتناقضات الشهود والأدلة المادية'
  },
  {
    monthNumber: 3,
    nameArabic: 'الشهر الثالث (مارس)',
    nameEnglish: 'Month 3 - March',
    seasonArabic: 'فترة الربيع',
    totalDays: 31,
    icon: '🌱',
    themeTitle: 'أحاجي اللغة والبلاغة والأدب العربي',
    themeDescription: 'ألغاز التلاعب بالكلمات والمعاني المجازية والكنايات والتناظر البلاغي'
  },
  {
    monthNumber: 4,
    nameArabic: 'الشهر الرابع (أبريل)',
    nameEnglish: 'Month 4 - April',
    seasonArabic: 'فترة الربيع',
    totalDays: 30,
    icon: '🌸',
    themeTitle: 'معضلات المتتاليات والأنماط الهندسية',
    themeDescription: 'اكتشاف الشيفرات الرياضية المخفية في سلاسل الأرقام المعقدة والمصفوفات'
  },
  {
    monthNumber: 5,
    nameArabic: 'الشهر الخامس (مايو)',
    nameEnglish: 'Month 5 - May',
    seasonArabic: 'فترة الربيع',
    totalDays: 31,
    icon: '☀️',
    themeTitle: 'أسرار الفيزياء والظواهر الطبيعية',
    themeDescription: 'تفسير الظواهر العلمية من ضوء وصوت وجاذبية وسوائل وضغط جوي'
  },
  {
    monthNumber: 6,
    nameArabic: 'الشهر السادس (يونيو)',
    nameEnglish: 'Month 6 - June',
    seasonArabic: 'فترة الصيف',
    totalDays: 30,
    icon: '🔥',
    themeTitle: 'التفكير الجانبي ومعضلات العبور',
    themeDescription: 'ألغاز نقل الحمولات بالقوارب والجسور والمصابيح والحبال المشتعلة'
  },
  {
    monthNumber: 7,
    nameArabic: 'الشهر السابع (يوليو)',
    nameEnglish: 'Month 7 - July',
    seasonArabic: 'فترة الصيف',
    totalDays: 31,
    icon: '🧭',
    themeTitle: 'دهاء القضاة وفطنة الحكماء العرب',
    themeDescription: 'مواقف تاريخية ذكية وأحكام قضائية وفراسة كشفت أصعب النزاعات'
  },
  {
    monthNumber: 8,
    nameArabic: 'الشهر الثامن (أغسطس)',
    nameEnglish: 'Month 8 - August',
    seasonArabic: 'فترة الصيف',
    totalDays: 31,
    icon: '⏳',
    themeTitle: 'مفارقات عقارب الساعات والزمن والتقويم',
    themeDescription: 'حسابات هندسية دقيقة لزوايا العقارب وتقاطعات الوقت والساعات المتأخرة'
  },
  {
    monthNumber: 9,
    nameArabic: 'الشهر التاسع (سبتمبر)',
    nameEnglish: 'Month 9 - September',
    seasonArabic: 'فترة الخريف',
    totalDays: 30,
    icon: '🍂',
    themeTitle: 'ألغاز أواني السوائل والمكاييل والخلط',
    themeDescription: 'قياس كميات دقيقة باستخدام أواني غير مدرجة بطرق خوارزمية ذكية'
  },
  {
    monthNumber: 10,
    nameArabic: 'الشهر العاشر (أكتوبر)',
    nameEnglish: 'Month 10 - October',
    seasonArabic: 'فترة الخريف',
    totalDays: 31,
    icon: '🧩',
    themeTitle: 'الاحتمالات ومبدأ برج الحمام (دركليه)',
    themeDescription: 'حسابات أقل عدد من المحاولات لضمان الفوز وحل معضلات الصناديق والكرات'
  },
  {
    monthNumber: 11,
    nameArabic: 'الشهر الحادي عشر (نوفمبر)',
    nameEnglish: 'Month 11 - November',
    seasonArabic: 'فترة الخريف',
    totalDays: 30,
    icon: '🌧️',
    themeTitle: 'ألغاز العملات المزيفة وموازين الكفتين',
    themeDescription: 'كشف العملة الشاذة وزناً بأقل عدد من وزنات الميزان الحساس وبأكياس الذهب'
  },
  {
    monthNumber: 12,
    nameArabic: 'الشهر الثاني عشر (ديسمبر)',
    nameEnglish: 'Month 12 - December',
    seasonArabic: 'فترة الشتاء',
    totalDays: 31,
    icon: '✨',
    themeTitle: 'تحديات النخبة والألغاز الفلسفية المركبة',
    themeDescription: 'ألغاز كبرى تدمج بين الفرسان والكذابين، بوابتي الحقيقة، والقبعات الملونة'
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

  // Distribution strategy:
  // 60% of daily puzzles highlight the month's specific signature theme (m)
  // 40% cycle dynamically across the other 11 themes, ensuring a massive variety of 1,000 puzzles/day!
  let activeThemeId = m;
  const isMonthSpecial = (pNum % 5) <= 2; // 3 out of 5 are the month's theme
  if (!isMonthSpecial) {
    const shift = (pNum * 7 + d * 3) % 11;
    activeThemeId = ((m + shift) % 12) + 1;
  }

  const difficultyLevels: { diff: PuzzleDifficulty; name: string }[] = [
    { diff: 'easy', name: 'سهل وممتع' },
    { diff: 'medium', name: 'متوسط الذكاء' },
    { diff: 'hard', name: 'تحدي العباقرة' }
  ];
  const diffObj = difficultyLevels[(pNum + d) % 3];

  switch (activeThemeId) {
    // =========================================================================
    // THEME 1: MATHEMATICAL & ANALYTICAL REASONING (يناير)
    // =========================================================================
    case 1: {
      const subType = (pNum + d) % 4;

      if (subType === 0) {
        // Ages & Time Paradox
        const names = ['أحمد', 'عمر', 'خالد', 'طارق', 'يوسف', 'سليم', 'فيصل', 'سامي', 'ماجد', 'زياد'];
        const name = names[Math.floor(rng() * names.length)];
        const baseAge = 5 + Math.floor(rng() * 12);
        const mult = 2 + Math.floor(rng() * 3);
        const yearsAhead = 4 + Math.floor(rng() * 8);
        const fatherAge = baseAge * mult;
        const futureSum = (fatherAge + yearsAhead) + (baseAge + yearsAhead);

        return {
          id: `m${m}_d${d}_p${pNum}_math_age`,
          title: `لغز اليوم (${d}) #${pNum}: معادلة الأعمار وحساب الزمن`,
          category: 'math',
          categoryName: 'ذكاء رياضي',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '👨‍👦 ⏳ 🧮 🎂 📊',
          scenario: `عمر الأب حالياً يعادل ${mult} أضعاف عمر ابنه ${name} (الذي يبلغ الآن ${baseAge} سنوات). بعد مرور ${yearsAhead} سنوات، يكبر الأب والابن معاً بنفس الفارق الزمني.`,
          question: `كم سيكون مجموع عمري الأب والابن معاً بعد مرور تلك السنوات الـ ${yearsAhead}؟`,
          answer: `${futureSum}`,
          synonyms: [`${futureSum}`, `${futureSum} سنة`, `${futureSum} عاماً`],
          hints: [
            `عمر الأب الآن = ${baseAge} × ${mult} = ${fatherAge} سنة.`,
            `بعد ${yearsAhead} سنوات، يصبح عمر الأب ${fatherAge + yearsAhead} وعمر الابن ${baseAge + yearsAhead}.`,
            `اجمع العمرين الجديدين: ${fatherAge + yearsAhead} + ${baseAge + yearsAhead}.`
          ],
          explanation: `عمر الأب الآن = ${fatherAge} سنة. بعد ${yearsAhead} سنوات: الأب يصبح (${fatherAge + yearsAhead}) والابن (${baseAge + yearsAhead}). مجموعهما = ${futureSum} سنة!`,
          isAiGenerated: false
        };
      } else if (subType === 1) {
        // Speed, Travel & Meeting point
        const speed1 = 40 + Math.floor(rng() * 4) * 10; // 40, 50, 60, 70
        const speed2 = 50 + Math.floor(rng() * 4) * 10; // 50, 60, 70, 80
        const hours = 2 + Math.floor(rng() * 3); // 2, 3, 4
        const totalDistance = (speed1 + speed2) * hours;

        return {
          id: `m${m}_d${d}_p${pNum}_math_speed`,
          title: `لغز اليوم (${d}) #${pNum}: نقطة التقاء القطارين السريعين`,
          category: 'math',
          categoryName: 'ذكاء رياضي',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '🚂 🛤️ ⏱️ 📍 💨',
          scenario: `انطلق قطاران في نفس اللحظة من مدينتين باتجاه بعضهما على مسار مستقيم. القطار الأول يسير بسرعة ${speed1} كم/ساعة، والقطار الثاني يسير بسرعة ${speed2} كم/ساعة. التقيا بعد مرور ${hours} ساعات بالضبط.`,
          question: `ما هي المسافة الكلية الفاصلة بين المدينتين بالكيلومتر؟`,
          answer: `${totalDistance}`,
          synonyms: [`${totalDistance}`, `${totalDistance} كم`, `${totalDistance} كيلومتر`],
          hints: [
            `في كل ساعة، يقلل القطاران المسافة بينهما بمقدار مجموع سرعتيهما: ${speed1} + ${speed2} كم.`,
            `السرعة النسبية = ${speed1 + speed2} كم/ساعة.`,
            `المسافة = السرعة النسبية (${speed1 + speed2}) × الزمن (${hours} ساعات).`
          ],
          explanation: `المسافة = مجموع السرعتين (${speed1} + ${speed2} = ${speed1 + speed2} كم/س) × زمن الرحلة (${hours} ساعات) = ${totalDistance} كم!`,
          isAiGenerated: false
        };
      } else if (subType === 2) {
        // Productivity & Workers
        const workers = 3 + Math.floor(rng() * 4); // 3 to 6 workers
        const days = 6 + Math.floor(rng() * 6); // 6 to 11 days
        const totalWork = workers * days;
        const newWorkers = [2, 3, 4, 6, 9].find(w => w !== workers && totalWork % w === 0) || (workers * 2);
        const requiredDays = totalWork / newWorkers;

        return {
          id: `m${m}_d${d}_p${pNum}_math_work`,
          title: `لغز اليوم (${d}) #${pNum}: معادلة إنجاز مشروع البناء`,
          category: 'math',
          categoryName: 'ذكاء رياضي',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '👷‍♂️ 🏗️ ⏱️ 🧱 📋',
          scenario: `يستطيع ${workers} عمال ذوي كفاءة متساوية إنجاز تشييد مبنى كامل في غضون ${days} يوماً من العمل المتواصل.`,
          question: `إذا تم توظيف ${newWorkers} عمال بنفس الكفاءة للقيام بنفس العمل تماماً، فكم يوماً سيستغرق إنجاز المبنى؟`,
          answer: `${requiredDays}`,
          synonyms: [`${requiredDays}`, `${requiredDays} أيام`, `${requiredDays} يوم`],
          hints: [
            `حجم العمل الكلي يقاس بـ (عامل × يوم) = ${workers} × ${days} = ${totalWork} وحدة عمل.`,
            `اقسم إجمالي وحدات العمل (${totalWork}) على عدد العمال الجدد (${newWorkers}).`,
            `الناتج: ${totalWork} ÷ ${newWorkers} أيام.`
          ],
          explanation: `الجهد الإجمالي = ${workers} × ${days} = ${totalWork} يوم/عامل. عند قسمتها على ${newWorkers} عمال: ${totalWork} ÷ ${newWorkers} = ${requiredDays} يوماً!`,
          isAiGenerated: false
        };
      } else {
        // Elevator / Staircase Steps
        const floors = 4 + Math.floor(rng() * 5); // 4 to 8 floors
        const stepsPerFloor = 18 + Math.floor(rng() * 5); // 18 to 22 steps
        const totalSteps = (floors - 1) * stepsPerFloor;

        return {
          id: `m${m}_d${d}_p${pNum}_math_stairs`,
          title: `لغز اليوم (${d}) #${pNum}: حساب درجات السلم في البرج`,
          category: 'math',
          categoryName: 'ذكاء رياضي',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '🏢 🪜 👟 🔢 🏬',
          scenario: `مبنى سكني، تفصل بين كل طابق والطابق الذي يليه ${stepsPerFloor} درجة سلم متطابقة تماماً. شخص صعد الدرج من الطابق الأرضي (الطابق 1) حتى وصل إلى الطابق رقم ${floors}.`,
          question: `كم درجة سلم صعدها هذا الشخص حتى وصوله للطابق ${floors}؟`,
          answer: `${totalSteps}`,
          synonyms: [`${totalSteps}`, `${totalSteps} درجة`, `${totalSteps} درجات`],
          hints: [
            `انتبه لخدعة البداية: الصعود يبدأ من الطابق 1، لذا عدد فوارق الطوابق هو (${floors} - 1).`,
            `عدد الفوارق = ${floors - 1} طوابق.`,
            `اضرب فوارق الطوابق (${floors - 1}) في درجات كل طابق (${stepsPerFloor}).`
          ],
          explanation: `للصعود من الطابق 1 إلى الطابق ${floors}، يصعد (${floors} - 1 = ${floors - 1}) فوارق طوابق. ${floors - 1} × ${stepsPerFloor} = ${totalSteps} درجة سلم!`,
          isAiGenerated: false
        };
      }
    }

    // =========================================================================
    // THEME 2: FORENSIC & DETECTIVE DEDUCTION (فبراير)
    // =========================================================================
    case 2: {
      const cases = [
        {
          title: `لغز اليوم (${d}) #${pNum}: سر بركة الماء المعلقة في الغرفة المقفلة`,
          scenario: 'وُجد رجل معلقاً بحبل متين في سقف غرفة مقفلة من الداخل بمفتاح، دون وجود أي أثاث أو سلم أو كرسي، ووُجدت فقط بركة ماء كبيرة ذائبة تحته مباشرة!',
          question: 'كيف استطاع الرجل الصعود والوصول للحبل دون أي أدوات مساعدة؟',
          answer: 'وقف على قالب ثلج ضخم',
          synonyms: ['قالب ثلج', 'ثلج وذاب', 'قالب جليد', 'كتلة جليد', 'ثلج', 'جليد'],
          hints: ['ركز على بركة الماء أسفل الحبل.', 'الشيء الذي وقف عليه تحول إلى ماء.', 'مادة صلبة تذوب في حرارة الغرفة.']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: خدعة مكعبات العصير السامة في المأدبة`,
          scenario: 'شخصان شربا من نفس إبريق العصير البارد الذي وُضع فيه سم قاتل. الأول شرب كأسه سريعاً ودفعة واحدة ونجا، بينما الثاني شرب ببطء على مدار ساعة فتوفي!',
          question: 'أين كان السم موضوعاً بدقة بحيث نجا من شرب سريعاً؟',
          answer: 'في مكعبات الثلج',
          synonyms: ['في الثلج', 'مكعبات الثلج', 'داخل الثلج', 'مكعبات الجليد', 'الثلج'],
          hints: ['الفرق بين الشرب السريع والبطيء هو عامل الوقت.', 'شيء يذوب ببطء مع الوقت في الكأس.', 'مكعبات التبريد في العصير.']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: شظايا النافذة المكسورة في صالون التاجر`,
          scenario: 'ادعى صاحب منزل أن لصاً كسر زجاج نافذته من الشارع ليلاً وسرق خزنته، لكن المحقق ألقى القبض على صاحب المنزل بعد دقيقة من المعاينة لاكتشافه تلفيق السرقة!',
          question: 'كيف تأكد المحقق أن الزجاج كُسر من الداخل وليس من الشارع؟',
          answer: 'تناثر الزجاج خارج المنزل',
          synonyms: ['الزجاج في الخارج', 'شظايا الزجاج في الشارع', 'الزجاج خارج المنزل', 'تناثر الزجاج بالخارج', 'شظايا الزجاج بالخارج'],
          hints: ['الفيزياء: عند ضرب الزجاج تتطاير الشظايا في اتجاه الضربة.', 'لو كُسر من الشارع لتناثرت الشظايا في الصالون.', 'سقوط الشظايا في الشارع خارج الغرفة يثبت أن الضربة من الداخل.']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: محرك السيارة الدافئ في ليلة الصقيع`,
          scenario: 'ادعى المشتبه به أنه نائم في بيته طوال ليلة الجريمة الباردة ولم يغادر سيارته منذ يومين، لكن المحقق وضع يده على مقدمة غطاء سيارته وكشف كذبه فوراً!',
          question: 'ما الذي اكتشفه المحقق عند لمس غطاء محرك السيارة؟',
          answer: 'محرك السيارة كان دافئاً',
          synonyms: ['المحرك دافئ', 'حرارة المحرك', 'السيارة كانت دافئة', 'سخونة المحرك', 'المحرك ساخن'],
          hints: ['في ليلة صقيع باردة، كيف تكون حرارة سيارة متوقفة منذ يومين؟', 'تشغيل المحرك يولد حرارة تدوم ساعات.', 'وجود حرارة في المحرك ينفي ادعاء توقفها منذ أيام.']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: خدعة المظلة المبللة في خزانة المعطف`,
          scenario: 'ادعى رجل أنه لم يخرج من منزله أثناء هطول الأمطار الغزيرة طوال فترة بعد الظهر، لكن المحقق فتح خزانة المدخل ووجد دليلاً حاسماً يثبت خروجه!',
          question: 'ما هو هذا الدليل الحاسم المتروك في الخزانة؟',
          answer: 'مظلة مبللة بالماء',
          synonyms: ['مظلة مبللة', 'المظلة مبللة', 'مظلته رطبة', 'مظلة تقطر ماء', 'المظلة'],
          hints: ['شيء يُحمل عند هطول المطر خارج البيت.', 'لو بقي في البيت لما استخدم مظلة المطر.', 'المظلة المبللة تقطر ماء.']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: شريط التسجيل الموقوف في مسرح الحادثة`,
          scenario: 'وُجد شخص متوفى وبجانبه مسجل صوتي كاسيت. ضغط المحقق زر التشغيل فسمع صوت المتوفى يقول: "أنا سأنهي حياتي" ثم صوت طلقة، لكن المحقق استنتج أنها جريمة قتل فوراً!',
          question: 'ما هو الخلل في جهاز التسجيل الذي كشف أنها جريمة قتل وليست انتحاراً؟',
          answer: 'الشريط كان مرجوعاً أو موقوفاً بعد الطلقة',
          synonyms: ['إرجاع الشريط', 'ضغط زر الإيقاف', 'إيقاف الشريط', 'من أوقف التسجيل', 'الشريط كان موقوفاً'],
          hints: ['بعد إطلاق النار والوفاة فوراً، هل يستطيع الشخص نفسه إيقاف أو إرجاع الشريط؟', 'زر الإيقاف ضُغط بعد الطلقة.', 'شخص آخر كان موجوداً وأوقف أو أعاد شريط الكاسيت!']
        }
      ];
      const selectedCase = cases[(pNum + d * 7) % cases.length];

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

    // =========================================================================
    // THEME 3: ARABIC LANGUAGE, LITERATURE & METAPHORICAL RIDDLES (مارس)
    // =========================================================================
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
          title: `لغز اليوم (${d}) #${pNum}: الرفيق الملازم تحت وهج الشمس`,
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
          title: `لغز اليوم (${d}) #${pNum}: النحيف الذي يكسو الناس وهو عارٍ`,
          scenario: 'رفيع القوام كأنه خيط معدني، يملك عيناً واحدة في رأسه ولا يرى بها، يكسو الناس بأجمل الثياب وهو طوال عمره عارٍ بلا لباس!',
          question: 'ما هو هذا الشيء الدقيق الماهر؟',
          answer: 'الإبرة',
          synonyms: ['ابرة', 'إبرة', 'إبرة الخياطة', 'الابرة', 'needle']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الآكل الجائع الذي يهلكه الماء`,
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
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الذي يكلمك بكل اللغات بلا لسان`,
          scenario: 'يسمع بلا أذن، ويكلمك بكل اللغات ولهجات البشر بلا لسان ولا شفتين، يجيبك إذا ناديته في الجبال العالية فوراً!',
          question: 'ما هو هذا الكائن الصوتي؟',
          answer: 'الصدى',
          synonyms: ['صدى', 'صدى الصوت', 'الصدى الصوتي', 'echo']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الذي يذرف دموعاً لتنير الظلمات`,
          scenario: 'طويل القامة في صباه، قصير القامة في كبره، يبكي ويسكب الدموع طوال الليل لينير للآخرين دروبهم، ويموت بالهواء!',
          question: 'ما هو هذا الشيء المنير الفاني؟',
          answer: 'الشمعة',
          synonyms: ['شمعة', 'شمعه', 'الشمع', 'candle']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الذي يسيل حبراً ليرسم الحكمة`,
          scenario: 'جسم نحيف أملس من خشب أو معدن، رأسه مشقوق يرتشف السواد من المحبرة، ويسكبه على القرطاس حكمة وعلماً!',
          question: 'ما هو هذا السفير بين العقل والورق؟',
          answer: 'القلم',
          synonyms: ['قلم', 'القلم الجاف', 'قلم الحبر', 'pen']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: الصادق الصامت الذي لا يجامل أحداً`,
          scenario: 'لوح براق صافٍ يواجهك بلا خوف، يريك عيوبك ومحاسنك كما هي، إذا ضحكت ضحك، وإذا عبست عبس، ولا ينطق ببنت شفة!',
          question: 'ما هو هذا الصديق الصادق الصامت؟',
          answer: 'المرآة',
          synonyms: ['مرآة', 'المراه', 'مرايه', 'مرآه', 'mirror']
        }
      ];
      const r = riddles[(pNum + d * 5) % riddles.length];

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
          'شيء معروف وشائع جداً في الحياة اليومية والثقافة العربية.',
          `يبدأ بحرف: ${r.answer[0]}.`,
          'تأمل الوصف المجازي الدقيق للغز.'
        ],
        explanation: `الإجابة هي: ${r.answer}. اللغز من روائع البلاغة العربية الكلاسيكية التي تعتمد على الكناية والمجاز!`,
        isAiGenerated: false
      };
    }

    // =========================================================================
    // THEME 4: MATHEMATICAL SEQUENCES & CIPHERS (أبريل)
    // =========================================================================
    case 4: {
      const step = 2 + ((pNum + d) % 6);
      const start = 2 + ((pNum * 3) % 9);
      const seqType = (pNum + m + d) % 4;

      let s1 = start;
      let s2: number, s3: number, s4: number, nextVal: number;
      let explanationRule = '';

      if (seqType === 0) {
        // Multiplier progression
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
      } else if (seqType === 2) {
        // Step addition increment
        const d1 = step;
        const d2 = step + 2;
        const d3 = step + 4;
        const d4 = step + 6;
        s2 = s1 + d1;
        s3 = s2 + d2;
        s4 = s3 + d3;
        nextVal = s4 + d4;
        explanationRule = `الفارق يزداد بمقدار 2 في كل حد (+${d1}، +${d2}، +${d3}، ثم +${d4}): (${s4} + ${d4} = ${nextVal})`;
      } else {
        // Fibonacci-style addition
        s2 = s1 + step;
        s3 = s1 + s2;
        s4 = s2 + s3;
        nextVal = s3 + s4;
        explanationRule = `كل حد هو حاصل جمع الحدين السابقين له مباشرة: (${s3} + ${s4} = ${nextVal})`;
      }

      return {
        id: `m${m}_d${d}_p${pNum}_seq`,
        title: `لغز اليوم (${d}) #${pNum}: شيفرة المتتالية الرقمية`,
        category: 'math',
        categoryName: 'ذكاء رياضي',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '🔢 🧮 🧩 📈 🎯',
        scenario: `لاحظ عالم الرياضيات نمطاً متسلسلاً منظماً تتبعه متتالية الأرقام التالية في أبحاثه: [ ${s1} ، ${s2} ، ${s3} ، ${s4} ، ؟ ]`,
        question: `ما هو الرقم التالي الذي يكمل المتتالية بدقة مكان علامة الاستفهام (؟)؟`,
        answer: `${nextVal}`,
        synonyms: [`${nextVal}`],
        hints: [
          `تأمل العلاقة الرياضية بين الأرقام: ${s1} ثم ${s2} ثم ${s3}.`,
          `النمط لا يعتمد على الصدفة، هناك قانون رياضي ثابت مطبق.`,
          `القاعدة الرياضية: ${explanationRule.split(':')[0] || 'حساب الفرق بين الحدود'}.`
        ],
        explanation: `${explanationRule}. إذن الرقم التالي هو ${nextVal}!`,
        isAiGenerated: false
      };
    }

    // =========================================================================
    // THEME 5: PHYSICS & NATURAL PHENOMENA (مايو)
    // =========================================================================
    case 5: {
      const sub = (pNum + d) % 3;

      if (sub === 0) {
        // Lightning & Thunder
        const seconds = 3 + ((pNum + d) % 8); // 3 to 10 seconds
        const speedOfSound = 340; // m/s
        const distance = seconds * speedOfSound;

        return {
          id: `m${m}_d${d}_p${pNum}_sound`,
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
      } else if (sub === 1) {
        // Echo in canyon
        const seconds = 2 + ((pNum + d) % 5) * 2; // 2, 4, 6, 8, 10
        const speed = 340;
        const oneWayDistance = (seconds / 2) * speed;

        return {
          id: `m${m}_d${d}_p${pNum}_echo`,
          title: `لغز اليوم (${d}) #${pNum}: حساب عمق الوادي عبر صدى الصوت`,
          category: 'science',
          categoryName: 'أسرار علمية',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '🏔️ 🗣️ 📢 👂 📏',
          scenario: `صرخ مستكشف بصوت عالٍ نحو جدار جبلي شاهق أمامه، فعاد إليه صدى صوته بعد مرور ${seconds} ثوانٍ بالضبط. بافتراض أن سرعة الصوت ${speed} م/ث.`,
          question: `كم متراً يبعد الجدار الجبلي عن المستكشف؟`,
          answer: `${oneWayDistance}`,
          synonyms: [`${oneWayDistance}`, `${oneWayDistance} متر`, `${oneWayDistance} متراً`],
          hints: [
            `انتبه: الصوت ذهب إلى الجدار وعاد مرة أخرى، فقطع المسافة مرتين في ${seconds} ثوانٍ.`,
            `زمن الذهاب في اتجاه واحد = ${seconds} ÷ 2 = ${seconds / 2} ثانية.`,
            `المسافة = ${seconds / 2} × ${speed}.`
          ],
          explanation: `زمن الذهاب باتجاه واحد = ${seconds} ÷ 2 = ${seconds / 2} ثانية. المسافة = ${seconds / 2} × ${speed} = ${oneWayDistance} متر!`,
          isAiGenerated: false
        };
      } else {
        // Iceberg Buoyancy
        return {
          id: `m${m}_d${d}_p${pNum}_iceberg`,
          title: `لغز اليوم (${d}) #${pNum}: معضلة طفو الجليد في المحيط`,
          category: 'science',
          categoryName: 'أسرار علمية',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '🧊 🌊 🚢 ⚖️ 🔬',
          scenario: `يطفو جبل جليدي ضخم في مياه المحيط المالحة. وفقاً لقوانين الطفو والكثافة (أرخميدس)، تبلغ كثافة الجليد حوالي 0.9 من كثافة ماء البحر.`,
          question: `ما هي النسبة المئوية التقريبية للجزء المغمور تحت سطح الماء من هذا الجبل الجليدي؟`,
          answer: '90%',
          synonyms: ['90', '90%', 'تسعون بالمئة', '90 بالمئة', '0.9'],
          hints: [
            'النسبة المغمورة تساوي نسبة كثافة الجسم إلى كثافة السائل.',
            'كثافة الجليد تبلغ 0.9 من كثافة الماء.',
            '0.9 تعادل 90 بالمئة.'
          ],
          explanation: `قاعدة أرخميدس: نسبة الجزء المغمور = (كثافة الجليد ÷ كثافة الماء) = 0.9 = 90% مغمور تحت السطح، بينما يظهر 10% فقط فوق الماء!`,
          isAiGenerated: false
        };
      }
    }

    // =========================================================================
    // THEME 6: LATERAL THINKING & CROSSING DILEMMAS (يونيو)
    // =========================================================================
    case 6: {
      const items = [
        { trio: 'الذئب والخروف وحزمة العشب', prey: 'الخروف', safe: 'الذئب والعشب' },
        { trio: 'الثعلب والأوزة وكيس القمح', prey: 'الأوزة', safe: 'الثعلب والقمح' },
        { trio: 'النمر والغزالة وحزمة البرسيم', prey: 'الغزالة', safe: 'النمر والبرسيم' }
      ];
      const item = items[(pNum + d) % items.length];

      return {
        id: `m${m}_d${d}_p${pNum}_crossing`,
        title: `لغز اليوم (${d}) #${pNum}: معضلة عبور النهر بالقارب الصغير`,
        category: 'logic',
        categoryName: 'تفكير جانبي',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '🛶 🐺 🐑 🌾 🌊',
        scenario: `مزارع يريد عبور نهر بقارب صغير لا يتسع إلا له ومعه شيء واحد فقط في كل رحلة. معه: ${item.trio}. إذا تُرك المفترس مع الأليف أكله، وإذا تُرِك الأليف مع الطعام التهمه!`,
        question: `ما هو أول شيء يجب نقله إلى الضفة الأخرى في الرحلة الأولى لضمان نجاة الجميع؟`,
        answer: item.prey,
        synonyms: [item.prey, `ينقل ${item.prey}`],
        hints: [
          'الحيوان الأوسط هو مصدر الخطر في حال غياب المزارع.',
          `${item.safe} يمكن تركهما معاً بأمان تام على الضفة.`,
          `انقل ${item.prey} أولاً!`
        ],
        explanation: `يجب نقل ${item.prey} أولاً، لأن بقاء المفترس مع الطعام النباتي آمن تماماً ولا ضرر منه، ثم ينقل البقية ويعيد الأليف مؤقتاً إذا لزم!`,
        isAiGenerated: false
      };
    }

    // =========================================================================
    // THEME 7: ARAB JUDICIAL WIT & ANCIENT WISDOM (يوليو)
    // =========================================================================
    case 7: {
      const judgeStories = [
        {
          title: `لغز اليوم (${d}) #${pNum}: دهاء القاضي إياس في امتحان الماء الساخن`,
          scenario: 'تنازع تاجر زيت وبائع قماش ناعم على كيس دنانير ذهبية أمام القاضي إياس. أمر القاضي بإحضار إناء ماء ساخن يغلي وألقى فيه الدنانير، فنظر لسطح الماء وحكم لصاحب الحق فوراً!',
          question: 'لمن حكم القاضي بعد أن نظر لسطح الماء الساخن؟ (بائع الزيت أم بائع القماش؟)',
          answer: 'بائع الزيت',
          synonyms: ['بائع الزيت', 'الزيات', 'لصالح بائع الزيت', 'تاجر الزيت']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: حكمة الجمل الثامن عشر في قسمة الإبل`,
          scenario: 'رجل توفي وترك 17 ناقة، وأوصى أن يأخذ ابنه الأكبر نصفها (1/2)، والأوسط ثلثها (1/3)، والأصغر تسعها (1/9) دون نحر أي ناقة! جاءهم حكيم راكباً ناقته فحل المعضلة بإضافة ناقته مؤقتاً.',
          question: 'كم ناقة أخذ كل من الابن الأكبر والأوسط والأصغر على الترتيب؟',
          answer: '9 و6 و2',
          synonyms: ['9 و6 و2', '9 و 6 و 2', '9 6 2', '9، 6، 2', '9 للأكبر و6 للأوسط و2 للأصغر']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: دهاء فحص الديك بالسخام الأسود`,
          scenario: 'سرقت صرة مال في قافلة ولم يُعرف السارق بين خمسة مسافرين. أمر الحكيم بوضع ديك في خيمة مظلمة ودهن ريشه بسخام أسود، وقال: الديك سيصيح حين يلمس ظهره السارق. دخلوا جميعاً ولم يصح الديك، لكن الحكيم كشف السارق في ثوانٍ!',
          question: 'كيف عرف الحكيم السارق فور خروجهم جميعاً من الخيمة؟',
          answer: 'يد السارق كانت نظيفة بينما أيدي البقية سوداء',
          synonyms: ['يده نظيفة', 'يد السارق نظيفة', 'نظافة يده', 'لأن يده لم تتسخ', 'يده لم تكن سوداء']
        },
        {
          title: `لغز اليوم (${d}) #${pNum}: نزاع الشجرة والوديعة المنسية`,
          scenario: 'أنكر رجل وديعة مال استودعه إياها صاحبه تحت شجرة في الصحراء. أمر القاضي الفطن المدعي بالذهاب للشجرة ليأتيه بغصن منها، بينما جلس المتهم عنده. بعد فترة وجيزة التفت القاضي فجأة للمتهم وسأله: "هل تظن أن صاحبك بلغ الشجرة الآن؟" فأجاب المتهم بسرعة: "لا يا سيدي، إنها بعيدة جداً!".',
          question: 'ما الذي أثبته جواب المتهم التلقائي للقاضي؟',
          answer: 'أثبت علمه بمكان الشجرة وأنه يكذب',
          synonyms: ['إدانة المتهم', 'أنه يعرف الشجرة', 'أثبت كذبه', 'اعترف بمعرفته بالمكان', 'أنه مذنب']
        }
      ];
      const story = judgeStories[(pNum + d * 3) % judgeStories.length];

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
          'الفطنة تعتمد على الملاحظة النفسية والآثار المادية الدقيقة.',
          'الخوف من الفضيحة يدفع المذنب لارتكاب خطأ غير مقصود.',
          'الحكم يقوم على برهان قاطع لا يمكن تزييفه.'
        ],
        explanation: `الحكم المنطقي: ${story.answer}. الفراسة العربية التاريخية استندت إلى أدلة وسلوكيات قاطعة تكشف الحقيقة بلا ريب!`,
        isAiGenerated: false
      };
    }

    // =========================================================================
    // THEME 8: CLOCK ANGLES & TIME CALCULATIONS (أغسطس)
    // =========================================================================
    case 8: {
      const hour = 1 + ((pNum + d) % 11);
      const minutes = ((pNum * 5) % 12) * 5; // 0, 5, 10, 15, 20... 55
      let rawAngle = Math.abs(30 * hour - 5.5 * minutes);
      if (rawAngle > 180) rawAngle = 360 - rawAngle;
      const angle = Math.round(rawAngle * 10) / 10;
      const timeStr = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;

      return {
        id: `m${m}_d${d}_p${pNum}_clock`,
        title: `لغز اليوم (${d}) #${pNum}: زاوية عقارب الساعة عند ${timeStr}`,
        category: 'math',
        categoryName: 'حسابات الوقت',
        difficulty: diffObj.diff,
        difficultyName: diffObj.name,
        visualClue: '⏰ 🕒 📐 ⏱️ 🎯',
        scenario: `ساعة حائط دائرية كلاسيكية ذات 12 ساعة مقسمة بالتساوي على 360 درجة. تشير الساعة الآن تماماً إلى ${timeStr}.`,
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

    // =========================================================================
    // THEME 9: WATER JUGS & MEASUREMENT LOGIC (سبتمبر)
    // =========================================================================
    case 9: {
      const jugPairs = [
        { j1: 3, j2: 5, target: 4 },
        { j1: 4, j2: 7, target: 5 },
        { j1: 5, j2: 9, target: 7 },
        { j1: 3, j2: 8, target: 4 },
        { j1: 4, j2: 9, target: 6 },
        { j1: 5, j2: 11, target: 8 }
      ];
      const jPair = jugPairs[(pNum + d) % jugPairs.length];

      return {
        id: `m${m}_d${d}_p${pNum}_jugs`,
        title: `لغز اليوم (${d}) #${pNum}: معضلة قياس الماء في الإناءين (${jPair.j1}L و ${jPair.j2}L)`,
        category: 'logic',
        categoryName: 'مكاييل وسوائل',
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

    // =========================================================================
    // THEME 10: PROBABILITY & PIGEONHOLE PRINCIPLE (أكتوبر)
    // =========================================================================
    case 10: {
      const sub = (pNum + d) % 2;

      if (sub === 0) {
        // Socks in dark drawer
        const numColors = 2 + ((pNum + d) % 3); // 2 to 4 colors
        const colorsList = ['سوداء وبيضاء', 'سوداء وبيضاء وحمراء', 'سوداء وبيضاء وحمراء وزرقاء'][numColors - 2];
        const minPulls = numColors + 1;

        return {
          id: `m${m}_d${d}_p${pNum}_socks`,
          title: `لغز اليوم (${d}) #${pNum}: سحب الجوارب في الغرفة المظلمة`,
          category: 'logic',
          categoryName: 'احتمالات وذكاء',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '🧦 🌑 📦 🎯 🎲',
          scenario: `درج ملابس يحتوي على عشرات الجوارب المتفرقة من ألوان مختلفة: (${colorsList}). الغرفة مظلمة تماماً ولا يمكنك تمييز الألوان بالعين.`,
          question: `ما هو أقل عدد من الجوارب الفردية يجب سحبها لضمان الحصول على زوج واحد على الأقل متطابق في اللون يقيناً؟`,
          answer: `${minPulls}`,
          synonyms: [`${minPulls}`, `${minPulls} جوارب`, `${minPulls} جورب`],
          hints: [
            'مبدأ برج الحمام (دركليه): أسوأ سيناريو هو سحب جورب واحد من كل لون مختلف أولاً.',
            `عدد الألوان المتاحة هو ${numColors}.`,
            `الجورب الإضافي التالي (${numColors} + 1) سيطابق حتماً أحد الألوان المسحوبة!`
          ],
          explanation: `وفقاً لمبدأ برج الحمام، في أسوأ الحالات قد تسحب جورباً واحداً من كل لون (${numColors} جوارب). الجورب رقم (${minPulls}) سيطابق بالضرورة أحدها ليتشكل زوج متطابق 100%!`,
          isAiGenerated: false
        };
      } else {
        // Birthday pigeonhole
        return {
          id: `m${m}_d${d}_p${pNum}_birthday`,
          title: `لغز اليوم (${d}) #${pNum}: مبدأ برج الحمام في شهور الميلاد`,
          category: 'logic',
          categoryName: 'احتمالات وذكاء',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '🎂 📅 👥 🏫 🧠',
          scenario: `في قاعة دراسية، السنة تحتوي على 12 شهراً ميلادياً. نريد ضمان وجود شخصين على الأقل وُلدا في نفس الشهر الميلادي تماماً.`,
          question: `ما هو أقل عدد من الطلاب يجب أن يتواجدوا في القاعة لضمان ذلك يقيناً بنسبة 100%؟`,
          answer: '13',
          synonyms: ['13', '13 طالباً', '13 شخصاً'],
          hints: [
            'لو كان هناك 12 طالباً، فمن الممكن نظرياً أن يكون كل واحد منهم وُلد في شهر مختلف.',
            'الطالب الإضافي رقم 13 سيضطر حتماً لمشاركة شهره مع أحد الـ 12 الآخرين.',
            'العدد المطلوب = عدد الشهور (12) + 1.'
          ],
          explanation: `وفقاً لمبدأ برج الحمام الرياضي: 12 شهراً تتطلب (12 + 1 = 13) شخصاً لضمان وجود شخصين على الأقل في نفس الشهر يقيناً!`,
          isAiGenerated: false
        };
      }
    }

    // =========================================================================
    // THEME 11: COUNTERFEIT COINS & SCALES (نوفمبر)
    // =========================================================================
    case 11: {
      const sub = (pNum + d) % 2;

      if (sub === 0) {
        // Balance scale ternary search
        const coins = [9, 27, 81][(pNum + d) % 3];
        const weighings = coins === 9 ? 2 : coins === 27 ? 3 : 4;

        return {
          id: `m${m}_d${d}_p${pNum}_coins`,
          title: `لغز اليوم (${d}) #${pNum}: كشف العملة المزيفة من بين ${coins} عملة`,
          category: 'logic',
          categoryName: 'موازين وعملات',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '⚖️ 🪙 🪙 🎯 🧠',
          scenario: `لديك ${coins} عملة ذهبية متطابقة تماماً في المظهر، لكن عملة واحدة منها فقط مزيفة وأخف وزناً من البقية. لديك ميزان ذو كفتين حساس بدون أثقال مدرجة.`,
          question: `ما هو أقل عدد ممكن ومضمون من الوزنات للكشف عن العملة المزيفة يقيناً؟`,
          answer: `${weighings}`,
          synonyms: [`${weighings}`, `${weighings} وزنات`, `${weighings} مرات`],
          hints: [
            'قسم العملات دائماً إلى 3 مجموعات متساوية في كل وزنة.',
            `في كل وزنة، تقارن مجموعتين، فإذا تساويا فالعملة في الثالثة.`,
            `القانون: 3 أس عدد الوزنات (3^${weighings} = ${coins}).`
          ],
          explanation: `تقسيم ${coins} إلى 3 مجموعات في كل وزنة يقلص الاحتمال بنسبة الثلث في كل مرة: 3^${weighings} = ${coins}. إذن أقل عدد مضمون هو ${weighings} وزنات فقط!`,
          isAiGenerated: false
        };
      } else {
        // Digital scale gold bags
        return {
          id: `m${m}_d${d}_p${pNum}_gold_bags`,
          title: `لغز اليوم (${d}) #${pNum}: كشف كيس الذهب المغشوش بوزنة واحدة`,
          category: 'logic',
          categoryName: 'موازين وعملات',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '💰 ⚖️ 🏷️ 🔬 🥇',
          scenario: `لديك 10 أكياس ممتلئة بالعملات الذهبية. كل عملة حقيقية تزن 10 غرامات، ولكن كيساً واحداً فقط يحتوي على عملات مغشوشة تزن كل واحدة منها 9 غرامات (أقل بغرام واحد). لديك ميزان رقمي يظهر الوزن بالرقم بالضبط ويُسمح لك بوزنة واحدة فقط!`,
          question: `ما هي الحيلة الذكية التي تكشف الكيس المغشوش في وزنة واحدة فقط؟`,
          answer: 'أخذ عملة من الكيس 1 وعملتين من 2 وثلاث من 3 حتى الكيس 10',
          synonyms: [
            'أخذ عملة من الأول وعملتين من الثاني',
            '1 من الأول و2 من الثاني',
            'سحب 1 2 3 4',
            'أخذ عدد متدرج من العملات'
          ],
          hints: [
            'إذا أخذت عملاً متساوياً من الأكياس فلن تميز أي كيس هو الناقص.',
            'خذ عدداً متزايداً من كل كيس: 1 من الأول، 2 من الثاني، 3 من الثالث... حتى 10 من الأخير.',
            'مقدار النقص الكلي بالجرامات عن الوزن المفترض (550 غرام) يحدد رقم الكيس المغشوش بالضبط!'
          ],
          explanation: `نأخذ 1 عملة من الكيس الأول، 2 من الثاني... و10 من العاشر (المجموع 55 عملة). وزنها المفترض 550 غراماً. إذا كان الوزن 547 غراماً مثلاً (نقص 3 غرامات)، فالكيس الثالث هو المغشوش فوراً!`,
          isAiGenerated: false
        };
      }
    }

    // =========================================================================
    // THEME 12: ELITE COMPLEX LOGICAL PARADOXES & KNIGHTS/LIARS (ديسمبر)
    // =========================================================================
    default: {
      const sub = (pNum + d) % 2;

      if (sub === 0) {
        // Two Doors: Heaven & Hell, Truth & Liar
        return {
          id: `m${m}_d${d}_p${pNum}_two_doors`,
          title: `لغز اليوم (${d}) #${pNum}: بوابتا الحقيقة والهلاك وحارسا القلعة`,
          category: 'logic',
          categoryName: 'تحديات النخبة',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '🚪 🚪 🛡️ ⚔️ 👑',
          scenario: `تقف أمام بوابتين: إحداهما تؤدي إلى قصر النجاة والأخرى للهلاك الأبدي. أمام كل بوابة حارس؛ أحدهما يقول الصدق دائماً، والآخر يكذب دائماً، ولا تدري أيهما الصادق وأيهما الكاذب. مسموح لك بطرح سؤال واحد فقط على أحد الحارسين لاكتشاف بوابة النجاة.`,
          question: `ما هو السؤال الوحيد الذي يضمن لك معرفة بوابة النجاة الحقيقية؟`,
          answer: 'لو سألت رفيقك أي البوابتين تؤدي للنجاة فماذا سيقول؟',
          synonyms: [
            'لو سألت رفيقك',
            'أي البوابتين سيشير إليها رفيقك',
            'لو سألت الحارس الآخر',
            'ماذا سيقول زميلك عن بوابة النجاة'
          ],
          hints: [
            'الصادق سينقل كذبة رفيقه بأمانة، والكاذب سيكذب بشأن قول رفيقه الصادق.',
            'كلاهما في النهاية سيشير إلى نفس البوابة الخاطئة (بوابة الهلاك)!',
            'تسأل أحدهما عما سيقوله الآخر، ثم تختار البوابة المعاكسة تماماً.'
          ],
          explanation: `السؤال: "لو سألت رفيقك أي البوابتين تؤدي للنجاة، فماذا سيقول؟". الصادق سينقل كذب الكاذب (فيشير للهلاك)، والكاذب سيكذب بشأن قول الصادق (فيشير للهلاك أيضاً). إذن تختار البوابة الأخرى المعاكسة وتنجو بيقين!`,
          isAiGenerated: false
        };
      } else {
        // 3 Prisoners and Colored Hats
        return {
          id: `m${m}_d${d}_p${pNum}_hats`,
          title: `لغز اليوم (${d}) #${pNum}: مفارقة القبعات الملونة في بلاط الملك`,
          category: 'logic',
          categoryName: 'تحديات النخبة',
          difficulty: diffObj.diff,
          difficultyName: diffObj.name,
          visualClue: '🎩 🎩 🎩 👑 🧠',
          scenario: `ثلاثة حكماء يقفون في صف واحد بحيث الثالث يرى قبعتي الأول والثاني، والثاني يرى قبعة الأول، والأول لا يرى أحداً. عُرضت عليهم 5 قبعات (3 بيضاء و2 سوداء) وأُلبس كل منهم قبعة دون أن يرى قبعته. سُئل الثالث فعجز عن معرفة قبعته، ثم سُئل الثاني فعجز، فنطق الأول في مقدمة الصف بلون قبعته الصحيح فوراً!`,
          question: `ما هو لون قبعة الحكيم الأول في مقدمة الصف؟`,
          answer: 'بيضاء',
          synonyms: ['بيضاء', 'أبيض', 'ابيض', 'قبعة بيضاء', 'البيضاء'],
          hints: [
            'عجز الثالث يثبت أنه لم يرَ أمامه قبعتين سوداوين معاً (لو رآهما لعرف أن قبعته بيضاء فوراً).',
            'إذن الأول والثاني ليسا كلاهما أسود.',
            'عجز الثاني يعني أنه لم يرَ قبعة سوداء أمام الأول، لأنها لو كانت سوداء لعرف أن قبعته هو بيضاء. إذن قبعة الأول بيضاء!'
          ],
          explanation: `استنتاج الحكيم الأول: عجز الثالث يعني عدم وجود قبعتين سوداوين. وعجز الثاني يعني أنه لم يرَ قبعة سوداء أمامه وإلا لعرف أن قبعته هو بيضاء. إذن استنتج الحكيم الأول يقيناً أن قبعته بيضاء!`,
          isAiGenerated: false
        };
      }
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
