import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Martian_Mono } from "next/font/google";
import { PauseWhenHidden } from "@/components/pause-when-hidden";
import { site } from "@/content/site";
import "./globals.css";

const display = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const description =
  "Custom Discord, Telegram and web apps for agencies: approval flows, shift tracking, chatter stats and alerts.";

export const metadata: Metadata = {
  // DEPLOY STEP: set site.url to the live address so og:url and og:image resolve
  metadataBase: new URL(site.url),
  title: "Agency Apps & Automations | Custom Discord, Telegram & Web Tools",
  description,
  openGraph: {
    title: "Agency Apps & Automations | Custom Discord, Telegram & Web Tools",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#11140e",
  colorScheme: "dark light",
};

// Applies the saved theme before first paint, so light-mode visitors never see a dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"#e2e3d2":"#11140e")}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`[data-reveal] .rv,.hero-in{opacity:1;transform:none;animation:none}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed left-4 top-3 z-50 -translate-y-20 rounded-full bg-accent px-4 py-2 font-mono text-sm text-accent-ink transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <div className="environment" aria-hidden="true" />
        <PauseWhenHidden />
        {children}
      </body>
    </html>
  );
}
