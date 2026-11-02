"use client";

import { useEffect, useRef } from "react";

const ASCII_CHARS = "0101789ABCDEF$#@%*+=-~<>[]{}/*_BOTFATHER_GATEWAY";

export function AsciiMatrixBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 140);

    const fontSize = 11;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -20));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      // Semi-transparent fade to create trails
      ctx.fillStyle = "rgba(10, 15, 12, 0.22)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is brightest green, trail is deep phosphor
        if (Math.random() > 0.88) {
          ctx.fillStyle = "#ffffff";
        } else if (Math.random() > 0.5) {
          ctx.fillStyle = "#22e273";
        } else {
          ctx.fillStyle = "#15803d";
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      if (!reduceMotion) {
        animId = requestAnimationFrame(draw);
      }
    };

    // Initial clear
    ctx.fillStyle = "#0d130f";
    ctx.fillRect(0, 0, width, height);

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full opacity-65 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
