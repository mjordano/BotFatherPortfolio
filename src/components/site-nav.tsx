import { nav } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { btnPrimarySmall, container } from "./ui";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 nav-in">
      {/* Downward gradient fade and backdrop blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg via-bg/85 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
      />

      <nav aria-label="Primary" className={`${container} relative flex h-16 items-center justify-between gap-6`}>
        <ul className="flex items-center gap-6 font-mono text-[13px] text-muted sm:gap-8">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="rounded-sm transition-colors duration-300 hover:text-text">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact" className={btnPrimarySmall}>
            {nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
