import {
  siCloudflare,
  siDiscord,
  siDocker,
  siGooglesheets,
  siNodedotjs,
  siNotion,
  siPostgresql,
  siPython,
  siRedis,
  siStripe,
  siTelegram,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { stack } from "@/content/site";
import { Reveal } from "./reveal";
import { container, sectionTitle, stagger } from "./ui";

const logos: SimpleIcon[] = [
  siDiscord,
  siTelegram,
  siNodedotjs,
  siTypescript,
  siPython,
  siPostgresql,
  siRedis,
  siDocker,
  siCloudflare,
  siGooglesheets,
  siStripe,
  siNotion,
];

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative border-t border-line py-24 md:py-32">
      <div className={container}>
        <Reveal>
          <h2 id="stack-title" className={`rv max-w-[22ch] ${sectionTitle}`}>
            {stack.title}
          </h2>
          <p className="rv mt-5 max-w-[56ch] text-base leading-relaxed text-muted md:text-lg" style={stagger(1)}>
            {stack.lede}
          </p>
        </Reveal>

        <Reveal className="mt-14 md:mt-16">
          <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-4 lg:grid-cols-6">
            {logos.map((logo, i) => (
              <li key={logo.slug} className="rv group grid aspect-[5/3] place-items-center bg-bg" style={stagger(i % 6)}>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="size-7 fill-faint transition-[fill,transform] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:fill-text md:size-8"
                >
                  <title>{logo.title}</title>
                  <path d={logo.path} />
                </svg>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
