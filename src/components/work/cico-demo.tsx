"use client";

import {
  CaretDownIcon,
  CaretRightIcon,
  ChartBarIcon,
  ChartLineUpIcon,
  CheckCircleIcon,
  ClockIcon,
  HashIcon,
  TagIcon,
  UsersIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

type LogEntry = {
  time: string;
  user: string;
  cmd: string;
  reaction: string;
  statusText: string;
};

type ChannelFilter = "all" | "active" | "empty" | "overtime";

export function CicoDemo() {
  const [activeTab, setActiveTab] = useState<"bot" | "dashboard" | "status">("bot");
  const [clockState, setClockState] = useState<"in" | "out" | "late" | "superlate">("in");
  const [overtimeAccepted, setOvertimeAccepted] = useState(false);
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    s1: true,
    s2: false,
    s3: false,
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      time: "16:45",
      user: "Alex_Staff",
      cmd: "!ci",
      reaction: "✅",
      statusText: "Clocked in on-time for Noon shift (Punctual)",
    },
    {
      time: "16:52",
      user: "Kira_Ops",
      cmd: "!ci",
      reaction: "⚠️",
      statusText: "Clocked in 12m late (Warning recorded)",
    },
    {
      time: "17:35",
      user: "Jordan_Chat",
      cmd: "!ci",
      reaction: "🚨",
      statusText: "Clocked in >30m late (Supervisor alerted)",
    },
    {
      time: "20:29",
      user: "Alex_Staff",
      cmd: "!co",
      reaction: "👏",
      statusText: "Clocked out — Shift completed (8h 14m recorded)",
    },
  ]);

  const handleCommand = (cmd: "!ci-ontime" | "!ci-late" | "!ci-superlate" | "!co") => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    if (cmd === "!ci-ontime") {
      setClockState("in");
      setLogs((prev) => [
        {
          time: timeStr,
          user: "Alex_Staff",
          cmd: "!ci",
          reaction: "✅",
          statusText: "Clocked in on-time for shift (Punctual)",
        },
        ...prev.slice(0, 3),
      ]);
    } else if (cmd === "!ci-late") {
      setClockState("late");
      setLogs((prev) => [
        {
          time: timeStr,
          user: "Alex_Staff",
          cmd: "!ci",
          reaction: "⚠️",
          statusText: "Clocked in 12m late (Notice recorded)",
        },
        ...prev.slice(0, 3),
      ]);
    } else if (cmd === "!ci-superlate") {
      setClockState("superlate");
      setLogs((prev) => [
        {
          time: timeStr,
          user: "Alex_Staff",
          cmd: "!ci",
          reaction: "🚨",
          statusText: "Clocked in >30m late (Supervisor alerted)",
        },
        ...prev.slice(0, 3),
      ]);
    } else if (cmd === "!co") {
      setClockState("out");
      setLogs((prev) => [
        {
          time: timeStr,
          user: "Alex_Staff",
          cmd: "!co",
          reaction: "👏",
          statusText: "Clocked out — Shift completed (8h 14m recorded)",
        },
        ...prev.slice(0, 3),
      ]);
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#2b2d31] bg-[#1e1f22] text-[#dbdee1] shadow-[0_30px_90px_-35px_rgb(0_0_0/0.8)]">
      {/* Top Channel / Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-xs text-[#949ba4]">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("bot")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "bot"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <HashIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>☀️-cico-nova</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <ChartBarIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>Web Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("status")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "status"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <UsersIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>Shift Coverage (Discord)</span>
          </button>
        </div>

        <span className="rounded bg-[#22e273]/15 px-2 py-0.5 text-[11px] font-medium text-[#22e273]">
          CICO Supervisor V2.1 LIVE
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-5">
        {/* ================= TAB 1: DISCORD BOT CHAT (!ci / !co) ================= */}
        {activeTab === "bot" && (
          <div className="space-y-4">
            {/* Quick Command Simulator Controls */}
            <div className="rounded-[8px] bg-[#2b2d31] p-3 text-xs">
              <p className="font-mono text-[#949ba4]">Simulate Chatter Action in Discord:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleCommand("!ci-ontime")}
                  className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                    clockState === "in"
                      ? "bg-[#248046] text-white ring-1 ring-white/20"
                      : "bg-[#2b2d31] border border-white/10 text-[#dbdee1] hover:bg-[#35373c]"
                  }`}
                >
                  <span>!ci (On-Time)</span>
                  <span>✅</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCommand("!ci-late")}
                  className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                    clockState === "late"
                      ? "bg-[#ca8a04] text-white ring-1 ring-white/20"
                      : "bg-[#2b2d31] border border-white/10 text-[#dbdee1] hover:bg-[#35373c]"
                  }`}
                >
                  <span>!ci (15m Late)</span>
                  <span>⚠️</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCommand("!ci-superlate")}
                  className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                    clockState === "superlate"
                      ? "bg-[#dc2626] text-white ring-1 ring-white/20"
                      : "bg-[#2b2d31] border border-white/10 text-[#dbdee1] hover:bg-[#35373c]"
                  }`}
                >
                  <span>!ci (&gt;30m Late)</span>
                  <span>🚨</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCommand("!co")}
                  className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                    clockState === "out"
                      ? "bg-[#5865F2] text-white ring-1 ring-white/20"
                      : "bg-[#2b2d31] border border-white/10 text-[#dbdee1] hover:bg-[#35373c]"
                  }`}
                >
                  <span>!co (Clock Out)</span>
                  <span>👏</span>
                </button>
              </div>
            </div>

            {/* 4 Real-world Examples Grid matching Screenshot 1 */}
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-[8px] bg-[#1a1b1e] p-3 border border-[#2b2d31]">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-white">@Alex_Staff</span>
                  <span className="font-mono text-[10px] text-[#949ba4]">10/04/2026 16:45</span>
                </div>
                <p className="mt-1 font-mono text-[13px] text-white">!ci</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded bg-[#2b2d31] border border-[#23a55a]/50 px-2 py-0.5 text-xs text-white">
                  <span>✅</span>
                  <span className="text-[#949ba4] text-[11px] font-bold">1</span>
                </div>
                <span className="ml-2 font-mono text-[10px] text-[#23a55a]">On-Time</span>
              </div>

              <div className="rounded-[8px] bg-[#1a1b1e] p-3 border border-[#2b2d31]">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-white">@Alex_Staff</span>
                  <span className="font-mono text-[10px] text-[#949ba4]">10/05/2026 16:52</span>
                </div>
                <p className="mt-1 font-mono text-[13px] text-white">!ci</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded bg-[#2b2d31] border border-[#ca8a04]/50 px-2 py-0.5 text-xs text-white">
                  <span>⚠️</span>
                  <span className="text-[#949ba4] text-[11px] font-bold">1</span>
                </div>
                <span className="ml-2 font-mono text-[10px] text-[#ca8a04]">Late &lt;15m</span>
              </div>

              <div className="rounded-[8px] bg-[#1a1b1e] p-3 border border-[#2b2d31]">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-white">@Alex_Staff</span>
                  <span className="font-mono text-[10px] text-[#949ba4]">10/04/2026 17:35</span>
                </div>
                <p className="mt-1 font-mono text-[13px] text-white">!ci</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded bg-[#2b2d31] border border-[#dc2626]/50 px-2 py-0.5 text-xs text-white">
                  <span>🚨</span>
                  <span className="text-[#949ba4] text-[11px] font-bold">1</span>
                </div>
                <span className="ml-2 font-mono text-[10px] text-[#f87171]">Super Late (&gt;30m)</span>
              </div>

              <div className="rounded-[8px] bg-[#1a1b1e] p-3 border border-[#2b2d31]">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-white">@Alex_Staff</span>
                  <span className="font-mono text-[10px] text-[#949ba4]">10/05/2026 20:29</span>
                </div>
                <p className="mt-1 font-mono text-[13px] text-white">!co</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded bg-[#2b2d31] border border-[#5865F2]/50 px-2 py-0.5 text-xs text-white">
                  <span>👏</span>
                  <span className="text-[#949ba4] text-[11px] font-bold">1</span>
                </div>
                <span className="ml-2 font-mono text-[10px] text-[#c9cdfb]">Clocked Out</span>
              </div>
            </div>

            {/* Discord Message: Automated Overtime Escalation Prompt (From Screenshot 1) */}
            <div className="rounded-[8px] bg-[#1a1b1e] p-3.5 border border-[#2b2d31]">
              <div className="flex items-baseline gap-2">
                <span className="text-base">⏰</span>
                <span className="font-semibold text-white text-[13px]">CICO Supervisor</span>
                <span className="rounded-[3px] bg-[#5865F2] px-1 py-0.2 text-[9px] font-bold text-white uppercase">
                  APP
                </span>
                <span className="text-[11px] text-[#949ba4]">08:45</span>
              </div>
              <div className="mt-2 rounded-[6px] bg-[#2b2d31] p-3 text-xs leading-relaxed text-[#dbdee1] border-l-4 border-l-[#ca8a04]">
                <p>
                  ⏰ <span className="bg-[#5865F2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-medium">@Alex_Staff</span>{" "}
                  No chatter has clocked in for the <strong>Grave shift</strong> starting in 15 minutes (<strong>09:00</strong>). Can you extend your shift?
                </p>
                <p className="mt-2 text-[#949ba4]">
                  • React with <strong className="text-white">✅ to Accept (Overtime)</strong>
                </p>

                <div className="mt-2.5">
                  <button
                    type="button"
                    onClick={() => setOvertimeAccepted(true)}
                    className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold cursor-pointer transition-all ${
                      overtimeAccepted
                        ? "bg-[#248046] text-white"
                        : "bg-[#35373c] hover:bg-[#248046] text-[#dbdee1] hover:text-white"
                    }`}
                  >
                    <span>✅</span>
                    <span>{overtimeAccepted ? "Accepted (+4h Overtime logged in WAL)" : "Accept Overtime"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LIVE WEB DASHBOARD (SaaS UI from Screenshot 1) ================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            {/* Dashboard Sub-nav */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#2b2d31] pb-2.5 text-xs text-[#949ba4]">
              <div className="flex gap-4 font-mono">
                <span className="text-white font-semibold">Scheduled</span>
                <span className="hover:text-white cursor-pointer">Shift History</span>
                <span className="hover:text-white cursor-pointer">Analytics</span>
                <span className="hover:text-white cursor-pointer">Channels &amp; Models</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="size-2 rounded-full bg-[#23a55a] animate-pulse" />
                <span>01:13:16 UTC+1</span>
              </div>
            </div>

            {/* Metric Cards Grid (Matching exact figures from Screenshot 1) */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-[10px] bg-[#2b2d31] p-3 border border-white/5">
                <div className="flex items-center justify-between text-[#949ba4] text-[11px]">
                  <span>Active Workers</span>
                  <UsersIcon size={14} className="text-[#23a55a]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-white">29</p>
                <p className="text-[10px] text-[#23a55a]">Online on channels</p>
              </div>

              <div className="rounded-[10px] bg-[#2b2d31] p-3 border border-white/5">
                <div className="flex items-center justify-between text-[#949ba4] text-[11px]">
                  <span>Model Coverage</span>
                  <span className="text-[#23a55a] font-bold">91%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#1e1f22]">
                  <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-[#5865F2] to-[#23a55a]" />
                </div>
                <p className="mt-1 text-[10px] text-[#949ba4]">29 of 32 channels covered</p>
              </div>

              <div className="rounded-[10px] bg-[#2b2d31] p-3 border border-white/5">
                <div className="flex items-center justify-between text-[#949ba4] text-[11px]">
                  <span>Empty Channels</span>
                  <span className="size-2 rounded-full bg-[#dc2626] animate-pulse" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-[#f87171]">3</p>
                <p className="text-[10px] text-[#f87171]">Require immediate attention</p>
              </div>

              <div className="rounded-[10px] bg-[#2b2d31] p-3 border border-white/5">
                <div className="flex items-center justify-between text-[#949ba4] text-[11px]">
                  <span>Total Hours Worked</span>
                  <ClockIcon size={14} className="text-[#ca8a04]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-white">8327.5 h</p>
                <p className="text-[10px] text-[#ca8a04]">348.3 h Overtime</p>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setChannelFilter("all")}
                className={`rounded-full px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                  channelFilter === "all"
                    ? "bg-white text-black font-semibold"
                    : "bg-[#2b2d31] text-[#949ba4] hover:text-white"
                }`}
              >
                All Channels (32)
              </button>
              <button
                type="button"
                onClick={() => setChannelFilter("active")}
                className={`rounded-full px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                  channelFilter === "active"
                    ? "bg-[#23a55a] text-white font-semibold"
                    : "bg-[#2b2d31] text-[#949ba4] hover:text-white"
                }`}
              >
                Active (29)
              </button>
              <button
                type="button"
                onClick={() => setChannelFilter("empty")}
                className={`rounded-full px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                  channelFilter === "empty"
                    ? "bg-[#dc2626] text-white font-semibold"
                    : "bg-[#2b2d31] text-[#949ba4] hover:text-white"
                }`}
              >
                Empty (3)
              </button>
              <button
                type="button"
                onClick={() => setChannelFilter("overtime")}
                className={`rounded-full px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                  channelFilter === "overtime"
                    ? "bg-[#ca8a04] text-white font-semibold"
                    : "bg-[#2b2d31] text-[#949ba4] hover:text-white"
                }`}
              >
                Overtime (0)
              </button>
            </div>

            {/* Live Model Status Channel Cards (matching Screenshot 1) */}
            <div className="grid gap-2.5 sm:grid-cols-3">
              {(channelFilter === "all" || channelFilter === "active") && (
                <div className="rounded-[8px] bg-[#2b2d31] p-3 border border-[#23a55a]/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white"># ☀️ cico ☀️</span>
                    <span className="rounded bg-[#23a55a]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#23a55a]">
                      ACTIVE
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-[#dbdee1]">Worker: <strong className="text-white">@Alex_Staff</strong></span>
                    <span className="font-mono text-[10px] text-[#949ba4]">CI: 00:37 (36m)</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between border-t border-[#35373c] pt-2 text-[10px] text-[#949ba4]">
                    <span className="inline-flex items-center gap-1 rounded bg-[#35373c] px-2 py-0.5 text-white">
                      <TagIcon size={11} /> Tag worker
                    </span>
                    <span className="text-[#23a55a]">1 worker(s) active</span>
                  </div>
                </div>
              )}

              {(channelFilter === "all" || channelFilter === "empty") && (
                <div className="rounded-[8px] bg-[#2b2d31] p-3 border border-[#dc2626]/40 bg-[#dc2626]/5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white"># 🌸 cico 🌸</span>
                    <span className="rounded bg-[#dc2626]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#f87171]">
                      EMPTY
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#f87171] font-medium">No active worker</p>
                  <p className="text-[11px] text-[#949ba4]">Waiting for check-in</p>
                  <div className="mt-2.5 flex items-center justify-between border-t border-[#35373c] pt-2 text-[10px]">
                    <span className="inline-flex items-center gap-1 rounded bg-[#35373c] px-2 py-0.5 text-[#dbdee1]">
                      <TagIcon size={11} /> Tag worker
                    </span>
                    <span className="text-[#f87171] font-semibold">⚠️ Requires attention</span>
                  </div>
                </div>
              )}

              {(channelFilter === "all" || channelFilter === "active") && (
                <div className="rounded-[8px] bg-[#2b2d31] p-3 border border-[#23a55a]/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white"># ☕ cico ☕</span>
                    <span className="rounded bg-[#23a55a]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#23a55a]">
                      ACTIVE
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-[#dbdee1]">Worker: <strong className="text-white">@Kira_Ops</strong></span>
                    <span className="font-mono text-[10px] text-[#949ba4]">CI: 00:41 (32m)</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between border-t border-[#35373c] pt-2 text-[10px] text-[#949ba4]">
                    <span className="inline-flex items-center gap-1 rounded bg-[#35373c] px-2 py-0.5 text-white">
                      <TagIcon size={11} /> Tag worker
                    </span>
                    <span className="text-[#23a55a]">1 worker(s) active</span>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Analytics Row: Bar Chart + Trend Lines (from Screenshot 1) */}
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Overtime vs Late Shifts Bar Chart */}
              <div className="rounded-[8px] bg-[#2b2d31] p-3 text-xs border border-white/5">
                <div className="flex items-center justify-between text-[#949ba4]">
                  <span className="font-semibold text-white">Shift Distribution</span>
                  <div className="flex items-center gap-3 font-mono text-[10px]">
                    <span className="flex items-center gap-1 text-[#a855f7]">
                      <span className="size-2 rounded-sm bg-[#a855f7]" /> Overtime
                    </span>
                    <span className="flex items-center gap-1 text-[#f59e0b]">
                      <span className="size-2 rounded-sm bg-[#f59e0b]" /> Late
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-end justify-around h-24 px-4 border-b border-[#35373c] pb-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-1.5 items-end h-20">
                      <div className="w-5 bg-[#a855f7] rounded-t h-16" title="Noon Overtime: 8" />
                      <div className="w-5 bg-[#f59e0b] rounded-t h-3" title="Noon Late: 1" />
                    </div>
                    <span className="font-mono text-[10px] text-[#949ba4]">Noon</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-1.5 items-end h-20">
                      <div className="w-5 bg-[#a855f7] rounded-t h-20" title="Main Overtime: 12" />
                      <div className="w-5 bg-[#f59e0b] rounded-t h-5" title="Main Late: 2" />
                    </div>
                    <span className="font-mono text-[10px] text-[#949ba4]">Main</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-1.5 items-end h-20">
                      <div className="w-5 bg-[#a855f7] rounded-t h-12" title="Grave Overtime: 6" />
                      <div className="w-5 bg-[#f59e0b] rounded-t h-2" title="Grave Late: 1" />
                    </div>
                    <span className="font-mono text-[10px] text-[#949ba4]">Grave</span>
                  </div>
                </div>
              </div>

              {/* Daily Trend Curve */}
              <div className="rounded-[8px] bg-[#2b2d31] p-3 text-xs border border-white/5">
                <div className="flex items-center justify-between text-[#949ba4]">
                  <span className="font-semibold text-white">Daily Completed Shifts Trend</span>
                  <span className="font-mono text-[10px] text-[#38bdf8]">05.10 — 09.10.2026</span>
                </div>
                <div className="mt-3 h-24 w-full flex items-center justify-center">
                  <svg viewBox="0 0 240 70" className="h-full w-full overflow-visible">
                    <polyline
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      points="10,45 60,32 110,38 160,25 210,30"
                    />
                    <polyline
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                      points="10,58 60,52 110,48 160,54 210,46"
                    />
                    <circle cx="10" cy="45" r="3" fill="#38bdf8" />
                    <circle cx="60" cy="32" r="3" fill="#38bdf8" />
                    <circle cx="110" cy="38" r="3" fill="#38bdf8" />
                    <circle cx="160" cy="25" r="3" fill="#38bdf8" />
                    <circle cx="210" cy="30" r="3" fill="#38bdf8" />
                  </svg>
                </div>
                <div className="flex justify-between font-mono text-[9px] text-[#949ba4] px-2">
                  <span>05.10</span>
                  <span>06.10</span>
                  <span>07.10</span>
                  <span>08.10</span>
                  <span>09.10</span>
                </div>
              </div>
            </div>

            {/* Tracking Table (Matching Screenshot 1) */}
            <div className="overflow-x-auto rounded-[8px] bg-[#2b2d31] p-3 border border-white/5">
              <p className="font-semibold text-white text-xs mb-2">Shift Punctuality &amp; Penalty Tracking</p>
              <table className="w-full text-left font-mono text-[11px] text-[#dbdee1]">
                <thead>
                  <tr className="border-b border-[#35373c] text-[#949ba4]">
                    <th className="pb-2 font-normal">Work Days</th>
                    <th className="pb-2 font-normal">On-Time (daily)</th>
                    <th className="pb-2 font-normal">On-Time &amp; Minor Delay (15m)</th>
                    <th className="pb-2 font-normal">Penalty Flags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#35373c]">
                  <tr>
                    <td className="py-2 text-white">13 days <span className="text-[#949ba4]">(36 ci total)</span></td>
                    <td className="py-2"><span className="rounded bg-[#23a55a]/20 px-1.5 py-0.5 text-[#23a55a]">12</span></td>
                    <td className="py-2"><span className="rounded bg-[#5865F2]/20 px-1.5 py-0.5 text-[#c9cdfb]">34 ci</span></td>
                    <td className="py-2"><span className="rounded bg-[#dc2626]/20 px-1.5 py-0.5 text-[#f87171]">1 flag</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white">12 days <span className="text-[#949ba4]">(32 ci total)</span></td>
                    <td className="py-2"><span className="rounded bg-[#23a55a]/20 px-1.5 py-0.5 text-[#23a55a]">12</span></td>
                    <td className="py-2"><span className="rounded bg-[#5865F2]/20 px-1.5 py-0.5 text-[#c9cdfb]">32 ci</span></td>
                    <td className="py-2"><span className="rounded bg-white/10 px-1.5 py-0.5 text-[#949ba4]">0 flags</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SHIFT COVERAGE EMBED (From Screenshot 2) ================= */}
        {activeTab === "status" && (
          <div className="space-y-3">
            <div className="rounded-[8px] bg-[#2b2d31] p-4 text-xs border-l-4 border-l-[#ca8a04] leading-relaxed">
              <h4 className="font-bold text-white text-[14px]">
                📋 Current Shift Status — Noon (17:00 - 01:00)
              </h4>
              <p className="mt-1 font-mono text-[#949ba4]">
                Total channels: <strong className="text-white">30</strong> | Covered:{" "}
                <strong className="text-[#23a55a]">29</strong> | Empty:{" "}
                <strong className="text-[#f87171]">1</strong>
              </p>

              {/* Group 1/3 */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => toggleSection("s1")}
                  className="flex w-full items-center justify-between text-left font-semibold text-white cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#23a55a]">🟢</span>
                    <span>Active &amp; Overtime Workers (29) (1/3)</span>
                  </span>
                  {expandedSections.s1 ? <CaretDownIcon size={14} /> : <CaretRightIcon size={14} />}
                </button>
                {expandedSections.s1 && (
                  <ul className="mt-2 space-y-1 pl-5 font-mono text-[11px] text-[#dbdee1]">
                    <li># cico-test → <span className="text-[#c9cdfb]">@Alex_Staff</span> (4h 13m)</li>
                    <li># ☀️ cico ☀️ → <span className="text-[#c9cdfb]">@Kira_Ops</span> (4h 14m)</li>
                    <li># ☕ cico ☕ → <span className="text-[#c9cdfb]">@Vesper_Staff</span> (3h 42m)</li>
                    <li># ☕ cico ☕ → <span className="text-[#c9cdfb]">@Jordan_Chat</span> (4h 19m)</li>
                    <li># ⚜️ cico ⚜️ → <span className="text-[#c9cdfb]">@Morgan_Ops</span> (4h 5m)</li>
                    <li># ⚡ cico ⚡ → <span className="text-[#c9cdfb]">@Taylor_Staff</span> (4h 11m)</li>
                    <li># 💖 cico 💖 → <span className="text-[#c9cdfb]">@Casey_Agent</span> (4h 22m)</li>
                    <li># 🌅 cico 🌅 → <span className="text-[#c9cdfb]">@Sam_Staff</span> (4h 29m)</li>
                    <li># 🌴 cico 🌴 → <span className="text-[#c9cdfb]">@Riley_Ops</span> (4h 22m)</li>
                    <li># 🍇 cico 🍇 → <span className="text-[#c9cdfb]">@Dakota_Chat</span> (3h 42m)</li>
                    <li># 🍃 cico 🍃 → <span className="text-[#c9cdfb]">@Avery_Staff</span> (4h 19m)</li>
                    <li># 🍆 cico 🍆 → <span className="text-[#c9cdfb]">@Quinn_Agent</span> (4h 5m)</li>
                    <li># 🍓 cico 🍓 → <span className="text-[#c9cdfb]">@Cameron_Ops</span> (4h 21m)</li>
                  </ul>
                )}
              </div>

              {/* Group 2/3 */}
              <div className="mt-3 border-t border-[#35373c] pt-2">
                <button
                  type="button"
                  onClick={() => toggleSection("s2")}
                  className="flex w-full items-center justify-between text-left font-semibold text-white cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#23a55a]">🟢</span>
                    <span>Active &amp; Overtime Workers (29) (2/3)</span>
                  </span>
                  {expandedSections.s2 ? <CaretDownIcon size={14} /> : <CaretRightIcon size={14} />}
                </button>
                {expandedSections.s2 && (
                  <ul className="mt-2 space-y-1 pl-5 font-mono text-[11px] text-[#dbdee1]">
                    <li># 🍙 cico 🍙 → <span className="text-[#c9cdfb]">@Reese_Staff</span> (4h 5m)</li>
                    <li># 🍧 cico 🍧 → <span className="text-[#c9cdfb]">@Finley_Agent</span> (4h 14m)</li>
                    <li># 🏙️ cico 🏙️ → <span className="text-[#c9cdfb]">@Rowan_Staff</span> (4h 11m)</li>
                    <li># 🦄 cico 🦄 → <span className="text-[#c9cdfb]">@Hayden_Ops</span> (4h 10m)</li>
                    <li># 🦄 cico 🦄 → <span className="text-[#c9cdfb]">@Emerson_Chat</span> (4h 20m)</li>
                    <li># 🐞 cico 🐞 → <span className="text-[#c9cdfb]">@Peyton_Staff</span> (4h 21m)</li>
                    <li># 🐞 cico 🐞 → <span className="text-[#c9cdfb]">@Logan_Ops</span> (4h 23m)</li>
                    <li># 🐥 cico 🐥 → <span className="text-[#c9cdfb]">@Skyler_Agent</span> (4h 20m)</li>
                    <li># 🦜 cico 🦜 → <span className="text-[#c9cdfb]">@Jamie_Staff</span> (4h 21m)</li>
                    <li># 🦅 cico 🦅 → <span className="text-[#c9cdfb]">@Drew_Chat</span> (4h 20m)</li>
                  </ul>
                )}
              </div>

              {/* Group 3/3 */}
              <div className="mt-3 border-t border-[#35373c] pt-2">
                <button
                  type="button"
                  onClick={() => toggleSection("s3")}
                  className="flex w-full items-center justify-between text-left font-semibold text-white cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#23a55a]">🟢</span>
                    <span>Active &amp; Overtime Workers (29) (3/3)</span>
                  </span>
                  {expandedSections.s3 ? <CaretDownIcon size={14} /> : <CaretRightIcon size={14} />}
                </button>
                {expandedSections.s3 && (
                  <ul className="mt-2 space-y-1 pl-5 font-mono text-[11px] text-[#dbdee1]">
                    <li># 💂 cico 💂 → <span className="text-[#c9cdfb]">@Kendall_Staff</span> (4h 20m)</li>
                    <li># 🐉 cico 🐉 → <span className="text-[#c9cdfb]">@Harley_Agent</span> (4h 14m)</li>
                    <li># 🥒 cico 🥒 → <span className="text-[#c9cdfb]">@Devon_Staff</span> (4h 25m)</li>
                    <li># 🥜 cico 🥜 → <span className="text-[#c9cdfb]">@Dallas_Ops</span> (4h 10m)</li>
                    <li># 🧬 cico 🧬 → <span className="text-[#c9cdfb]">@Shiloh_Chat</span> (3h 59m)</li>
                    <li># 🪷 cico 🪷 → <span className="text-[#c9cdfb]">@Milan_Staff</span> (4h 17m)</li>
                    <li># 🪽 cico 🪽 → <span className="text-[#c9cdfb]">@Jules_Agent</span> (4h 10m)</li>
                    <li># 🫧 cico 🫧 → <span className="text-[#c9cdfb]">@Eden_Staff</span> (4h 10m)</li>
                  </ul>
                )}
              </div>

              {/* Uncovered Channels Section (from Screenshot 2) */}
              <div className="mt-3 border-t border-[#35373c] pt-2.5">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <span className="text-[#dc2626]">🔴</span>
                  <span>Uncovered Channels (1)</span>
                </p>
                <p className="mt-1 pl-5 font-mono text-[11px] text-[#f87171]">
                  # 🗼 cico 🗼 (Paris Model) — <em>No one is clocked in!</em>
                </p>
              </div>

              <p className="mt-3 text-[10px] text-[#80848e] font-mono">10/11/2026 20:58</p>
            </div>
          </div>
        )}
      </div>

      {/* Live Activity Audit Feed */}
      <div className="border-t border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-[11px] text-[#949ba4]">
        <div className="flex items-center justify-between text-xs font-semibold text-[#dbdee1]">
          <span>SQLite WAL Shift Journal</span>
          <span className="text-[10px] text-[#22e273]">Multi-Model Sync Active</span>
        </div>
        <ul className="mt-1.5 space-y-1">
          {logs.map((l, i) => (
            <li key={i} className="truncate">
              • [{l.time}] @{l.user} ran <code className="text-white">{l.cmd}</code> {l.reaction} →{" "}
              <span className="text-[#dbdee1]">{l.statusText}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
