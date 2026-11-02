import { metrics } from "@/content/site";
import { Reveal } from "./reveal";
import { ScrambleText } from "./scramble-text";
import { container, stagger } from "./ui";

// 2x2 on phones, one row from md up. Borders per cell keep the first column flush with the page edge.
const cellEdges = [
  "border-r border-b pr-5 md:border-b-0 md:pr-8",
  "border-b pl-5 md:border-b-0 md:border-r md:px-8",
  "border-r pr-5 md:px-8",
  "pl-5 md:pl-8",
];

export function Metrics() {
  return (
    <section aria-label="Track record" className="relative border-y border-line">
      <Reveal className={container}>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={stagger(i)}
              className={`rv flex flex-col-reverse justify-end gap-2 border-line py-9 md:py-12 ${cellEdges[i]}`}
            >
              <dt className="max-w-[18ch] text-sm leading-snug text-muted">{m.label}</dt>
              <dd className="font-display text-[1.9rem] font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                <ScrambleText text={m.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
