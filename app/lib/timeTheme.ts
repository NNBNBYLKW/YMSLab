export type ThemeSegment = "night" | "dawn" | "day" | "sunset";

export type ThemePalette = {
  bg: string;
  bgElevated: string;
  surface: string;
  surface2: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accent2: string;
  shadowColor: string;
  glowColor: string;
  ring: string;
  bgGradientTop: string;
  bgGradientBottom: string;
  heroGradientStart: string;
  heroGradientMid: string;
  heroGradientEnd: string;
};

export type ThemeTimeConfig = {
  dawnStart: number;
  dayStart: number;
  sunsetStart: number;
  nightStart: number;
};

const DEFAULT_TIME_CONFIG: ThemeTimeConfig = {
  dawnStart: 5 * 60 + 30,
  dayStart: 8 * 60,
  sunsetStart: 17 * 60,
  nightStart: 20 * 60,
};

const ANCHORS: Record<ThemeSegment, ThemePalette> = {
  night: {
    bg: "#050B1E",
    bgElevated: "#0A1634",
    surface: "#101E42",
    surface2: "#132852",
    text: "#E7EEFF",
    textMuted: "#9EAFD9",
    border: "#2A3F70",
    accent: "#73A1FF",
    accent2: "#7E8DFF",
    shadowColor: "#020611",
    glowColor: "#3D6FEE",
    ring: "#7C9CFF",
    bgGradientTop: "#101F46",
    bgGradientBottom: "#0A2B46",
    heroGradientStart: "#101A39",
    heroGradientMid: "#0A132A",
    heroGradientEnd: "#111F41",
  },
  dawn: {
    bg: "#F6E2C9",
    bgElevated: "#F9EBD8",
    surface: "#FFF4E4",
    surface2: "#FCEBD8",
    text: "#2F3550",
    textMuted: "#6F7392",
    border: "#D5C5B3",
    accent: "#5D7FE9",
    accent2: "#F0A57C",
    shadowColor: "#7A6A68",
    glowColor: "#F6C58D",
    ring: "#F3B082",
    bgGradientTop: "#FFD9A8",
    bgGradientBottom: "#BFD7FF",
    heroGradientStart: "#FFE5C4",
    heroGradientMid: "#F7E5D8",
    heroGradientEnd: "#D0E3FF",
  },
  day: {
    bg: "#F6F8FF",
    bgElevated: "#FFFFFF",
    surface: "#F2F5FF",
    surface2: "#EAF0FF",
    text: "#1B2745",
    textMuted: "#5C6A8A",
    border: "#C9D6F2",
    accent: "#456DE3",
    accent2: "#7A6DFF",
    shadowColor: "#7D90BB",
    glowColor: "#7FA2FF",
    ring: "#6285F2",
    bgGradientTop: "#EEF2FF",
    bgGradientBottom: "#DDE9FF",
    heroGradientStart: "#FFFFFF",
    heroGradientMid: "#F2F6FF",
    heroGradientEnd: "#E4EDFF",
  },
  sunset: {
    bg: "#2A2448",
    bgElevated: "#332C56",
    surface: "#3F3766",
    surface2: "#4A4475",
    text: "#F9ECF4",
    textMuted: "#D3BDD1",
    border: "#6A5E8E",
    accent: "#FFB36A",
    accent2: "#F08AA6",
    shadowColor: "#1B1536",
    glowColor: "#F08AA6",
    ring: "#FDB57A",
    bgGradientTop: "#FFB36A",
    bgGradientBottom: "#4A4E8A",
    heroGradientStart: "#4B4075",
    heroGradientMid: "#7C4C6B",
    heroGradientEnd: "#3D477D",
  },
};

const MINUTES_DAY = 24 * 60;

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(Math.round(r))}${toHex(Math.round(g))}${toHex(Math.round(b))}`;
}

function mixColor(a: string, b: string, t: number) {
  const from = hexToRgb(a);
  const to = hexToRgb(b);
  return rgbToHex(
    from.r + (to.r - from.r) * t,
    from.g + (to.g - from.g) * t,
    from.b + (to.b - from.b) * t,
  );
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function blendPalettes(from: ThemePalette, to: ThemePalette, progress: number): ThemePalette {
  const t = smoothstep(Math.min(Math.max(progress, 0), 1));
  return {
    bg: mixColor(from.bg, to.bg, t),
    bgElevated: mixColor(from.bgElevated, to.bgElevated, t),
    surface: mixColor(from.surface, to.surface, t),
    surface2: mixColor(from.surface2, to.surface2, t),
    text: mixColor(from.text, to.text, t),
    textMuted: mixColor(from.textMuted, to.textMuted, t),
    border: mixColor(from.border, to.border, t),
    accent: mixColor(from.accent, to.accent, t),
    accent2: mixColor(from.accent2, to.accent2, t),
    shadowColor: mixColor(from.shadowColor, to.shadowColor, t),
    glowColor: mixColor(from.glowColor, to.glowColor, t),
    ring: mixColor(from.ring, to.ring, t),
    bgGradientTop: mixColor(from.bgGradientTop, to.bgGradientTop, t),
    bgGradientBottom: mixColor(from.bgGradientBottom, to.bgGradientBottom, t),
    heroGradientStart: mixColor(from.heroGradientStart, to.heroGradientStart, t),
    heroGradientMid: mixColor(from.heroGradientMid, to.heroGradientMid, t),
    heroGradientEnd: mixColor(from.heroGradientEnd, to.heroGradientEnd, t),
  };
}

function asMinutes(date: Date) {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
}

function progress(now: number, start: number, end: number) {
  if (end >= start) return (now - start) / (end - start);
  const normalizedNow = now < start ? now + MINUTES_DAY : now;
  return (normalizedNow - start) / (end + MINUTES_DAY - start);
}

export function parseDebugTime(input: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(input.trim());
  if (!match) return null;
  const hour = Number.parseInt(match[1], 10);
  const minute = Number.parseInt(match[2], 10);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

export function getThemeSnapshot(now = new Date(), config: ThemeTimeConfig = DEFAULT_TIME_CONFIG) {
  const minute = asMinutes(now);

  let segment: ThemeSegment = "night";
  let palette = ANCHORS.night;

  if (minute >= config.dawnStart && minute < config.dayStart) {
    segment = "dawn";
    palette = blendPalettes(ANCHORS.night, ANCHORS.dawn, progress(minute, config.dawnStart, config.dayStart));
  } else if (minute >= config.dayStart && minute < config.sunsetStart) {
    segment = "day";
    palette = blendPalettes(ANCHORS.dawn, ANCHORS.day, progress(minute, config.dayStart, config.sunsetStart));
  } else if (minute >= config.sunsetStart && minute < config.nightStart) {
    segment = "sunset";
    palette = blendPalettes(ANCHORS.day, ANCHORS.sunset, progress(minute, config.sunsetStart, config.nightStart));
  } else {
    segment = "night";
    palette = blendPalettes(ANCHORS.sunset, ANCHORS.night, progress(minute, config.nightStart, config.dawnStart));
  }

  return { minute, segment, palette, config };
}

export function formatMinutes(minute: number) {
  const normalized = ((Math.round(minute) % MINUTES_DAY) + MINUTES_DAY) % MINUTES_DAY;
  const hour = Math.floor(normalized / 60);
  const mins = normalized % 60;
  return `${hour.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}
