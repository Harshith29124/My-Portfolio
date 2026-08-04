import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Keep in sync with the sha256-... entry in vercel.json's CSP script-src —
// this exact string (byte for byte) is what's hashed there. If you touch
// this, regenerate the hash or the swap silently never fires under CSP.
const CSS_SWAP_SCRIPT =
  '(function(){var l=document.getElementById("app-css");if(!l)return;l.addEventListener("load",function(){l.rel="stylesheet"},{once:true});})();';

/**
 * Vite auto-injects the built stylesheet as a plain, render-blocking
 * `<link rel="stylesheet">`. For this app that's genuinely unnecessary: it's a
 * client-rendered SPA, so nothing is visible in `<div id="root">` until the JS
 * bundle (much larger than the CSS) has downloaded, parsed, and mounted React
 * — there's no pre-existing content for unstyled CSS to flash, so there's
 * nothing for the browser to protect by blocking render on the stylesheet.
 *
 * Rewrites the link to the standard preload+swap pattern (fetch at high
 * priority, apply once loaded, no render-block), with a <noscript> fallback
 * for the no-JS/crawler case. The swap itself runs from a real <script>
 * element rather than an onload="" attribute: inline event-handler attributes
 * are a script-src sink that this site's strict CSP doesn't allow, and the
 * one CSP3 feature that *would* allow it ('unsafe-hashes') isn't supported in
 * every browser — silently failing there would mean the stylesheet never
 * applies and the whole site renders unstyled. A hashed inline <script>
 * (same pattern as the theme-init script) works everywhere the CSP already
 * works. Pure HTML output transform — no headless browser, no build-time
 * rendering, so it can't break the Vercel build.
 */
function nonBlockingCss(): Plugin {
  return {
    name: "non-blocking-css",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        let out = html.replace(
          /<link rel="stylesheet"([^>]*?) href="([^"]+\.css)"([^>]*)>/g,
          (_match, before, href, after) =>
            `<link rel="preload" as="style" id="app-css"${before} href="${href}"${after}>` +
            `<script>${CSS_SWAP_SCRIPT}</script>` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
        );
        // The entry script is what actually gates the HTML->JS chain the perf
        // audit flags, but by default it competes on equal footing with the 8
        // font preloads and the CSS preload also firing from <head>.
        // fetchpriority="high" makes the browser's request scheduler favor it
        // over those when bandwidth is contended, instead of leaving priority
        // among ~10 parallel head requests to a same-priority default.
        out = out.replace(
          /<script type="module"([^>]*?) src="([^"]+)"([^>]*)>/,
          (_match, before, src, after) =>
            `<script type="module" fetchpriority="high"${before} src="${src}"${after}>`,
        );
        return out;
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), nonBlockingCss()],
});
