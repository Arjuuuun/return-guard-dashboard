export interface ReturnItem {
  id: string;
  reason: string;
  score: number | null;
  reasoning: string | null;
  scored_at: string | null;
  reasoning_trace_id: string | null;
  similar_cases: unknown;
  archetype: string | null;
}

// The API serializes the Postgres NUMERIC score column as a string
// (e.g. "0.9000") to avoid precision loss, so it needs coercing to a number
// before use.
export function normalizeReturn(raw: Omit<ReturnItem, 'score'> & { score: number | string | null }): ReturnItem {
  return {
    ...raw,
    score: raw.score === null ? null : Number(raw.score),
  };
}
