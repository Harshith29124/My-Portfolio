import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { EMAIL, LINKEDIN, GITHUB, NAME } from "../data/projects";

const nav = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const legal = [
  { to: "/legal/privacy", label: "Privacy Policy" },
  { to: "/legal/terms", label: "Terms of Use" },
  { to: "/legal/cookies", label: "Cookie Policy" },
];

const connect = [
  { href: `mailto:${EMAIL}`, label: "Email", ext: false },
  { href: LINKEDIN, label: "LinkedIn", ext: true },
  { href: GITHUB, label: "GitHub", ext: true },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

  const goTo = useCallback(
    (id: string) => {
      const scroll = () => lenis?.scrollTo(`#${id}`, { offset: -90 });
      if (pathname === "/") scroll();
      else {
        navigate("/");
        window.setTimeout(scroll, 120);
      }
    },
    [pathname, navigate, lenis],
  );

  const col = "flex flex-col gap-3";
  const head =
    "font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-faint";
  const link =
    "text-left text-sm font-medium text-dim transition-colors hover:text-accent-ink";

  return (
    <footer className="border-t border-line bg-surface/30">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 font-mono text-base font-semibold text-ink transition-colors hover:text-accent-ink"
            >
              <span className="h-2.5 w-2.5 rounded-[2px] bg-accent" aria-hidden />
              {NAME}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-dim">
              AI Workflow Engineer at DemandNXT, building reliable,
              production-grade AI systems and pipelines.
            </p>
          </div>

          <nav className={col} aria-label="Sections">
            <p className={head}>Navigate</p>
            {nav.map((n) => (
              <button key={n.id} onClick={() => goTo(n.id)} className={link}>
                {n.label}
              </button>
            ))}
          </nav>

          <nav className={col} aria-label="Legal">
            <p className={head}>Legal</p>
            {legal.map((l) => (
              <Link key={l.to} to={l.to} className={link}>
                {l.label}
              </Link>
            ))}
          </nav>

          <nav className={col} aria-label="Connect">
            <p className={head}>Connect</p>
            {connect.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.ext
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className={link}
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-medium text-faint">
            © {year} {NAME}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Reliability is the feature.
          </p>
        </div>
      </div>
    </footer>
  );
}
