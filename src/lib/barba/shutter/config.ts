import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("osmo", "0.625, 0.05, 0, 1");
gsap.defaults({ ease: "osmo", duration: 0.6 });

export const shutterAmountConfig = {
  desktop: 10,
  tablet: 10,
  mobileLandscape: 10,
  mobile: 10,
} as const;

export const transitionDuration = 0.5;
export const shutterStaggerAmount = 0.3;
