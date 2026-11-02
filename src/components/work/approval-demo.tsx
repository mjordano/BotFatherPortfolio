"use client";

import {
  ArrowRightIcon,
  ArrowSquareOutIcon,
  CheckIcon,
  HashIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

type Request = {
  id: number;
  model: string;
  chatter: string;
  time: string;
  message: string;
};

const REQUESTS: Request[] = [
  {
    id: 1042,
    model: "Model Nova",
    chatter: "Alex_Staff",
    time: "10/21/2026 17:10",
    message: "ok baby... LET'S PLAY !!! Sending my exclusive private set in 15 mins, reply FAST if you want VIP early access 💕",
  },
  {
    id: 1043,
    model: "Model Scarlett",
    chatter: "Kira_Ops",
    time: "10/21/2026 18:45",
    message:
      "Late night special 🌙 Just put together a bundle of my top 5 unreleased sets from this month. 50% off for the first 15 replies only. What are you waiting for? 👀",
  },
  {
    id: 1044,
    model: "Model Ivy",
    chatter: "Vesper_Staff",
    time: "10/21/2026 20:15",
    message:
      "Hey baby, I just filmed something crazy in the shower... 🚿 Dropping the full 4-minute tape in your DMs in 20 minutes. Reply VIP for a special preview before everyone else 💋",
  },
];

type Status = "pending" | "approved" | "changes-requested";

type LogLine = {
  id: number;
  action: string;
  seconds: number;
  model: string;
};

export function ApprovalDemo() {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<Status>("pending");
  const [activeTab, setActiveTab] = useState<"supervisor" | "chatter">("supervisor");
  const [log, setLog] = useState<LogLine[]>([]);
  const shownAt = useRef(0);
  const nextRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const request = REQUESTS[index];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        shownAt.current = performance.now();
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const settle = (next: Status, action: string) => {
    const seconds = Math.max(1, Math.round((performance.now() - shownAt.current) / 1000));
    setStatus(next);
    setLog((lines) =>
      [
        {
          id: request.id,
          action,
          seconds,
          model: request.model,
        },
        ...lines,
      ].slice(0, 3),
    );
  };

  const nextRequest = () => {
    shownAt.current = performance.now();
    setIndex((i) => (i + 1) % REQUESTS.length);
    setStatus("pending");
  };

  const done = status === "approved" || status === "changes-requested";

  const embedBorderColor =
    status === "approved"
      ? "#23a55a"
      : status === "changes-requested"
        ? "#e74c3c"
        : "#f1c40f";

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-[14px] border border-[#2b2d31] bg-[#1e1f22] text-[#dbdee1] shadow-[0_30px_90px_-35px_rgb(0_0_0/0.8)]"
    >
      {/* Discord Header Bar with Channels */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-xs text-[#949ba4]">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("supervisor")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "supervisor"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <HashIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>mm-app</span>
            {status === "pending" && (
              <span className="ml-1 size-2 rounded-full bg-[#f1c40f]" title="Pending review" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("chatter")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "chatter"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <HashIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>model-chat</span>
            {done && (
              <span
                className={`ml-1 size-2 rounded-full ${
                  status === "approved" ? "bg-[#23a55a]" : "bg-[#e74c3c]"
                }`}
                title="Response sent"
              />
            )}
          </button>
        </div>

        <span className="rounded bg-[#23a55a]/15 px-2 py-0.5 text-[11px] font-medium text-[#23a55a]">
          Live Interactive Demo
        </span>
      </div>

      {/* Main Channel Body */}
      <div className="p-4 sm:p-5">
        {activeTab === "supervisor" ? (
          /* ================= SUPERVISOR VIEW (#mm-app) ================= */
          <div className="flex gap-3 sm:gap-3.5">
            {/* Bot Avatar */}
            <div className="size-10 shrink-0 overflow-hidden rounded-full bg-[#2b2d31] ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mmapp-avatar.jpg"
                alt="MMapp"
                className="size-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              {/* Message Header */}
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="font-semibold text-white text-[15px]">MMapp</span>
                <span className="rounded-[3px] bg-[#5865F2] px-1.5 py-0.5 font-sans text-[10px] font-bold text-white uppercase tracking-wider leading-none">
                  APP
                </span>
                <span className="text-xs text-[#949ba4]">{request.time}</span>
              </div>

              {/* Role ping */}
              <div className="mt-1">
                <span className="rounded bg-[#5865f2]/20 px-1.5 py-0.5 font-medium text-[#c9cdfb] text-xs">
                  @Supervisor
                </span>
              </div>

              {/* Discord Embed */}
              <div
                className="mt-2.5 rounded-r-[8px] bg-[#2b2d31] p-4 text-sm transition-[border-color] duration-500"
                style={{
                  borderLeft: `4px solid ${embedBorderColor}`,
                }}
              >
                {/* Embed Title */}
                <h4 className="flex items-center gap-2 font-bold text-white text-[15px]">
                  <span>⏳</span> MM Forward (Approve/Edit)
                </h4>

                {/* Embed Fields */}
                <div className="mt-3 space-y-1.5 text-[13px]">
                  <p>
                    <span className="font-bold text-white">Type: </span>
                    <span className="text-[#dbdee1]">📨 MM (Needs Review)</span>
                  </p>
                  <p>
                    <span className="font-bold text-white">From: </span>
                    <span className="rounded bg-[#5865f2]/20 px-1.5 py-0.5 font-medium text-[#c9cdfb] text-xs">
                      @{request.chatter}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold text-white">Model: </span>
                    <span className="text-[#dbdee1]">{request.model}</span>
                  </p>
                  <p>
                    <span className="font-bold text-white">Jump: </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("chatter")}
                      className="rounded bg-[#232428] border border-[#35363c] px-1.5 py-0.5 font-mono text-xs text-[#949ba4] transition-colors hover:text-white cursor-pointer"
                    >
                      # mm-app
                    </button>
                  </p>
                </div>

                {/* Message Body */}
                <div className="mt-3 border-t border-[#35373c] pt-3">
                  <p className="font-bold text-white text-[13px]">Message:</p>
                  <p className="mt-1 leading-relaxed text-[#dbdee1]">
                    • {request.message}
                  </p>
                </div>

                {/* Resolved Status Section in Embed */}
                {done && (
                  <div className="mt-3 border-t border-[#35373c] pt-3 text-[13px]">
                    <p className="font-bold text-white">Status</p>
                    <p className="mt-1 flex items-center gap-1.5">
                      {status === "approved" ? (
                        <span className="text-[#23a55a] font-medium">
                          ✅ Approved by <strong className="text-white">@Supervisor</strong>
                        </span>
                      ) : (
                        <span className="text-[#e74c3c] font-medium">
                          ✏️ Changes requested by <strong className="text-white">@Supervisor</strong>
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* Footer Timestamp */}
                <p className="mt-3 text-[11px] text-[#949ba4]">{request.time}</p>
              </div>

              {/* Discord Buttons (Pending State) */}
              {status === "pending" ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => settle("approved", "approved")}
                    className="flex-1 sm:flex-none flex cursor-pointer items-center justify-center gap-1.5 rounded-[4px] bg-[#248046] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#1a6334] active:scale-[0.98]"
                  >
                    <CheckIcon size={15} weight="bold" aria-hidden="true" />
                    <span>Approve</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => settle("changes-requested", "changes requested")}
                    className="flex-1 sm:flex-none flex cursor-pointer items-center justify-center gap-1.5 rounded-[4px] bg-[#4e5058] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#6d6f78] active:scale-[0.98]"
                  >
                    <PencilSimpleIcon size={15} weight="bold" aria-hidden="true" />
                    <span className="whitespace-nowrap">Request Changes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("chatter")}
                    className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-1.5 rounded-[4px] bg-[#4e5058]/60 px-3.5 py-2 text-xs font-semibold text-[#dbdee1] transition-all hover:bg-[#4e5058] hover:text-white"
                  >
                    <span>Take me there</span>
                    <ArrowSquareOutIcon size={14} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                /* Resolved Action View: Take me there + Next message */
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[8px] bg-[#2b2d31] p-3 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setActiveTab("chatter")}
                    className="flex cursor-pointer items-center gap-1.5 rounded-[4px] bg-[#4e5058] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#6d6f78]"
                  >
                    <span>Take me there</span>
                    <ArrowSquareOutIcon size={14} weight="bold" aria-hidden="true" />
                  </button>

                  <button
                    ref={nextRef}
                    type="button"
                    onClick={nextRequest}
                    className="flex cursor-pointer items-center gap-1.5 rounded bg-white px-3.5 py-2 font-mono text-xs font-semibold text-black transition-colors hover:bg-white/90"
                  >
                    <span>Next message</span>
                    <ArrowRightIcon size={14} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ================= CHATTER VIEW (#model-chat) ================= */
          <div className="space-y-4">
            {/* 1. Chatter's initial message */}
            <div className="flex gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#5865F2]/20 font-bold text-xs text-[#c9cdfb]">
                {request.chatter.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-white text-[14px]">
                    @{request.chatter}
                  </span>
                  <span className="rounded bg-[#5865F2]/20 px-1 py-0.5 text-[10px] font-bold text-[#c9cdfb]">
                    STAFF
                  </span>
                  <span className="text-[11px] text-[#949ba4]">17:30</span>
                </div>
                <p className="mt-1 font-mono text-[13px] text-[#f2f3f5]">
                  <span className="text-[#5865F2] font-semibold">!mm </span>
                  {request.message}
                </p>

                {/* Reaction badge on chatter message matching Discord */}
                <div className="mt-1.5">
                  {status === "approved" ? (
                    <span className="inline-flex items-center gap-1 rounded bg-[#2b2d31] border border-[#23a55a]/40 px-2 py-0.5 text-xs text-[#23a55a]">
                      ✅ <span className="text-[#949ba4]">1</span>
                    </span>
                  ) : status === "changes-requested" ? (
                    <span className="inline-flex items-center gap-1 rounded bg-[#2b2d31] border border-[#e74c3c]/40 px-2 py-0.5 text-xs text-[#e74c3c]">
                      ✏️ <span className="text-[#949ba4]">1</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded bg-[#2b2d31] border border-[#3f4147] px-2 py-0.5 text-xs text-[#dbdee1]">
                      📨 <span className="text-[#949ba4]">1</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Bot reply thread with Discord connector curve */}
            <div className="relative pl-6">
              {/* Curved reply line */}
              <div
                aria-hidden="true"
                className="absolute -top-3 left-3 h-7 w-5 rounded-tl-md border-l-2 border-t-2 border-[#4e5058]"
              />

              <div className="flex gap-2.5">
                <div className="size-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/mmapp-avatar.jpg"
                    alt="MMapp"
                    className="size-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-white text-xs">MMapp</span>
                    <span className="rounded-[3px] bg-[#5865F2] px-1 text-[9px] font-bold text-white">
                      APP
                    </span>
                    <span className="text-[10px] text-[#949ba4]">
                      {status === "approved" ? "17:36" : status === "changes-requested" ? "17:33" : "17:31"}
                    </span>
                  </div>

                  {/* Dynamic Status message matching exact production bot */}
                  <div className="mt-1 text-xs">
                    {status === "approved" ? (
                      <p className="flex items-center gap-1.5 font-medium text-white">
                        <span className="text-[#23a55a]">✅</span>
                        <span>
                          Approved by <strong className="text-[#23a55a]">Supervisor</strong> — good to go!
                        </span>
                      </p>
                    ) : status === "changes-requested" ? (
                      <p className="font-medium text-white">
                        <span>✏️ </span>
                        <strong>Supervisor</strong> requested changes — please edit and resubmit with{" "}
                        <code className="rounded bg-[#2b2d31] border border-[#3f4147] px-1.5 py-0.5 font-mono text-[11px] text-[#dbdee1]">
                          !mm
                        </code>
                        .
                      </p>
                    ) : (
                      <p className="flex items-center gap-1.5 text-[#dbdee1]">
                        <span>📨</span>
                        <span>Submitted for review — wait for a confirmation from your supervisor.</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Switch back button */}
            <div className="border-t border-[#2b2d31] pt-3 text-right">
              <button
                type="button"
                onClick={() => setActiveTab("supervisor")}
                className="text-xs font-medium text-[#5865F2] hover:underline cursor-pointer"
              >
                ← Back to Supervisor review (#mm-app)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Audit Log Footer */}
      <div className="border-t border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-[11px] text-[#949ba4]">
        <div className="flex items-center justify-between text-xs font-semibold text-[#dbdee1]">
          <span>Audit Trail (zero-database stateless payload)</span>
          <span className="text-[10px] text-[#23a55a]">Instant Gateway Recovery</span>
        </div>
        {log.length === 0 ? (
          <p className="mt-1 text-[#6d6f78]">
            Click Approve or Request Changes above to simulate the live supervisor decision.
          </p>
        ) : (
          <ul className="mt-1.5 space-y-1">
            {log.map((line, i) => (
              <li key={`${line.id}-${i}`} className="truncate">
                • [{line.model}] Request #{line.id}:{" "}
                <span
                  className={
                    line.action === "approved"
                      ? "text-[#23a55a] font-medium"
                      : "text-[#e74c3c] font-medium"
                  }
                >
                  {line.action}
                </span>{" "}
                by supervisor in <span className="text-white font-medium">{line.seconds}s</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
