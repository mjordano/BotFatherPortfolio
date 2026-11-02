import { buildProcess } from "@/content/site";
import { Reveal } from "./reveal";
import { container, sectionTitle, stagger } from "./ui";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative border-t border-line py-16 sm:py-24 md:py-36">
      <div className={container}>
        <Reveal>
          <h2 id="process-title" className={`rv ${sectionTitle}`}>
            {buildProcess.title}
          </h2>
        </Reveal>

        <Reveal className="relative mt-10 md:mt-20">
          <span
            aria-hidden="true"
            className="timeline-line absolute bottom-3 left-[7px] top-3 w-px bg-line-strong md:inset-x-0 md:bottom-auto md:top-[7px] md:h-px md:w-auto"
          />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-10">
            {buildProcess.steps.map((step, i) => (
              <li key={step.label} className="rv relative pl-10 md:pl-0 md:pt-12" style={stagger(i + 1)}>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 grid size-[15px] place-items-center rounded-full border border-line-strong bg-bg md:top-0"
                >
                  <span className="size-[5px] rounded-full bg-text" />
                </span>
                <span className="font-mono text-[11px] font-semibold text-faint tracking-wider block mb-1">
                  PHASE {step.step}
                </span>
                <h3 className="font-display text-2xl font-medium tracking-[-0.02em] md:text-[1.5rem]">{step.label}</h3>
                <p className="mt-1 font-mono text-xs text-[#22e273]">{step.summary}</p>
                <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
