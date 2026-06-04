import type { BarbaTransitionData } from "./types";
import {
  runPageEnterAnimation,
  runPageLeaveAnimation,
  runPageOnceAnimation,
} from "./pixel/animations";
import { initOnceFunctions } from "./shutter/lenis";

export const pixelTransition = {
  name: "pixel",
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
