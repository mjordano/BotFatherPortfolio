"use client";

import { useState } from "react";
import { CheckIcon, PlusIcon } from "@phosphor-icons/react";
import { featured, projects, work, type Project } from "@/content/site";
import { Reveal } from "../reveal";
import { container, sectionTitle, stagger } from "../ui";
import { ApprovalDemo } from "./approval-demo";
import { CbLiveDemo } from "./cb-live-demo";
import { CicoDemo } from "./cico-demo";
import { RevTrackDemo } from "./revtrack-demo";
import { TikTokLiveDemo } from "./tiktok-live-demo";
import { TrainingDemo } from "./training-demo";

const showExampleTags = process.env.NODE_ENV !== "production";

export function Work() {
  const [activeShowcase, setActiveShowcase] = useState<"mmapp" | "cico" | "revtrack" | "training" | "tiktok" | "cb">("mmapp");

  const cicoProject = projects.find((p) => p.slug === "cico-supervisor") ?? featured;
  const tiktokProject = projects.find((p) => p.slug === "tiktok-live-alert") ?? featured;
  const cbProject = projects.find((p) => p.slug === "live-alert") ?? featured;
  const revtrackProject = projects.find((p) => p.slug === "revtrack") ?? featured;
  const trainingProject = projects.find((p) => p.slug === "autoticket") ?? featured;

  const currentFeatured: Project =
    activeShowcase === "mmapp"
      ? featured
      : activeShowcase === "cico"
        ? cicoProject
        : activeShowcase === "revtrack"
          ? revtrackProject
          : activeShowcase === "training"
            ? trainingProject
            : activeShowcase === "tiktok"
              ? tiktokProject
              : cbProject;

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 md:py-36">
      <div className={container}>
        <Reveal>
          <h2 id="work-title" className={`rv ${sectionTitle}`}>
            {work.title}
          </h2>
          <p className="rv mt-5 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg" style={stagger(1)}>
            {work.lede}
          </p>

          {/* Interactive Showcase Switcher */}
          <div className="rv mt-10 flex items-center gap-2 overflow-x-auto pb-4 border-b border-line scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap" style={stagger(2)}>
            <span className="mr-2 font-mono text-xs uppercase tracking-wider text-faint shrink-0">
              Interactive Demos:
            </span>
            <button
              type="button"
              onClick={() => setActiveShowcase("mmapp")}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeShowcase === "mmapp"
                  ? "bg-accent font-semibold text-accent-ink shadow-[0_0_20px_rgb(34_226_115/0.25)]"
                  : "border border-line bg-line/30 text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              MM Approval Engine (Discord)
            </button>
            <button
              type="button"
              onClick={() => setActiveShowcase("cico")}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeShowcase === "cico"
                  ? "bg-accent font-semibold text-accent-ink shadow-[0_0_20px_rgb(34_226_115/0.25)]"
                  : "border border-line bg-line/30 text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              CICO Supervisor &amp; Web Dashboard
            </button>
            <button
              type="button"
              onClick={() => setActiveShowcase("training")}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeShowcase === "training"
                  ? "bg-accent font-semibold text-accent-ink shadow-[0_0_20px_rgb(34_226_115/0.25)]"
                  : "border border-line bg-line/30 text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              Training Server Automation
            </button>
            <button
              type="button"
              onClick={() => setActiveShowcase("revtrack")}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeShowcase === "revtrack"
                  ? "bg-accent font-semibold text-accent-ink shadow-[0_0_20px_rgb(34_226_115/0.25)]"
                  : "border border-line bg-line/30 text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              RevTrack Revenue Pipeline
            </button>
            <button
              type="button"
              onClick={() => setActiveShowcase("tiktok")}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeShowcase === "tiktok"
                  ? "bg-accent font-semibold text-accent-ink shadow-[0_0_20px_rgb(34_226_115/0.25)]"
                  : "border border-line bg-line/30 text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              TikTok Live Alerts
            </button>
            <button
              type="button"
              onClick={() => setActiveShowcase("cb")}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeShowcase === "cb"
                  ? "bg-accent font-semibold text-accent-ink shadow-[0_0_20px_rgb(34_226_115/0.25)]"
                  : "border border-line bg-line/30 text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              CB Live Alert Monitor
            </button>
          </div>
        </Reveal>

        <Reveal className="mt-10 grid items-start gap-12 md:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="rv lg:col-span-5 lg:pt-4">
            <p className="font-mono text-xs text-faint">{currentFeatured.category}</p>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] md:text-3xl">
              {currentFeatured.name}
            </h3>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">{currentFeatured.summary}</p>
            {currentFeatured.tags && currentFeatured.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {currentFeatured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded border border-line-strong/60 bg-line/40 px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <ul className="mt-7 space-y-3.5">
              {currentFeatured.features.map((f) => (
                <li key={f} className="flex gap-3 text-[15px] leading-snug">
                  <CheckIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-7 font-mono text-xs text-faint">{currentFeatured.platforms.join(" and ")}</p>
          </div>
          <div className="rv lg:col-span-7" style={stagger(1)}>
            {activeShowcase === "mmapp" ? (
              <ApprovalDemo />
            ) : activeShowcase === "cico" ? (
              <CicoDemo />
            ) : activeShowcase === "training" ? (
              <TrainingDemo />
            ) : activeShowcase === "revtrack" ? (
              <RevTrackDemo />
            ) : activeShowcase === "tiktok" ? (
              <TikTokLiveDemo />
            ) : (
              <CbLiveDemo />
            )}
            <p className="mt-3 text-sm text-faint">
              {activeShowcase === "mmapp"
                ? work.demoHint
                : activeShowcase === "cico"
                  ? "Live interactive simulator: switch between Discord clock-in reactions, SaaS web analytics, and shift coverage."
                  : activeShowcase === "training"
                    ? "Live interactive dashboard: 69 trainee tickets, stage progression, 24h announcements, and rotation bumps."
                    : activeShowcase === "revtrack"
                      ? "Dataflow architecture: watch multi-inbox revenue reports ingest into the Black Box and sync to the master sheet."
                      : activeShowcase === "tiktok"
                        ? "Live interactive simulator: test instant TikTok livestream alerts, STOP CHATTING locks, and stream-end notices."
                        : "Live interactive simulator: 25s Chaturbate monitoring daemon, @here livestream alerts, and creator status board."}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-24 md:mt-32">
          <h3 className="rv font-display text-xl font-medium tracking-[-0.02em] md:text-2xl">Production builds</h3>
          <div className="mt-6 border-t border-line">
            {projects.map((p, i) => (
              <details key={p.slug} className="project-row rv group border-b border-line" style={stagger(i + 1)}>
                <summary className="grid cursor-pointer grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1.5 py-6 md:grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,2fr)_auto] md:py-8">
                  <span className="font-display text-xl font-medium tracking-[-0.02em] transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:text-[1.75rem]">
                    {p.name}
                    {showExampleTags && p.example && (
                      <span className="ml-3 align-middle font-mono text-[11px] font-normal text-accent">
                        example, replace
                      </span>
                    )}
                  </span>
                  <PlusIcon
                    size={20}
                    className="row-icon col-start-2 row-start-1 self-center text-muted md:col-start-4"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-faint md:col-start-2 md:row-start-1 md:text-[13px]">
                    {p.category}
                  </span>
                  <span className="hidden text-sm text-muted md:col-start-3 md:row-start-1 md:block">
                    {p.platforms.join(", ")}
                  </span>
                </summary>
                <div className="grid gap-6 pb-9 md:grid-cols-12">
                  <div className="space-y-4 md:col-span-5">
                    <p className="max-w-[46ch] leading-relaxed text-muted">{p.summary}</p>
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded border border-line-strong/60 bg-line/40 px-2 py-0.5 font-mono text-[11px] text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.screenshot && (
                      <div className="mt-4 overflow-hidden rounded-lg border border-line bg-line/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.screenshot}
                          alt={`${p.name} screenshot`}
                          className="h-auto w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                  <ul className="space-y-2.5 md:col-span-6 md:col-start-7">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[15px] leading-snug">
                        <CheckIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-faint" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Embedded Interactive Demos within accordion drawers */}
                  {p.slug === "cico-supervisor" && (
                    <div className="mt-4 md:col-span-12">
                      <div className="mb-3 flex items-center justify-between border-t border-line pt-4">
                        <span className="font-mono text-xs text-accent">
                          ● Interactive Live Demo &amp; SaaS Dashboard Simulator
                        </span>
                      </div>
                      <CicoDemo />
                    </div>
                  )}

                  {p.slug === "autoticket" && (
                    <div className="mt-4 md:col-span-12">
                      <div className="mb-3 flex items-center justify-between border-t border-line pt-4">
                        <span className="font-mono text-xs text-accent">
                          ● Interactive Training Tickets Board &amp; Bumps Manager
                        </span>
                      </div>
                      <TrainingDemo />
                    </div>
                  )}

                  {p.slug === "revtrack" && (
                    <div className="mt-4 md:col-span-12">
                      <div className="mb-3 flex items-center justify-between border-t border-line pt-4">
                        <span className="font-mono text-xs text-accent">
                          ● Interactive Revenue Ingestion Engine &amp; Master Spreadsheet Heatmap
                        </span>
                      </div>
                      <RevTrackDemo />
                    </div>
                  )}

                  {p.slug === "tiktok-live-alert" && (
                    <div className="mt-4 md:col-span-12">
                      <div className="mb-3 flex items-center justify-between border-t border-line pt-4">
                        <span className="font-mono text-xs text-accent">
                          ● Interactive TikTok Live Stream Alert Simulator
                        </span>
                      </div>
                      <TikTokLiveDemo />
                    </div>
                  )}

                  {p.slug === "live-alert" && (
                    <div className="mt-4 md:col-span-12">
                      <div className="mb-3 flex items-center justify-between border-t border-line pt-4">
                        <span className="font-mono text-xs text-accent">
                          ● Interactive CB Live Stream Alert Simulator
                        </span>
                      </div>
                      <CbLiveDemo />
                    </div>
                  )}

                  {p.slug === "mm-approval" && (
                    <div className="mt-4 md:col-span-12">
                      <div className="mb-3 flex items-center justify-between border-t border-line pt-4">
                        <span className="font-mono text-xs text-accent">
                          ● Interactive Discord Approval Simulator
                        </span>
                      </div>
                      <ApprovalDemo />
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
