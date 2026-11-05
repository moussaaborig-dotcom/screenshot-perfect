/**
 * Normalizes text for forgiving local search in Arabic and French:
 * - lowercases, strips Latin accents (é → e)
 * - strips Arabic diacritics and tatweel
 * - unifies alef / ya / ta-marbuta variants
 */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(input: string): string[] {
  const n = normalizeText(input);
  return n ? n.split(" ") : [];
}

/**
 * Scores how well a query matches a haystack. Every query token must appear
 * (prefix or substring) for a non-zero score.
 */
export function scoreMatch(query: string, fields: { text: string; weight: number }[]): number {
  const tokens = tokenize(query);
  if (tokens.length === 0) return 0;
  const normalized = fields.map((f) => ({ text: normalizeText(f.text), weight: f.weight }));
  let total = 0;
  for (const token of tokens) {
    let best = 0;
    for (const field of normalized) {
      if (!field.text) continue;
      const words = field.text.split(" ");
      if (words.some((w) => w === token)) best = Math.max(best, 3 * field.weight);
      else if (words.some((w) => w.startsWith(token))) best = Math.max(best, 2 * field.weight);
      else if (field.text.includes(token)) best = Math.max(best, 1 * field.weight);
    }
    if (best === 0) return 0;
    total += best;
  }
  return total;
}
