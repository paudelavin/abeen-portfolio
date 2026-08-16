// Deterministic "starter" likes for each blog post — no database needed.
// Each post gets a small starting count on its publish day, then gains a
// random amount between 5-20 for every full day since. Seeded by the post's
// own ID + date, so it's stable for everyone and always increases over time.

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
  return date.toISOString().slice(0, 10);
}

export function getFakeLikes(postId: string, createdAt: Date): number {
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysElapsed = Math.floor((now.getTime() - createdAt.getTime()) / msPerDay);

  // Small starting count on day one, seeded by the post ID alone
  const startSeed = seedFromString(postId);
  let total = 3 + Math.floor(mulberry32(startSeed)() * 6); // 3-8 starting likes

  for (let i = 1; i <= Math.max(daysElapsed, 0); i++) {
    const day = new Date(createdAt.getTime() + i * msPerDay);
    const seed = seedFromString(postId + dateToDayString(day));
    const rand = mulberry32(seed)();
    const increment = 5 + Math.floor(rand * 16); // 5-20 inclusive
    total += increment;
  }
  return total;
}