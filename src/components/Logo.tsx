import Image from "next/image";

export function Logo({
  withName = true,
  pro = false,
  compact = false,
}: {
  withName?: boolean;
  pro?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-space-sm">
      <Image src="/logo.svg" alt="PDF Signature Stamper" width={32} height={32} className="shrink-0" />
      {withName && (
        <span className={`truncate font-label-lg text-on-surface ${compact ? "hidden sm:inline" : ""}`}>
          PDF Signature Stamper
        </span>
      )}
      {pro && (
        <span className="rounded-md bg-primary-container px-1.5 py-0.5 font-label-sm text-on-primary">
          PRO
        </span>
      )}
    </div>
  );
}
