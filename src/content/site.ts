// Every visible line of copy lives here, so text changes never touch the components.

export const site = {
  name: "Agency Apps & Automation",
  initials: "AA",
  tagline: "Custom apps and automation for agency teams",
  discord: "@IFeelGucci",
  discordUsername: "IFeelGucci",
  available: true,
  url: "https://example.com",
};

export const nav = {
  links: [
    { href: "#work", label: "Work" },
    { href: "#process", label: "Workflow" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
  ],
  status: "",
  cta: "Discord @IFeelGucci",
};

export const hero = {
  title: "I build the apps your agency runs on.",
  lede: "Approval flows, shift tracking and chatter stats for Discord and Telegram teams. Built to order, kept running.",
  primary: { href: "#contact", label: "Contact on Discord" },
  secondary: { href: "#work", label: "See the apps" },
};

// Figures from production deployments across client servers.
export const metrics = [
  { value: "450K+", label: "tasks automated every month" },
  { value: "99.98%", label: "app uptime across client servers" },
  { value: "<350ms", label: "average webhook dispatch" },
  { value: "100%", label: "custom code, no templates" },
];

export type Platform = "Discord" | "Telegram" | "Web" | "Desktop" | "Google Sheets";

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  features: string[];
  platforms: Platform[];
  tags?: string[];
  screenshot?: string;
  example?: boolean;
};

export const featured: Project = {
  slug: "mm-approval",
  name: "MM Approval App",
  category: "Workflow & Ops",
  summary:
    "Stateless mass message approval engine for Discord agency teams. Writers submit drafts, managers approve, reject, or request revisions in dedicated threads — with zero database dependencies.",
  features: [
    "Stateless interaction design: state encoded in button payloads for zero-downtime restarts",
    "One-click Approve, Reject, and Redo actions with modal reviewer notes",
    "Automated revision threads carrying the reviewer's feedback notes",
    "Audit log with creator turnaround stats and submission history",
  ],
  platforms: ["Discord"],
  tags: ["Python", "discord.py", "Stateless Architecture", "Docker"],
};

export const projects: Project[] = [
  {
    slug: "cico-supervisor",
    name: "CICO Supervisor & Staff Analytics",
    category: "Operations & Analytics",
    summary:
      "Real-time shift clock-in/out supervisor for Discord agency teams, paired with a dark-glassmorphism web dashboard featuring live staffing metrics, punctuality tracking, and shift audits.",
    features: [
      "Channel-bound check-ins (co/!co) with automated lateness and overtime detection",
      "Multi-model assignment: staff can clock into multiple creator channels simultaneously",
      "Real-time staffing board, daily shift history, and live channel status (!list, !who)",
      "Dark-mode SaaS analytics dashboard with Chart.js charts and CSV/JSON export",
    ],
    platforms: ["Discord", "Web"],
    tags: ["Node.js", "SQLite WAL", "Chart.js", "Docker"],
  },
  {
    slug: "autoticket",
    name: "Training Server Automation",
    category: "Operations & Training",
    summary:
      "All-in-one onboarding and staff training operations platform for Discord agencies. Automatically provisions private trainee support channels, tracks training watchtime and inactivity, schedules 24h recurring broadcast announcements, and rotates weekly check-in questions through a dark WebUI.",
    features: [
      "Automatic private trainee channel provisioning with step-by-step onboarding embeds",
      "Real-time ticket board tracking 69+ trainees across Unsorted, LT1-LT3, Trial, and Advanced stages",
      "Automated 24h recurring broadcast announcements with self-deleting message windows",
      "Weekly/daily bump question rotation manager and 3-day inactivity warning triggers",
    ],
    platforms: ["Discord", "Web"],
    tags: ["Node.js", "discord.js", "SQLite WAL", "TailwindCSS", "Docker"],
  },
  {
    slug: "mm-bump",
    name: "MMBump Shift Automation",
    category: "Workflow & Automation",
    summary:
      "Precision shift-based notification app that triggers compliance bump alerts across Main, Grave, and Noon shifts, with automatic 30-minute self-deletion to eliminate chat clutter.",
    features: [
      "10 precisely timed daily bumps mapped to Main, Grave, and Noon shift windows",
      "Automated targeted role mentions (@main, @grave, @noon) per shift schedule",
      "Self-cleaning message lifecycle: automatically deletes notices after 30 minutes",
      "Slash command /status showing live server time, next bump countdown, and channel mappings",
    ],
    platforms: ["Discord"],
    tags: ["Python", "discord.py", "AsyncIO", "Docker"],
  },
  {
    slug: "tiktok-live-alert",
    name: "TikTok Live Stream Alert",
    category: "Monitoring & Alerts",
    summary:
      "Continuous TikTok livestream monitor that broadcasts instant high-priority alerts to Discord channels when managed creators go live, pausing regular chatter and driving immediate stream traffic.",
    features: [
      "Sub-minute stream detection with direct one-click links to active TikTok live sessions",
      "Configurable high-urgency notifications with role pings (@everyone / chatter alerts)",
      "Automated stream-end detection and 'Resume chatting' status broadcast",
      "In-chat configuration commands (?setchannel, ?add @creator) without server restarts",
    ],
    platforms: ["Discord"],
    tags: ["Python", "TikTok Scraper API", "discord.py", "Docker"],
  },
  {
    slug: "live-alert",
    name: "CB Live Alert Monitor",
    category: "Monitoring & Alerts",
    summary:
      "Headless, multi-instance CB livestream notification engine for agency chat channels, providing 24/7 creator uptime tracking with rate-limit protection and instant Discord webhook dispatches.",
    features: [
      "Multi-instance support with isolated configuration files per agency server",
      "Real-time CB stream status polling with built-in backoff and rate-limit safeguards",
      "Rich embed notifications with creator metadata, stop-chatting alerts, and direct stream links",
      "Containerized Docker Compose architecture with quick-deploy update scripts",
    ],
    platforms: ["Discord"],
    tags: ["Node.js", "discord.js", "REST Webhooks", "Docker"],
  },
  {
    slug: "revtrack",
    name: "RevTrack Financial Pipeline",
    category: "Finance & Analytics",
    summary:
      "Agency financial pipeline and black-box automation engine that ingests daily revenue reports in .xlsx format across multiple agency partner inboxes, extracts creator earnings, calculates net splits against daily targets, and syncs a real-time master Google Sheets dashboard with projection goals.",
    features: [
      "Multi-agency .xlsx ingestion engine with automated Excel workbook parsing",
      "Black-box revenue reconciliation calculating Creator Gross, Net, and daily target pacing",
      "Real-time synchronization with Master Google Sheets dashboards with projection goal tracking",
      "Desktop GUI application and headless runner with crash-resilient SQLite local caching",
    ],
    platforms: ["Desktop", "Google Sheets"],
    tags: ["Python", "Google Sheets API", "Excel .XLSX", "Pandas", "OpenPyXL"],
  },
  {
    slug: "corep-bot",
    name: "CoRep Shift & Compliance Monitor",
    category: "Operations & Compliance",
    summary:
      "Specialized Discord compliance app that tracks CO report submissions, enforces shift deadlines, and alerts supervisors when submissions fail administrative review.",
    features: [
      "Real-time parsing and validation of !corep submissions in designated model channels",
      "Supervisor reaction triggers: reacting with ❌ instantly generates an invalidation alert",
      "Automated shift window tracking and missed-deadline escalation",
      "Persistent SQLite audit logging for dispute resolution and chatter compliance records",
    ],
    platforms: ["Discord"],
    tags: ["Python", "discord.py", "SQLite"],
  },
  {
    slug: "mm-approval",
    name: "MM Approval (Stateless)",
    category: "Workflow & Ops",
    summary:
      "Stateless approval flow app for mass message scheduling. State encoded directly in Discord button IDs ensures instant recovery from server restarts with zero database overhead.",
    features: [
      "Stateless pipe-delimited button IDs (<action>|<channel_id>|<message_id>)",
      "Instant supervisor Approve, Reject, and Redo moderation flows",
      "Threaded review workflows with mandatory revision notes",
      "Role-based authorization and high-throughput Discord Gateway handling",
    ],
    platforms: ["Discord"],
    tags: ["Python", "discord.py", "Docker"],
  },
];

export const work = {
  title: "Apps in production",
  lede: "Each one replaced a spreadsheet, a group chat, or someone's evening.",
  demoHint: "Try it. This is the review flow your managers would use.",
};

// 4-Phase Agency Workflow: Problem Intake -> Architecture -> Build & Parallel Test -> Production
export const buildProcess = {
  title: "How a build goes: from problem to production",
  steps: [
    {
      step: "01",
      label: "Problem Intake",
      summary: "First contact & bottleneck mapping",
      body: "You reach out on Discord with the problem: manual workloads, broken spreadsheets, or processes that slow your agency down.",
    },
    {
      step: "02",
      label: "Analysis & Architecture",
      summary: "Evaluate and engineer the blueprint",
      body: "I evaluate your existing solution or brainstorm a custom architecture from scratch, designing data models, fail-safes, and webhook integrations.",
    },
    {
      step: "03",
      label: "Build & Parallel Testing",
      summary: "Development with comparative validation",
      body: "I build the automation engine and run side-by-side comparative parallel tests against real agency historical data to guarantee 100% precision.",
    },
    {
      step: "04",
      label: "Production Launch",
      summary: "Live deployment & ongoing reliability",
      body: "The solution is launched live into your production environment with 24/7 uptime monitoring, error guards, and complete handover.",
    },
  ],
};

export const stack = {
  title: "Built on the platforms your team already lives in",
  lede: "Discord Gateway, Telegram, web dashboards and custom APIs, wired into the databases and tools you already pay for.",
};

export const contact = {
  badge: "Direct Discord Contact",
  title: "Contact is handled exclusively via Discord.",
  lede: "Have a manual bottleneck or a workflow that needs custom automation? Reach out directly to @IFeelGucci on Discord with a quick summary of the problem.",
  discordHandle: "@IFeelGucci",
  discordUsername: "IFeelGucci",
  discordUrl: "https://discord.com",
  availability: "Available for new agency automation projects",
  responseNotice: "Direct 1-on-1 chat • Fast response",
  workflowSummary: [
    "1. You message with your problem or bottleneck",
    "2. Problem analysis & solution architecture",
    "3. Development sprint & comparative parallel testing",
    "4. Production release & live deployment",
  ],
  dmTemplates: [
    {
      label: "Agency Bottleneck",
      text: "Hey @IFeelGucci! We run an agency and have a bottleneck in [briefly explain task/workflow]. Looking for custom automation.",
    },
    {
      label: "Custom Bot Request",
      text: "Hey @IFeelGucci! I reviewed your portfolio and want to discuss building a custom bot for our team. When are you free to chat?",
    },
  ],
};
