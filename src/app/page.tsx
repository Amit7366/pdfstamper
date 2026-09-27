import Link from "next/link";
import { LandingHeader } from "@/components/LandingHeader";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

const CAPABILITIES = [
  ["auto_fix_high", "CAPABILITY 01", "Zero-Friction AI Background Purge", "Turn smartphone photos of handwritten signatures or paper notary seals into clean vector-grade transparent PNGs.", "Explore Matte Thresholding"],
  ["layers", "CAPABILITY 02", "Synchronized Multi-Page Batch Stamping", "Set stamp coordinates once on Page 1. Automatically replicate across 50+ contract pages with cover-page exclusion.", "View Coordinate Matrix"],
  ["lock_clock", "CAPABILITY 03", "Bank-Grade Cryptographic Tamper-Proofing", "Flatten vector signatures into document bitmaps with RFC 3161 timestamps and immutable SHA-256 audit logs.", "Audit Log Specs"],
  ["crop_rotate", "CAPABILITY 04", "Live Interactive Precision Editor", "Sub-pixel snapping, bounding-box handles, rotation to -0.5°, and one-click ink re-tinting.", "Learn Precision Snapping"],
  ["shield", "CAPABILITY 05", "100% Privacy-First Architecture", "Process sensitive legal documents locally in browser memory via WebAssembly. Zero PDFs ever leave your machine.", "Review Privacy Model"],
  ["picture_as_pdf", "CAPABILITY 06", "PDF/A Archival & Lossless Export", "ISO 19005 archival standards and print-ready 300+ DPI without losing text searchability.", "Check ISO Compliance"],
];

const STEPS = [
  ["01", "upload_file", "Drop PDF & Signature", "Drop your multi-page agreement alongside a camera photo of your paper signature or company seal."],
  ["02", "auto_fix_high", "Instant Matte Clean", "Embedded AI strips grey background noise. Re-color ink to Royal Blue or Carbon Black."],
  ["03", "dynamic_feed", "Magnetic Batch Anchor", "Place it on Page 1. Select Apply to All or Odd Pages Only. Baseline guides snap it universally."],
  ["04", "task_alt", "Flatten & Export", "Download your sealed PDF. The signature is burned in with a cryptographic audit token."],
];

const COMPARISON = [
  ["Multi-Page Placement", "Manual placement per page (Very slow)", "Instant 1-Click Multi-Page Batch Sync"],
  ["Scanned Signature Clean-up", "None (Leaves dirty white block)", "Automated AI Matte Background Purge"],
  ["Data Privacy & Security", "Uploaded to third-party cloud servers", "100% On-Device WebAssembly (Zero uploads)"],
  ["Ink Re-tinting", "Fixed black / uncustomizable", "True Royal Blue, Carbon Black, Legal Red"],
  ["Tamper Flattening", "Extractable layered annotation vector", "Lossless Monolithic Bit-Level Flattening"],
  ["Pricing Model", "$40+ / month / envelope limits", "Free Unlimited or One-Time Flat License"],
];

export default function LandingPage() {
  return (
    <div className="overflow-x-clip bg-surface text-on-surface">
      <LandingHeader />

      <main className="pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute left-1/2 top-[-9rem] h-[340px] w-[min(880px,140vw)] -translate-x-1/2 bg-gradient-to-r from-primary/10 via-tertiary/10 to-secondary/10 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 pb-space-2xl pt-space-xl sm:px-6 lg:px-12">
            <div className="mb-space-lg flex justify-center">
              <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-space-xs gap-y-1 rounded-full bg-surface-container-low px-space-md py-1.5 text-center font-label-md text-primary">
                WebAssembly & On-Device AI
                <span className="hidden text-on-surface-variant sm:inline">• Zero Cloud Uploads • 100% Local Privacy</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </div>
            </div>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="font-display-lg mb-space-md text-on-surface">
                Batch Stamp & Sign <span className="text-primary">100+ PDF Pages</span> in Seconds — Crystal Clear Transparency Guaranteed.
              </h1>
              <p className="font-body-lg mx-auto mb-space-xl max-w-2xl text-on-surface-variant">
                Instantly isolate scanned signatures from white backgrounds, synchronize initial seals across multiple document pages, and export tamper-evident, RFC 3161 timestamped PDFs.
              </p>
              <div className="mb-space-sm flex flex-col items-center justify-center gap-space-md sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center gap-space-xs rounded-xl bg-primary-container px-space-lg py-3 font-label-lg text-on-primary sm:w-auto sm:px-space-xl"
                >
                  <Icon name="draw" />
                  Try in Browser Free (No Sign-up)
                </Link>
                <a
                  href="#how"
                  className="inline-flex w-full items-center justify-center gap-space-xs rounded-xl bg-surface-container-high px-space-lg py-3 font-label-lg text-on-surface sm:w-auto sm:px-space-xl"
                >
                  <Icon name="play_circle" />
                  Watch 60s Demo
                </a>
              </div>
              <p className="font-body-sm text-outline">
                Works seamlessly offline • 100% Client-Side In-Memory Processing • No Watermarks
              </p>
            </div>

            <div className="mt-space-2xl rounded-3xl bg-surface-container-low p-space-md lg:p-space-lg">
              <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-md">
                <div>
                  <p className="font-label-lg text-on-surface">Master_Lease_Agreement_v4_Executed.pdf</p>
                  <p className="font-body-sm text-on-surface-variant">48 Pages Loaded</p>
                </div>
                <div className="flex flex-wrap items-center gap-space-xs">
                  {["Single Page", "Odd Pages", "All Except Cover"].map((label, index) => (
                    <span
                      key={label}
                      className={`rounded-lg px-2.5 py-1 font-label-sm ${index === 0 ? "bg-surface-container-lowest text-on-surface" : "text-on-surface-variant"}`}
                    >
                      {label}
                    </span>
                  ))}
                  <span className="rounded-full bg-secondary-container px-2 py-0.5 font-label-sm text-on-secondary-container">
                    47 Anchors Locked
                  </span>
                </div>
              </div>
              <div className="grid gap-space-lg lg:grid-cols-12">
                <PreviewCard
                  className="lg:col-span-4"
                  badge="Smart Extraction"
                  meta="99.8% Alpha Precision"
                  title="Scanned Paper to Pure Vector"
                  body="Real-time local AI removes yellowed office paper & uneven shadows from phone snaps."
                >
                  <div className="grid grid-cols-2 gap-space-sm">
                    <div className="rounded-xl bg-surface-container p-space-sm">
                      <p className="font-label-sm text-outline">Before: Phone Photo</p>
                      <p className="font-body-sm">Grey cast + Noise</p>
                    </div>
                    <div className="rounded-xl bg-surface-container-lowest p-space-sm">
                      <p className="font-label-sm text-secondary">After: Pure PNG</p>
                      <p className="font-body-sm">100% Alpha Trans</p>
                    </div>
                  </div>
                  <p className="mt-space-md font-label-sm text-on-surface-variant">Simulate Ink Re-tint:</p>
                  <div className="mt-space-xs flex flex-wrap items-center gap-space-xs">
                    {["#004ac6", "#131b2e", "#ba1a1a", "#006c49"].map((color, index) => (
                      <span
                        key={color}
                        className={`h-7 w-7 rounded-full ${index === 0 ? "ring-2 ring-primary-container ring-offset-2" : ""}`}
                        style={{ background: color }}
                      />
                    ))}
                    <span className="self-center font-label-sm text-primary">Royal Blue active</span>
                  </div>
                </PreviewCard>
                <PreviewCard
                  className="lg:col-span-5"
                  badge="Coordinate Engine"
                  meta="X: 182mm • Y: 264mm"
                  title="Multi-Page Real-Time Sync"
                  body="Place your initial or seal on Page 1. Magnetic baseline anchors it universally across all 47 follow-up pages."
                >
                  <div className="relative flex h-40 items-center justify-center rounded-xl bg-surface-container-low">
                    <div className="rounded-xl border-2 border-primary px-space-lg py-space-md text-center">
                      <p className="font-label-sm text-primary">SEAL #4928</p>
                      <p className="font-headline-md">SYNCED ALL</p>
                    </div>
                    <p className="absolute bottom-3 px-2 text-center font-label-sm text-primary">Baseline Snap: 24.5mm from bottom</p>
                  </div>
                </PreviewCard>
                <PreviewCard
                  className="lg:col-span-3"
                  badge="Audit Proof"
                  meta="verified"
                  title="RFC 3161 Certified"
                  body="Embedded digital signatures prevent post-export tampering."
                >
                  {[
                    ["SHA-256 Digest:", "9b71...a42e"],
                    ["Archival Spec:", "PDF/A-2b Standard"],
                    ["Resolution:", "300 DPI Vector"],
                    ["eIDAS Level:", "Advanced (AES)"],
                  ].map(([k, v]) => (
                    <div key={k} className="mb-space-xs flex min-w-0 items-center justify-between gap-space-sm rounded-lg bg-surface-container-low p-space-xs">
                      <span className="shrink-0 font-body-sm text-on-surface-variant">{k}</span>
                      <span className="truncate font-label-sm text-on-surface">{v}</span>
                    </div>
                  ))}
                  <button className="mt-space-sm flex w-full items-center justify-center gap-1 rounded-lg bg-secondary-container py-2 font-label-md text-on-secondary-container">
                    <Icon name="download_done" className="text-[16px]" />
                    Export Flattened PDF (2.4 MB)
                  </button>
                </PreviewCard>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-outline-variant/40 bg-surface-container-lowest py-space-lg">
          <p className="mb-space-md px-4 text-center font-label-md text-outline">
            Trusted by over 45,000+ legal counsels, notary officers, and asset management firms
          </p>
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-space-lg px-4 font-headline-md text-on-surface-variant sm:gap-space-xl sm:px-6">
            {["APEX LEGAL", "GLOBAL VENTURES", "Vanguard Pacific", "STERLING & CO"].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-space-2xl sm:px-6 lg:px-12">
          <p className="font-label-md text-primary">Architectural Precision</p>
          <div className="mb-space-xl flex flex-col justify-between gap-space-md lg:flex-row">
            <h2 className="font-headline-xl max-w-md">Built for Heavyweight Legal Batches.</h2>
            <p className="font-body-lg max-w-xl text-on-surface-variant">
              Standard PDF readers make you drag your signature page by page. Our visual stamping matrix automates entire 100-page lease packages in one stroke.
            </p>
          </div>
          <div className="grid gap-space-md md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(([icon, cap, title, body, link]) => (
              <article key={title} className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
                <div className="mb-space-md flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-high text-primary">
                  <Icon name={icon} />
                </div>
                <p className="font-label-sm text-primary">{cap}</p>
                <h3 className="font-headline-md mb-space-xs mt-space-xs">{title}</h3>
                <p className="font-body-sm mb-space-md text-on-surface-variant">{body}</p>
                <span className="font-label-md text-primary">{link}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="bg-surface-container-low py-space-2xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <p className="text-center font-label-md text-primary">Simple 4-Step Velocity</p>
            <h2 className="font-headline-xl mx-auto mb-space-xl max-w-2xl text-center">
              From Scanned Scribble to Signed Packet in 40s.
            </h2>
            <div className="grid gap-space-md sm:grid-cols-2 md:grid-cols-4">
              {STEPS.map(([num, icon, title, body]) => (
                <article key={num} className="rounded-2xl bg-surface-container-lowest p-space-lg">
                  <div className="mb-space-md flex items-center justify-between">
                    <span className="font-headline-lg text-primary">{num}</span>
                    <Icon name={icon} className="text-primary" />
                  </div>
                  <h3 className="font-headline-md mb-space-xs">{title}</h3>
                  <p className="font-body-sm text-on-surface-variant">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="batch" className="mx-auto max-w-7xl px-4 py-space-2xl sm:px-6 lg:px-12">
          <p className="text-center font-label-md text-primary">Fair Comparison</p>
          <h2 className="font-headline-xl mx-auto mb-space-xl max-w-2xl text-center">
            Why Legal Teams Are Ditching Cloud e-Sign Tools.
          </h2>
          <div className="hidden overflow-hidden rounded-2xl bg-surface-container-lowest md:block">
            <div className="grid grid-cols-3 bg-surface-container px-space-lg py-space-md font-label-lg">
              <span>Feature Comparison</span>
              <span>DocuSign / Adobe Sign</span>
              <span className="text-primary">PDF Signature Stamper</span>
            </div>
            {COMPARISON.map(([feature, them, us]) => (
              <div key={feature} className="grid grid-cols-3 border-t border-outline-variant/50 px-space-lg py-space-md">
                <span className="font-label-md">{feature}</span>
                <span className="font-body-sm text-on-surface-variant">{them}</span>
                <span className="font-body-sm text-on-surface">{us}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-space-sm md:hidden">
            {COMPARISON.map(([feature, them, us]) => (
              <article key={feature} className="rounded-2xl bg-surface-container-lowest p-space-md">
                <p className="font-label-lg">{feature}</p>
                <p className="mt-space-sm font-body-sm text-on-surface-variant">
                  <span className="font-label-sm text-outline">DocuSign / Adobe Sign</span>
                  <br />
                  {them}
                </p>
                <p className="mt-space-sm font-body-sm text-on-surface">
                  <span className="font-label-sm text-primary">PDF Signature Stamper</span>
                  <br />
                  {us}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-space-xl grid gap-space-md sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["12M+", "Pages Stamped", "Without a single timeout"],
              ["0", "Cloud Data Leaks", "Processed strictly on-device"],
              ["4.9/5", "Average Rating", "Over 3,200 public reviews"],
              ["4.2x", "Faster Execution", "Vs legacy Acrobat tools"],
            ].map(([stat, title, body]) => (
              <div key={title} className="rounded-2xl bg-surface-container-lowest p-space-lg">
                <p className="font-headline-xl text-primary">{stat}</p>
                <p className="font-label-lg">{title}</p>
                <p className="font-body-sm text-on-surface-variant">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="bg-surface-container-low py-space-2xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <p className="text-center font-label-md text-primary">Transparent Plans</p>
            <h2 className="font-headline-xl mb-space-xl text-center">Honest Value. Zero Envelope Penalties.</h2>
            <div className="grid gap-space-md lg:grid-cols-3">
              <Plan
                name="Web Starter"
                price="$0"
                cadence="/ forever free"
                cta="Launch Free App"
                href="/dashboard"
                items={["100% on-device browser processing", "Up to 10 pages batch synchronization", "Standard AI background thresholding", "150 DPI document rendering"]}
              />
              <Plan
                featured
                name="Professional"
                price="$12"
                cadence="/ month (billed annually)"
                cta="Start 14-Day Free Pro Trial"
                href="/dashboard"
                items={["Unlimited batch synchronization", "300 & 600 DPI vector output", "Custom ink colorizer", "RFC 3161 digital timestamp", "PDF/A archival export", "Persistent local stamp vault"]}
              />
              <Plan
                name="Enterprise & Legal"
                price="Custom"
                cadence="/ team license"
                cta="Contact Enterprise Sales"
                href="/dashboard"
                items={["Offline self-hosted desktop executable", "Centralized corporate seal library", "SAML 2.0 / Okta SSO", "Custom retention & audit logging", "Dedicated SLA"]}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-space-2xl sm:px-6 lg:px-12">
          <div className="rounded-3xl bg-inverse-surface px-space-md py-space-xl text-center text-inverse-on-surface sm:px-space-xl sm:py-space-2xl">
            <p className="font-label-md text-inverse-primary">Instant Browser Activation</p>
            <h2 className="font-headline-xl mx-auto mt-space-sm max-w-2xl">
              Ready to Automate Your Document Signing Workflow?
            </h2>
            <p className="mx-auto mt-space-md max-w-xl font-body-md text-inverse-on-surface/80">
              Clean transparent signatures, universal page anchoring, and complete privacy — all in your browser without ever making an account.
            </p>
            <div className="mt-space-xl flex flex-col justify-center gap-space-md sm:flex-row">
              <Link href="/dashboard" className="rounded-xl bg-primary-container px-space-xl py-3 font-label-lg text-on-primary">
                Launch Stamp Studio Free
              </Link>
              <a href="#features" className="rounded-xl bg-inverse-on-surface/10 px-space-xl py-3 font-label-lg">
                Schedule Team Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container-lowest">
        <div className="mx-auto grid max-w-7xl gap-space-xl px-4 py-space-2xl sm:grid-cols-2 sm:px-6 md:grid-cols-5 lg:px-12">
          <div className="sm:col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-space-md max-w-sm font-body-sm text-on-surface-variant">
              Cryptographic precision stamping and authoritative electronic execution for legal, finance, and enterprise operations.
            </p>
          </div>
          {[
            ["Product", ["Visual Stamp Placer", "Coordinate Matrix", "Batch Processing", "Signature Vault"]],
            ["Solutions", ["Enterprise Legal", "Financial Services", "Procurement Teams", "API Integration"]],
            ["Legal", ["Privacy Policy", "Terms of Execution", "Trust Center", "eIDAS Standard"]],
          ].map(([title, links]) => (
            <div key={String(title)}>
              <p className="font-label-lg">{title}</p>
              <ul className="mt-space-sm space-y-space-xs font-body-sm text-on-surface-variant">
                {(links as string[]).map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-space-sm px-4 pb-space-lg text-outline sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-12">
          <p className="font-body-sm">© 2025 PDF Signature Stamper Technologies Inc. All rights reserved.</p>
          <p className="font-label-sm">System Operational • v3.4.1 Production</p>
        </div>
      </footer>
    </div>
  );
}

function PreviewCard({
  className,
  badge,
  meta,
  title,
  body,
  children,
}: {
  className?: string;
  badge: string;
  meta: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm ${className ?? ""}`}>
      <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs">
        <span className="font-label-sm text-primary">{badge}</span>
        <span className="font-label-sm text-on-surface-variant">{meta}</span>
      </div>
      <h3 className="font-headline-md mb-space-xs">{title}</h3>
      <p className="font-body-sm mb-space-md text-on-surface-variant">{body}</p>
      {children}
    </article>
  );
}

function Plan({
  name,
  price,
  cadence,
  items,
  cta,
  href,
  featured = false,
}: {
  name: string;
  price: string;
  cadence: string;
  items: string[];
  cta: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl p-space-lg ${featured ? "bg-inverse-surface text-inverse-on-surface" : "bg-surface-container-lowest"}`}
    >
      {featured && <p className="mb-space-sm font-label-sm text-inverse-primary">Most Popular</p>}
      <h3 className="font-headline-md">{name}</h3>
      <p className="mt-space-sm font-headline-xl">
        {price} <span className="font-body-sm opacity-70">{cadence}</span>
      </p>
      <ul className="mt-space-md space-y-space-sm font-body-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-space-sm">
            <Icon name="check" className="shrink-0 text-[18px] text-secondary" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`mt-space-lg flex justify-center rounded-xl px-space-md py-2.5 font-label-lg ${
          featured ? "bg-primary-container text-on-primary" : "bg-surface-container-high text-on-surface"
        }`}
      >
        {cta}
      </Link>
    </article>
  );
}
