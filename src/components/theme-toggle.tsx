"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#e2e3d2" : "#11140e");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // private mode: the choice just won't persist
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between dark and light mode"
      className="btn grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-text"
    >
      <SunIcon size={18} weight="regular" className="light:hidden" aria-hidden="true" />
      <MoonIcon size={18} weight="regular" className="hidden light:block" aria-hidden="true" />
    </button>
  );
}
