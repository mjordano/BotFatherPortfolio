import { EYES_META, type EyeShape, type Pt } from "./meta";

// Density ramp from empty to full ink, plus extra glyphs for the load-in scramble.
const RAMP = " .:-=+*#%@";
const GLYPHS = RAMP + "<>/\\|01";
const LEVELS = 6;

const CLOSE_MS = 85;
const HOLD_MS = 60;
const OPEN_MS = 165;
const BLINK_MS = CLOSE_MS + HOLD_MS + OPEN_MS;
const INTRO_MS = 1300;

// How far the irises travel, in source pixels.
const LOOK_X = 26;
const LOOK_Y = 13;

export type AsciiEyesOptions = {
  fontFamily: string;
  reducedMotion: boolean;
  coarsePointer: boolean;
};

type Rgb = [number, number, number];
type CellRect = [number, number, number, number];

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const clamp01 = (v: number) => clamp(v, 0, 1);
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const lerpPt = (p: Pt, q: Pt, t: number): Pt => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];

function gray(v: number) {
  const c = Math.round(clamp01(v) * 255);
  return `rgb(${c},${c},${c})`;
}

function parseHex(hex: string): Rgb {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function mixStops(stops: [number, Rgb][], f: number) {
  for (let s = 1; s < stops.length; s++) {
    const [p1, c1] = stops[s];
    const [p0, c0] = stops[s - 1];
    if (f <= p1) {
      const t = (f - p0) / (p1 - p0 || 1);
      return `rgb(${c0.map((v, i) => Math.round(v + (c1[i] - v) * t)).join(",")})`;
    }
  }
  return `rgb(${stops[stops.length - 1][1].join(",")})`;
}

// 0 = open, 1 = shut. Closes fast, opens a little slower, like a real blink.
function blinkAmount(ms: number) {
  if (ms < CLOSE_MS) return (ms / CLOSE_MS) ** 2;
  if (ms < CLOSE_MS + HOLD_MS) return 1;
  if (ms < BLINK_MS) return (1 - (ms - CLOSE_MS - HOLD_MS) / OPEN_MS) ** 2;
  return 0;
}

/**
 * Renders the eyes artwork as live ASCII on a canvas.
 * Each frame the source image is composed (lids, moved irises) on an offscreen canvas,
 * averaged down to one value per character cell, and only the cells that changed are redrawn
 * from a pre-rendered glyph atlas.
 */
export class AsciiEyes {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly image: HTMLImageElement;
  private readonly opts: AsciiEyesOptions;
  private readonly compose = document.createElement("canvas");
  private readonly cctx: CanvasRenderingContext2D;
  private readonly sample = document.createElement("canvas");
  private readonly sctx: CanvasRenderingContext2D;
  private readonly atlas = document.createElement("canvas");

  private light = false;
  private palette: string[] = [];
  private skinFill: CanvasPattern | string = gray(EYES_META.skin);
  private scleraFill: (CanvasPattern | string)[] = [];

  private w = 0;
  private h = 0;
  private dpr = 1;
  private fontPx = 11;
  private cw = 6;
  private ch = 12;
  private cols = 0;
  private rows = 0;
  private s = 1;
  private ox = 0;
  private oy = 0;

  private lum = new Float32Array(0);
  private cover = new Uint8Array(0);
  private noise = new Float32Array(0);
  private reveal = new Float32Array(0);
  private keys = new Int16Array(0);
  private eyeCells: CellRect[] = [];

  private raf = 0;
  private running = false;
  private last = 0;
  private introStart = -1;
  private introDone: boolean;
  private progress = 0;
  private scrambleTick = 0;

  private blinkStart = -1;
  private nextBlink = 0;
  private blinkT = 0;
  private look: [number, number] = [0, 0];
  private target: [number, number] = [0, 0];
  private drawnT = 0;
  private drawnLook: [number, number] = [0, 0];

  private pointer: { x: number; y: number } | null = null;
  private lastPointerAt = -Infinity;
  private nextWander = 0;

  constructor(canvas: HTMLCanvasElement, image: HTMLImageElement, opts: AsciiEyesOptions) {
    const ctx = canvas.getContext("2d");
    const cctx = this.compose.getContext("2d");
    const sctx = this.sample.getContext("2d", { willReadFrequently: true });
    if (!ctx || !cctx || !sctx) throw new Error("Canvas 2D is not available");
    this.canvas = canvas;
    this.ctx = ctx;
    this.cctx = cctx;
    this.sctx = sctx;
    this.image = image;
    this.opts = opts;
    this.introDone = opts.reducedMotion;
    this.compose.width = image.naturalWidth;
    this.compose.height = image.naturalHeight;
    // a touch brighter than the measured average: the lid sits where the highlights were
    this.skinFill = this.makeGrain(EYES_META.skin + 0.05, 0.26);
    this.scleraFill = EYES_META.eyes.map((e) => this.makeGrain(e.sclera, 0.16));
    this.readTheme();
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
  }

  resize(w: number, h: number) {
    if (w < 2 || h < 2) return;
    this.w = w;
    this.h = h;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.fontPx = w < 640 ? 7.5 : w < 1100 ? 9.5 : 11;

    this.ctx.font = `400 ${this.fontPx}px ${this.opts.fontFamily}`;
    const advance = this.ctx.measureText("M").width || this.fontPx * 0.6;
    // whole device pixels per cell keep glyphs crisp and let cells clear without seams
    this.cw = Math.max(3, Math.round(advance * this.dpr));
    this.ch = Math.max(5, Math.round(this.fontPx * 1.06 * this.dpr));
    const cwCss = this.cw / this.dpr;
    const chCss = this.ch / this.dpr;
    this.cols = Math.ceil(w / cwCss);
    this.rows = Math.ceil(h / chCss);
    this.canvas.width = this.cols * this.cw;
    this.canvas.height = this.rows * this.ch;
    this.canvas.style.width = `${this.cols * cwCss}px`;
    this.canvas.style.height = `${this.rows * chCss}px`;
    this.sample.width = this.cols * 2;
    this.sample.height = this.rows * 2;

    // Both eyes fully visible and centred, as large as the box allows.
    const mobile = w < 768;
    const [spanW, spanH] = EYES_META.span;
    // on phones the outer corners may crop, the irises never do
    this.s = Math.min((w * (mobile ? 1.25 : 0.96)) / spanW, (h * 0.72) / spanH);
    this.ox = w / 2 - EYES_META.center[0] * this.s;
    this.oy = h * 0.47 - EYES_META.center[1] * this.s;

    const n = this.cols * this.rows;
    this.lum = new Float32Array(n);
    this.cover = new Uint8Array(n);
    this.noise = new Float32Array(n);
    this.reveal = new Float32Array(n);
    this.keys = new Int16Array(n).fill(-1);

    // Load-in resolves from the eyes outward.
    const mx = this.ox + EYES_META.center[0] * this.s;
    const my = this.oy + EYES_META.center[1] * this.s;
    const maxD = Math.hypot(Math.max(mx, w - mx), Math.max(my, h - my)) || 1;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const i = r * this.cols + c;
        this.noise[i] = Math.random() - 0.5;
        const d = Math.hypot((c + 0.5) * cwCss - mx, (r + 0.5) * chCss - my) / maxD;
        this.reveal[i] = 0.6 * d + 0.4 * Math.random();
      }
    }

    this.eyeCells = EYES_META.eyes.map((e) => this.cellsAround(e, cwCss, chCss));
    this.buildAtlas();
    this.composeFrame();
    this.drawSample();
    this.readCells([0, 0, this.cols, this.rows]);
    this.drawCells([0, 0, this.cols, this.rows]);
  }

  setTheme() {
    this.readTheme();
    if (!this.w) return;
    this.buildAtlas();
    this.drawCells([0, 0, this.cols, this.rows]);
  }

  setReducedMotion(reduced: boolean) {
    this.opts.reducedMotion = reduced;
    if (reduced) {
      this.stop();
      this.introDone = true;
      this.blinkT = 0;
      this.look = [0, 0];
      this.target = [0, 0];
      this.redrawEyes();
    } else {
      this.start();
    }
  }

  start() {
    if (this.running || this.opts.reducedMotion) return;
    this.running = true;
    this.last = 0;
    if (!this.nextBlink) this.nextBlink = performance.now() + rand(1800, 3000);
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
  }

  private tick = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.tick);
    const dt = this.last ? Math.min(0.064, (now - this.last) / 1000) : 0.016;
    this.last = now;

    if (this.blinkStart < 0 && now >= this.nextBlink) this.blinkStart = now;
    if (this.blinkStart >= 0) {
      const ms = now - this.blinkStart;
      this.blinkT = blinkAmount(ms);
      if (ms >= BLINK_MS) {
        this.blinkStart = -1;
        this.blinkT = 0;
        // now and then a quick double blink
        this.nextBlink = now + (Math.random() < 0.2 ? 130 : rand(2200, 5800));
      }
    }

    this.updateTarget(now);
    const ease = 1 - Math.exp(-dt * 16);
    this.look[0] += (this.target[0] - this.look[0]) * ease;
    this.look[1] += (this.target[1] - this.look[1]) * ease;

    const changed =
      Math.abs(this.blinkT - this.drawnT) > 0.003 ||
      Math.abs(this.look[0] - this.drawnLook[0]) > 0.12 ||
      Math.abs(this.look[1] - this.drawnLook[1]) > 0.12;

    if (!this.introDone) {
      if (this.introStart < 0) this.introStart = now;
      this.progress = (now - this.introStart) / INTRO_MS;
      this.scrambleTick = Math.floor(now / 70);
      if (this.progress >= 1.05) this.introDone = true;
      const all: CellRect = [0, 0, this.cols, this.rows];
      if (changed) {
        this.composeFrame();
        this.drawSample();
        this.readCells(all);
      }
      this.drawCells(all);
      return;
    }

    if (changed) this.redrawEyes();
  };

  private redrawEyes() {
    this.composeFrame();
    this.drawSample();
    for (const rect of this.eyeCells) {
      this.readCells(rect);
      this.drawCells(rect);
    }
  }

  private updateTarget(now: number) {
    const following = !this.opts.coarsePointer && this.pointer && now - this.lastPointerAt < 3500;
    if (following && this.pointer) {
      const rect = this.canvas.getBoundingClientRect();
      const mx = rect.left + this.ox + EYES_META.center[0] * this.s;
      const my = rect.top + this.oy + EYES_META.center[1] * this.s;
      this.target[0] = clamp((this.pointer.x - mx) / (this.w * 0.45), -1, 1) * LOOK_X;
      this.target[1] = clamp((this.pointer.y - my) / (this.h * 0.55), -1, 1) * LOOK_Y;
      return;
    }
    // nobody is pointing: let the eyes wander between glances
    if (now >= this.nextWander) {
      const rest = Math.random() < 0.35;
      this.target[0] = rest ? 0 : rand(-0.8, 0.8) * LOOK_X;
      this.target[1] = rest ? 0 : rand(-0.6, 0.7) * LOOK_Y;
      this.nextWander = now + rand(1400, 3800);
    }
  }

  private onPointerMove = (ev: PointerEvent) => {
    if (ev.pointerType !== "mouse" && ev.pointerType !== "pen") return;
    this.pointer = { x: ev.clientX, y: ev.clientY };
    this.lastPointerAt = performance.now();
  };

  private onPointerLeave = () => {
    this.pointer = null;
  };

  // Tapping or clicking an eye makes it blink.
  private onPointerDown = (ev: PointerEvent) => {
    if (!this.running || this.blinkStart >= 0) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left - this.ox) / this.s;
    const y = (ev.clientY - rect.top - this.oy) / this.s;
    for (const e of EYES_META.eyes) {
      const [cx, cy, r] = e.iris;
      if (Math.hypot(x - cx, y - cy) < r * 1.6) {
        this.blinkStart = performance.now();
        return;
      }
    }
  };

  private readTheme() {
    const root = document.documentElement;
    this.light = root.dataset.theme === "light";
    const css = getComputedStyle(root);
    const stop = (name: string, at: number): [number, Rgb] => [at, parseHex(css.getPropertyValue(name).trim() || "#888888")];
    const stops = [stop("--ascii-lo", 0), stop("--ascii-mid", 0.3), stop("--ascii-hi", 0.68), stop("--ascii-peak", 1)];
    this.palette = Array.from({ length: LEVELS }, (_, l) => mixStops(stops, l / (LEVELS - 1)));
  }

  private buildAtlas() {
    const { cw, ch } = this;
    this.atlas.width = GLYPHS.length * cw;
    this.atlas.height = LEVELS * ch;
    const a = this.atlas.getContext("2d");
    if (!a) return;
    a.clearRect(0, 0, this.atlas.width, this.atlas.height);
    a.font = `400 ${this.fontPx * this.dpr}px ${this.opts.fontFamily}`;
    a.textAlign = "center";
    a.textBaseline = "middle";
    for (let l = 0; l < LEVELS; l++) {
      a.fillStyle = this.palette[l];
      for (let g = 1; g < GLYPHS.length; g++) a.fillText(GLYPHS[g], g * cw + cw / 2, l * ch + ch / 2);
    }
    this.keys.fill(-1);
  }

  // Blocky grain around an average tone, so repainted skin and eye whites keep the artwork's
  // texture instead of turning into flat patches of one glyph.
  private makeGrain(tone: number, spread: number) {
    const block = 6;
    const n = 16;
    const tile = document.createElement("canvas");
    tile.width = tile.height = block * n;
    const t = tile.getContext("2d");
    if (!t) return gray(tone);
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        t.fillStyle = gray(tone + (Math.random() - 0.5) * spread);
        t.fillRect(x * block, y * block, block, block);
      }
    }
    return this.cctx.createPattern(tile, "repeat") ?? gray(tone);
  }

  private cellsAround(e: EyeShape, cwCss: number, chCss: number): CellRect {
    const xs = [e.a[0], e.b[0], e.u1[0], e.u2[0], e.l1[0], e.l2[0]];
    const ys = [e.a[1], e.b[1], e.u1[1], e.u2[1], e.l1[1], e.l2[1]];
    const x0 = Math.min(...xs) - 30;
    const x1 = Math.max(...xs) + 30;
    const y0 = Math.min(...ys) - e.band * 1.3 - 20;
    const y1 = Math.max(...ys) + 20;
    return [
      clamp(Math.floor((this.ox + x0 * this.s) / cwCss), 0, this.cols),
      clamp(Math.floor((this.oy + y0 * this.s) / chCss), 0, this.rows),
      clamp(Math.ceil((this.ox + x1 * this.s) / cwCss), 0, this.cols),
      clamp(Math.ceil((this.oy + y1 * this.s) / chCss), 0, this.rows),
    ];
  }

  private composeFrame() {
    const c = this.cctx;
    const k = this.compose.width / EYES_META.width;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.drawImage(this.image, 0, 0);
    c.setTransform(k, 0, 0, k, 0, 0);
    const [lx, ly] = this.look;
    const moved = Math.abs(lx) > 0.3 || Math.abs(ly) > 0.3;
    EYES_META.eyes.forEach((e, i) => {
      if (moved) this.drawIris(e, i, lx, ly, k);
      if (this.blinkT > 0.001) this.drawLid(e, this.blinkT);
    });
    this.drawnT = this.blinkT;
    this.drawnLook = [lx, ly];
  }

  private openingPath(e: EyeShape) {
    const c = this.cctx;
    c.beginPath();
    c.moveTo(e.a[0], e.a[1]);
    c.bezierCurveTo(e.u1[0], e.u1[1], e.u2[0], e.u2[1], e.b[0], e.b[1]);
    c.bezierCurveTo(e.l2[0], e.l2[1], e.l1[0], e.l1[1], e.a[0], e.a[1]);
    c.closePath();
  }

  // Repaint the eye white, then the iris disc shifted toward where the eyes look.
  private drawIris(e: EyeShape, index: number, lx: number, ly: number, k: number) {
    const c = this.cctx;
    const [cx, cy, r] = e.iris;
    const R = r + 8;
    c.save();
    this.openingPath(e);
    c.fillStyle = this.scleraFill[index] ?? gray(e.sclera);
    c.fill();
    c.clip();
    c.beginPath();
    c.arc(cx + lx, cy + ly, R, 0, Math.PI * 2);
    c.clip();
    c.drawImage(this.image, (cx - R) * k, (cy - R) * k, 2 * R * k, 2 * R * k, cx - R + lx, cy - R + ly, 2 * R, 2 * R);
    c.restore();
  }

  // The upper lid slides down: skin covers the opening and the lash line rides on its edge.
  private drawLid(e: EyeShape, t: number) {
    const c = this.cctx;
    const k = t * 0.94;
    const e1 = lerpPt(e.u1, e.l1, k);
    const e2 = lerpPt(e.u2, e.l2, k);
    const T = e.band;

    c.beginPath();
    c.moveTo(e.a[0], e.a[1] - T * 0.35);
    c.bezierCurveTo(e.u1[0], e.u1[1] - T * 1.1, e.u2[0], e.u2[1] - T * 1.1, e.b[0], e.b[1] - T * 0.35);
    c.lineTo(e.b[0], e.b[1]);
    c.bezierCurveTo(e2[0], e2[1], e1[0], e1[1], e.a[0], e.a[1]);
    c.closePath();
    c.fillStyle = this.skinFill;
    c.fill();

    const th = T * (1 - 0.4 * t);
    c.beginPath();
    c.moveTo(e.a[0], e.a[1]);
    c.bezierCurveTo(e1[0], e1[1] - th, e2[0], e2[1] - th, e.b[0], e.b[1]);
    c.bezierCurveTo(e2[0], e2[1], e1[0], e1[1], e.a[0], e.a[1]);
    c.closePath();
    c.fillStyle = "#000";
    c.fill();
  }

  // Draw the composed image at half-cell resolution; readCells averages 2x2 blocks.
  private drawSample() {
    const cwCss = this.cw / this.dpr;
    const chCss = this.ch / this.dpr;
    const sc = this.sctx;
    sc.setTransform(1, 0, 0, 1, 0, 0);
    sc.clearRect(0, 0, this.sample.width, this.sample.height);
    sc.imageSmoothingEnabled = true;
    sc.imageSmoothingQuality = "high";
    sc.drawImage(
      this.compose,
      (this.ox / cwCss) * 2,
      (this.oy / chCss) * 2,
      ((EYES_META.width * this.s) / cwCss) * 2,
      ((EYES_META.height * this.s) / chCss) * 2,
    );
  }

  private readCells([c0, r0, c1, r1]: CellRect) {
    if (c1 <= c0 || r1 <= r0) return;
    const sw = (c1 - c0) * 2;
    const data = this.sctx.getImageData(c0 * 2, r0 * 2, sw, (r1 - r0) * 2).data;
    for (let r = r0; r < r1; r++) {
      for (let c = c0; c < c1; c++) {
        const top = ((r - r0) * 2 * sw + (c - c0) * 2) * 4;
        const bottom = top + sw * 4;
        const a0 = data[top + 3], a1 = data[top + 7], a2 = data[bottom + 3], a3 = data[bottom + 7];
        const alpha = a0 + a1 + a2 + a3;
        const i = r * this.cols + c;
        this.cover[i] = alpha > 510 ? 1 : 0;
        this.lum[i] = alpha
          ? (data[top] * a0 + data[top + 4] * a1 + data[bottom] * a2 + data[bottom + 4] * a3) / (alpha * 255)
          : 0;
      }
    }
  }

  private density(v: number) {
    // dark: bright areas carry the ink, like the original artwork.
    // light: only the line work carries ink, like a pencil drawing on paper.
    return this.light ? clamp01((0.42 - v) / 0.42) ** 1.5 : clamp01((v - 0.06) / 0.8) ** 1.1;
  }

  private cellKey(i: number) {
    if (!this.cover[i]) return 0;
    if (!this.introDone) {
      const ahead = this.reveal[i] - this.progress;
      if (ahead > 0.22) return 0;
      if (ahead > 0) {
        const h = Math.imul(i + 1, 2654435761) ^ Math.imul(this.scrambleTick + 7, 40503);
        const g = 4 + ((h >>> 0) % (GLYPHS.length - 4));
        return g * LEVELS + 1 + ((h >>> 9) % 3);
      }
    }
    const d = clamp01(this.density(this.lum[i]) + this.noise[i] * 0.08);
    const g = Math.round(d * (RAMP.length - 1));
    if (g === 0) return 0;
    return g * LEVELS + Math.min(LEVELS - 1, Math.floor(d * LEVELS));
  }

  private drawCells([c0, r0, c1, r1]: CellRect) {
    const { ctx, cw, ch, cols } = this;
    for (let r = r0; r < r1; r++) {
      for (let c = c0; c < c1; c++) {
        const i = r * cols + c;
        const key = this.cellKey(i);
        if (key === this.keys[i]) continue;
        this.keys[i] = key;
        const x = c * cw;
        const y = r * ch;
        ctx.clearRect(x, y, cw, ch);
        if (key > 0) {
          const g = (key / LEVELS) | 0;
          ctx.drawImage(this.atlas, g * cw, (key % LEVELS) * ch, cw, ch, x, y, cw, ch);
        }
      }
    }
  }
}
