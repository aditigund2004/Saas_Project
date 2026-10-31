/**
 * High-performance lightweight fuzzy search algorithm.
 * Scores strings based on character matching, consecutive streaks, and word boundaries.
 */
export function fuzzyMatch(pattern: string, text: string): { match: boolean; score: number } {
  if (!pattern) return { match: true, score: 1 };
  if (!text) return { match: false, score: 0 };

  const p = pattern.toLowerCase();
  const t = text.toLowerCase();

  // Exact substring match bonus
  if (t.includes(p)) {
    return {
      match: true,
      score: 100 + (p.length / t.length) * 50 + (t.startsWith(p) ? 40 : 0)
    };
  }

  let pIdx = 0;
  let score = 0;
  let consecutive = 0;

  for (let tIdx = 0; tIdx < t.length && pIdx < p.length; tIdx++) {
    if (t[tIdx] === p[pIdx]) {
      pIdx++;
      consecutive++;
      score += 5 + consecutive * 4;
      // Word start bonus
      if (tIdx === 0 || t[tIdx - 1] === ' ' || t[tIdx - 1] === '/' || t[tIdx - 1] === '-') {
        score += 10;
      }
    } else {
      consecutive = 0;
    }
  }

  const match = pIdx === p.length;
  return { match, score: match ? score : 0 };
}

export function searchCollection<T>(
  items: T[],
  query: string,
  getSearchableFields: (item: T) => string[]
): T[] {
  if (!query || !query.trim()) return items;

  const results: { item: T; score: number }[] = [];

  for (const item of items) {
    const fields = getSearchableFields(item);
    let maxScore = 0;
    let anyMatch = false;

    for (const field of fields) {
      const { match, score } = fuzzyMatch(query, field);
      if (match) {
        anyMatch = true;
        if (score > maxScore) maxScore = score;
      }
    }

    if (anyMatch) {
      results.push({ item, score: maxScore });
    }
  }

  return results.sort((a, b) => b.score - a.score).map((r) => r.item);
}

