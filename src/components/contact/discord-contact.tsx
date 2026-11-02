"use client";

import Image from "next/image";
import { useState } from "react";
import { contact } from "@/content/site";
import { AsciiMatrixBanner } from "./ascii-matrix-banner";

export function DiscordContact() {
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const copyUsername = async () => {
    try {
      await navigator.clipboard.writeText(contact.discordUsername);
      setCopiedUser(true);
      setTimeout(() => setCopiedUser(false), 2500);
    } catch {
      // Fallback
    }
  };

  const copyTemplateText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplate(label);
      setTimeout(() => setCopiedTemplate(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-4">
      {/* Discord Profile Card Themed in Terminal Green & ASCII BotFather Style */}
      <div className="overflow-hidden rounded-[16px] border border-[#22e273]/30 bg-[#121417] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
        {/* Banner with Animated ASCII Matrix Rain & Terminal Green Background */}
        <div className="relative h-32 w-full overflow-hidden bg-[#0d130f]">
          {/* Static Background Banner Image */}
          <Image
            src="/contact/botfather-banner.jpg"
            alt="ASCII Terminal Matrix Banner"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover opacity-50 mix-blend-luminosity"
            priority
          />

          {/* Live Interactive ASCII Matrix Stream Canvas */}
          <AsciiMatrixBanner />

          {/* Top subtle vignette & scanline grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#121417] pointer-events-none" />

          {/* Overlay Status Badge */}
          <div className="relative z-10 p-3.5 flex items-start justify-between">
            <div className="flex items-center gap-2 rounded-full border border-[#22e273]/40 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[11px] text-[#22e273] shadow-md">
              <span className="size-2 rounded-full bg-[#22e273] animate-pulse" />
              <span>BOTFATHER GATEWAY • DIRECT DM</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-[#22e273]/30 bg-black/50 px-2.5 py-1 text-[#22e273] font-mono text-xs">
              <svg className="size-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="font-semibold text-[11px]">Discord</span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="relative px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
          {/* Avatar positioning with ASCII BotFather Avatar */}
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="relative group">
              {/* Circular Avatar with Glowing Green Ring */}
              <div className="relative size-24 rounded-full border-2 border-[#22e273] bg-[#0a0f0d] shadow-[0_0_25px_rgba(34,226,115,0.45)] overflow-hidden">
                <Image
                  src="/contact/botfather-avatar.jpg"
                  alt="ASCII BotFather Avatar"
                  width={96}
                  height={96}
                  className="size-full object-cover"
                />
                {/* Subtle Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,20,23,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
              </div>

              {/* Online indicator */}
              <span
                className="absolute bottom-1 right-1 size-5 rounded-full border-2 border-[#121417] bg-[#22e273] shadow-[0_0_10px_#22e273]"
                title="Online on Discord"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#22e273]/10 px-3 py-1 font-mono text-[11px] text-[#22e273] border border-[#22e273]/30">
                ● THE BOTFATHER
              </span>
            </div>
          </div>

          {/* User Handle & Title */}
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">IFeelGucci</h3>
              <span className="font-mono text-sm text-[#22e273] font-semibold">@IFeelGucci</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              Agency BotFather &amp; Automation Architect
            </p>
          </div>

          {/* Action Buttons in Terminal Green */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={copyUsername}
              className={`flex items-center justify-center gap-2 rounded-[10px] px-4 py-3 font-mono text-xs font-bold transition-all duration-200 cursor-pointer ${
                copiedUser
                  ? "bg-[#22e273] text-black ring-2 ring-white shadow-[0_0_25px_rgba(34,226,115,0.6)]"
                  : "bg-[#22e273] hover:bg-[#16a34a] text-black shadow-[0_0_20px_rgba(34,226,115,0.3)]"
              }`}
            >
              {copiedUser ? (
                <>
                  <svg className="size-4 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Copied @IFeelGucci!</span>
                </>
              ) : (
                <>
                  <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy Discord Username</span>
                </>
              )}
            </button>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-[10px] border border-[#22e273]/40 bg-[#22e273]/5 hover:bg-[#22e273]/15 px-4 py-3 font-mono text-xs font-semibold text-[#22e273] transition-colors"
            >
              <span>Open Discord</span>
              <svg className="size-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          {/* Quick DM Starter Template */}
          <div className="mt-6 rounded-[12px] border border-white/10 bg-[#0d0f12] p-4 space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-faint uppercase tracking-wider">
                Quick DM Starter Templates
              </span>
              <span className="text-[10px] text-[#22e273]">Click to copy</span>
            </div>

            <div className="space-y-2">
              {contact.dmTemplates?.map((tpl) => (
                <div
                  key={tpl.label}
                  className="rounded-[8px] border border-white/5 bg-[#16181d] p-3 space-y-2 transition-colors hover:border-[#22e273]/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{tpl.label}</span>
                    <button
                      type="button"
                      onClick={() => copyTemplateText(tpl.text, tpl.label)}
                      className={`rounded px-2.5 py-1 text-[10px] font-bold transition-colors cursor-pointer ${
                        copiedTemplate === tpl.label
                          ? "bg-[#22e273] text-black"
                          : "bg-[#22e273]/15 text-[#22e273] hover:bg-[#22e273]/25"
                      }`}
                    >
                      {copiedTemplate === tpl.label ? "✓ Copied!" : "Copy Template"}
                    </button>
                  </div>
                  <p className="text-xs text-[#949ba4] italic leading-relaxed font-sans">
                    &ldquo;{tpl.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How the interaction works */}
          <div className="mt-4 pt-4 border-t border-white/10 text-xs font-mono text-muted space-y-1.5">
            <div className="flex items-center gap-1.5 text-text font-bold text-[11px]">
              <span className="size-1.5 rounded-full bg-[#22e273]" />
              <span>Workflow Reminder:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-faint">
              1. DM your bottleneck → 2. Problem analysis &amp; architecture → 3. Build &amp; parallel comparative test → 4. Production launch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
