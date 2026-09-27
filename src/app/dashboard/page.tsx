"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ExportModal } from "@/components/ExportModal";
import { Icon } from "@/components/Icon";
import { useStudio } from "@/context/StudioProvider";

const RECENTS = [
  {
    status: "Stamped 12 Pages",
    hash: "SHA256: 7B89...0E33",
    name: "Employment_Contract_Q1.pdf",
    meta: "12 Pages • Today, 11:24 AM • 3.1 MB",
    owner: "A. Kovačević",
    initials: "AK",
    tone: "bg-secondary-container text-on-secondary-container",
  },
  {
    status: "Signed 3 Pages",
    hash: "SHA256: 4C22...89FA",
    name: "Vendor_Agreement_Final.pdf",
    meta: "3 Pages • Yesterday, 4:18 PM • 1.4 MB",
    owner: "M. Lindberg",
    initials: "ML",
    tone: "bg-primary/10 text-primary",
  },
  {
    status: "Ready to Export",
    hash: "SHA256: 110E...99D1",
    name: "NDA_Consulting_Corp.pdf",
    meta: "8 Pages • Oct 28, 2025 • 890 KB",
    owner: "T. Sterling",
    initials: "TS",
    tone: "bg-surface-container-high text-on-surface",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const studio = useStudio();
  const [tab, setTab] = useState<"studio" | "batch">("studio");
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [sigName, setSigName] = useState<string | null>(null);

  async function onPdf(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    await studio.loadPdfFile(file);
    setPdfName(file.name);
  }

  async function onSig(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    await studio.loadSignatureFile(file);
    setSigName(file.name);
  }

  async function sample() {
    await studio.loadSampleContract();
    setPdfName("Commercial_Lease_Agreement_2025.pdf");
    router.push("/workspace");
  }

  return (
    <AppShell>
      <div className="min-h-[calc(100vh-4rem)] p-gutter">
        <div className="mb-space-md flex flex-col gap-space-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label-sm text-secondary">
            • Workspace v2.4 Ready
            <span className="ml-space-md hidden text-outline sm:inline">HASH_KEY: 0x98A...F41B</span>
          </p>
          <div className="flex w-full rounded-xl bg-surface-container-lowest p-1 sm:w-auto">
            <button
              type="button"
              onClick={() => setTab("studio")}
              className={`flex-1 rounded-lg px-space-sm py-2 font-label-md sm:flex-none sm:px-space-md ${tab === "studio" ? "bg-surface-container-high" : "text-on-surface-variant"}`}
            >
              Interactive Studio
            </button>
            <button
              type="button"
              onClick={() => setTab("batch")}
              className={`flex-1 rounded-lg px-space-sm py-2 font-label-md sm:flex-none sm:px-space-md ${tab === "batch" ? "bg-surface-container-high" : "text-on-surface-variant"}`}
            >
              Batch Engine (42)
            </button>
          </div>
        </div>

        <h1 className="font-display-lg max-w-3xl">Upload PDF & Transparent Seal / Signature</h1>
        <p className="font-body-lg mt-space-sm max-w-2xl text-on-surface-variant">
          Automated AI background removal, batch multi-page stamping, and cryptographically verified PDF export.
        </p>

        <div className="mt-space-xl grid gap-space-lg lg:grid-cols-2">
          <DropCard
            step="STEP 01"
            eyebrow="Target PDF Document"
            hint="Primary Binding Container"
            title={pdfName ?? "Drop your PDF document here"}
            body="or browse files from your computer, Drive, or Dropbox"
            meta="Supports PDF 1.4 – 2.0 • Up to 50MB file size • Encrypted or Clean"
            icon="cloud_upload"
            accept="application/pdf"
            onFiles={onPdf}
            actionLabel="Try with Sample Contract.pdf"
            onAction={sample}
          />
          <DropCard
            step="STEP 02"
            eyebrow="Signature, Seal, or Initials"
            hint="Automatic Matte Chroma Isolation"
            title={sigName ?? "Drop Signature or Official Stamp"}
            body="Supports PNG, JPG, WEBP. Auto-removes paper background into crystal transparent ink."
            meta="AI Background Purge • Ultra-HD 600 DPI Alpha"
            icon="draw"
            accept="image/*"
            onFiles={onSig}
            actionLabel="Use Demo Executive Seal"
            onAction={() => {
              studio.loadDemoSeal();
              setSigName("JohnDoe_Official_Seal.png");
            }}
          />
        </div>

        <div className="mt-space-lg grid gap-space-sm sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["auto_fix_high", "Instant AI Alpha", "White-matte purge"],
            ["layers", "Multi-Page Lock", "Synchronized sync"],
            ["high_quality", "Vector High-DPI", "Zero loss quality"],
            ["straighten", "Sub-Pixel Align", "Snaps to baseline"],
          ].map(([icon, title, body]) => (
            <div key={title} className="flex items-center gap-space-sm rounded-xl bg-surface-container-lowest p-space-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                <Icon name={icon} />
              </div>
              <div>
                <p className="font-label-lg">{title}</p>
                <p className="font-body-sm text-on-surface-variant">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-space-xl flex flex-col gap-space-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-space-sm">
            <Icon name="history_edu" />
            <h2 className="font-headline-md">Recent Document Workflows</h2>
            <span className="rounded-full bg-surface-container px-2 py-0.5 font-label-sm">8 active</span>
          </div>
          <div className="hidden items-center gap-space-sm sm:flex">
            <div className="flex items-center gap-1 rounded-lg bg-surface-container-lowest px-space-md py-2 text-on-surface-variant">
              <Icon name="search" className="text-[18px]" />
              <span className="font-body-sm">Filter by document name or tag…</span>
            </div>
            <button type="button" className="rounded-lg bg-surface-container-lowest px-space-md py-2 font-label-md">
              Sort
            </button>
          </div>
        </div>

        <div className="mt-space-md grid gap-space-md lg:grid-cols-3">
          {RECENTS.map((item) => (
            <article key={item.name} className="rounded-2xl bg-surface-container-lowest p-space-md">
              <div className="relative mb-space-md h-36 overflow-hidden rounded-xl bg-surface-container">
                <span className={`absolute left-3 top-3 rounded-full px-2 py-0.5 font-label-sm ${item.tone}`}>
                  {item.status}
                </span>
                <div className="absolute inset-x-8 top-10 h-24 rounded bg-white/80 p-3 shadow-sm">
                  <div className="mb-2 h-2 w-3/4 rounded bg-outline-variant" />
                  <div className="mb-1 h-2 w-full rounded bg-outline-variant/70" />
                  <div className="h-2 w-2/3 rounded bg-outline-variant/70" />
                </div>
              </div>
              <p className="font-label-sm text-outline">{item.hash}</p>
              <h3 className="font-label-lg mt-space-xs">{item.name}</h3>
              <p className="font-body-sm text-on-surface-variant">{item.meta}</p>
              <div className="mt-space-md flex flex-wrap items-center justify-between gap-space-sm">
                <span className="flex items-center gap-space-sm font-label-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-high">
                    {item.initials}
                  </span>
                  {item.owner}
                </span>
                <button
                  type="button"
                  onClick={sample}
                  className="rounded-lg bg-surface-container-high px-space-md py-1.5 font-label-md text-primary"
                >
                  Open in Editor →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-space-lg flex flex-wrap items-center justify-between gap-space-md rounded-2xl bg-surface-container-lowest p-space-md">
          <div className="flex items-start gap-space-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name="verified_user" />
            </div>
            <div>
              <p className="font-label-lg">Cryptographic Proof & Timestamping Standard</p>
              <p className="font-body-sm text-on-surface-variant">
                Every applied stamp is embedded as an immutable PDF vector layer with eIDAS / PAdES compliant metadata hashes.
              </p>
            </div>
          </div>
          <div className="flex gap-space-sm">
            <span className="rounded-full bg-surface-container px-2 py-1 font-label-sm">ISO</span>
            <span className="rounded-full bg-surface-container px-2 py-1 font-label-sm">eIDAS</span>
            <span className="rounded-full bg-secondary-container px-2 py-1 font-label-sm text-on-secondary-container">256</span>
          </div>
        </div>
      </div>
      <ExportModal />
    </AppShell>
  );
}

function DropCard({
  step,
  eyebrow,
  hint,
  title,
  body,
  meta,
  icon,
  accept,
  onFiles,
  actionLabel,
  onAction,
}: {
  step: string;
  eyebrow: string;
  hint: string;
  title: string;
  body: string;
  meta: string;
  icon: string;
  accept: string;
  onFiles: (files: FileList | null) => void;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <label className="flex cursor-pointer flex-col rounded-2xl bg-surface-container-lowest p-space-md shadow-sm sm:p-space-lg">
      <div className="mb-space-lg flex items-start justify-between">
        <div>
          <p className="font-label-lg">{eyebrow}</p>
          <p className="font-body-sm text-on-surface-variant">{hint}</p>
        </div>
        <span className="rounded-full bg-surface-container px-2 py-0.5 font-label-sm text-outline">{step}</span>
      </div>
      <div className="flex flex-1 flex-col items-center rounded-2xl border border-dashed border-outline-variant bg-surface px-space-md py-space-lg text-center sm:py-space-xl">
        <div className="mb-space-md flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high text-primary">
          <Icon name={icon} className="text-[28px]" />
        </div>
        <p className="font-headline-md">{title}</p>
        <p className="mt-space-xs max-w-sm font-body-sm text-on-surface-variant">{body}</p>
        <p className="mt-space-sm font-label-sm text-outline">{meta}</p>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(event) => onFiles(event.target.files)}
        />
      </div>
      <div className="mt-space-md flex justify-stretch sm:justify-end">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            onAction();
          }}
          className="w-full rounded-lg bg-surface-container-high px-space-md py-2 font-label-md text-primary sm:w-auto"
        >
          {actionLabel}
        </button>
      </div>
    </label>
  );
}
