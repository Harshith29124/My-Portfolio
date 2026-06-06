import { Link } from "react-router-dom";
import { EMAIL, LINKEDIN, GITHUB } from "../data/projects";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-mono text-base font-semibold text-ink transition-colors hover:text-accent-ink"
        >
          <span className="h-2.5 w-2.5 rounded-[2px] bg-accent" aria-hidden />
          harshith
        </Link>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-semibold">
          <a
            href={`mailto:${EMAIL}`}
            className="text-dim transition-colors hover:text-accent-ink"
          >
            Email
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer noopener"
            className="text-dim transition-colors hover:text-accent-ink"
          >
            LinkedIn
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            className="text-dim transition-colors hover:text-accent-ink"
          >
            GitHub
          </a>
          <span className="text-sm font-medium text-faint">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
