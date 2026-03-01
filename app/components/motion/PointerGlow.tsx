"use client";

import { useEffect, useRef } from "react";

type PointerGlowProps = {
  enabled: boolean;
  parallaxY?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function PointerGlow({ enabled, parallaxY = 0 }: PointerGlowProps) {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const ampRef = useRef(1);
  const parallaxRef = useRef(parallaxY);

  useEffect(() => {
    parallaxRef.current = parallaxY;
  }, [parallaxY]);

  useEffect(() => {
    if (!enabled) return;

    const updateAmplitude = () => {
      const shortest = Math.min(window.innerWidth, window.innerHeight);
      ampRef.current = clamp(shortest / 1200, 0.7, 1.2);
    };

    updateAmplitude();

    const onResize = () => updateAmplitude();
    const onPointerMove = (event: MouseEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
    };

    const animate = () => {
      const lerp = 0.16;
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      currentRef.current.x += dx * lerp;
      currentRef.current.y += dy * lerp;

      const x = currentRef.current.x;
      const y = currentRef.current.y;
      const amp = ampRef.current;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${amp})`;
      }

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(0, ${parallaxRef.current * -0.35}px, 0) scale(${amp})`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onPointerMove);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={glowRef} className="cursorGlow" aria-hidden />
      <div ref={haloRef} className="cursorHalo" aria-hidden />
    </>
  );
}
