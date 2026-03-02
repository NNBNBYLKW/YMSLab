"use client";

import { useEffect, useMemo, useState } from "react";
import { formatMinutes, getThemeSnapshot, parseDebugTime } from "@/lib/timeTheme";

declare global {
  interface Window {
    __setThemeTime?: (value?: string) => void;
  }
}

const UPDATE_MS = 30_000;
const STORAGE_KEY = "yms-debug-theme-time";

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
  "--bg-grad-top": "bgGradientTop",
  "--bg-grad-bottom": "bgGradientBottom",
  "--hero-grad-start": "heroGradientStart",
  "--hero-grad-mid": "heroGradientMid",
  "--hero-grad-end": "heroGradientEnd",
};

function readQueryDebugTime() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("debugThemeTime") ?? url.searchParams.get("themeTime");
  if (!query) return null;
  return parseDebugTime(query);
}

export function ThemeController() {
  const [debugMinute, setDebugMinute] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const queryDebug = readQueryDebugTime();
    if (queryDebug !== null) {
      setDebugMinute(queryDebug);
      window.localStorage.setItem(STORAGE_KEY, formatMinutes(queryDebug));
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = parseDebugTime(saved);
      if (parsed !== null) setDebugMinute(parsed);
    }
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
    if (debugMinute !== null) {
      const d = new Date();
      d.setHours(Math.floor(debugMinute / 60), Math.floor(debugMinute % 60), 0, 0);
      return getThemeSnapshot(d);
    }
    return getThemeSnapshot();
  }, [debugMinute, tick]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.themeSegment = snapshot.segment;

    Object.entries(THEME_VAR_MAP).forEach(([cssVar, paletteKey]) => {
      const value = snapshot.palette[paletteKey as keyof typeof snapshot.palette];
      root.style.setProperty(cssVar, value);
    });
  }, [snapshot]);

  return (
    <div className="themeSwitch" aria-live="polite">
      <span>时段：{snapshot.segment}</span>
      <span>{debugMinute !== null ? `调试 ${formatMinutes(debugMinute)}` : "本地时间驱动"}</span>
    </div>
  );
}
