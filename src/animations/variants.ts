import type { Variants } from "framer-motion";

export const pageVariants: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: { opacity: 0, x: 16, transition: { duration: 0.18, ease: "easeIn" } },
};

export const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const toastVariants: Variants = {
  initial: { opacity: 0, x: 48, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: 48, scale: 0.85, transition: { duration: 0.18 } },
};
