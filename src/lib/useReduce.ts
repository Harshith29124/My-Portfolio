/**
 * Motion is intentionally always on, regardless of the OS "reduce motion"
 * setting — the signature animation is core to this site's identity.
 *
 * This exists because reading the OS preference directly once silently killed
 * every animation on machines with reduce-motion enabled (e.g. a desktop with
 * the setting on) while phones kept animating. Reporting "no reduction" keeps
 * behaviour identical on every device.
 *
 * Kept as a hook rather than a constant so the decision has one home: if the
 * site ever should honour the OS preference, only this file changes.
 */
export function useReduce(): boolean {
  return false;
}
