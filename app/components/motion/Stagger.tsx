"use client";

import { Children, ReactNode, isValidElement, useMemo } from "react";
import { Reveal } from "@/components/motion/Reveal";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function Stagger({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) {
  const items = useMemo(() => Children.toArray(children), [children]);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delay={delay + index * stagger}>
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
