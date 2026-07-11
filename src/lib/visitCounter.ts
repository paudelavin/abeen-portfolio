// Deterministic "site visits" counter — no database needed.
// Starts at 1024 on the base date, and increases by a random amount
// between 50-200 for every full day that has passed since then.
// Because the random amount is seeded by the date itself, everyone who
// visits on the same day sees the same number, and it only ever goes up.

const BASE_DATE = new Date("2026-07-11T00:00:00Z");
const BASE_COUNT = 1024;

function seedFromString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateToDayString(date: Date): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function getTotalVisits(): number {
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysElapsed = Math.floor((now.getTime() - BASE_DATE.getTime()) / msPerDay);

  let total = BASE_COUNT;
  for (let i = 1; i <= daysElapsed; i++) {
    const day = new Date(BASE_DATE.getTime() + i * msPerDay);
    const seed = seedFromString(dateToDayString(day));
    const rand = mulberry32(seed)();
    const increment = 50 + Math.floor(rand * 151); // 50-200 inclusive
    total += increment;
  }
  return total;
}