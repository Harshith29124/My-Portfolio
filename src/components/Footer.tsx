import { Link } from "react-router-dom";
import { EMAIL, LINKEDIN, GITHUB } from "../data/projects";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm text-dim transition-colors hover:text-ink"
        >
          <span className="h-2 w-2 rounded-[1px] bg-accent" aria-hidden />
          harshith
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] text-faint">
          <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-ink">
            Email
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <span className="text-faint/70">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
