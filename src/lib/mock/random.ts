/**
 * Deterministic pseudo-random helpers used to generate the local mock data for
 * Financial Management System. Every dataset in `src/data/` is derived from a fixed seed so
 * the numbers are stable across server and client renders (no hydration
 * mismatches) while still looking varied and realistic.
 */

export function createRng(seed: number) {
  let state = seed >>> 0;

  return function next() {
    // mulberry32
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = ReturnType<typeof createRng>;

export function pick<T>(rng: Rng, items: readonly T[]): T {
  const item = items[Math.floor(rng() * items.length)];
  if (item === undefined) throw new Error("pick() called with an empty array");
  return item;
}

export function pickMany<T>(rng: Rng, items: readonly T[], count: number): T[] {
  const pool = [...items];
  const result: T[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const index = Math.floor(rng() * pool.length);
    result.push(pool.splice(index, 1)[0] as T);
  }
  return result;
}

export function intBetween(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function amountBetween(rng: Rng, min: number, max: number, step = 10): number {
  const value = min + rng() * (max - min);
  return Math.round(value / step) * step;
}

export function chance(rng: Rng, probability: number): boolean {
  return rng() < probability;
}

export function weightedPick<T>(rng: Rng, entries: ReadonlyArray<readonly [T, number]>): T {
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = rng() * total;
  for (const [value, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return value;
  }
  return entries[entries.length - 1][0];
}

/** Adds `days` (can be negative) to an ISO date string and returns an ISO date string (yyyy-mm-dd). */
export function addDaysIso(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function sequence(prefix: string, index: number, width = 5): string {
  return `${prefix}-${String(index).padStart(width, "0")}`;
}
