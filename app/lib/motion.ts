export type MotionLevel = "high" | "medium" | "low";

export type MotionTokens = {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    standard: string;
    emphasized: string;
    decelerate: string;
  };
  stagger: {
    xs: number;
    sm: number;
    md: number;
  };
  blur: {
    subtle: number;
    strong: number;
  };
};

export type MotionConfig = {
  revealDistance: number;
  revealDurationMs: number;
  staggerDelay: number;
  parallaxOffset: number;
  allowMouseFollow: boolean;
  allowScrollLinked: boolean;
  allowGlitch: boolean;
  tokens: MotionTokens;
};

export const MOTION_TOKENS: MotionTokens = {
  duration: {
    fast: 160,
    normal: 320,
    slow: 620,
  },
  easing: {
    standard: "cubic-bezier(0.22, 1, 0.36, 1)",
    emphasized: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
  },
  stagger: {
    xs: 0.025,
    sm: 0.055,
    md: 0.08,
  },
  blur: {
    subtle: 18,
    strong: 48,
  },
};

const presets: Record<MotionLevel, Omit<MotionConfig, "allowMouseFollow" | "allowScrollLinked" | "allowGlitch" | "tokens">> = {
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
      revealDurationMs: MOTION_TOKENS.duration.fast,
      staggerDelay: 0,
      parallaxOffset: 0,
      allowMouseFollow: false,
      allowScrollLinked: false,
      allowGlitch: false,
      tokens: MOTION_TOKENS,
    };
  }

  const base = presets[level];

  return {
    ...base,
    allowMouseFollow: level === "high",
    allowScrollLinked: level !== "low",
    allowGlitch: level === "high",
    tokens: MOTION_TOKENS,
  };
}
