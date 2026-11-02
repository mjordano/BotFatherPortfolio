import { contact, site } from "@/content/site";
import { Reveal } from "../reveal";
import { container, sectionTitle, stagger } from "../ui";
import { DiscordContact } from "./discord-contact";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative border-t border-line py-24 md:py-36">
      <div className={`${container} grid gap-14 lg:grid-cols-12 lg:gap-10`}>
        <Reveal className="lg:col-span-5">
          <div className="rv inline-flex items-center gap-2 rounded-full border border-[#22e273]/30 bg-[#22e273]/10 px-3 py-1 font-mono text-xs text-[#22e273] mb-4">
            <span className="size-2 rounded-full bg-[#22e273]" />
            <span>{contact.badge}</span>
          </div>

          <h2 id="contact-title" className={`rv max-w-[16ch] ${sectionTitle}`}>
            {contact.title}
          </h2>

          <p className="rv mt-5 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg" style={stagger(1)}>
            {contact.lede}
          </p>

          <div className="rv mt-8 space-y-3 font-mono text-xs text-muted" style={stagger(2)}>
            <div className="flex items-start gap-2.5">
              <span className="text-[#22e273] font-bold">✓</span>
              <span>Direct 1-on-1 discussion with the engineer</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#22e273] font-bold">✓</span>
              <span>Bottleneck intake &amp; solution architecture</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#22e273] font-bold">✓</span>
              <span>Comparative parallel testing with real agency data</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#22e273] font-bold">✓</span>
              <span>Zero email delay — instant Discord collaboration</span>
            </div>
          </div>

          <div className="rv mt-8 pt-6 border-t border-line" style={stagger(3)}>
            <p className="text-xs font-mono text-faint">Direct Discord Handle:</p>
            <p className="mt-1 font-mono text-lg font-bold text-text flex items-center gap-2">
              <span className="text-[#22e273]">@</span>
              <span>{contact.discordUsername}</span>
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6">
          <div className="rv" style={stagger(1)}>
            <DiscordContact />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
