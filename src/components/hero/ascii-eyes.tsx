"use client";

import { useEffect, useRef } from "react";
import { AsciiEyes } from "@/lib/ascii-eyes/engine";
import { EYES_SRC } from "@/lib/ascii-eyes/meta";

export function AsciiEyesCanvas({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let engine: AsciiEyes | null = null;
    let cancelled = false;
    let inView = true;
    let frame = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    const sync = () => {
      if (!engine) return;
      if (inView && !document.hidden) engine.start();
      else engine.stop();
    };

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => engine?.resize(wrap.clientWidth, wrap.clientHeight));
    });
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const themeObserver = new MutationObserver(() => engine?.setTheme());
    const onReduceChange = (e: MediaQueryListEvent) => engine?.setReducedMotion(e.matches);

    (async () => {
      // onload rather than decode(): decode() can stall until a background tab is painted
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = reject;
        image.src = EYES_SRC;
      });
      const fontFamily =
        getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
      await document.fonts.load(`400 11px ${fontFamily}`).catch(() => undefined);
      if (cancelled) return;
      engine = new AsciiEyes(canvas, image, {
        fontFamily,
        reducedMotion: reduce.matches,
        coarsePointer: coarse.matches,
      });
      engine.resize(wrap.clientWidth, wrap.clientHeight);
      // handle for poking at poses from the dev console
      if (process.env.NODE_ENV !== "production") Object.assign(window, { __asciiEyes: engine });
      wrap.dataset.ready = "";
      resizeObserver.observe(wrap);
      viewObserver.observe(wrap);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      reduce.addEventListener("change", onReduceChange);
      document.addEventListener("visibilitychange", sync);
      sync();
    })().catch(() => {
      // The hero reads fine without the artwork, so a failed load stays silent.
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      reduce.removeEventListener("change", onReduceChange);
      document.removeEventListener("visibilitychange", sync);
      engine?.destroy();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`ascii-wrap ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
