import { useEffect, useRef } from "react";

/**
 * Signature hero motif: a living neural pipeline. Edges shimmer, nodes
 * breathe, and bright signals travel input -> output continuously. Drawn on
 * canvas (no React re-render), theme-aware, reduced-motion safe.
 */

type Node = { x: number; y: number; layer: number; pulse: number; phase: number };
type Edge = { a: number; b: number; phase: number };
type Signal = { path: number[]; t: number; speed: number };

const LAYERS = [2, 3, 4, 3, 2];

function readTheme() {
  const cs = getComputedStyle(document.documentElement);
  const get = (n: string, fb: string) => cs.getPropertyValue(n).trim() || fb;
  const isDark = document.documentElement.classList.contains("dark");
  return {
    isDark,
    accent: get("--accent", "#c6ff3a"),
    accentInk: get("--accent-ink", "#3c6b00"),
    ink: get("--ink", "#ededef"),
  };
}

function hexToRgb(hex: string) {
  const m = hex.trim().replace("#", "");
  const v =
    m.length === 3
      ? m.split("").map((c) => c + c).join("")
      : m.padEnd(6, "0").slice(0, 6);
  const n = parseInt(v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export default function NodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Animations are forced on site-wide (see MotionConfig in main.tsx), so the
    // signature pipeline always runs rather than honoring the OS reduce setting.
    const reduce = false;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let signals: Signal[] = [];
    let theme = readTheme();
    let accentRgb = hexToRgb(theme.accent);
    let edgeRgb = hexToRgb(theme.isDark ? theme.accent : theme.accentInk);
    let inkRgb = hexToRgb(theme.ink);
    let w = 0;
    let h = 0;
    let raf = 0;
    let start = performance.now();
    let last = start;
    let spawnTimer = 0;
    const byLayer: number[][] = [];

    const refreshTheme = () => {
      theme = readTheme();
      accentRgb = hexToRgb(theme.accent);
      edgeRgb = hexToRgb(theme.isDark ? theme.accent : theme.accentInk);
      inkRgb = hexToRgb(theme.ink);
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      refreshTheme();

      nodes = [];
      edges = [];
      byLayer.length = 0;

      const padX = w * 0.1;
      const usableW = w - padX * 2;
      const colGap = usableW / (LAYERS.length - 1);

      LAYERS.forEach((count, layer) => {
        const ids: number[] = [];
        const colH = h * 0.66;
        const top = h * 0.17;
        for (let i = 0; i < count; i++) {
          const y = count === 1 ? top + colH / 2 : top + (colH * i) / (count - 1);
          nodes.push({
            x: padX + colGap * layer,
            y,
            layer,
            pulse: 0,
            phase: Math.random() * Math.PI * 2,
          });
          ids.push(nodes.length - 1);
        }
        byLayer.push(ids);
      });

      for (let l = 0; l < byLayer.length - 1; l++) {
        for (const a of byLayer[l]) {
          const next = byLayer[l + 1];
          const sorted = [...next].sort(
            (p, q) => Math.abs(nodes[p].y - nodes[a].y) - Math.abs(nodes[q].y - nodes[a].y),
          );
          const n = Math.min(sorted.length, Math.random() > 0.4 ? 2 : 1);
          for (const b of sorted.slice(0, n)) {
            edges.push({ a, b, phase: Math.random() * Math.PI * 2 });
          }
        }
      }
    };

    const randomPath = (): number[] => {
      const path: number[] = [];
      let current = byLayer[0][Math.floor(Math.random() * byLayer[0].length)];
      path.push(current);
      for (let l = 0; l < byLayer.length - 1; l++) {
        const outs = edges.filter((e) => e.a === current);
        if (!outs.length) break;
        const e = outs[Math.floor(Math.random() * outs.length)];
        current = e.b;
        path.push(current);
      }
      return path;
    };

    const litEdges = new Map<string, number>();
    const key = (a: number, b: number) => `${a}-${b}`;

    const draw = (now: number) => {
      const time = (now - start) / 1000;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      litEdges.clear();

      if (!reduce) {
        spawnTimer -= dt;
        if (spawnTimer <= 0 && signals.length < 6) {
          signals.push({ path: randomPath(), t: 0, speed: 0.6 + Math.random() * 0.5 });
          spawnTimer = 0.35 + Math.random() * 0.5;
        }
        signals = signals.filter((s) => {
          s.t += dt * s.speed;
          return s.t < s.path.length - 1;
        });
      }

      for (const s of signals) {
        const seg = Math.floor(s.t);
        if (seg < s.path.length - 1) {
          litEdges.set(key(s.path[seg], s.path[seg + 1]), 1 - (s.t - seg));
        }
        const headIdx = Math.min(Math.round(s.t), s.path.length - 1);
        nodes[s.path[headIdx]].pulse = 1;
      }

      const E = edgeRgb;
      const A = accentRgb;
      const I = inkRgb;

      // edges: constant soft shimmer + bright when a signal is on them
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const lit = litEdges.has(key(e.a, e.b));
        const shimmer = reduce ? 0.16 : 0.1 + 0.08 * (0.5 + 0.5 * Math.sin(time * 1.5 + e.phase));
        const mx = (a.x + b.x) / 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(mx, a.y, mx, b.y, b.x, b.y);
        if (lit) {
          ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},0.85)`;
          ctx.lineWidth = 1.6;
          ctx.shadowColor = `rgba(${A.r},${A.g},${A.b},0.6)`;
          ctx.shadowBlur = 8;
        } else {
          ctx.strokeStyle = `rgba(${E.r},${E.g},${E.b},${shimmer})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // traveling signals with a soft comet head
      for (const s of signals) {
        const seg = Math.floor(s.t);
        const frac = s.t - seg;
        if (seg >= s.path.length - 1) continue;
        const a = nodes[s.path[seg]];
        const b = nodes[s.path[seg + 1]];
        const mx = (a.x + b.x) / 2;
        const p = bezier(a.x, a.y, mx, a.y, mx, b.y, b.x, b.y, frac);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14);
        g.addColorStop(0, `rgba(${A.r},${A.g},${A.b},0.9)`);
        g.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${A.r},${A.g},${A.b},1)`;
        ctx.fill();
      }

      // nodes: gentle breathing + bright pulse when hit
      for (const n of nodes) {
        const isOutput = n.layer === LAYERS.length - 1;
        if (!reduce) n.pulse = Math.max(0, n.pulse - dt * 1.6);
        const breathe = reduce ? 0 : 0.5 + 0.5 * Math.sin(time * 1.8 + n.phase);
        const baseR = isOutput ? 4.5 : 3.2;
        const glow = Math.max(n.pulse, isOutput ? 0.35 + 0.25 * breathe : 0.12 * breathe);

        if (glow > 0.02) {
          const gr = baseR + 10 * glow;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr);
          g.addColorStop(0, `rgba(${A.r},${A.g},${A.b},${0.4 * glow})`);
          g.addColorStop(1, `rgba(${A.r},${A.g},${A.b},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, gr, 0, Math.PI * 2);
          ctx.fill();
        }

        const bright = n.pulse > 0.05 || isOutput;
        ctx.beginPath();
        ctx.arc(n.x, n.y, baseR, 0, Math.PI * 2);
        ctx.fillStyle = bright
          ? `rgba(${A.r},${A.g},${A.b},1)`
          : `rgba(${I.r},${I.g},${I.b},${theme.isDark ? 0.65 : 0.8})`;
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    build();
    if (reduce) draw(performance.now());
    else {
      start = performance.now();
      last = start;
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      build();
      if (reduce) draw(performance.now());
    };
    window.addEventListener("resize", onResize);

    const observer = new MutationObserver(() => {
      refreshTheme();
      if (reduce) draw(performance.now());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />;
}

function bezier(
  x0: number, y0: number, x1: number, y1: number,
  x2: number, y2: number, x3: number, y3: number, t: number,
) {
  const u = 1 - t;
  const x = u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3;
  const y = u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3;
  return { x, y };
}
