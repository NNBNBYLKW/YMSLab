export type MotionLevel = "high" | "medium" | "low";

export type MotionConfig = {
  revealDistance: number;
  revealDurationMs: number;
  staggerDelay: number;
  parallaxOffset: number;
  allowMouseFollow: boolean;
  allowScrollLinked: boolean;
  allowGlitch: boolean;
};

const presets: Record<MotionLevel, Omit<MotionConfig, "allowMouseFollow" | "allowScrollLinked" | "allowGlitch">> = {
  high: {
    revealDistance: 32,
    revealDurationMs: 620,
    staggerDelay: 0.08,
    parallaxOffset: 28,
  },
  medium: {
    revealDistance: 22,
    revealDurationMs: 500,
    staggerDelay: 0.055,
    parallaxOffset: 16,
  },
  low: {
    revealDistance: 10,
    revealDurationMs: 360,
    staggerDelay: 0.03,
    parallaxOffset: 0,
  },
};

export function getMotionConfig(level: MotionLevel, reducedMotion: boolean): MotionConfig {
  if (reducedMotion) {
    return {
      revealDistance: 0,
      revealDurationMs: 180,
      staggerDelay: 0,
      parallaxOffset: 0,
      allowMouseFollow: false,
      allowScrollLinked: false,
      allowGlitch: false,
    };
  }

  const base = presets[level];

  return {
    ...base,
    allowMouseFollow: level === "high",
    allowScrollLinked: level !== "low",
    allowGlitch: level === "high",
  };
}
