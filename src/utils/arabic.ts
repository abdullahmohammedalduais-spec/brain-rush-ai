/**
 * Normalize Arabic text for seamless answer matching
 * Eliminates frustrations with hamza variations, taa marbuta, and tashkeel.
 */
export function normalizeArabic(text: string): string {
  if (!text) return "";

  return text
    .trim()
    .toLowerCase()
    // Remove diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // Normalize Hamza forms to bare Alef
    .replace(/[إأآا]/g, "ا")
    // Normalize Taa Marbuta to Haa
    .replace(/ة/g, "ه")
    // Normalize Yaa forms
    .replace(/ى/g, "ي")
    // Normalize Persian/Urdu Kaf & Yeh if any
    .replace(/ك/g, "ك")
    // Remove punctuation & special characters except spaces
    .replace(/[^\w\s\u0600-\u06FF]/gi, "")
    // Collapse multiple spaces into single space
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Checks if user answer matches the puzzle answer or any of its synonyms
 */
export function isAnswerCorrect(userAnswer: string, correctAnswer: string, synonyms: string[] = []): boolean {
  const normUser = normalizeArabic(userAnswer);
  if (!normUser) return false;

  const normTarget = normalizeArabic(correctAnswer);
  if (normUser === normTarget) return true;

  // Also match without definite article "ال"
  const withoutAl = (str: string) => str.startsWith("ال") ? str.substring(2) : str;
  if (withoutAl(normUser) === withoutAl(normTarget)) return true;

  // Check against all synonyms
  for (const syn of synonyms) {
    const normSyn = normalizeArabic(syn);
    if (normUser === normSyn || withoutAl(normUser) === withoutAl(normSyn)) {
      return true;
    }
  }

  return false;
}

/**
 * Format Arabic date (e.g. 13 سبتمبر 2026)
 */
export function formatArabicDate(date: Date = new Date()): string {
  const arabicMonths = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  const day = date.getDate();
  const month = arabicMonths[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Calculate day of year (1 - 366) to select daily puzzle stably
 */
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
