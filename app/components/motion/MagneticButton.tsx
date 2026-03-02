"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  enabled: boolean;
  className?: string;
};

export function MagneticButton({ href, children, variant = "primary", enabled, className }: MagneticButtonProps) {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      if (linkRef.current) {
        linkRef.current.style.transform = "translate3d(0,0,0)";
      }
      return;
    }

    const animate = () => {
      const lerp = hoveringRef.current ? 0.26 : 0.2;
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      currentRef.current.x += dx * lerp;
      currentRef.current.y += dy * lerp;

      if (linkRef.current) {
        linkRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      }

      const isResting = Math.abs(currentRef.current.x) < 0.05 && Math.abs(currentRef.current.y) < 0.05;
      if (!hoveringRef.current && isResting) {
        currentRef.current = { x: 0, y: 0 };
        targetRef.current = { x: 0, y: 0 };
        if (linkRef.current) linkRef.current.style.transform = "translate3d(0,0,0)";
        rafRef.current = null;
        return;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const ensureAnimation = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const onResize = () => {
      rectRef.current = linkRef.current?.getBoundingClientRect() ?? null;
    };

    const onMouseEnter = () => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      hoveringRef.current = true;
      rectRef.current = linkRef.current?.getBoundingClientRect() ?? null;
      ensureAnimation();
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!hoveringRef.current || !rectRef.current) return;
      const rect = rectRef.current;
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      targetRef.current.x = nx * 10;
      targetRef.current.y = ny * 8;
    };

    const onMouseLeave = () => {
      hoveringRef.current = false;
      targetRef.current = { x: 0, y: 0 };
      ensureAnimation();
    };

    const node = linkRef.current;
    if (!node) return;

    window.addEventListener("resize", onResize, { passive: true });
    node.addEventListener("mouseenter", onMouseEnter);
    node.addEventListener("mousemove", onMouseMove);
    node.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", onResize);
      node.removeEventListener("mouseenter", onMouseEnter);
      node.removeEventListener("mousemove", onMouseMove);
      node.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled]);

  return (
    <Link
      ref={linkRef}
      href={href}
      className={`btn ${variant} magneticButton${className ? ` ${className}` : ""}`}
      style={{ transform: "translate3d(0,0,0)" }}
    >
      {children}
    </Link>
  );
}
