import { motion, useReducedMotion } from "motion/react";

/**
 * Honest stack marquee. These are the tools actually used across the work
 * (not "trusted by" clients). Logos via Simple Icons CDN, text fallback baked in.
 * Items are tactile capsules that spring on hover; the whole strip fades and
 * lifts in on scroll so the section reads as alive, not a static logo wall.
 */
type Tool = { name: string; slug?: string };

const rowA: Tool[] = [
  { name: "Gemini", slug: "googlegemini" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "Ollama", slug: "ollama" },
  { name: "Llama 3.1" },
  { name: "DeepSeek R1" },
];

const rowB: Tool[] = [
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "n8n", slug: "n8n" },
  { name: "Python", slug: "python" },
];

function Item({ tool }: { tool: Tool }) {
  return (
    <span className="stack-pill mx-2.5 shrink-0 text-dim">
      {tool.slug && (
        <img
          src={`https://cdn.simpleicons.org/${tool.slug}/9a9aa2`}
          alt=""
          aria-hidden
          width={18}
          height={18}
          loading="lazy"
          className="h-[18px] w-[18px] opacity-90"
        />
      )}
      <span className="font-mono text-[15px] tracking-tight">{tool.name}</span>
    </span>
  );
}

function Row({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const doubled = [...tools, ...tools];
  return (
    <div className="marquee-mask marquee-group overflow-hidden py-1.5">
      <div className={`marquee-track ${reverse ? "rev" : ""}`}>
        {doubled.map((t, i) => (
          <Item key={`${t.name}-${i}`} tool={t} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const reduce = useReducedMotion();
  return (
    <motion.section
      aria-label="Tools and models used across the work"
      className="border-y border-line bg-surface/20 py-12"
      initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="shell mb-7 flex items-center gap-2.5">
        <span
          className="grid h-3.5 w-3.5 place-items-center rounded-[4px] border border-accent/30 bg-accent/5"
          aria-hidden
        >
          <span className="h-1.5 w-1.5 rounded-[1.5px] bg-accent" />
        </span>
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-faint">
          The stack behind the work
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Row tools={rowA} />
        <Row tools={rowB} reverse />
      </div>
    </motion.section>
  );
}
