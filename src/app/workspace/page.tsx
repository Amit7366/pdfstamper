"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ExportModal } from "@/components/ExportModal";
import { Icon } from "@/components/Icon";
import { PdfCanvas } from "@/components/PdfCanvas";
import { useStudio } from "@/context/StudioProvider";
import { INK_COLORS, type InkColor } from "@/lib/stamp";

export default function WorkspacePage() {
  const studio = useStudio();
  const pageCount = studio.pdfDoc?.pageCount ?? 4;
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (!studio.pdfDoc) {
      void studio.loadSampleContract();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studio.pdfDoc]);

  useEffect(() => {
    document.body.style.overflow = panelOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [panelOpen]);

  return (
    <AppShell>
      <div className="flex min-h-[calc(100dvh-8.75rem)] gap-space-md p-gutter lg:min-h-[calc(100vh-4rem)]">
        <aside className="hidden w-[300px] shrink-0 flex-col gap-space-md xl:flex">
          <StampTools studio={studio} pageCount={pageCount} radioName="placement-desktop" />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col gap-space-md">
          <div className="flex flex-wrap items-center justify-between gap-space-sm rounded-xl bg-surface-container-lowest px-space-sm py-2 sm:px-space-md">
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => studio.setZoom(Math.max(0.6, studio.zoom - 0.1))} className="rounded-lg p-2 hover:bg-surface-container-high">
                <Icon name="remove" />
              </button>
              <span className="w-12 text-center font-label-md sm:w-14">{Math.round(studio.zoom * 100)}%</span>
              <button type="button" onClick={() => studio.setZoom(Math.min(1.8, studio.zoom + 0.1))} className="rounded-lg p-2 hover:bg-surface-container-high">
                <Icon name="add" />
              </button>
              <button type="button" onClick={() => studio.setZoom(1)} className="ml-space-sm rounded-lg px-space-sm py-1 font-label-sm hover:bg-surface-container-high">
                Fit Width
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => studio.setPage(Math.max(1, studio.page - 1))}
                className="rounded-lg p-2 hover:bg-surface-container-high"
              >
                <Icon name="chevron_left" />
              </button>
              <span className="font-label-md">
                Page {studio.page} of {pageCount}
              </span>
              <button
                type="button"
                onClick={() => studio.setPage(Math.min(pageCount, studio.page + 1))}
                className="rounded-lg p-2 hover:bg-surface-container-high"
              >
                <Icon name="chevron_right" />
              </button>
              <button
                type="button"
                onClick={() => setPanelOpen(true)}
                className="ml-space-sm inline-flex items-center gap-1 rounded-lg bg-surface-container-high px-space-sm py-1.5 font-label-sm xl:hidden"
              >
                <Icon name="tune" className="text-[18px]" />
                Stamp
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 justify-center overflow-auto rounded-2xl bg-surface-container-low p-space-sm sm:p-space-md lg:p-space-xl">
            <PdfCanvas />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-space-sm">
            <button type="button" onClick={studio.resetStamp} className="rounded-lg bg-surface-container-lowest px-space-md py-2 font-label-md">
              Reset Position
            </button>
            <button type="button" className="rounded-lg bg-error-container px-space-md py-2 font-label-md text-error">
              Remove Stamp
            </button>
            <button
              type="button"
              onClick={() => studio.setExportOpen(true)}
              className="w-full rounded-lg bg-primary-container px-space-md py-2 font-label-md text-on-primary sm:w-auto"
            >
              Commit & Preview Signed PDF
            </button>
          </div>
        </section>

        <aside className="hidden w-[260px] shrink-0 flex-col gap-space-md 2xl:flex">
          <SpecTools studio={studio} pageCount={pageCount} />
        </aside>
      </div>

      {panelOpen && (
        <div className="fixed inset-0 z-[55] xl:hidden">
          <button
            type="button"
            aria-label="Close stamp settings"
            className="absolute inset-0 bg-on-surface/40"
            onClick={() => setPanelOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-surface pb-[env(safe-area-inset-bottom)] shadow-2xl">
            <div className="flex items-center justify-between px-gutter pt-space-md">
              <p className="font-label-lg">Stamp settings</p>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-surface-container-high"
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="flex flex-col gap-space-md overflow-y-auto p-gutter pb-space-xl">
              <StampTools studio={studio} pageCount={pageCount} radioName="placement-sheet" />
              <SpecTools studio={studio} pageCount={pageCount} />
            </div>
          </div>
        </div>
      )}
      <ExportModal />
    </AppShell>
  );
}

function StampTools({
  studio,
  pageCount,
  radioName,
}: {
  studio: ReturnType<typeof useStudio>;
  pageCount: number;
  radioName: string;
}) {
  return (
    <>
      <section className="rounded-2xl bg-surface-container-lowest p-space-md">
        <div className="mb-space-sm flex items-center justify-between">
          <p className="font-label-sm uppercase tracking-[0.08em] text-outline">Source Artifacts</p>
          <span className="rounded-full bg-secondary-container px-2 py-0.5 font-label-sm text-on-secondary-container">
            Ready
          </span>
        </div>
        <div className="rounded-xl bg-surface-container-low p-space-sm">
          <p className="truncate font-label-md">{studio.pdfDoc?.name ?? "Commercial_Lease_Agreement_2025.pdf"}</p>
          <p className="font-body-sm text-on-surface-variant">
            {pageCount} Pages • {studio.pdfDoc?.sizeLabel ?? "2.4 MB"}
          </p>
        </div>
        <div className="mt-space-sm rounded-xl bg-surface-container-low p-space-sm">
          <p className="truncate font-label-md">{studio.signatureName}</p>
          <p className="font-body-sm text-secondary">
            {studio.signatureBusy
              ? "Isolating paper background…"
              : studio.isDemoSeal
                ? "Vector seal (transparent)"
                : studio.stamp.autoIsolate
                  ? "AI Keyed (paper removed)"
                  : "Original photo (paper kept)"}
          </p>
          <div
            className="mt-space-sm flex h-16 items-center justify-center overflow-hidden rounded-lg"
            style={{
              background: "repeating-conic-gradient(#d8d6e0 0% 25%, #ffffff 0% 50%) 50% / 12px 12px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={studio.signatureUrl} alt="" className="max-h-16 max-w-full object-contain" />
          </div>
          <label className="mt-space-sm block cursor-pointer font-label-sm text-primary">
            Replace signature image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void studio.loadSignatureFile(file);
                event.target.value = "";
              }}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between">
          <p className="font-label-lg">Stamp Configuration</p>
          <button type="button" onClick={studio.resetStamp} className="font-label-sm text-primary">
            Reset
          </button>
        </div>
        <Toggle
          label="Auto-Isolate Ink"
          hint="Luminance channel removal"
          checked={studio.stamp.autoIsolate}
          onChange={(value) => studio.setStamp({ autoIsolate: value })}
        />
        <Slider
          label="Opacity"
          value={Math.round(studio.stamp.opacity * 100)}
          suffix="%"
          onChange={(value) => studio.setStamp({ opacity: value / 100 })}
        />
        <Slider
          label="Scale"
          value={Math.round(studio.stamp.scale * 100)}
          suffix="%"
          min={30}
          max={160}
          onChange={(value) => studio.setStamp({ scale: value / 100 })}
        />
        <Slider
          label="Rotation (Tilt)"
          value={studio.stamp.rotation}
          suffix="°"
          min={-30}
          max={30}
          onChange={(value) => studio.setStamp({ rotation: value })}
        />

        <p className="mb-space-sm mt-space-md font-label-md">Vector Re-tint</p>
        <div className="grid grid-cols-4 gap-1.5">
          {(Object.keys(INK_COLORS) as InkColor[]).map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => studio.setStamp({ color })}
              className={`flex flex-col items-center gap-1 rounded-lg p-1.5 ${
                studio.stamp.color === color ? "bg-surface-container-high" : "bg-surface-container-low"
              }`}
            >
              <span className="h-7 w-7 rounded-full" style={{ background: INK_COLORS[color] }} />
              <span className="font-label-sm capitalize">{color === "seal" ? "Seal Red" : color}</span>
            </button>
          ))}
        </div>

        <p className="mb-space-sm mt-space-md font-label-md">Placement & Coordinates</p>
        <div className="grid grid-cols-2 gap-2">
          <Coord label="X Coordinate" value={`${Math.round(studio.stamp.xPct * 680)} px`} />
          <Coord label="Y Coordinate" value={`${Math.round(studio.stamp.yPct * 880)} px`} />
        </div>

        <p className="mb-space-sm mt-space-md flex items-center justify-between font-label-md">
          Batch Placement
          <span className="font-label-sm text-secondary">Synced</span>
        </p>
        {(
          [
            ["all", `Apply to All Pages (${pageCount}/${pageCount})`],
            ["first", "First Page Only"],
            ["last", "Last Page Only (Clause Execution)"],
            ["custom", "Custom Range"],
          ] as const
        ).map(([id, label]) => (
          <label key={id} className="mb-1 flex items-center gap-space-sm rounded-lg px-space-sm py-2 hover:bg-surface-container-low">
            <input
              type="radio"
              name={radioName}
              checked={studio.stamp.placement === id}
              onChange={() => studio.setStamp({ placement: id })}
            />
            <span className="font-body-sm">{label}</span>
          </label>
        ))}
        <Toggle
          label="Batch Coordinate Lock"
          checked={studio.stamp.batchLock}
          onChange={(value) => studio.setStamp({ batchLock: value })}
        />
      </section>
    </>
  );
}

function SpecTools({
  studio,
  pageCount,
}: {
  studio: ReturnType<typeof useStudio>;
  pageCount: number;
}) {
  return (
    <>
      <section className="rounded-2xl bg-surface-container-lowest p-space-md">
        <p className="mb-space-sm font-label-lg">Document Specs</p>
        {[
          ["Standard", "PDF 1.7 (ISO 32000)"],
          ["Color Space", "DeviceRGB (sRGB)"],
          ["Page Dimensions", '8.5" x 11.0" Letter'],
          ["Encryption", "Unrestricted"],
        ].map(([k, v]) => (
          <div key={k} className="mb-space-xs flex items-center justify-between gap-space-sm">
            <span className="font-body-sm text-on-surface-variant">{k}</span>
            <span className="text-right font-label-sm">{v}</span>
          </div>
        ))}
      </section>
      <section className="rounded-2xl bg-surface-container-lowest p-space-md">
        <p className="mb-space-sm font-label-lg">Signature Metrology</p>
        {[
          ["Native Resolution", "840 × 360 px"],
          ["Render Fidelity", "300 DPI Vector"],
          ["Pixel Format", "RGBA 32-bit"],
          ["Anchor Mode", "Bottom-Right Matrix"],
        ].map(([k, v]) => (
          <div key={k} className="mb-space-xs flex items-center justify-between gap-space-sm">
            <span className="font-body-sm text-on-surface-variant">{k}</span>
            <span className="text-right font-label-sm">{v}</span>
          </div>
        ))}
      </section>
      <section className="rounded-2xl bg-surface-container-lowest p-space-md">
        <div className="mb-space-sm flex items-center justify-between gap-space-sm">
          <p className="font-label-lg">Page Sync Overview</p>
          <span className="font-label-sm text-secondary">{pageCount} Pages Active</span>
        </div>
        {["Lead Clause", "Liability", "Rider Attachments", "Signature Signoff"].slice(0, pageCount).map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => studio.setPage(index + 1)}
            className={`mb-space-xs w-full rounded-xl border p-space-sm text-left ${
              studio.page === index + 1 ? "border-primary-container bg-primary/5" : "border-transparent bg-surface-container-low"
            }`}
          >
            <div className="flex items-center justify-between gap-space-sm">
              <span className="font-label-md">
                Page {index + 1} ({label})
              </span>
              <span className="font-label-sm text-secondary">Synced</span>
            </div>
            <span className="mt-1 inline-block rounded bg-surface-container-highest px-1.5 py-0.5 font-label-sm">
              STAMP
            </span>
          </button>
        ))}
      </section>
    </>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="mb-space-md flex items-center justify-between gap-space-sm">
      <div>
        <p className="font-label-md">{label}</p>
        {hint && <p className="font-body-sm text-on-surface-variant">{hint}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full ${checked ? "bg-secondary" : "bg-outline-variant"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function Slider({
  label,
  value,
  suffix,
  min = 0,
  max = 100,
  onChange,
}: {
  label: string;
  value: number;
  suffix: string;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="mb-space-md block">
      <span className="mb-1 flex items-center justify-between font-label-md">
        {label}
        <span>
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-primary-container"
      />
    </label>
  );
}

function Coord({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-container-low p-space-sm">
      <p className="font-label-sm text-outline">{label}</p>
      <p className="font-label-lg">{value}</p>
    </div>
  );
}
