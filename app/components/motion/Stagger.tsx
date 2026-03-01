"use client";

import { Children, ReactNode, isValidElement, useMemo } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MotionLevel, getMotionConfig } from "@/lib/motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  level?: MotionLevel;
};

export function Stagger({ children, className, stagger, delay = 0, level = "medium" }: StaggerProps) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const reduce = useReducedMotion();
  const motion = getMotionConfig(level, reduce);
  const resolvedStagger = stagger ?? motion.staggerDelay;

  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delay={delay + index * resolvedStagger} level={level}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  if (isValidElement(children)) {
    return <div className={className}>{children}</div>;
  }

  return <div className={className}>{children}</div>;
}
