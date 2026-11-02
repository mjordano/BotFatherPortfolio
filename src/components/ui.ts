// Shape rule for the whole page: interactive controls are full pills,
// panels use a 14px radius, form fields 10px.

export const container = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10";

const btnBase =
  "btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono text-sm font-medium transition-[transform,background-color,border-color,color] duration-300 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98]";

const accentFill = "bg-accent text-accent-ink hover:brightness-110";

export const btnPrimary = `${btnBase} ${accentFill} px-5 py-3`;

export const btnPrimarySmall = `${btnBase} ${accentFill} px-4 py-2.5`;

export const btnGhost = `${btnBase} border border-line-strong px-5 py-3 text-text hover:border-text`;

// Stagger index for entrance animations (read by .rv and .hero-in)
export const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

export const sectionTitle = "font-display text-[2rem] leading-[1.08] tracking-[-0.02em] sm:text-4xl md:text-5xl";
