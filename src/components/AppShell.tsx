"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { useStudio } from "@/context/StudioProvider";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/workspace", label: "Stamp Editor" },
  { href: "/workspace#batch", label: "Batch Placement" },
  { href: "/workspace#audit", label: "Audit History" },
];

const SIDEBAR = [
  { href: "/workspace", icon: "approval", label: "Stamp Tool" },
  { href: "/workspace#vault", icon: "draw", label: "Signature Vault" },
  { href: "/workspace#batch", icon: "library_add_check", label: "Batch Profiles" },
  { href: "/workspace#audit", icon: "verified_user", label: "Audit Trail" },
];

const BOTTOM = [
  { href: "/dashboard", icon: "cloud_upload", label: "Upload" },
  { href: "/workspace", icon: "approval", label: "Editor" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { pdfDoc, setExportOpen } = useStudio();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function exportPdf() {
    if (pathname !== "/workspace") router.push("/workspace");
    setExportOpen(true);
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="fixed inset-x-0 top-0 z-50 h-16 bg-surface-container-lowest shadow-[0_1px_8px_rgba(19,27,46,0.06)]">
        <div className="flex h-16 items-center justify-between gap-space-sm px-gutter sm:gap-space-md">
          <div className="flex min-w-0 items-center gap-space-sm lg:gap-space-lg">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface-container-high lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
            <Link href="/" className="min-w-0 shrink">
              <Logo pro compact />
            </Link>
            {pdfDoc && (
              <div className="hidden items-center gap-space-sm rounded-xl bg-surface-container-low px-space-md py-1.5 2xl:flex">
                <Icon name="description" className="text-primary" />
                <span className="max-w-[220px] truncate font-label-md text-on-surface">
                  {pdfDoc.name}
                </span>
                <span className="flex items-center gap-1 font-label-sm text-secondary">
                  <Icon name="cloud_done" className="text-[16px]" />
                  Saved just now
                </span>
                <span className="font-body-sm text-on-surface-variant">
                  {pdfDoc.pageCount} Pages ({pdfDoc.sizeLabel})
                </span>
              </div>
            )}
          </div>

          <nav className="hidden items-center gap-1 rounded-xl bg-surface-container-low p-1 lg:flex">
            {NAV.map((item) => {
              const active =
                (item.href === "/dashboard" && pathname === "/dashboard") ||
                (item.href.startsWith("/workspace") && pathname === "/workspace" && item.label === "Stamp Editor");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-lg px-space-md py-1.5 font-label-md transition-all ${
                    active
                      ? "bg-surface-container-high text-on-surface"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-space-xs sm:gap-space-sm">
            <div className="hidden items-center rounded-lg bg-surface-container-low p-0.5 sm:flex">
              <button type="button" className="rounded-md p-1.5 text-on-surface-variant hover:bg-surface-container-high">
                <Icon name="undo" />
              </button>
              <button type="button" className="rounded-md p-1.5 text-on-surface-variant hover:bg-surface-container-high">
                <Icon name="redo" />
              </button>
            </div>
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-lg bg-surface-container-low px-space-md py-2 font-label-md text-on-surface xl:flex"
            >
              <Icon name="save" className="text-[18px]" />
              Save Project
            </button>
            <button
              type="button"
              onClick={exportPdf}
              className="flex items-center gap-1.5 rounded-lg bg-primary-container px-space-sm py-2 font-label-md text-on-primary sm:px-space-md"
            >
              <Icon name="download" className="text-[18px]" />
              <span className="hidden sm:inline">Export & Download PDF</span>
              <span className="sm:hidden">Export</span>
            </button>
            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-primary font-label-sm text-on-primary sm:flex">
              JV
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-on-surface/40"
            onClick={() => setMenuOpen(false)}
          />
            <div className="absolute bottom-3 left-gutter right-gutter top-20 overflow-y-auto rounded-2xl bg-surface-container-lowest p-space-md shadow-2xl sm:right-auto sm:w-80">
            <p className="px-space-sm pb-space-sm font-label-sm uppercase tracking-[0.12em] text-outline">
              Navigate
            </p>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-space-md py-2.5 font-label-md hover:bg-surface-container-high"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="mt-space-md px-space-sm pb-space-sm font-label-sm uppercase tracking-[0.12em] text-outline">
              Workspace Assets
            </p>
            <nav className="flex flex-col gap-1">
              {SIDEBAR.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-space-sm rounded-lg px-space-md py-2.5 font-label-md hover:bg-surface-container-high"
                >
                  <Icon name={item.icon} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <aside className="fixed bottom-0 left-0 top-16 hidden w-64 flex-col justify-between bg-surface-container-lowest px-space-sm py-space-lg shadow-[1px_0_8px_rgba(19,27,46,0.04)] lg:flex">
        <div>
          <p className="px-space-md pb-space-sm font-label-sm uppercase tracking-[0.12em] text-outline">
            Workspace Assets
          </p>
          <nav className="flex flex-col gap-1">
            {SIDEBAR.map((item) => {
              const active = item.label === "Stamp Tool" && pathname === "/workspace";
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-space-sm rounded-lg px-space-md py-2.5 font-label-md ${
                    active
                      ? "bg-surface-container-high text-on-surface"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="rounded-xl bg-surface-container-low p-space-md">
          <div className="mb-space-xs flex items-center justify-between">
            <span className="font-label-sm text-on-surface-variant">Storage Quota</span>
            <span className="font-label-sm text-on-surface">64%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div className="h-full w-[64%] bg-primary-container" />
          </div>
          <p className="mt-space-xs font-body-sm text-outline">128 / 200 documents signed</p>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant/50 bg-surface-container-lowest pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="grid grid-cols-3 px-space-sm py-1">
          {BOTTOM.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 rounded-lg py-2 font-label-sm ${
                  active ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={exportPdf}
            className="flex flex-col items-center gap-0.5 rounded-lg py-2 font-label-sm text-on-surface-variant"
          >
            <Icon name="download" />
            Export
          </button>
        </div>
      </nav>

      <div className="pt-16 pb-[4.75rem] lg:pb-0 lg:pl-64">{children}</div>
    </div>
  );
}
