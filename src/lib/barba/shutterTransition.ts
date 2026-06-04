import type { BarbaTransitionData } from "./types";
import {
  runPageEnterAnimation,
  runPageLeaveAnimation,
  runPageOnceAnimation,
} from "./shutter/animations";
import { initOnceFunctions } from "./shutter/lenis";

/** Global shutter page transition — used for all internal navigations (v1). */
export const shutterTransition = {
  name: "shutter",
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
