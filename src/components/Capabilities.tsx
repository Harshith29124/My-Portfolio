import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import NodeGlyph from "./NodeGlyph";

type Tile = {
  title: string;
  body: string;
  span: string;
  feature?: boolean; // wider tiles get the tinted treatment + motif
};

const tiles: Tile[] = [
  {
    title: "LLM integration & orchestration",
    body: "Wiring models together so they do real work reliably, not just answer a prompt.",
    span: "lg:col-span-2",
    feature: true,
  },
  {
    title: "Multi-modal pipelines",
    body: "Voice, vision, and text turned into one structured, usable result.",
    span: "lg:col-span-1",
  },
  {
    title: "Output reliability",
    body: "The same correct shape back every time, so the rest of the system can trust it.",
    span: "lg:col-span-1",
  },
  {
    title: "Full-stack AI apps",
    body: "The whole thing shipped: the model, the backend, and the interface a person uses.",
    span: "lg:col-span-1",
  },
  {
    title: "Local + cloud inference",
    body: "Google Cloud AI, Hugging Face, or fully local via Ollama, whichever the job and budget call for.",
    span: "lg:col-span-2",
    feature: true,
  },
  {
    title: "Workflow automation",
    body: "Automating the glue work between tools with n8n. A means to an end, never the headline.",
    span: "lg:col-span-1",
  },
];

function TileCard({ tile, index }: { tile: Tile; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.08,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={`group glass-card relative flex min-h-[200px] flex-col overflow-hidden rounded-[var(--radius-lg)] p-6 hover:-translate-y-1.5 ${
        tile.feature ? "justify-between" : "justify-start"
      } ${tile.span}`}
    >
      {tile.feature && (
        <div className="flex justify-end">
          <NodeGlyph
            seed={tile.title}
            className="text-faint transition-colors duration-500 group-hover:text-dim"
          />
        </div>
      )}

      <div className="relative">
        <h3 className="text-lg font-medium tracking-tight text-ink transition-colors duration-500 group-hover:text-accent-ink">
          {tile.title}
        </h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-dim">
          {tile.body}
        </p>
      </div>
    </motion.article>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-28 border-t border-line bg-surface/20">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <SectionHeading
            title="What I can do for you"
            intro="Framed as what it does for your business, not a list of tech badges. Ordered by what matters most."
          />
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(200px,auto)] grid-flow-dense grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <TileCard key={t.title} tile={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
