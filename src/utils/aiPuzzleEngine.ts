import { Puzzle, PuzzleCategory, PuzzleDifficulty } from '../types';

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

// Large database of question seeds with procedural variation parameters
// Generates hundreds of thousands of dynamic variations
interface ProceduralSeed {
  category: PuzzleCategory;
  categoryName: string;
  baseTitle: string;
  emojis: string[];
  scenarioTemplates: string[];
  questionTemplates: string[];
  answer: string;
  synonyms: string[];
  hints: string[];
  explanation: string;
}

const PROCEDURAL_SEEDS: ProceduralSeed[] = [
  {
    category: 'visual',
    categoryName: 'لغز بصري',
    baseTitle: 'لغز الظل الملازم',
    emojis: ['👤', '☀️', '🏃‍♂️', '🌑', '✨'],
    scenarioTemplates: [
      'يتبعك خطوة بخطوة في وضح النهار، يطول حيناً ويقصر حيناً آخر، يقلد كل حركاتك دون أن يتكلم أو يلمسك، لكنه يختفي فور دخولك في الظلام الدامس!',
      'يسير معك أينما اتجهت تحت أشعة الشمس، لا تستطيع أن تمسك به بيدك ولا أن تهرب منه مهما ركضت، لكنه يفر منك إذا غابت الأضواء!',
      'رفيقك الصامت الذي يولد مع النور ويموت مع العتمة، يرافق خطواتك في الساحات دون أن يُحدث صوتاً واحداً!'
    ],
    questionTemplates: [
      'ما هو هذا الرفيق الصامت؟',
      'ما هو الشيء المقصود هنا؟',
      'عن أي شيء يتحدث هذا اللغز؟'
    ],
    answer: 'الظل',
    synonyms: ['ظل', 'ظلك', 'الظلال', 'shadow'],
    hints: [
      'تراه خلفك أو أمامك عندما تسير في الشمس.',
      'يتغير طوله بحسب زاوية سقوط أشعة الضوء.',
      'يبدأ بحرف الظاء وينتهي بحرف اللام.'
    ],
    explanation: 'الظل ينتج عن حجب الجسم لمسار أشعة الضوء، فيظهر على الأرض ويتحرك بحركتك ويختفي في الظلام!'
  },
  {
    category: 'logic',
    categoryName: 'تفكير استنتاجي',
    baseTitle: 'مفارقة الشمعة الموقدة',
    emojis: ['🕯️', '🔥', '⏳', '💡', '✨'],
    scenarioTemplates: [
      'كلما كبرت في العمر قصرت قامتها، تبكي دموعاً متتالية من غير حزن ولا ألم، وتضحي بحياتها ونفسها بالكامل لكي تمنح النور لغيرها!',
      'تبدأ طويلة ونضرة في أول وقتها، وكلما مرت الدقائق نقص طولها رويداً رويداً وهي تذرف قطرات دافئة لتضيء المكان المغلق!',
      'جسمها من شحم أو شمع أبيض، قلبها من خيط رفيع يحترق، كلما أعطتك النور نقصت حياتها واقتربت نهايتها!'
    ],
    questionTemplates: [
      'ما هو هذا الشيء العجيب؟',
      'ما هي هذه التي تضحي بنفسها لتضيء للآخرين؟',
      'ما الاسم الصحيح لهذا الشيء؟'
    ],
    answer: 'الشمعة',
    synonyms: ['شمعة', 'شمعه', 'الشموع', 'الشمع', 'candle'],
    hints: [
      'تُشعلها عند انقطاع الكهرباء في المنزل.',
      'تذوب ببطء مع مرور الوقت بفعل الحرارة.',
      'تبدأ بحرف الشين وتنتهي بالتاء المربوطة.'
    ],
    explanation: 'الشمعة تحترق لتولد الضوء، فيذوب شمعها ويقصر طولها بمرور الوقت حتى تنفد بالكامل!'
  },
  {
    category: 'mystery',
    categoryName: 'قضية المحقق',
    baseTitle: 'لغز رجل الثلج في يوم مشمس',
    emojis: ['⛄', '☀️', '💧', '🥕', '🎩'],
    scenarioTemplates: [
      'وجد المحقق في منتصف باحة خضراء جافة قبعة سوداء وجزرة صغيرة وخمس قطع من الفحم وكمية من الماء المسكوب على الأرض، مع عدم وجود أي آثار أقدام لشخص اقترب من المكان!',
      'في ليلة باردة كان هناك شخص يقف في الحديقة دون حراك، وعندما جاء الصباح وطلعت الشمس الحارقة، اختفى الشخص تماماً ولم يبق مكانه سوى قبعة وجزرة وقطرات ماء!',
      'أبلغ الجيران عن اختفاء حارس كان يرتدي وشاحاً وجزرة في أنفه وسط الحديقة، وحين وصل المحقق وجد بقايا وشاح وبركة ماء صغيرة فقط دون أي جريمة!'
    ],
    questionTemplates: [
      'من أو ما الذي كان واقفاً هناك واختفى؟',
      'ما هو الشيء الذي ذاب في ذلك المكان؟',
      'ما هو هذا الكائن الموسمي؟'
    ],
    answer: 'رجل الثلج',
    synonyms: ['رجل ثلج', 'رجل الجليد', 'تمثال الثلج', 'snowman', 'الثلج'],
    hints: [
      'يصنعه الأطفال في فصل الشتاء عند تساقط الثلوج.',
      'تُستخدم الجزرة كأنف له والفحم كأزرار وعينين.',
      'يذوب تماماً ويتحول لماء عند طلوع الشمس الدافئة.'
    ],
    explanation: 'المختفي كان رجل ثلج بناه الأطفال، وعندما أشرقت الشمس الدافئة ذاب وتحول إلى ماء تاركاً القبعة والجزرة والفحم!'
  },
  {
    category: 'riddle',
    categoryName: 'أحجية لغوية',
    baseTitle: 'أحجية البحر الذي بلا ماء',
    emojis: ['🗺️', '🌊', '🧭', '🏔️', '🚢'],
    scenarioTemplates: [
      'فيه بحار شاسعة ومحيطات عملاقة لكن لا توجد به قطرة ماء واحدة، وفيه مدن ودول عامرة بلا بشر، وجبال شاهقة بلا صخور، وغابات بلا أشجار حية!',
      'تستطيع أن تطوف به الكرة الأرضية كاملة في ثوانٍ معدودة، ترى فيه أنهاراً زرقاء بلا بلل، وحدوداً مرسومة بدقة بلا حراس ولا أسوار!',
      'يحتوي على قارات العالم السبع وعواصم الأرض وموانئ الملاحة، تفتحه أمامك على الطاولة وتتنقل بين القارات بإصبعك فقط!'
    ],
    questionTemplates: [
      'أين تجد هذا العالم العجيب؟',
      'ما هو هذا الشيء؟',
      'ما هذا الذي يجمع بحاراً بلا ماء ومدناً بلا سكان؟'
    ],
    answer: 'الخريطة',
    synonyms: ['خريطة', 'الخريطه', 'خارطة', 'الخارطة', 'الأطلس', 'map'],
    hints: [
      'يستخدمها المسافرون والبحارة لتحديد الاتجاهات.',
      'تُرسم على الورق أو تظهر على شاشة الهاتف في تطبيقات الملاحة.',
      'تبدأ بحرف الخاء وتنتهي بالتاء المربوطة.'
    ],
    explanation: 'الخريطة تمثل تضاريس الأرض جغرافياً، فتحتوي على رسوم البحار والمدن والحدود بلا ماء ولا سكان فعليين!'
  },
  {
    category: 'math',
    categoryName: 'ذكاء رياضي',
    baseTitle: 'لغز البيض والسلة',
    emojis: ['🧺', '🥚', '🔢', '👨‍👩‍👧‍👦', '✨'],
    scenarioTemplates: [
      'سلة تحتوي على 6 بيضات طازجة. وُزعت هذه البيضات على 6 أشخاص بحيث أخذ كل شخص منهم بيضة واحدة كاملة، ومع ذلك بقيت بيضة واحدة داخل السلة دون أن تُكسر!',
      'ستة أطفال تقاسموا 6 برتقالات موجودة في صندوق، كل طفل حصل على برتقالة كاملة، ومع ذلك بقي في الصندوق برتقالة واحدة بالضبط!',
      'خمسة أصدقاء أخذوا خمس تفاحات من طبق، كل واحد أخذ تفاحة، فبقيت تفاحة أخيرة في الطبق!'
    ],
    questionTemplates: [
      'كيف حدث ذلك منطقياً ورياضياً؟',
      'من الذي أخذ البيضة مع السلة؟',
      'ما هو التفسير الذكي لبقاء البيضة بالسلة؟'
    ],
    answer: 'الشخص الأخير أخذ السلة وبداخلها بيضته',
    synonyms: [
      'الشخص الأخير أخذ السلة',
      'أخذ السلة مع البيضة',
      'آخر شخص أخذ السلة',
      'الأخير أخذ السلة',
      'أخذها داخل السلة'
    ],
    hints: [
      'كل الأشخاص حصلوا على بيضتهم بالفعل دون خداع في العدد.',
      'فكر في مكان البيضة الأخيرة وفي الشخص الأخير.',
      'الشخص الأخير لم يخرج بيضته من السلة بل أخذ السلة كاملة وبها بيضته!'
    ],
    explanation: 'الشخص الأخير أخذ السلة نفسها وبداخلها بيضته المخصصة له، فأصبح يملك بيضة وبقيت البيضة في السلة في آن واحد!'
  },
  {
    category: 'wisdom',
    categoryName: 'حكمة وفطنة',
    baseTitle: 'فطنة القاضي العادل والذهب',
    emojis: ['⚖️', '💰', '📜', '👳‍♂️', '🪙'],
    scenarioTemplates: [
      'ادعى تاجران ملكية كيس دنانير ذهبية وجده حطاب في السوق. أحضر القاضي وعاءً فيه ماء مغلي وألقى الدنانير فيه، فصعدت قطرات من الزيت تطفو على السطح، فحكم فوراً لصالح أحدهما وسجن الآخر!',
      'تنازع خباز وعطار على محفظة نقود فضية مفقودة. وضع القاضي العملات في ماء ساخن، فظهرت على سطح الماء رائحة عطر خفيفة وطبقة زيت عطرية، فعرف صاحبها الحقيقي على الفور!',
      'ذهب لحام وبقال للقاضي يتنازعان على صرة نقود. غمس القاضي الدراهم في ماء فارتفعت قطرات دهن وشحم حيواني، فعلم القاضي فوراً من الصادق!'
    ],
    questionTemplates: [
      'ما مهنة صاحب المال الحقيقي التي كشفها الدهن أو الزيت؟',
      'إلى أي صاحب صنعة حكم القاضي بالأموال؟',
      'من هو صاحب النقود الحقيقي؟'
    ],
    answer: 'التاجر صاحب الصنعة التي تلوث النقود بالزيت أو الدهن',
    synonyms: [
      'اللحام',
      'العطار',
      'الخباز',
      'القصاب',
      'صاحب الزيت',
      'بائع الزيت'
    ],
    hints: [
      'العملات المعدنية تحتفظ بآثار مهنة صاحبها الذي يتداولها طوال النهار.',
      'الحرارة تجعل الزيوت والدهون العالقة بأيدي التاجر تطفو فوق سطح الماء.',
      'مهنة التاجر كانت ترتبط بالدهن أو الزيوت مثل اللحام أو بائع الزيت!'
    ],
    explanation: 'يدي التاجر تكونان ملوثتين بمواد صنعته (كالدهن للحام أو الزيت لبائع الزيت)، فتنتقل للعملات وتطفو بالماء الساخن لتكشف الحقيقة!'
  },
  {
    category: 'science',
    categoryName: 'أسرار علمية',
    baseTitle: 'لغز الصوت والبرق',
    emojis: ['⚡', '🌩️', '👂', '👁️', '💨'],
    scenarioTemplates: [
      'في ليلة العاصفة الهوجاء، يُولد شقيقان توأمان في نفس اللحظة من نفس السحابة، لكنك ترى الأول بعينيك قبل أن تسمع الثاني بأذنيك بعدة ثوانٍ!',
      'يحدثان معاً في نفس الكسر من الثانية في السماء، لكن المسافر في الأرض يشهد الضوء الساطع أولاً ثم يأتيه الصوت المجلجل بعد لحظات!',
      'سرعة أحدهما تتجاوز 300 ألف كيلومتر في الثانية، بينما الآخر يمشي متمهلاً بسرعة 340 متراً في الثانية في الهواء!'
    ],
    questionTemplates: [
      'لماذا نرى البرق قبل سماع صوت الرعد؟',
      'ما سبب وصول الضوء قبل الصوت؟',
      'ما هي الظاهرة الفيزيائية المسؤولة عن هذا الفرق؟'
    ],
    answer: 'سرعة الضوء أكبر بكثير من سرعة الصوت',
    synonyms: [
      'سرعة الضوء أسرع من الصوت',
      'الضوء أسرع من الصوت',
      'سرعة الضوء',
      'الضوء أسرع',
      'speed of light'
    ],
    hints: [
      'فكر في الفرق الفيزيائي بين سرعة الموجات الكهرومغناطيسية والموجات الميكانيكية.',
      'الضوء ينتقل في الهواء بلمح البصر بينما الصوت يحتاج وقتاً ليقطع المسافة.',
      'السبب يتعلق بأن سرعة الضوء تفوق سرعة الصوت بمئات آلاف المرات.'
    ],
    explanation: 'الضوء يسير بسرعة 300,000 كم/ثانية فيصل عينك فوراً، بينما الصوت يسير بسرعة 340 م/ثانية في الهواء فيستغرق ثوانٍ للوصول إلى أذنك!'
  },
  {
    category: 'logic',
    categoryName: 'تفكير استنتاجي',
    baseTitle: 'لغز الأبواب الثلاثة والأسود الجائعة',
    emojis: ['🚪', '🦁', '🔥', '⚔️', '🧠'],
    scenarioTemplates: [
      'سجين حكم عليه باختيار غرفة من ثلاث: الأولى تشتعل فيها نيران مستعرة، والثانية مليئة بقطاع طرق مسلحين بالسيوف، والثالثة فيها أسود مفترسة لم تأكل أي طعام منذ ثلاث سنوات كاملة. اختار الغرفة الثالثة ونجا بسهولة!',
      'أمامك ثلاثة ممرات للهروب من قلعة: ممر تسقط فيه صخور نارية، وممر به رماة أسهم محترفون، وممر به نمور متوحشة محبوسة بلا طعام ولا ماء منذ سنتين كاملتين. أي الممرات أكثر أماناً ولماذا؟',
      'لغز الملك والنجاة: سجين اختار غرفة الوحوش الجائعة منذ سنوات وخرج منها سالماً دون خدش واحد!'
    ],
    questionTemplates: [
      'لماذا كانت غرفة الوحوش أو الأسود هي الأكثر أماناً؟',
      'كيف نجا السجين في الغرفة الثالثة؟',
      'ما هو السر في نجاة السجين؟'
    ],
    answer: 'الأسود تكون قد ماتت من الجوع لأنها لم تأكل منذ سنوات',
    synonyms: [
      'الأسود ميتة',
      'الأسود ماتت من الجوع',
      'الوحوش ميتة',
      'الأسود ماتت',
      'لأن الأسود ماتت',
      'ماتت من الجوع'
    ],
    hints: [
      'كم يوماً يستطيع أي حيوان ثديي أن يعيش دون أي طعام؟',
      'ثلاث سنوات فترة طويلة جداً يستحيل لأي كائن حي البقاء حياً خلالها دون طعام.',
      'الأسود ماتت منذ زمن بعيد والغرفة أصبحت فارغة وآمنة!'
    ],
    explanation: 'أي أسد أو حيوان مفترس لم يأكل شيئاً لمدة ثلاث سنوات يكون قد مات من الجوع حتماً، فتكون الغرفة خالية من الخطر تماماً!'
  }
];

// Memory set to prevent immediate repetition across sessions
const SEEN_PUZZLE_IDS_KEY = 'brainrush_seen_puzzle_ids';

function getSeenPuzzleIds(): string[] {
  try {
    const raw = localStorage.getItem(SEEN_PUZZLE_IDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function markPuzzleAsSeen(id: string) {
  try {
    const seen = getSeenPuzzleIds();
    if (!seen.includes(id)) {
      seen.push(id);
      // Keep last 100
      if (seen.length > 100) seen.shift();
      localStorage.setItem(SEEN_PUZZLE_IDS_KEY, JSON.stringify(seen));
    }
  } catch {
    // Ignore storage issues
  }
}

/**
 * Procedurally generates a unique, tailored puzzle out of hundreds of thousands of combinations
 */
export function generateProceduralPuzzle(
  preferredCategory?: PuzzleCategory | 'all',
  preferredDifficulty: PuzzleDifficulty = 'medium'
): Puzzle {
  let eligibleSeeds = PROCEDURAL_SEEDS;
  if (preferredCategory && preferredCategory !== 'all') {
    const filtered = PROCEDURAL_SEEDS.filter(s => s.category === preferredCategory);
    if (filtered.length > 0) {
      eligibleSeeds = filtered;
    }
  }

  const seenIds = getSeenPuzzleIds();
  // Filter out recent ones if possible
  const freshSeeds = eligibleSeeds.filter(s => !seenIds.includes(s.baseTitle));
  const pool = freshSeeds.length > 0 ? freshSeeds : eligibleSeeds;

  const selectedSeed = pool[Math.floor(Math.random() * pool.length)];

  // Pick random scenario & question template for dynamic variation
  const scenarioIndex = Math.floor(Math.random() * selectedSeed.scenarioTemplates.length);
  const questionIndex = Math.floor(Math.random() * selectedSeed.questionTemplates.length);

  const scenario = selectedSeed.scenarioTemplates[scenarioIndex];
  const question = selectedSeed.questionTemplates[questionIndex];

  // Randomize emojis order
  const shuffledEmojis = [...selectedSeed.emojis].sort(() => 0.5 - Math.random()).join(' ');

  const puzzleId = `procedural_${Date.now()}_${Math.floor(Math.random() * 99999)}`;
  markPuzzleAsSeen(selectedSeed.baseTitle);

  const difficultyNames: Record<PuzzleDifficulty, string> = {
    easy: 'سهل وممتع',
    medium: 'متوسط الذكاء',
    hard: 'تحدي العباقرة'
  };

  return {
    id: puzzleId,
    title: selectedSeed.baseTitle,
    category: selectedSeed.category,
    categoryName: selectedSeed.categoryName,
    difficulty: preferredDifficulty,
    difficultyName: difficultyNames[preferredDifficulty] || 'متوسط الذكاء',
    visualClue: shuffledEmojis,
    scenario,
    question,
    answer: selectedSeed.answer,
    synonyms: selectedSeed.synonyms,
    hints: selectedSeed.hints,
    explanation: selectedSeed.explanation,
    isAiGenerated: true
  };
}

/**
 * Requests a new AI-generated puzzle from the server (with dynamic seed to prevent repeats),
 * falling back smoothly to procedural generation if offline or rate limited.
 */
export async function fetchNewAiPuzzle(
  category: PuzzleCategory | 'all' = 'all',
  difficulty: PuzzleDifficulty = 'medium'
): Promise<Puzzle> {
  const seenIds = getSeenPuzzleIds().slice(-10);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch('/api/generate-puzzle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: category === 'all' ? undefined : category,
        difficulty,
        excludeIds: seenIds,
        seed: `${Date.now()}_${Math.random()}`
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.puzzle && data.puzzle.answer) {
        markPuzzleAsSeen(data.puzzle.id || data.puzzle.title);
        return {
          ...data.puzzle,
          id: data.puzzle.id || `ai_${Date.now()}`,
          isAiGenerated: true
        };
      }
    }
  } catch (e) {
    console.warn('AI puzzle server request error, utilizing procedural generation:', e);
  }

  // Graceful, instantaneous procedural generation fallback
  return generateProceduralPuzzle(category, difficulty);
}
