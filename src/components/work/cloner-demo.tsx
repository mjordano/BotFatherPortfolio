"use client";

import {
  ArrowsClockwiseIcon,
  CheckCircleIcon,
  CheckIcon,
  CopyIcon,
  FolderIcon,
  HashIcon,
  LockIcon,
  PlayIcon,
  ShieldCheckIcon,
  SpeakerHighIcon,
  TerminalWindowIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

type SyncStep = "idle" | "purging" | "roles" | "channels" | "permissions" | "emojis" | "completed";

interface RoleItem {
  id: string;
  name: string;
  color: string;
  hoist: boolean;
  isAdmin?: boolean;
}

interface ChannelItem {
  id: string;
  name: string;
  type: "category" | "text" | "voice" | "announcement";
  private?: boolean;
  bitrate?: string;
  topic?: string;
}

const ROLES: RoleItem[] = [
  { id: "r1", name: "👑 Executive", color: "#a855f7", hoist: true, isAdmin: true },
  { id: "r2", name: "⚡ Shift Lead", color: "#06b6d4", hoist: true },
  { id: "r3", name: "💬 Chatter Staff", color: "#22c55e", hoist: true },
  { id: "r4", name: "🐣 Trainee", color: "#f59e0b", hoist: false },
];

const CHANNELS: ChannelItem[] = [
  { id: "c1", name: "📋 ONBOARDING", type: "category" },
  { id: "c2", name: "welcome-and-rules", type: "text", topic: "Agency onboarding guidelines" },
  { id: "c3", name: "announcements", type: "announcement" },
  { id: "c4", name: "💬 CHATTER OPERATIONS", type: "category" },
  { id: "c5", name: "shift-cico", type: "text", topic: "Staff clock-in / clock-out logging" },
  { id: "c6", name: "voice-room-alpha", type: "voice", bitrate: "96kbps" },
  { id: "c7", name: "🔒 MANAGEMENT VAULT", type: "category", private: true },
  { id: "c8", name: "vip-contracts", type: "text", private: true, topic: "Restricted to Executive" },
];

const EMOJIS = [
  { name: ":agency_fire:", emoji: "🔥" },
  { name: ":verified_lead:", emoji: "💎" },
  { name: ":shift_active:", emoji: "⚡" },
  { name: ":cash_payout:", emoji: "💰" },
];

const STEP_PROGRESS: Record<SyncStep, number> = {
  idle: 0,
  purging: 15,
  roles: 40,
  channels: 68,
  permissions: 85,
  emojis: 95,
  completed: 100,
};

export function ClonerDemo() {
  const [activeTab, setActiveTab] = useState<"visual" | "terminal" | "safety">("visual");
  const [currentStep, setCurrentStep] = useState<SyncStep>("idle");
  const [copiedLog, setCopiedLog] = useState(false);
  const [logs, setLogs] = useState<Array<{ time: string; level: string; msg: string }>>([
    { time: "16:14:00", level: "INFO", msg: "Bot initialized: GuildCloner#8810" },
    { time: "16:14:01", level: "SUCCESS", msg: "Server A (Source): STRICTLY READ-ONLY verified (ReadOnlyViolationError guard active)" },
    { time: "16:14:01", level: "INFO", msg: "Target: Server B [ID: 129482019482] connected with Administrator grant" },
    { time: "16:14:02", level: "READY", msg: "Ready for 1-click replication sequence. Click 'Run 1-Click Clone' to start." },
  ]);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const progress = STEP_PROGRESS[currentStep];

  // Auto-scroll terminal logs
  useEffect(() => {
    if (activeTab === "terminal" && terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, activeTab]);

  // Simulation execution loop
  useEffect(() => {
    if (currentStep === "idle" || currentStep === "completed") return;

    let timer: NodeJS.Timeout;

    if (currentStep === "purging") {
      timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { time: "16:14:03", level: "WARN", msg: "[PURGE] Cleared 3 default placeholder channels on Destination Server" },
          { time: "16:14:03", level: "INFO", msg: "[ROLES] Synchronizing role hierarchy & permission flags..." },
        ]);
        setCurrentStep("roles");
      }, 900);
    } else if (currentStep === "roles") {
      timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { time: "16:14:04", level: "INFO", msg: "Created role 'Executive' (Color: #a855f7, Hoist: True, Admin: True)" },
          { time: "16:14:05", level: "INFO", msg: "Created role 'Shift Lead' (Color: #06b6d4, Hoist: True)" },
          { time: "16:14:05", level: "INFO", msg: "Created role 'Chatter Staff' & 'Trainee' with preserved hierarchy" },
          { time: "16:14:06", level: "INFO", msg: "[CHANNELS] Replicating categories & channel trees..." },
        ]);
        setCurrentStep("channels");
      }, 1000);
    } else if (currentStep === "channels") {
      timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { time: "16:14:07", level: "INFO", msg: "Created category 'ONBOARDING' + 2 text channels" },
          { time: "16:14:07", level: "INFO", msg: "Created voice channel 'voice-room-alpha' [auto-capped to 96kbps tier]" },
          { time: "16:14:08", level: "INFO", msg: "Created category 'MANAGEMENT VAULT' (Private)" },
          { time: "16:14:08", level: "INFO", msg: "[PERMISSIONS] Mapping source permission overwrites to new role IDs..." },
        ]);
        setCurrentStep("permissions");
      }, 1100);
    } else if (currentStep === "permissions") {
      timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { time: "16:14:09", level: "INFO", msg: "Applied 8 granular permission overrides (Executive ONLY for Management Vault)" },
          { time: "16:14:09", level: "INFO", msg: "[ASSETS] Fetching and re-uploading server custom emojis..." },
        ]);
        setCurrentStep("emojis");
      }, 900);
    } else if (currentStep === "emojis") {
      timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { time: "16:14:10", level: "INFO", msg: "Downloaded and uploaded 4/4 custom emojis via Discord API" },
          { time: "16:14:11", level: "SUCCESS", msg: "🎉 Server migration completed with 100% parity in 7.8s!" },
          { time: "16:14:11", level: "SUCCESS", msg: "🛡️ Integrity Audit: 0 write attempts intercepted on Source Server A." },
        ]);
        setCurrentStep("completed");
      }, 900);
    }

    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleStartClone = () => {
    setCurrentStep("purging");
    setLogs((prev) => [
      ...prev,
      { time: "16:14:02", level: "START", msg: ">>> 1-Click Server Clone Initiated (Server A -> Server B)" },
      { time: "16:14:02", level: "INFO", msg: "Asserting Destination permissions and rate-limit guardrails..." },
    ]);
  };

  const handleReset = () => {
    setCurrentStep("idle");
    setLogs([
      { time: "16:14:00", level: "INFO", msg: "Bot initialized: GuildCloner#8810" },
      { time: "16:14:01", level: "SUCCESS", msg: "Server A (Source): STRICTLY READ-ONLY verified (ReadOnlyViolationError guard active)" },
      { time: "16:14:01", level: "INFO", msg: "Target: Server B [ID: 129482019482] connected with Administrator grant" },
      { time: "16:14:02", level: "READY", msg: "Ready for 1-click replication sequence. Click 'Run 1-Click Clone' to start." },
    ]);
  };

  const handleCopyLogs = () => {
    const text = logs.map((l) => `[${l.time}] [${l.level}] ${l.msg}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const isRolesDone = currentStep === "roles" || currentStep === "channels" || currentStep === "permissions" || currentStep === "emojis" || currentStep === "completed";
  const isChannelsDone = currentStep === "channels" || currentStep === "permissions" || currentStep === "emojis" || currentStep === "completed";
  const isPermsDone = currentStep === "permissions" || currentStep === "emojis" || currentStep === "completed";
  const isEmojisDone = currentStep === "emojis" || currentStep === "completed";

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#2b2d31] bg-[#1e1f22] text-[#dbdee1] shadow-[0_30px_90px_-35px_rgb(0_0_0/0.8)]">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-xs text-[#949ba4]">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("visual")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "visual"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <ArrowsClockwiseIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>Guild Visual Sync</span>
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
            <span>CLI Stream</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("safety")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "safety"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <ShieldCheckIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>Safety Architecture</span>
          </button>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3">
          {currentStep === "completed" ? (
            <span className="flex items-center gap-1.5 rounded bg-[#22e273]/15 px-2 py-0.5 text-[11px] font-medium text-[#22e273]">
              <CheckCircleIcon size={14} weight="fill" />
              100% REPLICATED
            </span>
          ) : currentStep !== "idle" ? (
            <span className="flex items-center gap-1.5 rounded bg-[#06b6d4]/15 px-2 py-0.5 text-[11px] font-medium text-[#06b6d4]">
              <span className="size-2 rounded-full bg-[#06b6d4] animate-ping" />
              MIGRATING ({progress}%)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded bg-white/5 px-2 py-0.5 text-[11px] font-medium text-[#949ba4]">
              READY
            </span>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="p-4 sm:p-5">
        {/* TAB 1: VISUAL SYNCHRONIZER */}
        {activeTab === "visual" && (
          <div className="space-y-4">
            {/* Top Pipeline Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#2b2d31] bg-[#141517] p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#5865f2]/20 text-[#5865f2]">
                  <ArrowsClockwiseIcon size={20} className={currentStep !== "idle" && currentStep !== "completed" ? "animate-spin" : ""} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Guild Migration Pipeline</div>
                  <div className="text-[11px] text-[#949ba4]">
                    {currentStep === "idle" && "Ready to replicate Server A hierarchy into Server B"}
                    {currentStep === "purging" && "Step 1/5: Purging existing channels on Server B..."}
                    {currentStep === "roles" && "Step 2/5: Creating role hierarchy & hoisted order..."}
                    {currentStep === "channels" && "Step 3/5: Rebuilding categories, text & voice channels..."}
                    {currentStep === "permissions" && "Step 4/5: Mapping permission overwrites..."}
                    {currentStep === "emojis" && "Step 5/5: Uploading custom server emojis..."}
                    {currentStep === "completed" && "Replication finished successfully with zero write errors!"}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {currentStep === "idle" && (
                  <button
                    type="button"
                    onClick={handleStartClone}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#22e273] px-3.5 py-1.5 text-xs font-semibold text-[#0a1b10] shadow-[0_0_20px_rgb(34_226_115/0.3)] transition-all hover:bg-[#2bf57e] active:scale-95"
                  >
                    <PlayIcon size={14} weight="fill" />
                    <span>Run 1-Click Clone</span>
                  </button>
                )}

                {currentStep !== "idle" && currentStep !== "completed" && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#06b6d4]">Syncing...</span>
                  </div>
                )}

                {currentStep === "completed" && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#3f4147] bg-[#2b2d31] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#35373c]"
                  >
                    <ArrowsClockwiseIcon size={14} />
                    <span>Reset Simulation</span>
                  </button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#2b2d31]">
              <div
                className="h-full bg-gradient-to-r from-[#5865f2] via-[#06b6d4] to-[#22e273] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Side-by-side Guild Comparison */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* SERVER A (SOURCE) */}
              <div className="rounded-xl border border-[#2b2d31] bg-[#18191c] p-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#2b2d31] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-[#5865f2] font-black text-sm text-white shadow-md">
                      HQ
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">Alpha Agency HQ</span>
                        <span className="text-[10px] rounded bg-[#5865f2]/20 px-1 py-0.2 font-mono text-[#5865f2]">
                          SOURCE
                        </span>
                      </div>
                      <div className="text-[11px] text-[#949ba4]">ID: 108492049182 • 420 Members</div>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 rounded bg-[#22e273]/10 px-2 py-0.5 text-[10px] font-mono font-medium text-[#22e273] border border-[#22e273]/20">
                    <ShieldCheckIcon size={12} weight="bold" />
                    READ-ONLY
                  </span>
                </div>

                {/* Roles Showcase */}
                <div className="mt-3.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#949ba4]">
                    Roles & Hierarchy (4)
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {ROLES.map((r) => (
                      <span
                        key={r.id}
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#2b2d31] bg-[#1e1f22] px-2 py-0.5 text-xs font-medium"
                      >
                        <span className="size-2 rounded-full" style={{ backgroundColor: r.color }} />
                        <span className="text-white">{r.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Channels Showcase */}
                <div className="mt-3.5 space-y-1 rounded-lg border border-[#2b2d31] bg-[#141517] p-2.5 font-mono text-xs">
                  {CHANNELS.map((ch) => (
                    <div
                      key={ch.id}
                      className={`flex items-center justify-between rounded px-2 py-1 ${
                        ch.type === "category"
                          ? "bg-[#1f2024] text-[11px] font-bold text-[#949ba4] uppercase tracking-wider mt-1"
                          : "text-[#dbdee1]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {ch.type === "category" ? (
                          <FolderIcon size={13} className="text-[#80848e]" />
                        ) : ch.type === "voice" ? (
                          <SpeakerHighIcon size={14} className="text-[#80848e]" />
                        ) : (
                          <HashIcon size={14} className="text-[#80848e]" />
                        )}
                        <span className={ch.private ? "text-[#f87171]" : ""}>{ch.name}</span>
                        {ch.private && <LockIcon size={12} className="text-[#f87171]" />}
                      </div>

                      {ch.bitrate && (
                        <span className="rounded bg-[#2b2d31] px-1.5 py-0.5 text-[10px] text-[#949ba4]">
                          {ch.bitrate}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Custom Emojis */}
                <div className="mt-3.5 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#949ba4]">Custom Emojis & Stickers:</span>
                  <div className="flex gap-2 text-base">
                    {EMOJIS.map((e) => (
                      <span key={e.name} title={e.name} className="cursor-help transition-transform hover:scale-125">
                        {e.emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SERVER B (DESTINATION) */}
              <div className="rounded-xl border border-[#2b2d31] bg-[#18191c] p-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#2b2d31] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-[#06b6d4] font-black text-sm text-white shadow-md">
                      B2
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">Beta Agency Branch</span>
                        <span className="text-[10px] rounded bg-[#06b6d4]/20 px-1 py-0.2 font-mono text-[#06b6d4]">
                          TARGET
                        </span>
                      </div>
                      <div className="text-[11px] text-[#949ba4]">ID: 129482019482 • Write Target</div>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 rounded bg-[#06b6d4]/10 px-2 py-0.5 text-[10px] font-mono font-medium text-[#06b6d4] border border-[#06b6d4]/20">
                    {currentStep === "completed" ? "SYNCED" : currentStep === "idle" ? "EMPTY" : "WRITING..."}
                  </span>
                </div>

                {/* Dynamic Content based on step */}
                {currentStep === "idle" ? (
                  <div className="flex h-[320px] flex-col items-center justify-center text-center p-6 text-[#949ba4]">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#2b2d31] text-[#80848e] mb-3">
                      <HashIcon size={24} />
                    </div>
                    <div className="text-sm font-semibold text-white">Target Guild Awaiting Migration</div>
                    <p className="mt-1 text-xs max-w-[32ch] text-[#949ba4]">
                      Click &ldquo;Run 1-Click Clone&rdquo; above to automatically replicate Server A into this guild without writing a single line to Server A.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {/* Roles Target */}
                    <div className="mt-3.5">
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#949ba4]">
                        <span>Roles Replicated ({isRolesDone ? "4/4" : "0/4"})</span>
                        {isRolesDone && (
                          <span className="text-[#22e273] font-semibold flex items-center gap-1">
                            <CheckIcon size={12} weight="bold" /> Matched
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5 min-h-[30px]">
                        {isRolesDone ? (
                          ROLES.map((r) => (
                            <span
                              key={r.id}
                              className="inline-flex items-center gap-1.5 rounded-md border border-[#22e273]/30 bg-[#22e273]/10 px-2 py-0.5 text-xs font-medium animate-fadeIn"
                            >
                              <span className="size-2 rounded-full" style={{ backgroundColor: r.color }} />
                              <span className="text-white">{r.name}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[#80848e] italic">Syncing roles...</span>
                        )}
                      </div>
                    </div>

                    {/* Channels Target */}
                    <div className="space-y-1 rounded-lg border border-[#2b2d31] bg-[#141517] p-2.5 font-mono text-xs min-h-[175px]">
                      {isChannelsDone ? (
                        CHANNELS.map((ch) => (
                          <div
                            key={ch.id}
                            className={`flex items-center justify-between rounded px-2 py-1 transition-all ${
                              ch.type === "category"
                                ? "bg-[#1f2024] text-[11px] font-bold text-[#949ba4] uppercase tracking-wider mt-1"
                                : "text-[#dbdee1]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {ch.type === "category" ? (
                                <FolderIcon size={13} className="text-[#22e273]" />
                              ) : ch.type === "voice" ? (
                                <SpeakerHighIcon size={14} className="text-[#22e273]" />
                              ) : (
                                <HashIcon size={14} className="text-[#22e273]" />
                              )}
                              <span className={ch.private ? "text-[#f87171]" : "text-white"}>{ch.name}</span>
                              {ch.private && <LockIcon size={12} className="text-[#f87171]" />}
                            </div>

                            <span className="text-[10px] text-[#22e273] flex items-center gap-1">
                              <CheckIcon size={11} weight="bold" />
                              {ch.private && isPermsDone
                                ? "PERMISSIONS MAPPED"
                                : ch.type === "category"
                                ? "CREATED"
                                : "LINKED"}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex h-36 items-center justify-center text-xs text-[#80848e]">
                          <span className="animate-pulse">Building channel hierarchy...</span>
                        </div>
                      )}
                    </div>

                    {/* Custom Emojis Target */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-[#949ba4]">
                        Assets Uploaded: {isEmojisDone ? "4/4" : "0/4"}
                      </span>
                      <div className="flex gap-2 text-base">
                        {isEmojisDone ? (
                          EMOJIS.map((e) => (
                            <span key={e.name} className="animate-bounce">
                              {e.emoji}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[#80848e] italic">Awaiting asset transfer...</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TERMINAL LIVE STREAM */}
        {activeTab === "terminal" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-[#949ba4]">
                <span className="size-2 rounded-full bg-[#22e273] animate-pulse" />
                <span>cloner.py CLI Runner • Rate-limit Guard: 0 throttles</span>
              </div>
              <button
                type="button"
                onClick={handleCopyLogs}
                className="flex cursor-pointer items-center gap-1.5 rounded border border-[#3f4147] bg-[#2b2d31] px-2.5 py-1 text-xs text-[#dbdee1] hover:bg-[#35373c]"
              >
                <CopyIcon size={13} />
                <span>{copiedLog ? "Copied!" : "Copy Output"}</span>
              </button>
            </div>

            <div className="h-[360px] overflow-y-auto rounded-xl border border-[#2b2d31] bg-[#0f1012] p-4 font-mono text-xs leading-relaxed text-[#dbdee1] shadow-inner">
              <div className="text-[#80848e] mb-2">
                # ==============================================================
                <br /># Discord Server Cloner (Safe Server A -&gt; Server B Migration)
                <br /># Rule: Server A is STRICTLY READ-ONLY
                <br /># ==============================================================
              </div>

              {logs.map((log, index) => {
                const isSuccess = log.level === "SUCCESS";
                const isWarn = log.level === "WARN";
                const isStart = log.level === "START";
                return (
                  <div key={index} className="py-0.5 flex gap-2">
                    <span className="text-[#80848e]">[{log.time}]</span>
                    <span
                      className={`font-semibold shrink-0 ${
                        isSuccess
                          ? "text-[#22e273]"
                          : isWarn
                          ? "text-[#fbbf24]"
                          : isStart
                          ? "text-[#5865f2]"
                          : "text-[#06b6d4]"
                      }`}
                    >
                      [{log.level}]
                    </span>
                    <span className={isSuccess ? "text-white font-medium" : "text-[#dbdee1]"}>
                      {log.msg}
                    </span>
                  </div>
                );
              })}
              <div ref={terminalBottomRef} />
            </div>
          </div>
        )}

        {/* TAB 3: SAFETY ARCHITECTURE */}
        {activeTab === "safety" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[#2b2d31] bg-[#141517] p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ShieldCheckIcon size={18} className="text-[#22e273]" weight="fill" />
                <span>Strict Read-Only Source Guarantee</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#949ba4]">
                Enforced by an in-code assertion (`_assert_destination`). If any deletion, channel edit, role write, or message dispatch targets Source Server A, the script throws an immediate <code className="text-[#f87171] bg-[#f87171]/10 px-1 py-0.5 rounded">ReadOnlyViolationError</code> and aborts. Server A is mathematically immune to changes.
              </p>
            </div>

            <div className="rounded-xl border border-[#2b2d31] bg-[#141517] p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <WarningCircleIcon size={18} className="text-[#fbbf24]" weight="fill" />
                <span>Rate-Limit (429) &amp; Backoff Wrapper</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#949ba4]">
                All Discord REST requests are routed through a safe exponential backoff wrapper (`_safe_request`). If Discord issues an HTTP 429 Too Many Requests response, the engine extracts the <code className="text-[#06b6d4] bg-[#06b6d4]/10 px-1 py-0.5 rounded">retry_after</code> header, sleeps gracefully, and retries up to 5 times.
              </p>
            </div>

            <div className="rounded-xl border border-[#2b2d31] bg-[#141517] p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ArrowsClockwiseIcon size={18} className="text-[#5865f2]" weight="bold" />
                <span>Role Overwrites Re-Mapping</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#949ba4]">
                Channel permissions cannot simply be copy-pasted because role snowflake IDs differ between servers. The engine builds an internal in-memory <code className="text-[#5865f2] bg-[#5865f2]/10 px-1 py-0.5 rounded">role_map[src_id] = dest_role</code> mapping to reconstruct exact access matrices on Server B.
              </p>
            </div>

            <div className="rounded-xl border border-[#2b2d31] bg-[#141517] p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <SpeakerHighIcon size={18} className="text-[#a855f7]" weight="fill" />
                <span>Bitrate Auto-Capping Safeguard</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#949ba4]">
                Cloning a Level 3 boosted server (with 384kbps audio) into a non-boosted server triggers Discord 400 Bad Request. The cloner queries Server B&apos;s boost tier and automatically caps voice bitrates to the server&apos;s maximum allowable limit (e.g. 96kbps).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between border-t border-[#2b2d31] bg-[#141517] px-4 py-3 text-xs text-[#949ba4]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#22e273]">● One-Click CLI Runner</span>
          <span>• Interactive Guild Picker • Config Auto-Save (`config.json`)</span>
        </div>

        <div className="font-mono text-[11px] text-[#80848e]">
          Python 3.10+ • discord.py • AsyncIO • Colorama
        </div>
      </div>
    </div>
  );
}
