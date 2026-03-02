"use client";

import { useEffect, useMemo, useState } from "react";

type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "yms-theme-preference";

function getTimeFallbackTheme() {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? "light" : "dark";
}

function resolveTheme(pref: ThemePreference) {
  if (pref === "light" || pref === "dark") return pref;

  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return getTimeFallbackTheme();
}

export function ThemeController() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    if (saved === "light" || saved === "dark" || saved === "system") {
      setPreference(saved);
    }
  }, []);

  const resolved = useMemo(() => resolveTheme(preference), [preference]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onSystemChange = () => {
      if (preference === "system") {
        document.documentElement.dataset.theme = resolveTheme("system");
      }
    };

    const timer = window.setInterval(() => {
      if (preference === "system") {
        document.documentElement.dataset.theme = resolveTheme("system");
      }
    }, 5 * 60 * 1000);

    media.addEventListener("change", onSystemChange);

    return () => {
      media.removeEventListener("change", onSystemChange);
      window.clearInterval(timer);
    };
  }, [preference]);

  const updatePreference = (next: ThemePreference) => {
    setPreference(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <div className="themeSwitch" role="group" aria-label="主题模式">
      <button type="button" className={preference === "light" ? "is-active" : ""} onClick={() => updatePreference("light")}>
        日间
      </button>
      <button type="button" className={preference === "dark" ? "is-active" : ""} onClick={() => updatePreference("dark")}>
        夜间
      </button>
      <button type="button" className={preference === "system" ? "is-active" : ""} onClick={() => updatePreference("system")}>
        跟随系统
      </button>
    </div>
  );
}
