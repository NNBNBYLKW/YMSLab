export const theme = {
  colors: {
    bg: "#090B12",
    bgElevated: "#111525",
    text: "#E7ECFF",
    textMuted: "#A3AECF",
    border: "rgba(157, 174, 232, 0.22)",
    accent: "#7C9BFF",
    accentSoft: "rgba(124, 155, 255, 0.18)",
  },
  typography: {
    family: `"Inter", "SF Pro Text", "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", sans-serif`,
    h1: "clamp(2rem, 4vw, 3.5rem)",
    h2: "clamp(1.6rem, 3vw, 2.2rem)",
    h3: "clamp(1.2rem, 2vw, 1.5rem)",
    body: "1rem",
    small: "0.875rem",
  },
  spacing: {
    sectionY: "clamp(3.5rem, 7vw, 7rem)",
    containerX: "clamp(1rem, 3vw, 2rem)",
    gap: "clamp(0.875rem, 1.4vw, 1.25rem)",
  },
  effects: {
    radius: "16px",
    divider: "1px solid rgba(157, 174, 232, 0.2)",
  },
  noise: {
    enabledByDefault: true,
    opacity: 0.1,
  },
} as const;

export type Theme = typeof theme;
