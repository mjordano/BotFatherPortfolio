import { Contact } from "@/components/contact/contact";
import { Hero } from "@/components/hero/hero";
import { Metrics } from "@/components/metrics";
import { Process } from "@/components/process";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work/work";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <Metrics />
        <Work />
        <Process />
        <Stack />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
