"use client";

import { useEffect, useRef, useState } from "react";

const NOISE = "#%@*+=-:01<>/";

/**
 * Shows the final text, then decodes it from noise the first time it scrolls into view,
 * echoing the way the eyes resolve in the hero.
 */
export function ScrambleText({ text, duration = 900 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const settleAt = [...text].map((_, i) => (0.25 + 0.75 * (i / text.length)) * duration * (0.7 + Math.random() * 0.3));
        const start = performance.now();
        const step = (now: number) => {
          const t = now - start;
          const next = [...text]
            .map((ch, i) => (t >= settleAt[i] || ch === " " ? ch : NOISE[(Math.random() * NOISE.length) | 0]))
            .join("");
          setShown(next);
          if (t < duration) raf = requestAnimationFrame(step);
          else setShown(text);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
