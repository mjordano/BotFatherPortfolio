"use client";

import {
  BellRingingIcon,
  BroadcastIcon,
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon,
  HashIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionIcon,
  SignOutIcon,
  UserIcon,
  UsersIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

type Stage = "Unsorted" | "LT1" | "LT2" | "LT3" | "Trial" | "Advanced";

type Trainee = {
  id: string;
  name: string;
  channel: string;
  stage: Stage;
  active: string;
  trainingTime: string;
  avatarColor: string;
};

const INITIAL_TRAINEES: Trainee[] = [
  {
    id: "0442",
    name: "trainee_alex",
    channel: "#0442-trainee-alex",
    stage: "Unsorted",
    active: "2h ago",
    trainingTime: "0m",
    avatarColor: "bg-[#5865F2]",
  },
  {
    id: "0441",
    name: "trainee_jordan",
    channel: "#0441-trainee-jordan",
    stage: "Unsorted",
    active: "2h ago",
    trainingTime: "4s",
    avatarColor: "bg-[#a855f7]",
  },
  {
    id: "0440",
    name: "trainee_sam",
    channel: "#0440-trainee-sam",
    stage: "Unsorted",
    active: "7h ago",
    trainingTime: "14s",
    avatarColor: "bg-[#f59e0b]",
  },
  {
    id: "0439",
    name: "trainee_taylor",
    channel: "#0439-trainee-taylor",
    stage: "LT1",
    active: "4h ago",
    trainingTime: "2m",
    avatarColor: "bg-[#ec4899]",
  },
  {
    id: "0438",
    name: "trainee_morgan",
    channel: "#0438-trainee-morgan",
    stage: "Advanced",
    active: "13h ago",
    trainingTime: "45m",
    avatarColor: "bg-[#22c55e]",
  },
  {
    id: "0437",
    name: "trainee_casey",
    channel: "#0437-trainee-casey",
    stage: "Advanced",
    active: "15h ago",
    trainingTime: "1h 12m",
    avatarColor: "bg-[#06b6d4]",
  },
];

const ROTATION_QUESTIONS = [
  "Is there anything from the training that you'd like us to explain again or go over with you?",
  "What do you feel like you've improved at the most since you started training with us?",
  "Have you completed the intro module guidelines yet? Let us know if you hit any roadblocks!",
  "Quick check-in: How is your current pace and do you need any 1-on-1 assistance today?",
  "Are you ready for your first mock ticket review? Drop your questions here!",
];

export function TrainingDemo() {
  const [activeTab, setActiveTab] = useState<"tickets" | "bumps" | "discord">("tickets");
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [trainees, setTrainees] = useState<Trainee[]>(INITIAL_TRAINEES);
  const [inactivityDays, setInactivityDays] = useState<number>(3);
  const [inactivityEnabled, setInactivityEnabled] = useState<boolean>(true);
  const [currentBumpIndex, setCurrentBumpIndex] = useState<number>(1);
  const [broadcastCycleActive, setBroadcastCycleActive] = useState<boolean>(true);
  const [announcementText, setAnnouncementText] = useState<string>(
    "Daily check-in: Please tag @mentor in your ticket once today's module is complete."
  );
  const [recentLogs, setRecentLogs] = useState<
    Array<{ id: string; time: string; text: string; tag: "BUMP" | "CYCLE" | "GUARD" }>
  >([
    { id: "1", time: "15:00", text: "Automated Question #2 dispatched to 69 tickets", tag: "BUMP" },
    { id: "2", time: "12:30", text: "Inactivity watchdog checked 69 tickets (4 flagged)", tag: "GUARD" },
    { id: "3", time: "09:00", text: "24h Announcement loop broadcasted successfully", tag: "CYCLE" },
  ]);
  const [toastMsg, setToastMsg] = useState<string>("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const setStage = (id: string, stage: Stage) => {
    setTrainees((prev) =>
      prev.map((t) => (t.id === id ? { ...t, stage } : t)),
    );
    showToast(`Updated ticket #${id} stage to ${stage}`);
  };

  const handleKick = (id: string, name: string) => {
    setTrainees((prev) => prev.filter((t) => t.id !== id));
    showToast(`Removed @${name} from training workspace`);
  };

  const filteredTrainees = trainees.filter((t) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Unsorted" && t.stage === "Unsorted") ||
      (filter === "LT1" && t.stage === "LT1") ||
      (filter === "Advanced" && t.stage === "Advanced");

    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.channel.toLowerCase().includes(search.toLowerCase()) ||
      t.id.includes(search);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#2b2d31] bg-[#141517] text-[#dbdee1] shadow-[0_30px_90px_-35px_rgb(0_0_0/0.8)]">
      {/* Top Navigation Bar (Matching Screenshot 1) */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-xs text-[#949ba4]">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("tickets")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "tickets"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <UsersIcon size={14} className="text-[#38bdf8]" aria-hidden="true" />
            <span>Tickets (69)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("bumps")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "bumps"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <MegaphoneIcon size={14} className="text-[#f59e0b]" aria-hidden="true" />
            <span>Broadcasts &amp; Bumps</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("discord")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "discord"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <HashIcon size={14} className="text-[#5865F2]" aria-hidden="true" />
            <span>Discord Ticket View</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-[#22e273]/15 px-2 py-0.5 text-[11px] font-medium text-[#22e273]">
            Training Supervisor Live
          </span>
        </div>
      </div>

      {/* Main View Area */}
      <div className="p-4 sm:p-5">
        {/* ================= TAB 1: TICKETS DASHBOARD (Screenshot 1) ================= */}
        {activeTab === "tickets" && (
          <div className="space-y-4">
            {/* Top KPI Metric Cards (Matching Screenshot 1 figures) */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7 font-mono">
              <div className="rounded-[8px] border-2 border-white/20 bg-[#1e1f22] p-2.5 shadow-sm">
                <div className="flex items-center justify-between text-[10px] text-[#949ba4]">
                  <span>TOTAL</span>
                  <span className="size-2 rounded-full bg-[#38bdf8]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-white">69</p>
              </div>

              <div className="rounded-[8px] border border-white/5 bg-[#1a1b1e] p-2.5">
                <div className="flex items-center justify-between text-[10px] text-[#949ba4]">
                  <span>UNSORTED</span>
                  <span className="size-2 rounded-full bg-[#949ba4]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-[#dbdee1]">29</p>
              </div>

              <div className="rounded-[8px] border border-white/5 bg-[#1a1b1e] p-2.5">
                <div className="flex items-center justify-between text-[10px] text-[#949ba4]">
                  <span>LT1</span>
                  <span className="size-2 rounded-full bg-[#ef4444]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-[#f87171]">13</p>
              </div>

              <div className="rounded-[8px] border border-white/5 bg-[#1a1b1e] p-2.5">
                <div className="flex items-center justify-between text-[10px] text-[#949ba4]">
                  <span>LT2</span>
                  <span className="size-2 rounded-full bg-[#f59e0b]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-[#fbbf24]">0</p>
              </div>

              <div className="rounded-[8px] border border-white/5 bg-[#1a1b1e] p-2.5">
                <div className="flex items-center justify-between text-[10px] text-[#949ba4]">
                  <span>LT3</span>
                  <span className="size-2 rounded-full bg-[#22c55e]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-[#4ade80]">0</p>
              </div>

              <div className="rounded-[8px] border border-white/5 bg-[#1a1b1e] p-2.5">
                <div className="flex items-center justify-between text-[10px] text-[#949ba4]">
                  <span>TRIAL</span>
                  <span className="size-2 rounded-full bg-[#38bdf8]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-[#38bdf8]">0</p>
              </div>

              <div className="rounded-[8px] border border-white/5 bg-[#1a1b1e] p-2.5">
                <div className="flex items-center justify-between text-[10px] text-[#949ba4]">
                  <span>ADVANCED</span>
                  <span className="size-2 rounded-full bg-[#a855f7]" />
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-[#c084fc]">27</p>
              </div>
            </div>

            {/* Filter Pills (Matching Screenshot 1) */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setFilter("All")}
                className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
                  filter === "All"
                    ? "bg-white text-black font-bold"
                    : "bg-[#232428] text-[#949ba4] hover:text-white"
                }`}
              >
                All ( 69 )
              </button>
              <button
                type="button"
                onClick={() => setFilter("Unsorted")}
                className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
                  filter === "Unsorted"
                    ? "bg-[#35373c] text-white font-bold"
                    : "bg-[#232428] text-[#949ba4] hover:text-white"
                }`}
              >
                Unsorted ( 29 )
              </button>
              <button
                type="button"
                onClick={() => setFilter("LT1")}
                className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
                  filter === "LT1"
                    ? "bg-[#ef4444]/30 text-[#f87171] font-bold border border-[#ef4444]"
                    : "bg-[#232428] text-[#949ba4] hover:text-white"
                }`}
              >
                LT1 ( 13 )
              </button>
              <button
                type="button"
                onClick={() => setFilter("Advanced")}
                className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
                  filter === "Advanced"
                    ? "bg-[#a855f7]/30 text-[#c084fc] font-bold border border-[#a855f7]"
                    : "bg-[#232428] text-[#949ba4] hover:text-white"
                }`}
              >
                Advanced ( 27 )
              </button>
              <span className="rounded-full bg-[#232428] px-3 py-1 text-[#f59e0b]">
                Inactive ( 1 )
              </span>
            </div>

            {/* Search and Sort Toolbar */}
            <div className="flex items-center justify-between gap-3 rounded-[8px] bg-[#1a1b1e] p-2 border border-white/5">
              <div className="relative flex-1">
                <MagnifyingGlassIcon
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#949ba4]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tickets by number, username, or channel..."
                  className="w-full rounded bg-transparent pl-8 pr-3 py-1 text-xs text-white placeholder:text-[#6d6f78] focus:outline-none"
                />
              </div>
              <span className="font-mono text-[10px] text-[#6d6f78]">Sort: Newest First</span>
            </div>

            {/* Trainee Ticket Cards Grid (Matching Screenshot 1) */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTrainees.map((t) => (
                <div
                  key={t.id}
                  className="rounded-[8px] border border-[#2b2d31] bg-[#1a1b1e] p-3 text-xs shadow-sm hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`size-8 shrink-0 rounded-full flex items-center justify-center font-bold text-white text-xs ${t.avatarColor}`}
                    >
                      {t.name.slice(8, 10).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate text-[13px]">
                        @{t.name}
                      </p>
                      <p className="font-mono text-[11px] text-[#38bdf8] truncate">
                        {t.channel} ↗
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#949ba4] border-t border-[#232428] pt-2">
                    <span>
                      Status:{" "}
                      <strong
                        className={
                          t.stage === "Advanced"
                            ? "text-[#c084fc]"
                            : t.stage === "LT1"
                              ? "text-[#f87171]"
                              : "text-white"
                        }
                      >
                        {t.stage}
                      </strong>
                    </span>
                    <span>Active: {t.active}</span>
                    <span className="font-mono text-[#38bdf8]">Training: {t.trainingTime}</span>
                  </div>

                  {/* Stage Switcher Pills & Action */}
                  <div className="mt-3 flex items-center justify-between gap-1 border-t border-[#232428] pt-2">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Unsorted"
                        onClick={() => setStage(t.id, "Unsorted")}
                        className={`size-5 rounded-sm bg-[#949ba4]/30 hover:bg-[#949ba4] cursor-pointer transition-all ${
                          t.stage === "Unsorted" ? "ring-2 ring-white" : ""
                        }`}
                      />
                      <button
                        type="button"
                        title="LT1"
                        onClick={() => setStage(t.id, "LT1")}
                        className={`size-5 rounded-sm bg-[#ef4444]/30 hover:bg-[#ef4444] cursor-pointer transition-all ${
                          t.stage === "LT1" ? "ring-2 ring-[#ef4444]" : ""
                        }`}
                      />
                      <button
                        type="button"
                        title="LT2"
                        onClick={() => setStage(t.id, "LT2")}
                        className={`size-5 rounded-sm bg-[#f59e0b]/30 hover:bg-[#f59e0b] cursor-pointer transition-all ${
                          t.stage === "LT2" ? "ring-2 ring-[#f59e0b]" : ""
                        }`}
                      />
                      <button
                        type="button"
                        title="LT3"
                        onClick={() => setStage(t.id, "LT3")}
                        className={`size-5 rounded-sm bg-[#22c55e]/30 hover:bg-[#22c55e] cursor-pointer transition-all ${
                          t.stage === "LT3" ? "ring-2 ring-[#22c55e]" : ""
                        }`}
                      />
                      <button
                        type="button"
                        title="Advanced"
                        onClick={() => setStage(t.id, "Advanced")}
                        className={`size-5 rounded-sm bg-[#a855f7]/30 hover:bg-[#a855f7] cursor-pointer transition-all ${
                          t.stage === "Advanced" ? "ring-2 ring-[#a855f7]" : ""
                        }`}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleKick(t.id, t.name)}
                      className="inline-flex items-center gap-1 rounded border border-[#ef4444]/40 bg-[#ef4444]/10 px-2 py-0.5 text-[10px] font-semibold text-[#f87171] hover:bg-[#ef4444] hover:text-white transition-colors cursor-pointer"
                    >
                      <SignOutIcon size={12} />
                      <span>Kick</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: MINI BROADCASTS & BUMPS ================= */}
        {activeTab === "bumps" && (
          <div className="space-y-3.5 text-xs">
            {/* Header Status Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-[8px] border border-white/10 bg-[#1a1b1e] px-3.5 py-2">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="font-bold text-white text-xs">Automated Broadcasts &amp; Rotation Engine</span>
                <span className="text-[#6d6f78] hidden sm:inline">•</span>
                <span className="text-[#949ba4] text-[11px] hidden sm:inline">3 Services Running</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="rounded bg-[#22c55e]/15 px-2 py-0.5 text-[#22c55e]">69 Active Channels</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[#949ba4]">Every 24h &amp; 15:00 CET</span>
              </div>
            </div>

            {/* 3-Card Mini Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* CARD 1: 24H BROADCAST LOOP */}
              <div className="flex flex-col justify-between rounded-[8px] border border-[#2b2d31] bg-[#1a1b1e] p-3.5 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-white text-[13px]">
                      <MegaphoneIcon size={16} className="text-[#ec4899]" />
                      <span>24h Broadcast</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setBroadcastCycleActive(!broadcastCycleActive);
                        showToast(broadcastCycleActive ? "24h Loop paused" : "24h Loop activated");
                      }}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                        broadcastCycleActive
                          ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/40"
                          : "bg-white/10 text-[#949ba4]"
                      }`}
                    >
                      {broadcastCycleActive ? "ACTIVE" : "PAUSED"}
                    </button>
                  </div>
                  <p className="text-[#949ba4] text-[11px] leading-relaxed">
                    Recurring announcement dispatched to all 69 channels every 24 hours.
                  </p>

                  <div className="rounded-[6px] border border-white/5 bg-[#141517] p-2">
                    <span className="text-[10px] text-[#6d6f78] block mb-1">Preset message:</span>
                    <input
                      type="text"
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full rounded border border-[#3f4147] bg-[#1e1f22] px-2 py-1 text-xs text-white placeholder:text-[#6d6f78] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    showToast("Instant broadcast dispatched to all 69 active channels");
                    setRecentLogs((prev) => [
                      { id: Date.now().toString(), time: "Just now", text: "Instant broadcast dispatched to 69 tickets", tag: "CYCLE" },
                      ...prev.slice(0, 3),
                    ]);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 rounded-[6px] bg-[#ec4899]/20 hover:bg-[#ec4899]/30 text-[#f472b6] border border-[#ec4899]/40 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>⚡ Send Broadcast Now</span>
                </button>
              </div>

              {/* CARD 2: QUESTION ROTATION BUMP */}
              <div className="flex flex-col justify-between rounded-[8px] border border-[#2b2d31] bg-[#1a1b1e] p-3.5 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-white text-[13px]">
                      <QuestionIcon size={16} className="text-[#f59e0b]" />
                      <span>Question Bumps</span>
                    </span>
                    <span className="rounded bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/40 px-2 py-0.5 text-[10px] font-bold font-mono">
                      #{currentBumpIndex + 1} of {ROTATION_QUESTIONS.length} • 15:00
                    </span>
                  </div>
                  <p className="text-[#949ba4] text-[11px] leading-relaxed">
                    Auto-rotates engagement questions across training tickets at scheduled intervals.
                  </p>

                  <div className="rounded-[6px] border border-[#f59e0b]/20 bg-[#141517] p-2 min-h-[58px] flex items-center">
                    <p className="text-white text-xs leading-snug italic line-clamp-2">
                      &ldquo;{ROTATION_QUESTIONS[currentBumpIndex]}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Dispatched Question #${currentBumpIndex + 1} to active trainees`);
                      setRecentLogs((prev) => [
                        { id: Date.now().toString(), time: "Just now", text: `Question #${currentBumpIndex + 1} broadcasted`, tag: "BUMP" },
                        ...prev.slice(0, 3),
                      ]);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 rounded-[6px] bg-[#22c55e] hover:bg-[#16a34a] text-black py-1.5 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>🚀 Send Bump</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = (currentBumpIndex + 1) % ROTATION_QUESTIONS.length;
                      setCurrentBumpIndex(next);
                      showToast(`Switched to Question #${next + 1}`);
                    }}
                    className="rounded-[6px] bg-[#2b2d31] hover:bg-[#35373c] text-white px-2.5 py-1.5 text-xs font-medium cursor-pointer"
                    title="Next Question in rotation"
                  >
                    Next ⏭️
                  </button>
                </div>
              </div>

              {/* CARD 3: INACTIVITY GUARD */}
              <div className="flex flex-col justify-between rounded-[8px] border border-[#2b2d31] bg-[#1a1b1e] p-3.5 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-white text-[13px]">
                      <BellRingingIcon size={16} className="text-[#38bdf8]" />
                      <span>Inactivity Guard</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setInactivityEnabled(!inactivityEnabled);
                        showToast(inactivityEnabled ? "Inactivity Guard disabled" : "Inactivity Guard enabled");
                      }}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                        inactivityEnabled
                          ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/40"
                          : "bg-white/10 text-[#949ba4]"
                      }`}
                    >
                      {inactivityEnabled ? "ARMED" : "OFF"}
                    </button>
                  </div>
                  <p className="text-[#949ba4] text-[11px] leading-relaxed">
                    Monitors trainee silence and triggers automated gentle warning nudges.
                  </p>

                  <div className="rounded-[6px] border border-white/5 bg-[#141517] p-2 flex items-center justify-between min-h-[58px]">
                    <div>
                      <span className="text-[10px] text-[#6d6f78] block">Threshold:</span>
                      <span className="text-white font-bold text-xs">{inactivityDays} Days Inactive</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono">
                      {[2, 3, 5].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setInactivityDays(d);
                            showToast(`Inactivity threshold set to ${d} days`);
                          }}
                          className={`rounded px-2 py-0.5 text-[10px] cursor-pointer transition-colors ${
                            inactivityDays === d
                              ? "bg-[#38bdf8] text-black font-bold"
                              : "bg-[#2b2d31] text-[#949ba4] hover:text-white"
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    showToast("Scanned 69 tickets: 4 inactive trainees nudged");
                    setRecentLogs((prev) => [
                      { id: Date.now().toString(), time: "Just now", text: "Inactivity watchdog nudged 4 tickets (>72h)", tag: "GUARD" },
                      ...prev.slice(0, 3),
                    ]);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 rounded-[6px] bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/30 py-1.5 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>🔍 Scan &amp; Nudge (4)</span>
                </button>
              </div>
            </div>

            {/* Mini Live Dispatch Log */}
            <div className="rounded-[8px] border border-white/5 bg-[#141517] p-3 font-mono">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#949ba4] flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#22c55e]" />
                  <span>Real-time Broadcast &amp; Bump Dispatch Stream</span>
                </span>
                <span className="text-[10px] text-[#6d6f78]">SQLite Event Store</span>
              </div>
              <div className="space-y-1.5">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between rounded bg-[#1e1f22]/70 px-2.5 py-1 text-[11px] border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#6d6f78] text-[10px]">[{log.time}]</span>
                      <span className="text-[#dbdee1]">{log.text}</span>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                        log.tag === "BUMP"
                          ? "bg-[#f59e0b]/20 text-[#fbbf24]"
                          : log.tag === "CYCLE"
                            ? "bg-[#ec4899]/20 text-[#f472b6]"
                            : "bg-[#38bdf8]/20 text-[#38bdf8]"
                      }`}
                    >
                      {log.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DISCORD PRIVATE TICKET (Screenshot 5) ================= */}
        {activeTab === "discord" && (
          <div className="space-y-4">
            <div className="rounded-[8px] bg-[#1a1b1e] p-4 text-xs">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#5865F2] font-bold text-sm text-white">
                  TB
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-white text-[15px]">TrainingBot</span>
                    <span className="rounded-[3px] bg-[#5865F2] px-1 py-0.2 font-sans text-[9px] font-bold text-white uppercase tracking-wider">
                      APP
                    </span>
                    <span className="text-xs text-[#949ba4]">Today at 16:06</span>
                  </div>

                  {/* Private Support Ticket Discord Embed (Screenshot 5) */}
                  <div className="rounded-r-[6px] bg-[#2b2d31] p-4 text-xs border-l-4 border-l-[#5865F2] shadow-md space-y-2.5 leading-relaxed">
                    <h4 className="font-bold text-white text-[14px]">
                      Welcome to Agency Training, @trainee_alex! 👋
                    </h4>

                    <p className="text-[#dbdee1]">
                      Hey <span className="bg-[#5865F2]/20 text-[#c9cdfb] px-1 rounded font-medium">&lt;@trainee_alex&gt;</span>, welcome to the team! Glad to have you here.
                    </p>

                    <p className="text-[#dbdee1]">
                      This is your private support ticket. Feel free to use it whenever you have questions, need help, or aren&apos;t sure about anything during your training.
                    </p>

                    <div className="rounded bg-[#1e1f22] p-3 space-y-1.5 border border-white/5">
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <span>📌</span>
                        <span>Getting Started:</span>
                      </p>
                      <ul className="space-y-1 pl-4 text-[#dbdee1]">
                        <li>
                          • <strong>Step 1:</strong> Fill out the application form:{" "}
                          <span className="text-[#38bdf8] underline cursor-pointer">Click Here</span>
                        </li>
                        <li>
                          • <strong>Step 2:</strong> Leave your email address here and tag{" "}
                          <span className="bg-[#5865F2]/20 text-[#c9cdfb] px-1 rounded">@MANAGEMENT</span>.
                        </li>
                        <li>
                          • <strong>Step 3:</strong> Once reviewed and approved, we will open the next stage for you.
                        </li>
                      </ul>
                    </div>

                    <p className="text-[#dbdee1]">
                      Don&apos;t hesitate to ask questions — that&apos;s exactly what this training ticket is for!
                    </p>

                    <p className="text-white font-medium">Good luck, and welcome aboard!</p>

                    <p className="mt-3 text-[11px] text-[#949ba4] font-medium border-t border-[#35373c] pt-2">
                      TrainingBot • Private Support Ticket • Today at 16:06
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Toast */}
      {toastMsg && (
        <div className="border-t border-[#22e273]/30 bg-[#22e273]/10 px-4 py-2 font-mono text-xs text-[#22e273] flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#22e273] animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Footer Info */}
      <div className="border-t border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-[11px] text-[#949ba4]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#22e273]" />
            <span className="text-[#dbdee1]">Auto-Provisioned Private Channels</span>
            <span className="text-[#6d6f78]">•</span>
            <span>24h Scheduled Announcements</span>
            <span className="text-[#6d6f78]">•</span>
            <span>Inactivity Pruning</span>
          </div>
          <span className="text-[10px] text-faint">SQLite WAL &amp; Node.js Daemon</span>
        </div>
      </div>
    </div>
  );
}
