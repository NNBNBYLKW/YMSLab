"use client";

import Link from "next/link";
import { useState } from "react";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  enabled: boolean;
};

export function MagneticButton({ href, children, variant = "primary", enabled }: MagneticButtonProps) {
  const [transformStyle, setTransformStyle] = useState("translate3d(0,0,0)");

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enabled || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = (x / rect.width - 0.5) * 10;
    const dy = (y / rect.height - 0.5) * 10;
    setTransformStyle(`translate3d(${dx}px, ${dy}px, 0)`);
  };

  return (
    <Link
      href={href}
      className={`btn ${variant} magneticButton`}
      style={{ transform: transformStyle }}
      onMouseMove={onMove}
      onMouseLeave={() => setTransformStyle("translate3d(0,0,0)")}
    >
      {children}
    </Link>
  );
}
