import React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

// Page level transition with subtle swipe-up and fade
export const PageTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Generic Fade In with directional swipe
interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.4,
  distance = 20,
  className = "",
  ...props
}) => {
  const getInitialCoords = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const coords = getInitialCoords();

  return (
    <motion.div
      initial={{ opacity: 0, ...coords }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...coords }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Swipe In (e.g. from drawer edge or side) with spring physics
interface SwipeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  from?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export const SwipeIn: React.FC<SwipeInProps> = ({
  children,
  from = "right",
  className = "",
  ...props
}) => {
  const variants = {
    initial: {
      x: from === "right" ? "100%" : from === "left" ? "-100%" : 0,
      y: from === "bottom" ? "100%" : from === "top" ? "-100%" : 0,
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8,
      },
    },
    exit: {
      x: from === "right" ? "100%" : from === "left" ? "-100%" : 0,
      y: from === "bottom" ? "100%" : from === "top" ? "-100%" : 0,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered Container for Lists / Grids
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}> = ({ children, className = "", staggerDelay = 0.06, delayChildren = 0.05 }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item (individual card/item inside StaggerContainer)
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export { AnimatePresence, motion };
