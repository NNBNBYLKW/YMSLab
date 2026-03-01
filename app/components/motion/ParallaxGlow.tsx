"use client";

import { useEffect, useRef, useState } from "react";

type ParallaxGlowProps = {
  enabled: boolean;
  parallaxY: number;
};

export function ParallaxGlow({ enabled, parallaxY }: ParallaxGlowProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const pointerRaf = useRef<number | null>(null);
  const latestPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (pointerRaf.current) {
        window.cancelAnimationFrame(pointerRaf.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setPointer({ x: 0, y: 0 });
      return;
    }

    const onPointerMove = (event: MouseEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      latestPointer.current = { x: event.clientX, y: event.clientY };
      if (pointerRaf.current) return;

      pointerRaf.current = window.requestAnimationFrame(() => {
        setPointer(latestPointer.current);
        pointerRaf.current = null;
      });
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", onPointerMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursorGlow" style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }} />
      <div
        className="cursorHalo"
        style={{ transform: `translate(${pointer.x}px, ${pointer.y}px) translate3d(0, ${parallaxY * -0.35}px, 0)` }}
      />
    </>
  );
}
