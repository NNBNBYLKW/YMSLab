"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MotionLevel, getMotionConfig } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  distance?: number;
  level?: MotionLevel;
  durationMs?: number;
  once?: boolean;
};

const axisOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "down":
      return `translate3d(0, -${distance}px, 0)`;
    case "left":
      return `translate3d(${distance}px, 0, 0)`;
    case "right":
      return `translate3d(-${distance}px, 0, 0)`;
    case "up":
    default:
      return `translate3d(0, ${distance}px, 0)`;
  }
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance,
  level = "medium",
  durationMs,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const motion = getMotionConfig(level, reduce);
  const [shown, setShown] = useState(false);
  const resolvedDistance = distance ?? motion.revealDistance;
  const resolvedDurationMs = durationMs ?? motion.revealDurationMs;

  useEffect(() => {
    if (reduce || !ref.current) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, reduce]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown || reduce ? "translate3d(0,0,0)" : axisOffset(direction, resolvedDistance),
        transition: reduce
          ? `opacity ${resolvedDurationMs}ms ease ${delay}s`
          : `opacity ${resolvedDurationMs}ms ease ${delay}s, transform ${resolvedDurationMs}ms ease ${delay}s`,
        willChange: reduce ? "opacity" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
