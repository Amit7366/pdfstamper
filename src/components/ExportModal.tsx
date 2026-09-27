"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useStudio } from "@/context/StudioProvider";
import { exportSignedPdf } from "@/lib/export-pdf";

const PRESETS = [
  { id: "web" as const, title: "Web & Email", detail: "150 DPI fast render", size: "~1.2 MB", tag: "FASTEST" },
  { id: "print" as const, title: "Print & High Res", detail: "300 DPI lossless ink", size: "~2.8 MB", tag: "DEFAULT" },
  { id: "archival" as const, title: "Archival PDF/A", detail: "ISO 19005 legal grade", size: "~3.6 MB", tag: "AUDIT" },
];

export function ExportModal() {
  const studio = useStudio();
  const [busy, setBusy] = useState(false);

  if (!studio.exportOpen) return null;

  const pageCount = studio.pdfDoc?.pageCount ?? 4;
  const stamped =
    studio.stamp.placement === "all" ? pageCount : studio.stamp.placement === "custom" ? pageCount : 1;

  async function download() {
    if (!studio.pdfDoc) return;
    setBusy(true);
    try {
      await exportSignedPdf({
        pdfBytes: studio.pdfDoc.bytes,
        signatureUrl: studio.signatureUrl,
        stamp: studio.stamp,
        fileName: studio.fileName,
        preset: studio.exportPreset,
        flatten: studio.flatten,
        timestamp: studio.timestamp,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-on-surface/40 p-0 backdrop-blur-sm sm:items-center sm:p-gutter">
      <div
        role="dialog"
        aria-labelledby="modalTitle"
        className="flex max-h-[92vh] w-full max-w-[660px] flex-col overflow-hidden rounded-t-3xl bg-surface-container-lowest shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-space-sm bg-surface-container-low px-space-md pb-space-md pt-space-lg sm:px-space-xl">
          <div className="flex min-w-0 items-center gap-space-md">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary">
              <Icon name="picture_as_pdf" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-on-secondary">
                <Icon name="check" className="text-[14px]" />
              </span>
            </div>
            <div>
              <div className="flex min-w-0 flex-wrap items-center gap-space-sm">
                <h2 id="modalTitle" className="font-headline-lg text-on-surface">
                  Export Signed Document
                </h2>
                <span className="rounded-full bg-secondary-container px-2 py-0.5 font-label-sm text-on-secondary-container">
                  Ready
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant">
                {studio.pdfDoc?.name ?? "Commercial_Lease_Agreement_2025.pdf"} • {pageCount} Pages • {stamped} Placed Seals
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => studio.setExportOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-outline hover:bg-surface-container-high hover:text-on-surface"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-space-lg overflow-y-auto px-space-md py-space-md sm:px-space-xl">
          <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-label-sm text-secondary">VECTOR STAMP</p>
                <p className="font-body-sm text-on-surface-variant">Crisp transparent seal</p>
              </div>
              <span className="font-label-sm text-secondary">SHA-256 Validated</span>
            </div>
            <label className="font-label-md text-on-surface">
              Export File Name
              <input
                value={studio.fileName}
                onChange={(event) => studio.setFileName(event.target.value)}
                className="mt-space-xs w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-space-md py-2 font-body-md outline-none focus:border-primary"
              />
            </label>
            <p className="font-body-sm text-outline">Target: Local PDF</p>
          </div>

          <div>
            <div className="mb-space-sm flex items-center justify-between">
              <p className="font-label-lg text-on-surface">Compression & Optimization</p>
              <span className="font-label-sm text-secondary">Standard Adobe Compliant</span>
            </div>
            <div className="grid grid-cols-1 gap-space-sm md:grid-cols-3">
              {PRESETS.map((preset) => {
                const active = studio.exportPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => studio.setExportPreset(preset.id)}
                    className={`rounded-xl border p-space-md text-left ${
                      active
                        ? "border-primary-container bg-primary/5"
                        : "border-outline-variant bg-surface-container-lowest"
                    }`}
                  >
                    <p className="font-label-lg text-on-surface">{preset.title}</p>
                    <p className="font-body-sm text-on-surface-variant">{preset.detail}</p>
                    <div className="mt-space-sm flex items-center justify-between">
                      <span className="font-label-md text-primary">{preset.size}</span>
                      <span className="rounded bg-surface-container px-1.5 py-0.5 font-label-sm text-outline">
                        {preset.tag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-space-sm rounded-full bg-surface-container-low px-space-md py-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-label-md text-on-surface">Placement Scope</span>
            <span className="font-body-sm text-on-surface-variant">
              Stamping {stamped} of {pageCount} pages
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            <p className="font-label-sm uppercase tracking-[0.08em] text-outline">
              Integrity & Security Controls
            </p>
            <label className="flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md">
              <input
                type="checkbox"
                checked={studio.flatten}
                onChange={(event) => studio.setFlatten(event.target.checked)}
                className="mt-1"
              />
              <span>
                <span className="block font-label-lg text-on-surface">Flatten signatures into document bitmap</span>
                <span className="font-body-sm text-on-surface-variant">
                  Prevents extraction, layer tampering, or seal modification in downstream PDF viewers.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md">
              <input
                type="checkbox"
                checked={studio.timestamp}
                onChange={(event) => studio.setTimestamp(event.target.checked)}
                className="mt-1"
              />
              <span>
                <span className="block font-label-lg text-on-surface">
                  Attach cryptographic audit trail & timestamp
                  <span className="ml-2 rounded bg-secondary-container px-1.5 py-0.5 font-label-sm text-on-secondary-container">
                    RFC 3161
                  </span>
                </span>
                <span className="font-body-sm text-on-surface-variant">
                  Appends cryptographic verification record with signing identity and UTC coordinate log.
                </span>
              </span>
            </label>
            <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-space-md">
              <span className="font-label-md text-on-surface">Password Encryption</span>
              <span className="font-body-sm text-outline">Disabled</span>
            </div>
            <div className="flex flex-col gap-space-xs px-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-body-sm text-on-surface-variant">Generation Engine: WebAssembly PDF Core</span>
              <span className="font-body-sm text-primary">Estimated time: &lt; 2.0s</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-space-sm border-t border-outline-variant bg-surface-container-lowest px-space-md py-space-md pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-end sm:px-space-xl">
          <button
            type="button"
            className="rounded-lg bg-surface-container-low px-space-md py-2.5 font-label-md text-on-surface sm:py-2"
          >
            Save Copy to Cloud Vault
          </button>
          <button
            type="button"
            onClick={() => studio.setExportOpen(false)}
            className="rounded-lg px-space-md py-2.5 font-label-md text-on-surface-variant sm:py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={busy || !studio.pdfDoc}
            onClick={download}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-primary-container px-space-md py-2.5 font-label-md text-on-primary disabled:opacity-50 sm:py-2"
          >
            <Icon name="download" />
            {busy ? "Preparing..." : "Download Signed PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
