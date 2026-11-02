"use client";

import {
  BroadcastIcon,
  CheckCircleIcon,
  ClockIcon,
  HashIcon,
  LinkSimpleIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

type Creator = {
  handle: string;
  isLive: boolean;
};

const CREATORS: Creator[] = [
  { handle: "nova_live", isLive: true },
  { handle: "scarlett_vip", isLive: false },
  { handle: "ivy_exclusive", isLive: false },
  { handle: "aurora_cam", isLive: false },
  { handle: "luna_stream", isLive: false },
  { handle: "chloe_star", isLive: false },
  { handle: "ruby_glow", isLive: false },
  { handle: "amber_flow", isLive: false },
];

export function CbLiveDemo() {
  const [activeTab, setActiveTab] = useState<"channel" | "daemon">("channel");
  const [selectedCreator, setSelectedCreator] = useState<string>("nova_live");

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#2b2d31] bg-[#1e1f22] text-[#dbdee1] shadow-[0_30px_90px_-35px_rgb(0_0_0/0.8)]">
      {/* Discord Channel Header */}
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
            <span>cb-live-feed</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("daemon")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "daemon"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <TerminalWindowIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>25s Polling Daemon</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded bg-[#22e273]/15 px-2 py-0.5 text-[11px] font-medium text-[#22e273]">
            <span className="size-2 rounded-full bg-[#22e273] animate-pulse" />
            POLLING (25s)
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-5">
        {activeTab === "channel" ? (
          <div className="space-y-4">
            {/* EMBED 1: Creator Status Board (from Screenshot 2) */}
            <div className="rounded-r-[6px] bg-[#2b2d31] p-4 text-xs border-l-4 border-l-[#00e5ff] shadow-md">
              <h4 className="flex items-center gap-2 font-bold text-white text-[14px]">
                <span>📊</span>
                <span>Creator Status</span>
              </h4>

              {/* Creator Handle List */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[12px]">
                {CREATORS.map((c) => (
                  <div key={c.handle} className="flex items-center gap-2">
                    <span
                      className={`size-2.5 rounded-full shrink-0 ${
                        c.isLive ? "bg-[#fe2c55] animate-pulse" : "bg-[#4e5058]"
                      }`}
                    />
                    <span className="rounded bg-[#1e1f22] border border-[#3f4147] px-2 py-0.5 text-[#5865F2] font-semibold">
                      {c.handle}
                    </span>
                    <span className={`text-[11px] ${c.isLive ? "text-[#fe2c55] font-bold" : "text-[#949ba4]"}`}>
                      — {c.isLive ? "Live" : "Offline"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status & Interval Details (Matching Screenshot 2 bottom row) */}
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-[#35373c] pt-3 font-sans">
                <div>
                  <p className="font-bold text-white text-[12px]">Monitoring</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[#dbdee1]">
                    <span className="text-[#38bdf8]">▶️</span>
                    <span className="font-semibold text-white">Active</span>
                  </p>
                </div>
                <div>
                  <p className="font-bold text-white text-[12px]">Interval</p>
                  <p className="mt-0.5 font-mono text-[12px] text-[#dbdee1] font-semibold">25s</p>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-[#949ba4] font-medium border-t border-[#35373c] pt-2">
                LiveAlert • Chaturbate Monitor • Today at 18:27
              </p>
            </div>

            {/* EMBED 2: Live Alert with @here (from Screenshot 1 top) */}
            <div className="space-y-1.5">
              <div>
                <span className="rounded bg-[#5865F2]/20 px-1.5 py-0.5 text-xs font-semibold text-[#c9cdfb]">
                  @here
                </span>
              </div>
              <div className="rounded-r-[6px] bg-[#2b2d31] p-3.5 text-xs border-l-4 border-l-[#fe2c55] shadow-md">
                <h4 className="flex items-center gap-1.5 font-bold text-white text-[14px]">
                  <span className="text-[#fe2c55]">🔴</span>
                  <span>Model Nova is now LIVE!</span>
                </h4>

                <p className="mt-2 text-[#dbdee1] text-[13px] leading-relaxed">
                  <strong className="text-white">nova_live</strong> has just started a public livestream on Chaturbate!
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
                  LiveAlert • Chaturbate Monitor • 10/09/2026 16:51
                </p>
              </div>
            </div>

            {/* EMBED 3: Stream Ended with @here (from Screenshot 1 bottom) */}
            <div className="space-y-1.5">
              <div>
                <span className="rounded bg-[#5865F2]/20 px-1.5 py-0.5 text-xs font-semibold text-[#c9cdfb]">
                  @here
                </span>
              </div>
              <div className="rounded-r-[6px] bg-[#2b2d31] p-3.5 text-xs border-l-4 border-l-[#4e5058] shadow-md">
                <h4 className="flex items-center gap-1.5 font-bold text-white text-[14px]">
                  <span className="text-[#80848e]">⚫</span>
                  <span>Model Nova stream ended</span>
                </h4>

                <p className="mt-2 text-[#dbdee1] text-[13px]">
                  <strong className="text-white">nova_live</strong> has ended the livestream.
                </p>

                <p className="mt-2 text-[#949ba4] text-[12px]">
                  Will be live again soon.
                </p>

                <p className="mt-3 text-[11px] text-[#949ba4] font-medium border-t border-[#35373c] pt-2">
                  LiveAlert • Chaturbate Monitor • 10/09/2026 16:52
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ================= DAEMON TERMINAL VIEW ================= */
          <div className="rounded-[8px] bg-[#141517] p-3.5 font-mono text-xs text-[#949ba4] space-y-1.5 border border-white/5">
            <div className="flex items-center justify-between text-white font-semibold pb-1 border-b border-[#232428]">
              <span>cb-monitor-daemon [pid 7812]</span>
              <span className="text-[10px] text-[#22e273]">Interval: 25s</span>
            </div>
            <p className="text-[#6d6f78] pt-1">
              [16:50:35] Querying Chaturbate Public API for 8 monitored models...
            </p>
            <p className="text-[#fe2c55] font-semibold">
              [16:51:00] [ALERT] nova_live status changed: OFFLINE → PUBLIC_LIVE!
            </p>
            <p className="text-[#38bdf8]">
              [16:51:01] Dispatched Discord @here webhook (HTTP 204 in 138ms)
            </p>
            <p className="text-[#dbdee1]">
              [16:51:25] Polling: 1 active room, 7 offline rooms.
            </p>
            <p className="text-[#6d6f78]">
              [16:51:50] nova_live room active. Stream uptime: 50s.
            </p>
            <p className="text-[#a855f7] font-semibold">
              [16:52:15] [ENDED] nova_live stream ended.
            </p>
            <p className="text-[#22e273]">
              [16:52:16] Dispatched Discord stream-ended notification with @here.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-[11px] text-[#949ba4]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#22e273]" />
            <span className="text-[#dbdee1]">Chaturbate Affiliate &amp; Public API</span>
            <span className="text-[#6d6f78]">•</span>
            <span>25s Polling Engine</span>
          </div>
          <span className="text-[10px] text-faint">Headless Node.js Service</span>
        </div>
      </div>
    </div>
  );
}
