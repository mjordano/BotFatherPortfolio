"use client";

import {
  ArrowClockwiseIcon,
  CheckSquareIcon,
  EnvelopeIcon,
  HardDrivesIcon,
  LightningIcon,
  TableIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type SheetRow = {
  model: string;
  tag: string;
  tagColor: "orange" | "blue";
  active: boolean;
  dailyGoal: number;
  days: (number | null)[];
  gross: number;
  net: number;
  projection: number;
  goal: number;
};

const INITIAL_ROWS: SheetRow[] = [
  {
    model: "Model Nova",
    tag: "CLOUDY",
    tagColor: "blue",
    active: true,
    dailyGoal: 500,
    days: [412, 582, 310, 890, 620, 1420, 980, 410, 520, 680, 1150, 840, 290, 480],
    gross: 43118.82,
    net: 34495.05,
    projection: 50000.0,
    goal: 45000.0,
  },
  {
    model: "Model Scarlett",
    tag: "LINKLOCK",
    tagColor: "orange",
    active: true,
    dailyGoal: 150,
    days: [114, 85, 95, 230, 180, 410, 15, 32, 28, 45, 12, 18, 90, 140],
    gross: 18197.14,
    net: 14557.71,
    projection: 22000.0,
    goal: 20000.0,
  },
  {
    model: "Model Ivy",
    tag: "CLOUDY",
    tagColor: "blue",
    active: true,
    dailyGoal: 1000,
    days: [850, 1240, 920, 1480, 1620, 2150, 1840, 920, 810, 1120, 1450, 1780, 1620, 1940],
    gross: 68140.5,
    net: 54512.4,
    projection: 85000.0,
    goal: 75000.0,
  },
  {
    model: "Model Luna",
    tag: "CLOUDY",
    tagColor: "blue",
    active: true,
    dailyGoal: 40,
    days: [18, 24, null, 15, 28, null, 42, 18, 22, 14, 30, null, 16, 25],
    gross: 4120.0,
    net: 3296.0,
    projection: 5500.0,
    goal: 5000.0,
  },
  {
    model: "Model Aurora",
    tag: "CLOUDY",
    tagColor: "blue",
    active: true,
    dailyGoal: 350,
    days: [280, 310, 420, 180, 240, 390, 450, 520, 480, 610, 380, 290, 340, 410],
    gross: 24350.2,
    net: 19480.16,
    projection: 30000.0,
    goal: 28000.0,
  },
  {
    model: "Model Chloe",
    tag: "LINKLOCK",
    tagColor: "orange",
    active: true,
    dailyGoal: 50,
    days: [38, 42, 55, 28, null, 18, 35, 40, null, 25, 30, 45, 50, 38],
    gross: 5480.0,
    net: 4384.0,
    projection: 7000.0,
    goal: 6000.0,
  },
];

export function RevTrackDemo() {
  const [packetStep, setPacketStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"visual" | "table">("visual");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (!isProcessing) return;
    const interval = setInterval(() => {
      setPacketStep((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, [isProcessing]);

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#2b2d31] bg-[#141517] text-[#dbdee1] shadow-[0_30px_90px_-35px_rgb(0_0_0/0.8)]">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-xs text-[#949ba4]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("visual")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "visual"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <LightningIcon size={14} className="text-[#22e273]" aria-hidden="true" />
            <span>Pipeline Architecture</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "table"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <TableIcon size={14} className="text-[#38bdf8]" aria-hidden="true" />
            <span>Master Spreadsheet Heatmap</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsProcessing(!isProcessing)}
            className="flex items-center gap-1 text-[11px] font-mono text-muted hover:text-white cursor-pointer"
          >
            <ArrowClockwiseIcon size={13} className={isProcessing ? "animate-spin" : ""} />
            <span>{isProcessing ? "Live Pipeline Active" : "Paused"}</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="p-4 sm:p-5">
        {activeTab === "visual" ? (
          /* ================= PIXEL ART WORKFLOW ANIMATION ================= */
          <div className="space-y-4">
            {/* Retro Pixel Canvas Container */}
            <div className="relative overflow-hidden rounded-[10px] border-2 border-[#2b2d31] bg-[#0c0d0f] p-4 sm:p-6 font-mono select-none">
              {/* Scanline & Grid Effect */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(#22e273 1px, transparent 1px), linear-gradient(to right, #22e273 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Title Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#232428] pb-3 text-xs">
                <span className="text-[#22e273] font-bold tracking-wider">
                  [REVTRACK_DATAFLOW_ENGINE]
                </span>
                <span className="text-[10px] text-[#6d6f78]">
                  INGESTING MULTI-AGENCY .XLSX REPORTS &rarr; BLACKBOX &rarr; MASTER GOOGLE SHEET
                </span>
              </div>

              {/* 3-Stage Diagram with Explicit Pixel Arrows */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                {/* 1. STAGE 1: MULTIPLE AGENCY EMAILS (All in .xlsx) */}
                <div className="lg:col-span-3 space-y-2.5">
                  <div className="text-[11px] font-bold text-[#f59e0b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <EnvelopeIcon size={14} weight="fill" />
                    <span>Agency Emails (.xlsx)</span>
                  </div>

                  {/* Agency Email 1 */}
                  <div
                    className={`rounded border-2 p-2.5 text-[11px] transition-all relative ${
                      packetStep === 0
                        ? "border-[#f59e0b] bg-[#f59e0b]/10 text-white shadow-[0_0_12px_rgb(245_158_11/0.3)] scale-[1.02]"
                        : "border-[#2b2d31] bg-[#141517] text-[#949ba4]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>✉ Agency Alpha</span>
                      <span className="rounded bg-[#22e273]/20 px-1 py-0.2 text-[9px] font-mono text-[#22e273]">
                        .XLSX
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] truncate text-[#6d6f78]">
                      alpha_revenue_settlement.xlsx
                    </p>
                  </div>

                  {/* Agency Email 2 */}
                  <div
                    className={`rounded border-2 p-2.5 text-[11px] transition-all relative ${
                      packetStep === 1
                        ? "border-[#f59e0b] bg-[#f59e0b]/10 text-white shadow-[0_0_12px_rgb(245_158_11/0.3)] scale-[1.02]"
                        : "border-[#2b2d31] bg-[#141517] text-[#949ba4]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>✉ Agency Beta</span>
                      <span className="rounded bg-[#22e273]/20 px-1 py-0.2 text-[9px] font-mono text-[#22e273]">
                        .XLSX
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] truncate text-[#6d6f78]">
                      beta_daily_statement.xlsx
                    </p>
                  </div>

                  {/* Agency Email 3 */}
                  <div
                    className={`rounded border-2 p-2.5 text-[11px] transition-all relative ${
                      packetStep === 2
                        ? "border-[#f59e0b] bg-[#f59e0b]/10 text-white shadow-[0_0_12px_rgb(245_158_11/0.3)] scale-[1.02]"
                        : "border-[#2b2d31] bg-[#141517] text-[#949ba4]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>✉ Agency Gamma</span>
                      <span className="rounded bg-[#22e273]/20 px-1 py-0.2 text-[9px] font-mono text-[#22e273]">
                        .XLSX
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] truncate text-[#6d6f78]">
                      gamma_master_payouts.xlsx
                    </p>
                  </div>
                </div>

                {/* Animated Arrow Connector 1: Emails -> Black Box */}
                <div className="lg:col-span-1 flex lg:flex-col items-center justify-center py-2 lg:py-0">
                  <div className="flex items-center lg:flex-col gap-1.5 text-[#22e273]">
                    <div className="h-0.5 w-6 lg:h-6 lg:w-0.5 bg-[#22e273]/40" />
                    <span className="font-mono text-xs font-black animate-pulse text-[#22e273]">
                      ▶▶
                    </span>
                    <div className="h-0.5 w-6 lg:h-6 lg:w-0.5 bg-[#22e273]/40" />
                  </div>
                </div>

                {/* 2. STAGE 2: THE BLACK BOX ENGINE (Center) */}
                <div className="lg:col-span-4">
                  <div className="relative rounded-[8px] border-2 border-[#22e273] bg-[#0f1114] p-4 text-xs shadow-[0_0_25px_rgb(34_226_115/0.2)]">
                    {/* Retro Terminal Header */}
                    <div className="flex items-center justify-between border-b border-[#232428] pb-2 text-[10px] text-[#22e273] font-bold">
                      <span className="flex items-center gap-1.5">
                        <HardDrivesIcon size={14} weight="bold" />
                        <span>BLACKBOX ENGINE</span>
                      </span>
                      <span className="size-2 rounded-full bg-[#22e273] animate-ping" />
                    </div>

                    {/* Black Box Animated Workload Display */}
                    <div className="mt-3 space-y-1.5 text-[11px]">
                      <div className="rounded bg-[#1a1b1e] p-2 border border-[#2b2d31]">
                        <p className="text-[10px] text-[#949ba4]">PROCESSING WORKFLOW:</p>
                        <p className="text-white font-bold truncate">
                          {packetStep === 0 && "Parsing Agency Alpha .xlsx Worksheets"}
                          {packetStep === 1 && "Cleaning Agency Beta Schema & Dates"}
                          {packetStep === 2 && "Computing Net Revenue & Goal Deltas"}
                          {packetStep === 3 && "Reconciling Daily Pacing & Projection"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        <div className="rounded bg-[#141517] p-1.5 text-[#22e273] border border-white/5">
                          ✓ Gross Extraction
                        </div>
                        <div className="rounded bg-[#141517] p-1.5 text-[#38bdf8] border border-white/5">
                          ✓ Net Revenue Split
                        </div>
                        <div className="rounded bg-[#141517] p-1.5 text-[#f59e0b] border border-white/5">
                          ✓ Daily Goal Pacing
                        </div>
                        <div className="rounded bg-[#141517] p-1.5 text-[#a855f7] border border-white/5">
                          ✓ Projection Engine
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-[#232428] pt-2 text-[9px] text-[#6d6f78]">
                      <span>ENGINE: PYTHON / OPENPYXL</span>
                      <span className="text-[#22e273]">DISPATCH: &lt;350ms</span>
                    </div>
                  </div>
                </div>

                {/* Animated Arrow Connector 2: Black Box -> Master Sheet */}
                <div className="lg:col-span-1 flex lg:flex-col items-center justify-center py-2 lg:py-0">
                  <div className="flex items-center lg:flex-col gap-1.5 text-[#38bdf8]">
                    <div className="h-0.5 w-6 lg:h-6 lg:w-0.5 bg-[#38bdf8]/40" />
                    <span className="font-mono text-xs font-black animate-pulse text-[#38bdf8]">
                      ▶▶
                    </span>
                    <div className="h-0.5 w-6 lg:h-6 lg:w-0.5 bg-[#38bdf8]/40" />
                  </div>
                </div>

                {/* 3. STAGE 3: UNIFIED MASTER GOOGLE SHEETS (Right) */}
                <div className="lg:col-span-3 space-y-2.5">
                  <div className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <TableIcon size={14} weight="fill" />
                    <span>Master Google Sheet</span>
                  </div>

                  <div className="rounded-[8px] border-2 border-[#38bdf8]/40 bg-[#141517] p-3 text-xs shadow-md">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white">
                      <span>Master Dashboard</span>
                      <span className="rounded bg-[#22e273]/20 px-1 py-0.5 text-[9px] font-bold text-[#22e273]">
                        LIVE SYNC
                      </span>
                    </div>

                    <div className="mt-2.5 space-y-1 font-mono text-[10px]">
                      <div className="flex justify-between border-b border-[#232428] pb-1">
                        <span className="text-[#949ba4]">Total Models:</span>
                        <span className="text-white font-bold">18 Active</span>
                      </div>
                      <div className="flex justify-between border-b border-[#232428] pb-1">
                        <span className="text-[#949ba4]">Total Gross:</span>
                        <span className="text-[#22e273] font-bold">$163,336.66</span>
                      </div>
                      <div className="flex justify-between border-b border-[#232428] pb-1">
                        <span className="text-[#949ba4]">Total Net:</span>
                        <span className="text-[#38bdf8] font-bold">$130,669.33</span>
                      </div>
                      <div className="flex justify-between pt-0.5">
                        <span className="text-[#949ba4]">Projection Goal:</span>
                        <span className="text-[#f59e0b] font-bold">$185,000.00</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab("table")}
                    className="w-full flex items-center justify-center gap-1.5 rounded bg-[#35373c] hover:bg-[#4e5058] text-white py-1.5 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    <span>View Reconciled Heatmap</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ================= INTERACTIVE MASTER SPREADSHEET HEATMAP ================= */}
        {activeTab === "table" || activeTab === "visual" ? (
          <div className="mt-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-[13px]">
                  Master Financial Table (Daily Goal Pacing)
                </span>
                <span className="rounded bg-[#22e273]/20 px-2 py-0.5 font-mono text-[10px] text-[#22e273]">
                  Synchronized
                </span>
              </div>

              {/* Exact Color Legend requested by user */}
              <div className="flex items-center gap-3 font-mono text-[10px] text-[#949ba4]">
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-sm bg-[#22c55e]" /> Met Goal (100%+)
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-sm bg-[#eab308]" /> Near Goal (65%–99%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-sm bg-[#ef4444]" /> Below Goal (&lt;65%)
                </span>
              </div>
            </div>

            {/* Google Sheets Table Recreated */}
            <div className="overflow-x-auto rounded-[8px] border border-[#2b2d31] bg-black">
              <table className="w-full text-left font-mono text-[11px] text-[#dbdee1] border-collapse">
                <thead>
                  <tr className="bg-[#141517] border-b border-[#2b2d31] text-[#949ba4] text-[10px] uppercase">
                    <th className="p-2 border-r border-[#2b2d31]">TEAM / MODEL</th>
                    <th className="p-2 border-r border-[#2b2d31]">PLATFORM</th>
                    <th className="p-2 border-r border-[#2b2d31] text-center">ST</th>
                    <th className="p-2 border-r border-[#2b2d31] text-right font-bold text-[#949ba4]">
                      DAILY GOAL
                    </th>
                    {/* Days 1 to 14 Heatmap Headers */}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <th
                        key={i}
                        className="p-1.5 text-center border-r border-[#2b2d31] min-w-[50px] font-normal"
                      >
                        D{i + 1}
                      </th>
                    ))}
                    <th className="p-2 border-r border-[#2b2d31] text-right font-bold text-white">
                      GROSS ($)
                    </th>
                    <th className="p-2 border-r border-[#2b2d31] text-right font-bold text-[#22e273]">
                      NET ($)
                    </th>
                    <th className="p-2 border-r border-[#2b2d31] text-right font-bold text-[#38bdf8]">
                      PROJECTION ($)
                    </th>
                    <th className="p-2 border-r border-[#2b2d31] text-right font-bold text-[#f59e0b]">
                      GOAL ($)
                    </th>
                    <th className="p-2 text-right font-bold text-[#dbdee1]">
                      % TO GOAL
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232428]">
                  {INITIAL_ROWS.map((row) => {
                    const pct = Math.round((row.gross / row.goal) * 100);
                    return (
                      <tr key={row.model} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-2 font-bold text-white border-r border-[#2b2d31] whitespace-nowrap">
                          {row.model}
                        </td>
                        <td className="p-2 border-r border-[#2b2d31] whitespace-nowrap">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                              row.tagColor === "orange"
                                ? "bg-[#f59e0b] text-black"
                                : "bg-[#38bdf8] text-black"
                            }`}
                          >
                            {row.tag}
                          </span>
                        </td>
                        <td className="p-2 border-r border-[#2b2d31] text-center">
                          <CheckSquareIcon size={14} weight="fill" className="text-[#22e273] inline" />
                        </td>
                        <td className="p-2 border-r border-[#2b2d31] text-right text-[#949ba4] whitespace-nowrap">
                          ${row.dailyGoal}
                        </td>

                        {/* Daily Heatmap Cells based on closeness to dailyGoal */}
                        {row.days.map((val, idx) => {
                          let bgClass = "bg-transparent text-[#4e5058]";
                          if (val !== null) {
                            const ratio = val / row.dailyGoal;
                            if (ratio >= 1.0) {
                              bgClass = "bg-[#22c55e]/30 text-[#4ade80] font-semibold";
                            } else if (ratio >= 0.65) {
                              bgClass = "bg-[#eab308]/25 text-[#facc15]";
                            } else {
                              bgClass = "bg-[#ef4444]/25 text-[#f87171]";
                            }
                          }

                          return (
                            <td
                              key={idx}
                              className={`p-1 text-center border-r border-[#2b2d31]/50 text-[10px] ${bgClass}`}
                            >
                              {val !== null ? `$${val}` : "—"}
                            </td>
                          );
                        })}

                        <td className="p-2 border-r border-[#2b2d31] text-right font-bold text-white whitespace-nowrap">
                          ${row.gross.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-2 border-r border-[#2b2d31] text-right font-bold text-[#22e273] whitespace-nowrap">
                          ${row.net.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-2 border-r border-[#2b2d31] text-right font-bold text-[#38bdf8] whitespace-nowrap">
                          ${row.projection.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-2 border-r border-[#2b2d31] text-right font-bold text-[#f59e0b] whitespace-nowrap">
                          ${row.goal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-2 text-right whitespace-nowrap">
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              pct >= 100
                                ? "bg-[#22c55e]/20 text-[#4ade80]"
                                : pct >= 80
                                  ? "bg-[#eab308]/20 text-[#facc15]"
                                  : "bg-[#ef4444]/20 text-[#f87171]"
                            }`}
                          >
                            {pct}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer Info */}
      <div className="border-t border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-[11px] text-[#949ba4]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#22e273]" />
            <span className="text-[#dbdee1]">Multi-Agency .XLSX Ingestion</span>
            <span className="text-[#6d6f78]">•</span>
            <span>Daily Goal Delta Engine</span>
            <span className="text-[#6d6f78]">•</span>
            <span>Google Sheets Master Sync</span>
          </div>
          <span className="text-[10px] text-faint">Automated Financial Pipeline</span>
        </div>
      </div>
    </div>
  );
}
