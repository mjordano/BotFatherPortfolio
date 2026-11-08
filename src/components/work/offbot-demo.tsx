"use client";

import {
  ArrowsClockwiseIcon,
  CalendarCheckIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  HashIcon,
  ShieldCheckIcon,
  TableIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

interface OffDayRecord {
  id: string;
  date: string;
  day: string;
  chatter: string;
  shift: "MAIN" | "GRAVE" | "NOON";
  team: string;
  reason: string;
  status: RequestStatus;
  requestedAt: string;
  isNew?: boolean;
}

const INITIAL_RECORDS: OffDayRecord[] = [
  {
    id: "rec-1",
    date: "16.11.2026",
    day: "Mon",
    chatter: "Alex_Staff",
    shift: "MAIN",
    team: "Nova Team",
    reason: "Medical checkup + family visit",
    status: "APPROVED",
    requestedAt: "08.11.2026 14:20",
  },
  {
    id: "rec-2",
    date: "16.11.2026",
    day: "Mon",
    chatter: "Sarah_Lead",
    shift: "NOON",
    team: "Scarlett VIP",
    reason: "Personal rest day",
    status: "APPROVED",
    requestedAt: "08.11.2026 15:45",
  },
  {
    id: "rec-3",
    date: "17.11.2026",
    day: "Tue",
    chatter: "Elena_Chat",
    shift: "GRAVE",
    team: "Chloe Star",
    reason: "University exam day",
    status: "PENDING",
    requestedAt: "08.11.2026 17:10",
  },
];

const TARGET_DAYS = [
  { date: "16.11.2026", day: "Mon", booked: 2, limit: 2, full: true },
  { date: "17.11.2026", day: "Tue", booked: 1, limit: 2, full: false },
  { date: "18.11.2026", day: "Wed", booked: 0, limit: 2, full: false },
  { date: "19.11.2026", day: "Thu", booked: 1, limit: 2, full: false },
  { date: "20.11.2026", day: "Fri", booked: 0, limit: 2, full: false },
  { date: "21.11.2026", day: "Sat", booked: 1, limit: 2, full: false },
  { date: "22.11.2026", day: "Sun", booked: 0, limit: 2, full: false },
];

export function OffBotDemo() {
  const [activeTab, setActiveTab] = useState<"discord" | "sheets" | "engine">("discord");
  const [records, setRecords] = useState<OffDayRecord[]>(INITIAL_RECORDS);
  const [selectedDate, setSelectedDate] = useState<string>("17.11.2026");
  const [selectedShift, setSelectedShift] = useState<"MAIN" | "GRAVE" | "NOON">("MAIN");
  const [reasonText, setReasonText] = useState<string>("Family obligation & personal leave");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const selectedDayInfo = TARGET_DAYS.find((d) => d.date === selectedDate);
  const isSelectedDateFull = selectedDayInfo?.full;

  const handleCreateRequest = () => {
    if (isSelectedDateFull) return;

    const dayName = selectedDayInfo ? selectedDayInfo.day : "Tue";
    const newRecord: OffDayRecord = {
      id: `rec-${Date.now()}`,
      date: selectedDate,
      day: dayName,
      chatter: "You (Discord Chatter)",
      shift: selectedShift,
      team: "Agency Alpha",
      reason: reasonText,
      status: "PENDING",
      requestedAt: "Today at 17:30",
      isNew: true,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setLastAction(`Submitted /off request for ${selectedDate} (${selectedShift}) -> Synced to Google Sheets`);
    setTimeout(() => setLastAction(null), 3500);
  };

  const handleUpdateStatus = (id: string, newStatus: RequestStatus, source: "discord" | "sheets") => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    const sourceLabel = source === "sheets" ? "Google Apps Script onEdit trigger" : "Discord manager button";
    setLastAction(`Status updated to ${newStatus} via ${sourceLabel} (Two-way webhook synchronized)`);
    setTimeout(() => setLastAction(null), 3500);
  };

  const handleReset = () => {
    setRecords(INITIAL_RECORDS);
    setSelectedDate("17.11.2026");
    setSelectedShift("MAIN");
    setReasonText("Family obligation & personal leave");
  };

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#2b2d31] bg-[#1e1f22] text-[#dbdee1] shadow-[0_30px_90px_-35px_rgb(0_0_0/0.8)]">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2b2d31] bg-[#1a1b1e] px-4 py-2.5 font-mono text-xs text-[#949ba4]">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("discord")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "discord"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <HashIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>#off-requests</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sheets")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "sheets"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <TableIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>Master Google Sheet (📅 OFF DAYS)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("engine")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              activeTab === "engine"
                ? "bg-[#35373c] text-white font-medium"
                : "text-[#949ba4] hover:bg-[#2b2d31] hover:text-[#dbdee1]"
            }`}
          >
            <CalendarCheckIcon size={14} className="text-[#80848e]" aria-hidden="true" />
            <span>Booking Window &amp; Quotas</span>
          </button>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded bg-[#22e273]/15 px-2 py-0.5 text-[11px] font-medium text-[#22e273]">
            <span className="size-2 rounded-full bg-[#22e273] animate-pulse" />
            WINDOW OPEN (MON-THU)
          </span>
        </div>
      </div>

      {/* Sync Toast Alert */}
      {lastAction && (
        <div className="flex items-center gap-2 border-b border-[#22e273]/30 bg-[#22e273]/10 px-4 py-2 font-mono text-xs text-[#22e273]">
          <ArrowsClockwiseIcon size={14} className="animate-spin shrink-0" />
          <span>{lastAction}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="p-4 sm:p-5">
        {/* TAB 1: DISCORD CHANNEL & MODAL FLOW */}
        {activeTab === "discord" && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Interactive Request Form (Slash Command Questionnaire Simulator) */}
            <div className="space-y-4 rounded-xl border border-[#2b2d31] bg-[#141517] p-4 lg:col-span-5">
              <div className="flex items-center justify-between border-b border-[#2b2d31] pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#5865f2] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    /off
                  </span>
                  <span className="font-semibold text-white text-xs">Request Questionnaire</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] text-[#949ba4] hover:text-white transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Target Date Picker */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#949ba4] mb-1.5">
                  1. Target Off-Date (Next ISO Week)
                </label>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {TARGET_DAYS.slice(0, 6).map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      disabled={d.full}
                      onClick={() => setSelectedDate(d.date)}
                      className={`flex flex-col items-center justify-center rounded-lg border p-2 text-xs transition-all cursor-pointer ${
                        d.full
                          ? "border-[#3f4147]/50 bg-[#1e1f22]/50 text-[#80848e] cursor-not-allowed opacity-60"
                          : selectedDate === d.date
                          ? "border-[#22e273] bg-[#22e273]/15 text-white font-semibold shadow-[0_0_15px_rgb(34_226_115/0.2)]"
                          : "border-[#2b2d31] bg-[#1e1f22] text-[#dbdee1] hover:border-[#3f4147]"
                      }`}
                    >
                      <span className="font-bold">{d.day}</span>
                      <span className="text-[10px] text-[#949ba4]">{d.date.slice(0, 5)}</span>
                      <span className={`text-[9px] mt-0.5 ${d.full ? "text-[#f87171]" : "text-[#22e273]"}`}>
                        {d.full ? "FULL (2/2)" : `${d.booked}/2 Booked`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shift Selector */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#949ba4] mb-1.5">
                  2. Select Shift
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {(["MAIN", "GRAVE", "NOON"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedShift(s)}
                      className={`rounded-lg border px-2.5 py-2 text-center transition-all cursor-pointer ${
                        selectedShift === s
                          ? "border-[#5865f2] bg-[#5865f2]/20 font-bold text-white shadow-sm"
                          : "border-[#2b2d31] bg-[#1e1f22] text-[#949ba4] hover:text-[#dbdee1]"
                      }`}
                    >
                      <div>{s}</div>
                      <div className="text-[9px] text-[#80848e] mt-0.5">
                        {s === "MAIN" ? "1am - 9am" : s === "GRAVE" ? "9am - 5pm" : "5pm - 1am"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason Input */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#949ba4] mb-1.5">
                  3. Reason / Note
                </label>
                <input
                  type="text"
                  value={reasonText}
                  onChange={(e) => setReasonText(e.target.value)}
                  className="w-full rounded-lg border border-[#2b2d31] bg-[#1e1f22] px-3 py-2 text-xs text-white placeholder-[#80848e] focus:border-[#22e273] focus:outline-none"
                  placeholder="Reason for off-day..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCreateRequest}
                disabled={isSelectedDateFull}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelectedDateFull
                    ? "bg-[#35373c] text-[#80848e] cursor-not-allowed"
                    : "bg-[#22e273] text-[#0a1b10] hover:bg-[#2bf57e] shadow-[0_0_20px_rgb(34_226_115/0.25)] active:scale-98"
                }`}
              >
                <CalendarCheckIcon size={16} weight="bold" />
                <span>{isSelectedDateFull ? "Selected Date at Max Capacity" : "Submit /off Request"}</span>
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-[#80848e]">
                <ShieldCheckIcon size={14} className="text-[#22e273]" />
                <span>Thread-safe Google Sheets sync via in-process mutex</span>
              </div>
            </div>

            {/* Live Discord Feed (Right side) */}
            <div className="space-y-3 lg:col-span-7">
              <div className="flex items-center justify-between text-xs font-mono text-[#949ba4]">
                <span>Recent Discord Request Embeds:</span>
                <span>{records.length} active requests</span>
              </div>

              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {records.map((r) => {
                  const isApproved = r.status === "APPROVED";
                  const isPending = r.status === "PENDING";
                  const isRejected = r.status === "REJECTED";

                  return (
                    <div
                      key={r.id}
                      className={`rounded-r-[8px] bg-[#2b2d31] p-4 text-xs shadow-md border-l-4 transition-all ${
                        isApproved
                          ? "border-l-[#22e273]"
                          : isPending
                          ? "border-l-[#fbbf24]"
                          : "border-l-[#f87171]"
                      } ${r.isNew ? "ring-1 ring-[#22e273]/50 animate-fadeIn" : ""}`}
                    >
                      {/* Embed Header */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-[14px]">OffBot</span>
                          <span className="rounded bg-[#5865f2] px-1 py-0.2 font-mono text-[9px] font-bold text-white uppercase">
                            APP
                          </span>
                          <span className="text-[11px] text-[#949ba4]">{r.requestedAt}</span>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            isApproved
                              ? "bg-[#22e273]/15 text-[#22e273]"
                              : isPending
                              ? "bg-[#fbbf24]/15 text-[#fbbf24] animate-pulse"
                              : "bg-[#f87171]/15 text-[#f87171]"
                          }`}
                        >
                          {r.status}
                        </span>
                      </div>

                      {/* Request Content */}
                      <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-[#1e1f22] p-2.5 text-xs font-mono">
                        <div>
                          <span className="text-[#80848e]">Chatter: </span>
                          <span className="font-semibold text-white">{r.chatter}</span>
                        </div>
                        <div>
                          <span className="text-[#80848e]">Shift: </span>
                          <span className="font-semibold text-[#06b6d4]">{r.shift}</span>
                        </div>
                        <div>
                          <span className="text-[#80848e]">Date: </span>
                          <span className="font-semibold text-[#22e273]">
                            {r.day} {r.date}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#80848e]">Team: </span>
                          <span className="text-[#dbdee1]">{r.team}</span>
                        </div>
                      </div>

                      <div className="mt-2 text-[#dbdee1] text-xs">
                        <span className="font-semibold text-[#949ba4]">Reason: </span>
                        <span>{r.reason}</span>
                      </div>

                      {/* Manager Action Buttons (when pending) */}
                      {isPending && (
                        <div className="mt-3.5 flex items-center gap-2 border-t border-[#3f4147] pt-3">
                          <span className="text-[11px] text-[#949ba4] font-mono">Manager Actions:</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(r.id, "APPROVED", "discord")}
                            className="flex items-center gap-1 rounded bg-[#22e273]/20 hover:bg-[#22e273] hover:text-[#0a1b10] px-2.5 py-1 font-semibold text-[#22e273] transition-colors cursor-pointer"
                          >
                            <CheckIcon size={12} weight="bold" />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(r.id, "REJECTED", "discord")}
                            className="flex items-center gap-1 rounded bg-[#f87171]/20 hover:bg-[#f87171] hover:text-white px-2.5 py-1 font-semibold text-[#f87171] transition-colors cursor-pointer"
                          >
                            <XCircleIcon size={12} weight="bold" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}

                      {/* Approved confirmation notice */}
                      {isApproved && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#22e273]">
                          <CheckCircleIcon size={14} weight="fill" />
                          <span>Synced to Google Sheet row • Column G formula active</span>
                        </div>
                      )}

                      {/* Rejected notice */}
                      {isRejected && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#f87171]">
                          <XCircleIcon size={14} weight="fill" />
                          <span>Request rejected by supervisor • Quota slot restored</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MASTER GOOGLE SHEETS TWO-WAY SYNC */}
        {activeTab === "sheets" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#2b2d31] bg-[#141517] p-3 text-xs">
              <div className="flex items-center gap-2">
                <TableIcon size={18} className="text-[#22e273]" />
                <span className="font-semibold text-white">Google Sheets Integration:</span>
                <span className="font-mono text-[#949ba4]">Tab &ldquo;📅 OFF DAYS&rdquo; (Protected Formulas A:F / Col R trigger)</span>
              </div>
              <span className="rounded bg-[#06b6d4]/15 px-2 py-0.5 font-mono text-[11px] text-[#06b6d4]">
                Google Apps Script onEdit Hook: ACTIVE
              </span>
            </div>

            {/* Simulated Spreadsheet Table */}
            <div className="overflow-x-auto rounded-xl border border-[#2b2d31] bg-[#141517] shadow-inner">
              <table className="w-full border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#2b2d31] bg-[#1e1f22] text-[11px] text-[#949ba4]">
                    <th className="py-2.5 px-3 text-left">Col A (DATE)</th>
                    <th className="py-2.5 px-3 text-left">Col B (DAY)</th>
                    <th className="py-2.5 px-3 text-left">Col C (CHATTER)</th>
                    <th className="py-2.5 px-3 text-left">Col D (SHIFT)</th>
                    <th className="py-2.5 px-3 text-left">Col E (TEAM)</th>
                    <th className="py-2.5 px-3 text-left">Col F (REASON)</th>
                    <th className="py-2.5 px-3 text-left text-[#fbbf24]">Col G (FORMULA)</th>
                    <th className="py-2.5 px-3 text-left text-[#06b6d4]">Col R (APPROVAL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2d31]/60">
                  {records.map((r, idx) => (
                    <tr
                      key={r.id}
                      className={`hover:bg-[#1a1b1e] transition-colors ${
                        r.isNew ? "bg-[#22e273]/10" : idx % 2 === 0 ? "bg-[#141517]" : "bg-[#16171a]"
                      }`}
                    >
                      <td className="py-2.5 px-3 text-white font-medium">{r.date}</td>
                      <td className="py-2.5 px-3 text-[#949ba4]">{r.day}</td>
                      <td className="py-2.5 px-3 text-[#06b6d4] font-medium">{r.chatter}</td>
                      <td className="py-2.5 px-3 text-white">{r.shift}</td>
                      <td className="py-2.5 px-3 text-[#949ba4]">{r.team}</td>
                      <td className="py-2.5 px-3 max-w-[180px] truncate text-[#dbdee1]">{r.reason}</td>
                      <td className="py-2.5 px-3 text-[#fbbf24] font-mono text-[11px]">
                        {r.status === "APPROVED" ? "APPROVED_ON_LEAVE" : "PENDING_APPROVAL"}
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          value={r.status}
                          onChange={(e) =>
                            handleUpdateStatus(r.id, e.target.value as RequestStatus, "sheets")
                          }
                          className="rounded border border-[#3f4147] bg-[#1e1f22] px-2 py-1 text-[11px] font-bold text-white focus:outline-none focus:border-[#22e273] cursor-pointer"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-[#949ba4] leading-relaxed">
              💡 <strong>Two-Way Sheet Trigger:</strong> Editing the dropdown in <strong>Col R (APPROVAL)</strong> simulates the Google Apps Script <code className="text-[#06b6d4] bg-[#06b6d4]/10 px-1 py-0.5 rounded">onEditTrigger</code>, which calls Discord REST API v10 to immediately update the channel embed and notify the chatter!
            </p>
          </div>
        )}

        {/* TAB 3: CAPACITY & RULES ENGINE */}
        {activeTab === "engine" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[#2b2d31] bg-[#141517] p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ClockIcon size={18} className="text-[#22e273]" weight="fill" />
                <span>Belgrade Timezone Scheduling Window</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#949ba4]">
                Strict booking enforcement: chatters may only submit off-requests between <strong>Monday 00:00 and Thursday 23:59 Belgrade time (TZ=Europe/Belgrade)</strong> for the <em>next ISO calendar week</em>. Off-window requests are instantly rejected with courteous notice.
              </p>
            </div>

            <div className="rounded-xl border border-[#2b2d31] bg-[#141517] p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <CalendarIcon size={18} className="text-[#06b6d4]" weight="fill" />
                <span>Dynamic Daily Quota Enforcement (Cell S2)</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#949ba4]">
                The bot continuously queries cell <code className="text-[#06b6d4] bg-[#06b6d4]/10 px-1 py-0.5 rounded">S2</code> from the Master Sheet to read the active capacity limit (default 2 off-days per day). When a shift or date hits quota, the picker marks it full to avoid agency understaffing.
              </p>
            </div>

            <div className="rounded-xl border border-[#2b2d31] bg-[#141517] p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ShieldCheckIcon size={18} className="text-[#a855f7]" weight="fill" />
                <span>Protected Range &amp; Formula Safeguard</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#949ba4]">
                Bot writes exclusively to columns <strong>A through F</strong>. Existing spreadsheet formulas in <strong>Column G (Status)</strong> and <strong>Columns H through P (Weekly Schedule Overview)</strong> are mathematically untouchable, preventing broken sheet workbooks.
              </p>
            </div>

            <div className="rounded-xl border border-[#2b2d31] bg-[#141517] p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ArrowsClockwiseIcon size={18} className="text-[#fbbf24]" weight="bold" />
                <span>In-Process Mutex Concurrency Queue</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#949ba4]">
                High-volume shift changeovers can trigger simultaneous submissions. The bot wraps all Google Sheets API calls in an internal Promise mutex (<code className="text-[#fbbf24] bg-[#fbbf24]/10 px-1 py-0.5 rounded">withMutex()</code>) to eliminate race conditions and double-booking.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-[#2b2d31] bg-[#141517] px-4 py-3 text-xs text-[#949ba4]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#22e273]">● OffBot Production Pipeline</span>
          <span>• Discord Slash Commands • Two-Way Google Apps Script Webhooks</span>
        </div>

        <div className="font-mono text-[11px] text-[#80848e]">
          Node.js • discord.js v14 • googleapis • Luxon • Docker
        </div>
      </div>
    </div>
  );
}
