import { GITHUB } from "./projects";

export type PipelineNode = {
  id: string;
  label: string;
  detail?: string;
  kind?: "input" | "model" | "logic" | "gate" | "output";
};

export type PipelineStage = {
  title: string; // short column heading, e.g. "Capture"
  nodes: PipelineNode[];
};

export type HowItWorksItem = {
  title: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  outcome: string;
  kicker: string;
  meta: { label: string; value: string }[];
  inProgress?: boolean;
  problem: string[];
  build: string[];
  pipeline: PipelineStage[];
  howItWorks: HowItWorksItem[];
  results: { label: string; body: string }[];
  tech: string[];
  links: { label: string; href: string }[];
};

const craftconnect: CaseStudy = {
  slug: "craftconnect",
  title: "CraftConnect",
  kicker: "Gen AI Exchange Hackathon 2025",
  outcome:
    "Let an artisan stand up an online storefront by talking and showing a product, instead of typing forms in a language that isn't theirs.",
  meta: [
    { label: "Role", value: "Product lead, full frontend, co-built backend" },
    { label: "Context", value: "Gen AI Exchange Hackathon 2025" },
    { label: "Scale", value: "270,000+ developers nationally" },
    { label: "Status", value: "Built & deployed on Google Cloud" },
  ],
  problem: [
    "Most artisans don't lose sales because their craft isn't good enough. They lose them because getting a product online means typing English product descriptions, setting prices, writing tags, and fighting a form-heavy interface that assumes you already know e-commerce.",
    "That barrier is the whole problem. The skill is in the hands; the friction is in the keyboard.",
  ],
  build: [
    "CraftConnect removes the keyboard. An artisan photographs a product and describes it out loud in their own language. From that, the system produces a complete, structured listing: a title, a written description, suggested categories and tags, and a storefront page, ready to publish.",
    "It's multi-modal by necessity, not for show. The photo carries information the voice doesn't (material, colour, form), and the voice carries information the photo can't (story, intended use, price intent). The pipeline fuses both into one validated listing.",
    "I led the product, built the entire frontend, co-built the backend, and owned the decisions that actually mattered: which AI services to use where, and what the end-to-end user journey should feel like.",
  ],
  pipeline: [
    {
      title: "Capture",
      nodes: [
        { id: "voice", label: "Voice input", detail: "Artisan's own language", kind: "input" },
        { id: "photo", label: "Product photo", detail: "One or more images", kind: "input" },
      ],
    },
    {
      title: "Understand",
      nodes: [
        { id: "stt", label: "Speech-to-text", detail: "Transcribe + detect language", kind: "model" },
        { id: "vision", label: "Vision analysis", detail: "Gemini reads the product", kind: "model" },
      ],
    },
    {
      title: "Compose",
      nodes: [
        { id: "fuse", label: "Fuse signals", detail: "Voice intent + visual attributes", kind: "logic" },
        { id: "gen", label: "Listing generation", detail: "Gemini, schema-constrained", kind: "model" },
      ],
    },
    {
      title: "Verify",
      nodes: [
        { id: "validate", label: "Validate fields", detail: "Title, price, tags present & sane", kind: "gate" },
        { id: "translate", label: "Localize", detail: "Buyer-facing language", kind: "logic" },
      ],
    },
    {
      title: "Publish",
      nodes: [
        { id: "store", label: "Storefront page", detail: "Ready to go live", kind: "output" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Voice and vision are treated as two witnesses, not one",
      body: "The photo and the spoken description are analyzed separately, then reconciled. When they agree, confidence is high. When they conflict (the voice says 'silk' but the image reads cotton), the system surfaces it rather than silently guessing. That's a deliberate reliability choice, not an accident of the model.",
    },
    {
      title: "Generation is schema-constrained, not free-text",
      body: "The model isn't asked to 'write a listing'. It's asked to fill a defined structure: title, description, category, tags, price band. Constraining the output shape is what makes it usable by the rest of the app instead of being a paragraph someone still has to parse.",
    },
    {
      title: "Language is decoupled from logic",
      body: "The artisan speaks one language; the buyer may read another. Localization happens as its own step at the end, so the understanding pipeline never has to care what language it started in. One pipeline, many markets.",
    },
    {
      title: "AI service selection was a judgment call, not a default",
      body: "I chose where to spend model capability and where a cheaper, narrower service was enough. Speech-to-text, multimodal reasoning, and generation are different jobs with different cost and latency profiles, and they were wired accordingly.",
    },
  ],
  results: [
    {
      label: "What changed",
      body: "A task that previously required literacy in English, e-commerce, and form-filling collapses into 'show it and say it'. The artisan's expertise stays in the craft, not the keyboard.",
    },
    {
      label: "Recognition",
      body: "Built and deployed for the Gen AI Exchange Hackathon 2025, a national event with 270,000+ developers, and advanced through several rounds.",
    },
    {
      label: "Honest scope",
      body: "This was a hackathon build, not a production marketplace. The value it proves is the interaction model and the multi-modal pipeline behind it, both of which hold up.",
    },
  ],
  tech: [
    "Gemini (multimodal)",
    "Google Cloud Speech-to-Text",
    "Google Cloud",
    "React",
    "Node.js",
    "Structured / schema-constrained output",
  ],
  links: [{ label: "View on GitHub", href: GITHUB }],
};

const creativeOps: CaseStudy = {
  slug: "creative-ops-pipeline",
  title: "Creative-Ops Pipeline",
  kicker: "Flagship case study",
  outcome:
    "A multi-model content pipeline that turns a one-line brief into validated, on-brand output, without a human babysitting every step.",
  inProgress: true,
  meta: [
    { label: "Type", value: "Production AI pipeline" },
    { label: "Focus", value: "Reliability & cost engineering" },
    { label: "Write-up", value: "In progress" },
  ],
  problem: [
    "Producing on-brand content at volume is mostly invisible manual labour: drafting, reformatting, checking it didn't drift off-brand, fixing the one field that came back malformed, doing it again tomorrow. It scales linearly with headcount, which is to say it doesn't scale.",
    "The interesting problem isn't 'can an LLM write this'. It's 'can a system produce this reliably, at a sane cost, and fail safely when a model misbehaves'.",
  ],
  build: [
    "A pipeline that takes a structured brief and runs it through tiered models, schema-constrained generation, and explicit quality gates before anything is considered done. Cheap models do the bulk work; expensive models are spent only where judgment is actually needed.",
    "Every stage assumes the model can be wrong. Output is validated against a schema, checked by a QA gate, and when something fails the run is logged with enough context to recover, not silently dropped.",
    "This is a clean rebuild around public APIs that demonstrates the architecture and the engineering judgment. The full write-up with diagrams and sample runs is in progress.",
  ],
  pipeline: [
    {
      title: "Intake",
      nodes: [
        { id: "brief", label: "Structured brief", detail: "What, for whom, constraints", kind: "input" },
      ],
    },
    {
      title: "Route",
      nodes: [
        { id: "cheap", label: "Draft (low-cost model)", detail: "Bulk generation", kind: "model" },
        { id: "premium", label: "Refine (high-capability model)", detail: "Only where it pays off", kind: "model" },
      ],
    },
    {
      title: "Structure",
      nodes: [
        { id: "schema", label: "Schema-constrained output", detail: "Generate then validate", kind: "logic" },
      ],
    },
    {
      title: "Gate",
      nodes: [
        { id: "rules", label: "Rule checks", detail: "Format, fields, limits", kind: "gate" },
        { id: "critique", label: "LLM critique gate", detail: "On-brand? On-spec?", kind: "gate" },
      ],
    },
    {
      title: "Resolve",
      nodes: [
        { id: "errlog", label: "Error log that still saves", detail: "Recover, don't drop", kind: "logic" },
        { id: "publish", label: "Approved output", detail: "Ready downstream", kind: "output" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Cost-tiered models, spent on purpose",
      body: "Not every token needs a frontier model. The bulk of generation runs on a cheaper model; the expensive one is reserved for the steps where its judgment changes the outcome. The result is the same quality bar at a fraction of the bill.",
    },
    {
      title: "Generate, then validate, then trust",
      body: "Structured output is requested against a schema, but the schema request is treated as a hope, not a guarantee. Every output is validated before the pipeline acts on it. Malformed responses are caught at the boundary, not three steps later.",
    },
    {
      title: "QA gates as code, not vibes",
      body: "Quality is checked explicitly: deterministic rule checks for the things rules can catch, and an LLM critique pass for the judgment calls ('is this actually on-brand'). Nothing passes on optimism.",
    },
    {
      title: "Failures save their work",
      body: "When a run breaks, it isn't thrown away. It's logged with enough context to resume or retry the failing step, so a single bad model response never costs the whole job.",
    },
  ],
  results: [
    {
      label: "What it demonstrates",
      body: "Judgment about where to spend compute, how to make LLM output trustworthy enough to build on, and how to fail without losing work.",
    },
    {
      label: "Honesty note",
      body: "This is a clean rebuild on public APIs with generic demo content. No client data, no proprietary logic. The skill is the point, not the source material.",
    },
  ],
  tech: [
    "LLM orchestration",
    "Tiered model routing",
    "Schema-constrained output",
    "Validation layer",
    "QA gates",
    "Structured logging",
  ],
  links: [],
};

export const caseStudies: Record<string, CaseStudy> = {
  craftconnect,
  "creative-ops-pipeline": creativeOps,
};

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies[slug];
