import { ArrowUpIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className={`${container} flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between`}>
        <div>
          <p className="text-sm text-muted">{site.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 font-mono text-xs sm:text-[13px] text-muted">
          <a
            href="#contact"
            className="flex items-center gap-1.5 rounded-sm transition-colors hover:text-text"
          >
            <span className="text-faint">Discord:</span>
            <span className="font-semibold text-text">{site.discord}</span>
          </a>
          <a href="#top" className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-text">
            Back to top
            <ArrowUpIcon size={14} aria-hidden="true" />
          </a>
          <span className="text-faint">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
