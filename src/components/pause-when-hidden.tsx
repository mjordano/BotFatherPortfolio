"use client";

import { useEffect } from "react";

// Freezes every CSS loop while the tab is in the background.
export function PauseWhenHidden() {
  useEffect(() => {
    const sync = () => document.body.classList.toggle("paused", document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  return null;
}
