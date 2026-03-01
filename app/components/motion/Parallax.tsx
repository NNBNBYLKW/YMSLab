"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MotionLevel, getMotionConfig } from "@/lib/motion";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  offset?: number;
  level?: MotionLevel;
};

export function Parallax({ children, className, offset, level = "medium" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const motion = getMotionConfig(level, reduce);
  const resolvedOffset = offset ?? motion.parallaxOffset;

  useEffect(() => {
    if (reduce || !ref.current || resolvedOffset === 0) return;

    let ticking = false;
    const element = ref.current;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const y = (progress - 0.5) * resolvedOffset;
      element.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      element.style.transform = "translate3d(0, 0, 0)";
    };
  }, [resolvedOffset, reduce]);

  return (
    <div ref={ref} className={className} style={{ willChange: reduce ? "auto" : "transform" }}>
      {children}
    </div>
  );
}
