/**
 * Motion is intentionally always on, regardless of the OS "reduce motion"
 * setting — the signature animation is core to this site's identity.
 *
 * Note: motion's `useReducedMotion()` returns the real OS preference even when
 * the tree is wrapped in `MotionConfig reducedMotion="never"`. That silently
 * killed every animation on machines with reduce-motion enabled (e.g. a desktop
 * with the OS setting on) while phones kept animating. This hook replaces it and
 * always reports "no reduction", so behaviour is consistent on every device.
 */
export function useReduce(): boolean {
  return false;
}
