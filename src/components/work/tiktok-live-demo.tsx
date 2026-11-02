"use client";

import {
  BroadcastIcon,
  HashIcon,
  LinkSimpleIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

export function TikTokLiveDemo() {
  const [activeTab, setActiveTab] = useState<"channel" | "terminal">("channel");
  const model = "Model Nova";

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#2b2d31] bg-[#1e1f22] text-[#dbdee1] shadow-[0_30px_90px_-35px_rgb(0_0_0/0.8)]">
      {/* Discord Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-xs text-[#949ba4]">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("channel")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "channel"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <HashIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>tiktok-alerts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "terminal"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <TerminalWindowIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>Monitor Daemon</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded bg-[#22e273]/15 px-2 py-0.5 text-[11px] font-medium text-[#22e273]">
            <span className="size-2 rounded-full bg-[#22e273] animate-pulse" />
            LIVE MONITORING
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5">
        {activeTab === "channel" ? (
          <div className="space-y-5">
            {/* 1. START STREAM DISCORD MESSAGE (Matching top embed in screenshot) */}
            <div className="flex gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#fe2c55]/20 font-bold text-sm text-[#fe2c55] ring-1 ring-[#fe2c55]/30">
                <BroadcastIcon size={20} weight="fill" />
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-white text-[15px]">LiveAlert</span>
                  <span className="rounded-[3px] bg-[#5865F2] px-1 py-0.2 font-sans text-[9px] font-bold text-white uppercase tracking-wider">
                    APP
                  </span>
                  <span className="text-xs text-[#949ba4]">Today at 00:10</span>
                </div>

                {/* Stream Start Embed */}
                <div className="rounded-r-[6px] bg-[#2b2d31] p-3.5 text-xs border-l-4 border-l-[#fe2c55] shadow-md">
                  <h4 className="flex items-center gap-1.5 font-bold text-white text-[14px]">
                    <span className="text-[#fe2c55]">🔴</span>
                    <span>{model} is now LIVE!</span>
                  </h4>

                  <p className="mt-2.5 font-black text-white text-[13px] tracking-wide flex items-center gap-1.5">
                    <span>🚨</span>
                    <span>STOP CHATTING!</span>
                  </p>

                  <p className="mt-2 text-[#dbdee1] text-[13px]">
                    <strong className="text-white">{model}</strong> is now live streaming on TikTok!
                  </p>

                  <div className="mt-3">
                    <a
                      href="#watch"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#00a8fc] hover:underline text-[13px]"
                    >
                      <LinkSimpleIcon size={14} weight="bold" />
                      <span>Watch Now</span>
                    </a>
                  </div>

                  <p className="mt-3 text-[11px] text-[#949ba4] font-medium border-t border-[#35373c] pt-2">
                    LiveAlert • TikTok Monitor • Today at 00:10
                  </p>
                </div>
              </div>
            </div>

            {/* 2. END STREAM DISCORD MESSAGE (Matching bottom embed in screenshot) */}
            <div className="flex gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#35373c] font-bold text-sm text-[#949ba4] ring-1 ring-white/10">
                <BroadcastIcon size={20} weight="fill" />
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-white text-[15px]">LiveAlert</span>
                  <span className="rounded-[3px] bg-[#5865F2] px-1 py-0.2 font-sans text-[9px] font-bold text-white uppercase tracking-wider">
                    APP
                  </span>
                  <span className="text-xs text-[#949ba4]">Today at 01:11</span>
                </div>

                {/* Stream End Embed */}
                <div className="rounded-r-[6px] bg-[#2b2d31] p-3.5 text-xs border-l-4 border-l-[#4e5058] shadow-md">
                  <h4 className="flex items-center gap-1.5 font-bold text-white text-[14px]">
                    <span className="text-[#80848e]">⚫</span>
                    <span>{model} stream ended</span>
                  </h4>

                  <p className="mt-2.5 font-black text-white text-[13px] tracking-wide flex items-center gap-1.5">
                    <span>💬</span>
                    <span>BACK TO CHATTING!</span>
                  </p>

                  <p className="mt-2 text-[#dbdee1] text-[13px]">
                    <strong className="text-white">{model}</strong> has ended the livestream.
                  </p>

                  <p className="mt-2 flex items-center gap-1.5 text-[13px] text-white">
                    <span>⏱️</span>
                    <span className="font-bold">Duration:</span>
                    <span className="rounded bg-[#1e1f22] border border-[#3f4147] px-1.5 py-0.5 font-mono text-xs text-[#dbdee1]">
                      1h 1m 0s
                    </span>
                  </p>

                  <p className="mt-3 text-[#949ba4] text-[12px]">
                    Will be live again soon.
                  </p>

                  <p className="mt-3 text-[11px] text-[#949ba4] font-medium border-t border-[#35373c] pt-2">
                    LiveAlert • TikTok Monitor • Today at 01:11
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= TERMINAL VIEW ================= */
          <div className="rounded-[8px] bg-[#141517] p-3.5 font-mono text-xs text-[#949ba4] space-y-1.5 border border-white/5">
            <div className="flex items-center justify-between text-white font-semibold pb-1 border-b border-[#232428]">
              <span>tiktok-monitor-daemon [pid 4902]</span>
              <span className="text-[10px] text-[#22e273]">Polling: 30s interval</span>
            </div>
            <p className="text-[#6d6f78] pt-1">
              [00:09:30] Checking @nova_live stream status via TikTok Gateway...
            </p>
            <p className="text-[#fe2c55] font-semibold">
              [00:10:00] [ALERT] @nova_live went LIVE! Room ID: 742918402914
            </p>
            <p className="text-[#38bdf8]">
              [00:10:01] Dispatched Discord webhook: &quot;STOP CHATTING!&quot; (HTTP 204 in 142ms)
            </p>
            <p className="text-[#dbdee1]">
              [00:10:02] Creator session locked. Chatters notified across 32 model channels.
            </p>
            <p className="text-[#6d6f78]">
              [01:10:30] Stream heartbeat check: Active (Duration: 60m 30s)
            </p>
            <p className="text-[#a855f7] font-semibold">
              [01:11:00] [ENDED] @nova_live closed broadcast. Total time: 1h 1m 0s
            </p>
            <p className="text-[#22e273]">
              [01:11:01] Dispatched Discord webhook: &quot;BACK TO CHATTING!&quot; (HTTP 204 in 118ms)
            </p>
          </div>
        )}
      </div>

      {/* Operational Highlights Footer */}
      <div className="border-t border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-[11px] text-[#949ba4]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#22e273]" />
            <span className="text-[#dbdee1]">Zero Chatter Collision</span>
            <span className="text-[#6d6f78]">•</span>
            <span>Automated Notification Cycle</span>
          </div>
          <span className="text-[10px] text-faint">&lt;200ms Webhook Dispatch</span>
        </div>
      </div>
    </div>
  );
}
