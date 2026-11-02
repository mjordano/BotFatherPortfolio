import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { hero } from "@/content/site";
import { btnGhost, btnPrimary, container, stagger } from "../ui";
import { AsciiEyesCanvas } from "./ascii-eyes";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100dvh] flex-col">
      {/* The eyes live in the space above the copy, so the two never overlap on any screen. */}
      <div className="relative min-h-[44vh] flex-1">
        <AsciiEyesCanvas className="eyes-mask absolute inset-x-0 top-0 -bottom-16 overflow-hidden" />
      </div>

      <div className={`${container} relative pb-12 pt-6 md:pb-16`}>
        <div className="grid gap-7 md:grid-cols-12 md:items-end md:gap-10">
          <h1
            id="hero-title"
            className="hero-in max-w-[22ch] font-display text-[2.1rem] font-medium leading-[1.06] tracking-[-0.03em] sm:text-5xl md:col-span-7 md:text-[clamp(2.3rem,4vw,4.2rem)]"
          >
            {hero.title}
          </h1>
          <div className="md:col-span-5 md:pb-2">
            <p className="hero-in max-w-[44ch] text-base leading-relaxed text-muted md:text-[17px]" style={stagger(1)}>
              {hero.lede}
            </p>
            <div className="hero-in mt-7 flex flex-wrap gap-3" style={stagger(2)}>
              <a href={hero.primary.href} className={btnPrimary}>
                {hero.primary.label}
                <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
              </a>
              <a href={hero.secondary.href} className={btnGhost}>
                {hero.secondary.label}
                <ArrowDownIcon size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
