export const columnCount = 5;
export const transitionDuration = 0.6;
export const staggerEach = 0.06;

export function getSlidingColumnsEnterStart(): number {
  return transitionDuration + (columnCount - 1) * staggerEach;
}
