"use client";

import { useEffect, useMemo, useState } from "react";
import { formatMinutes, getThemeSnapshot, parseDebugTime, type ThemeMode } from "@/lib/timeTheme";

declare global {
  interface Window {
    __setThemeTime?: (value?: string) => void;
  }
}

const UPDATE_MS = 30_000;
const STORAGE_KEY = "yms-debug-theme-time";
const MODE_STORAGE_KEY = "ymslab_theme_mode";

const THEME_VAR_MAP: Record<string, string> = {
  "--bg": "bg",
  "--bg-elevated": "bgElevated",
  "--surface": "surface",
  "--surface-2": "surface2",
  "--text": "text",
  "--text-muted": "textMuted",
  "--border": "border",
  "--accent": "accent",
  "--accent-2": "accent2",
  "--shadow-color": "shadowColor",
  "--glow-color": "glowColor",
  "--ring": "ring",
  "--cta-bg": "ctaBg",
  "--cta-fg": "ctaFg",
  "--bg-grad-top": "bgGradientTop",
  "--bg-grad-bottom": "bgGradientBottom",
  "--hero-grad-start": "heroGradientStart",
  "--hero-grad-mid": "heroGradientMid",
  "--hero-grad-end": "heroGradientEnd",
  "--tag-bg": "tagBg",
  "--tag-fg": "tagFg",
  "--tag-border": "tagBorder",
  "--tag-hover-bg": "tagHoverBg",
  "--tag-hover-border": "tagHoverBorder",
};

function readQueryDebugTime() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("debugThemeTime") ?? url.searchParams.get("themeTime");
  if (!query) return null;
  return parseDebugTime(query);
}

function readThemeMode(): ThemeMode {
  const raw = window.localStorage.getItem(MODE_STORAGE_KEY);
  if (raw === "day" || raw === "night" || raw === "auto") return raw;
  return "auto";
}

export function ThemeController() {
  const [debugMinute, setDebugMinute] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const [mode, setMode] = useState<ThemeMode>("auto");

  useEffect(() => {
    const queryDebug = readQueryDebugTime();
    if (queryDebug !== null) {
      setDebugMinute(queryDebug);
      window.localStorage.setItem(STORAGE_KEY, formatMinutes(queryDebug));
    } else {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseDebugTime(saved);
        if (parsed !== null) setDebugMinute(parsed);
      }
    }

    setMode(readThemeMode());
  }, []);

  useEffect(() => {
    const sync = () => setTick((value) => value + 1);
    const timer = window.setInterval(sync, UPDATE_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };

    document.addEventListener("visibilitychange", onVisible);

    window.__setThemeTime = (value?: string) => {
      if (!value) {
        window.localStorage.removeItem(STORAGE_KEY);
        setDebugMinute(null);
        sync();
        return;
      }

      const parsed = parseDebugTime(value);
      if (parsed === null) return;
      window.localStorage.setItem(STORAGE_KEY, formatMinutes(parsed));
      setDebugMinute(parsed);
      sync();
    };

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      delete window.__setThemeTime;
    };
  }, []);

  const snapshot = useMemo(() => {
    void tick;

    if (mode === "day") return getThemeSnapshot(undefined, undefined, "day");
    if (mode === "night") return getThemeSnapshot(undefined, undefined, "night");

    if (debugMinute !== null) {
      const d = new Date();
      d.setHours(Math.floor(debugMinute / 60), Math.floor(debugMinute % 60), 0, 0);
      return getThemeSnapshot(d, undefined, "auto");
    }

    return getThemeSnapshot(undefined, undefined, "auto");
  }, [debugMinute, mode, tick]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.themeSegment = snapshot.segment;
    root.dataset.themeMode = mode;

    Object.entries(THEME_VAR_MAP).forEach(([cssVar, paletteKey]) => {
      const value = snapshot.palette[paletteKey as keyof typeof snapshot.palette];
      root.style.setProperty(cssVar, value);
    });
  }, [mode, snapshot]);

  const handleModeChange = (nextMode: ThemeMode) => {
    setMode(nextMode);
    window.localStorage.setItem(MODE_STORAGE_KEY, nextMode);
  };

  return (
    <div className="themeSwitch">
      <label htmlFor="theme-mode-select" className="themeModeLabel">主题模式</label>
      <select
        id="theme-mode-select"
        className="themeModeSelect"
        value={mode}
        onChange={(event) => handleModeChange(event.target.value as ThemeMode)}
        aria-label="切换主题模式"
      >
        <option value="auto">自动</option>
        <option value="day">日间</option>
        <option value="night">夜间</option>
      </select>
      <span>{mode === "auto" ? `自动 · ${snapshot.segment}` : `固定 · ${mode}`}</span>
    </div>
  );
}
