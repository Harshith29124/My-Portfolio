export type Project = {
  slug: string;
  title: string;
  outcome: string; // one-line, outcome-framed (not a feature list)
  tags: string[];
  links: { label: string; href: string }[];
  hasCaseStudy: boolean;
  status?: "in-progress";
  kicker?: string; // small context line
};

export const GITHUB = "https://github.com/Harshith29124";
export const LINKEDIN =
  "https://www.linkedin.com/in/harshith-nayaka-l-518b98348";
export const EMAIL = "harshith28124@gmail.com";

/** Ordered by strength - the grid renders them in this order. */
export const projects: Project[] = [
  {
    slug: "creative-ops-pipeline",
    title: "Creative-Ops Pipeline",
    kicker: "Flagship",
    outcome:
      "A multi-model content pipeline that replaces hours of manual production with validated, on-brand output.",
    tags: ["LLM orchestration", "Structured output", "QA gates", "Cost tiering"],
    links: [],
    hasCaseStudy: true,
    status: "in-progress",
  },
  {
    slug: "craftconnect",
    title: "CraftConnect",
    kicker: "Gen AI Exchange Hackathon 2025",
    outcome:
      "A multi-modal assistant that lets artisans run an online storefront by talking and showing, not typing.",
    tags: ["Voice + Vision", "Gemini", "Google Cloud", "Product lead"],
    links: [{ label: "GitHub", href: GITHUB }],
    hasCaseStudy: true,
  },
  {
    slug: "nova-ai",
    title: "Nova AI",
    kicker: "Deployed LLM chat app",
    outcome:
      "A deployed chat app on Llama 3.1 8B that keeps the API token server-side behind a serverless proxy.",
    tags: ["Llama 3.1 8B", "Hugging Face", "Serverless proxy"],
    links: [{ label: "GitHub", href: GITHUB }],
    hasCaseStudy: false,
  },
  {
    slug: "blogspace",
    title: "BlogSpace",
    kicker: "Live & deployed",
    outcome:
      "A full-stack blogging platform with JWT auth and an admin panel, live in production.",
    tags: ["React", "Node", "MongoDB", "JWT"],
    links: [
      {
        label: "Live site",
        href: "https://tangerine-cupcake-145674.netlify.app/login",
      },
      { label: "GitHub", href: GITHUB },
    ],
    hasCaseStudy: false,
  },
  {
    slug: "ai-notes",
    title: "AI Notes",
    kicker: "Local inference, no server",
    outcome:
      "A notes app running a local LLM through Ollama, so inference never leaves the machine.",
    tags: ["DeepSeek R1", "Ollama", "Local/self-hosted"],
    links: [{ label: "GitHub", href: GITHUB }],
    hasCaseStudy: false,
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
