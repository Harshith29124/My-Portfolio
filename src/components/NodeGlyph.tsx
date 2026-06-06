/**
 * A tiny bespoke pipeline motif per project. Deterministic from a seed string,
 * so each card gets a recognizably different little DAG, all in the same
 * engineered language as the hero graph. Replaces stock imagery entirely.
 */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export default function NodeGlyph({ seed, className }: { seed: string; className?: string }) {
  const h = hash(seed);
  // 3 columns, node counts derived from the seed (1-3 per column)
  const cols = [1 + (h % 2), 2 + ((h >> 3) % 2), 1 + ((h >> 6) % 2)];
  const W = 72;
  const H = 48;
  const padX = 10;
  const colGap = (W - padX * 2) / (cols.length - 1);

  const points: { x: number; y: number; col: number }[] = [];
  cols.forEach((count, c) => {
    const top = 10;
    const usable = H - 20;
    for (let i = 0; i < count; i++) {
      const y = count === 1 ? H / 2 : top + (usable * i) / (count - 1);
      points.push({ x: padX + colGap * c, y, col: c });
    }
  });

  const edges: [number, number][] = [];
  for (let c = 0; c < cols.length - 1; c++) {
    const from = points.filter((p) => p.col === c);
    const to = points.filter((p) => p.col === c + 1);
    from.forEach((a) => {
      const ai = points.indexOf(a);
      // connect to nearest 1-2 nodes in next column
      const sorted = [...to].sort(
        (p, q) => Math.abs(p.y - a.y) - Math.abs(q.y - a.y),
      );
      const n = (h >> (ai + 1)) % 2 === 0 ? 1 : Math.min(2, sorted.length);
      sorted.slice(0, n).forEach((b) => edges.push([ai, points.indexOf(b)]));
    });
  }

  const lastCol = cols.length - 1;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {edges.map(([a, b], i) => {
        const p = points[a];
        const q = points[b];
        const mx = (p.x + q.x) / 2;
        return (
          <path
            key={i}
            d={`M ${p.x} ${p.y} C ${mx} ${p.y}, ${mx} ${q.y}, ${q.x} ${q.y}`}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={0.5}
          />
        );
      })}
      {points.map((p, i) => {
        const isOut = p.col === lastCol;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={isOut ? 3 : 2.2}
            className={isOut ? "fill-accent" : "fill-current"}
            fillOpacity={isOut ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}
