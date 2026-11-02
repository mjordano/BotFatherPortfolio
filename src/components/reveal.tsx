"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Marks its subtree as entered once it scrolls into view.
 * Children with the `rv` class animate in, staggered by their `--i` custom property.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.in = "";
        io.disconnect();
        // retire the stagger delays once the entrance has played
        timer = window.setTimeout(() => {
          el.dataset.done = "";
        }, 1600);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} data-reveal="" className={className}>
      {children}
    </div>
  );
}
