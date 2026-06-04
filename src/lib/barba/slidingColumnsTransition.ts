import type { BarbaTransitionData } from "./types";
import {
  runPageEnterAnimation,
  runPageLeaveAnimation,
  runPageOnceAnimation,
} from "./sliding-columns/animations";
import { initOnceFunctions } from "./shutter/lenis";

/** Sliding-columns page transition — /ai routes (see transitionRules). */
export const slidingColumnsTransition = {
  name: "slidingColumns",
  sync: true,

  async once(data: BarbaTransitionData) {
    initOnceFunctions();
    return runPageOnceAnimation(data.next.container);
  },

  async leave(data: BarbaTransitionData) {
    return runPageLeaveAnimation(
      data.current.container,
      data.next.container,
    );
  },

  async enter(data: BarbaTransitionData) {
    return runPageEnterAnimation(data.next.container);
  },
};
