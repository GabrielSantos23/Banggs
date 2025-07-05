// Theme management utilities for light/dark mode

const LS_KEY = "theme"; // 'light' | 'dark' | 'system'

type ThemePreference = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: ThemePreference) {
  const resolved = theme === "system" ? getSystemTheme() : theme;

  // Toggle the helper class and data attribute so CSS can react
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.setAttribute("data-theme", resolved);
}

export function initTheme() {
  const saved = (localStorage.getItem(LS_KEY) as ThemePreference) || "system";
  applyTheme(saved);

  // If user prefers to follow system, watch for changes
  if (saved === "system") {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => applyTheme("system"));
  }
}

export function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains("dark");
  const newTheme: ThemePreference = isCurrentlyDark ? "light" : "dark";
  localStorage.setItem(LS_KEY, newTheme);
  applyTheme(newTheme);
}
