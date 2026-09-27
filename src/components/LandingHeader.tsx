"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

const NAV = [
  ["#features", "Features"],
  ["#how", "How it Works"],
  ["#batch", "Batch Stamping"],
  ["#security", "Security & Compliance"],
  ["#pricing", "Pricing"],
  ["#faq", "FAQ"],
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-space-sm px-4 sm:px-6 lg:px-12">
        <Link href="/" className="min-w-0" onClick={() => setOpen(false)}>
          <Logo compact />
        </Link>
        <nav className="hidden items-center gap-space-lg xl:flex">
          {NAV.map(([href, label], index) => (
            <a
              key={href}
              href={href}
              className={`font-label-lg ${index === 0 ? "font-bold text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-space-sm">
          <Link href="/dashboard" className="hidden font-label-lg text-on-surface sm:inline-flex">
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-lg bg-primary-container px-space-sm py-2 font-label-lg text-on-primary sm:px-space-md"
          >
            <span className="sm:hidden">Launch</span>
            <span className="hidden sm:inline">Launch Web App</span>
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface-container-high xl:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-space-md py-2.5 font-label-lg text-on-surface hover:bg-surface-container-high"
              >
                {label}
              </a>
            ))}
            <Link
              href="/dashboard"
              className="rounded-lg px-space-md py-2.5 font-label-lg text-primary sm:hidden"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
