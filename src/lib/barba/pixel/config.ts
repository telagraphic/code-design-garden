export const pixelHorizontalAmount = 12;
export const transitionDuration = 1;
export const pixelFadeDuration = 0.2;
export const pixelOverlap = 0.3;

/** When the stepped clip-path reveal on `next` finishes. */
export function getPixelClipRevealEnd(): number {
  const clipStart = Math.min(pixelFadeDuration, transitionDuration * 0.5);
  const clipDuration = Math.max(0.001, transitionDuration - 2 * clipStart);
  return clipStart + clipDuration;
}

/** When the overlay finishes (clip reveal + pixel fade-out). */
export function getPixelTransitionEnd(): number {
  return (
    transitionDuration +
    transitionDuration / Math.max(1, pixelHorizontalAmount)
  );
}
