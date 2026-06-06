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
  meta: [
    { label: "Type", value: "Production AI pipeline" },
    { label: "Focus", value: "Reliability & cost engineering" },
    { label: "Pattern", value: "Multi-model + QA gates" },
  ],
  problem: [
    "Producing on-brand content at volume is mostly invisible manual labour: drafting, reformatting, checking it didn't drift off-brand, fixing the one field that came back malformed, doing it again tomorrow. It scales linearly with headcount, which is to say it doesn't scale.",
    "The interesting problem isn't 'can an LLM write this'. It's 'can a system produce this reliably, at a sane cost, and fail safely when a model misbehaves'.",
  ],
  build: [
    "A pipeline that takes a structured brief and runs it through tiered models, schema-constrained generation, and explicit quality gates before anything is considered done. Cheap models do the bulk work; expensive models are spent only where judgment is actually needed.",
    "Every stage assumes the model can be wrong. Output is validated against a schema, checked by a QA gate, and when something fails the run is logged with enough context to recover, not silently dropped.",
    "This is a clean rebuild around public APIs that demonstrates the architecture and the engineering judgment behind it, with generic demo content in place of any real campaign data.",
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

const novaAi: CaseStudy = {
  slug: "nova-ai",
  title: "Nova AI",
  kicker: "Deployed LLM chat app",
  outcome:
    "A live chat app on an open model that never exposes its API key to the browser, because the secret stays on the server where it belongs.",
  meta: [
    { label: "Type", value: "Deployed web app" },
    { label: "Model", value: "Llama 3.1 8B (Hugging Face)" },
    { label: "Role", value: "Solo build" },
  ],
  problem: [
    "The fastest way to ship an LLM chat app is also the most common way to leak a key: call the model API straight from the frontend. It works in a demo and quietly hands your token to anyone who opens the network tab.",
    "I wanted the simplest possible chat app that still did the one thing most quick builds get wrong, keep the credential server-side.",
  ],
  build: [
    "Nova AI is a lightweight chat interface running Meta's Llama 3.1 8B through the Hugging Face Inference API. The frontend never sees the token; every request goes through a small serverless function that holds the secret and proxies the call.",
    "No framework, no build ceremony, deployed and live. The point was to prove the discipline, not to over-engineer it: a clean UI, a streaming response, and a credential that an attacker can't pull out of the client.",
  ],
  pipeline: [
    {
      title: "Client",
      nodes: [
        { id: "ui", label: "Chat UI", detail: "Plain JS, no key present", kind: "input" },
      ],
    },
    {
      title: "Proxy",
      nodes: [
        { id: "fn", label: "Serverless function", detail: "Holds the token, server-side", kind: "logic" },
      ],
    },
    {
      title: "Model",
      nodes: [
        { id: "hf", label: "Hugging Face Inference", detail: "Llama 3.1 8B", kind: "model" },
      ],
    },
    {
      title: "Return",
      nodes: [
        { id: "resp", label: "Response to client", detail: "Token never leaves server", kind: "output" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "The secret never reaches the browser",
      body: "The API token lives only in the serverless function's environment. The client calls the proxy, the proxy calls the model. Open the network tab all you like, the credential isn't there.",
    },
    {
      title: "A proxy, not a backend",
      body: "There's no database, no auth, no server to babysit, just a single function that exists to keep one secret secret. The smallest piece of infrastructure that solves the actual problem.",
    },
    {
      title: "Open model, on purpose",
      body: "Running Llama via Hugging Face instead of a closed API keeps the app cheap and swappable. The proxy pattern means the model behind it can change without touching the client.",
    },
  ],
  results: [
    {
      label: "What it proves",
      body: "The instinct that separates a demo from something shippable: never trust the client with a secret, even when the lazy path is right there.",
    },
    {
      label: "Status",
      body: "Built solo and deployed live. A deployed LLM chat app, not a production product, and it doesn't pretend to be more.",
    },
  ],
  tech: [
    "Llama 3.1 8B",
    "Hugging Face Inference API",
    "Serverless proxy",
    "Vanilla JavaScript",
    "Vercel",
  ],
  links: [{ label: "View on GitHub", href: GITHUB }],
};

const blogspace: CaseStudy = {
  slug: "blogspace",
  title: "BlogSpace",
  kicker: "Live & deployed full-stack",
  outcome:
    "A complete blogging platform with authentication, roles, and an admin panel, built end to end and running in production.",
  meta: [
    { label: "Type", value: "Full-stack web app" },
    { label: "Stack", value: "React + Node + MongoDB" },
    { label: "Role", value: "Solo, front to back" },
  ],
  problem: [
    "A blogging platform sounds simple until you list what it actually needs: accounts, secure login, two kinds of users, content that only the right people can edit, and an admin who can moderate all of it. That's a real application, not a toy.",
    "I built it solo, end to end, as proof I can take a full-stack product from auth to deployment without hand-waving the hard parts.",
  ],
  build: [
    "BlogSpace handles the full lifecycle: register and log in with JWT-based auth and hashed passwords, write and publish posts in a rich-text editor, and manage everything through an admin panel with role-based access.",
    "Users get drafts, published states, tags, auto-generated excerpts and read-time. Admins get user promotion/demotion and post moderation. It's deployed across Netlify, Render, and MongoDB Atlas, and it's live, not a localhost screenshot.",
  ],
  pipeline: [
    {
      title: "Auth",
      nodes: [
        { id: "register", label: "Register / login", detail: "JWT + bcrypt", kind: "input" },
        { id: "role", label: "Role assignment", detail: "User vs admin", kind: "logic" },
      ],
    },
    {
      title: "Content",
      nodes: [
        { id: "editor", label: "Rich-text editor", detail: "Draft / publish", kind: "input" },
        { id: "crud", label: "Post CRUD", detail: "Owned by author", kind: "logic" },
      ],
    },
    {
      title: "Guard",
      nodes: [
        { id: "protect", label: "Protected routes", detail: "Access by role", kind: "gate" },
      ],
    },
    {
      title: "Admin",
      nodes: [
        { id: "moderate", label: "Moderation panel", detail: "Manage users & posts", kind: "output" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Auth done properly, not faked",
      body: "JWT tokens, bcrypt-hashed passwords, protected routes, and role-based access control. The boring security fundamentals that separate a real app from a tutorial, implemented rather than skipped.",
    },
    {
      title: "Two user classes, enforced server-side",
      body: "Users manage their own content; admins manage everyone's. The boundary is enforced on the backend, not hidden in the UI, so the permission model actually holds.",
    },
    {
      title: "Deployed across three services",
      body: "Frontend on Netlify, backend on Render, database on MongoDB Atlas. Wiring those together and keeping them talking in production is its own skill, and it's live.",
    },
  ],
  results: [
    {
      label: "What it proves",
      body: "End-to-end full-stack capability: a working auth system, a real permission model, and a deployment that strangers can actually use.",
    },
    {
      label: "Try it",
      body: "It's live and clickable, with demo accounts available, the strongest kind of proof: not a description, a working thing.",
    },
  ],
  tech: [
    "React",
    "Node.js / Express",
    "MongoDB / Mongoose",
    "JWT + bcrypt",
    "Netlify + Render",
  ],
  links: [
    { label: "Live site", href: "https://tangerine-cupcake-145674.netlify.app/login" },
    { label: "View on GitHub", href: GITHUB },
  ],
};

const aiNotes: CaseStudy = {
  slug: "ai-notes",
  title: "AI Notes",
  kicker: "Local inference, no server",
  outcome:
    "A note-taking app whose AI features run entirely on your own machine, so your notes never leave it.",
  meta: [
    { label: "Type", value: "Local-LLM web app" },
    { label: "Model", value: "DeepSeek R1 via Ollama" },
    { label: "Role", value: "Solo build" },
  ],
  problem: [
    "Almost every AI note app sends your writing to a third-party API. For private notes, that's the opposite of what you want, and it means the app is useless offline.",
    "I wanted to show the alternative most people skip: useful AI features that don't require a cloud call, a subscription, or trusting someone else with your data.",
  ],
  build: [
    "AI Notes runs DeepSeek R1 locally through Ollama, called straight from the browser. Summarize, improve writing, expand an idea, generate questions, extract keywords, all of it happens on the user's own machine.",
    "Built with plain HTML, CSS, and JavaScript, no frameworks, with notes stored locally in the browser. Once the model is pulled, the whole thing works offline. The point was to keep it dependency-light and prove local inference is a real option, not a compromise.",
  ],
  pipeline: [
    {
      title: "Write",
      nodes: [
        { id: "note", label: "Note in browser", detail: "Stored locally", kind: "input" },
      ],
    },
    {
      title: "Local model",
      nodes: [
        { id: "ollama", label: "Ollama runtime", detail: "On the user's machine", kind: "model" },
        { id: "ds", label: "DeepSeek R1", detail: "No external call", kind: "model" },
      ],
    },
    {
      title: "Assist",
      nodes: [
        { id: "ops", label: "Summarize / expand / extract", detail: "AI actions", kind: "logic" },
      ],
    },
    {
      title: "Stay private",
      nodes: [
        { id: "local", label: "Nothing leaves the device", detail: "Offline-capable", kind: "output" },
      ],
    },
  ],
  howItWorks: [
    {
      title: "Inference stays on the machine",
      body: "The model runs through Ollama locally. There's no API endpoint receiving your notes, because there's no external call at all. Privacy isn't a policy promise here, it's the architecture.",
    },
    {
      title: "Works offline once set up",
      body: "Pull the model once and the app keeps working with no internet. The AI features don't depend on a server being up or a bill being paid.",
    },
    {
      title: "Deliberately dependency-light",
      body: "Plain HTML, CSS, and JavaScript, no framework, browser storage for the notes. Small enough to understand fully, which was the point.",
    },
  ],
  results: [
    {
      label: "What it demonstrates",
      body: "That local and self-hosted inference is a practical choice, and the awareness of when keeping data on-device matters more than convenience.",
    },
    {
      label: "Scope",
      body: "A focused solo build proving the local-LLM pattern, not a feature-complete notes product.",
    },
  ],
  tech: [
    "DeepSeek R1",
    "Ollama (local)",
    "Vanilla JavaScript",
    "Browser storage",
  ],
  links: [{ label: "View on GitHub", href: GITHUB }],
};

export const caseStudies: Record<string, CaseStudy> = {
  craftconnect,
  "creative-ops-pipeline": creativeOps,
  "nova-ai": novaAi,
  blogspace,
  "ai-notes": aiNotes,
};

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies[slug];
