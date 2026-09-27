"use client";

import { useEffect, useRef, useState } from "react";
import { useStudio } from "@/context/StudioProvider";

export function PdfCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const { pdfDoc, signatureUrl, stamp, zoom, page, setStamp } = useStudio();
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ width: 320, height: 440 });
  const [hostWidth, setHostWidth] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = () => setHostWidth(host.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    return () => observer.disconnect();
  }, [pdfDoc]);

  useEffect(() => {
    if (!pdfDoc || hostWidth < 48) return;
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const data = Uint8Array.from(pdfDoc.bytes);
        const pdf = await pdfjs.getDocument({ data }).promise;
        const pdfPage = await pdf.getPage(page);
        const unscaled = pdfPage.getViewport({ scale: 1 });
        const fit = hostWidth / unscaled.width;
        const viewport = pdfPage.getViewport({ scale: Math.max(0.25, fit * zoom) });
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        setSize({ width: viewport.width, height: viewport.height });
        const context = canvas.getContext("2d");
        if (!context) return;
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        await pdfPage.render({ canvas, canvasContext: context, viewport }).promise;
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to render PDF");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfDoc, page, zoom, hostWidth]);

  function onPointerDown(event: React.PointerEvent<HTMLImageElement>) {
    setDragging(true);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const xPct = Math.min(0.92, Math.max(0.08, (event.clientX - rect.left) / rect.width));
    const yPct = Math.min(0.92, Math.max(0.08, (event.clientY - rect.top) / rect.height));
    setStamp({ xPct, yPct });
  }

  function onPointerUp() {
    setDragging(false);
  }

  if (!pdfDoc) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center rounded-xl bg-surface-container-lowest p-space-md text-center text-on-surface-variant">
        Upload a PDF from the dashboard to start stamping.
      </div>
    );
  }

  const stampWidth = size.width * 0.28 * stamp.scale;

  return (
    <div ref={hostRef} className="flex w-full justify-center">
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-md"
        style={{ width: size.width, height: size.height }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 p-space-md text-center font-body-sm text-error">
            {error}
          </div>
        )}
        <canvas ref={canvasRef} className="block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={signatureUrl}
          alt="Stamp"
          onPointerDown={onPointerDown}
          className="absolute cursor-grab touch-none select-none active:cursor-grabbing"
          style={{
            left: `${stamp.xPct * 100}%`,
            top: `${stamp.yPct * 100}%`,
            width: stampWidth,
            transform: `translate(-50%, -50%) rotate(${stamp.rotation}deg)`,
            opacity: stamp.opacity,
          }}
        />
      </div>
    </div>
  );
}
