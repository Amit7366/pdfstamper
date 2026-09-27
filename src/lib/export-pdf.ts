import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";
import type { ExportPreset, StampConfig } from "@/context/StudioProvider";
import { INK_COLORS } from "@/lib/stamp";

function pagesForPlacement(count: number, placement: StampConfig["placement"]) {
  if (placement === "first") return [0];
  if (placement === "last") return [count - 1];
  return Array.from({ length: count }, (_, index) => index);
}

async function dataUrlToBytes(dataUrl: string) {
  const response = await fetch(dataUrl);
  return new Uint8Array(await response.arrayBuffer());
}

export async function exportSignedPdf(input: {
  pdfBytes: Uint8Array;
  signatureUrl: string;
  stamp: StampConfig;
  fileName: string;
  preset: ExportPreset;
  flatten: boolean;
  timestamp: boolean;
}) {
  const source = await PDFDocument.load(input.pdfBytes);
  const out = await PDFDocument.create();
  const copied = await out.copyPages(source, source.getPageIndices());
  copied.forEach((page) => out.addPage(page));

  const imageBytes = await dataUrlToBytes(input.signatureUrl);
  const image = input.signatureUrl.startsWith("data:image/png")
    ? await out.embedPng(imageBytes)
    : input.signatureUrl.includes("image/jpeg") || input.signatureUrl.includes("image/jpg")
      ? await out.embedJpg(imageBytes)
      : await out.embedPng(await svgDataUrlToPng(input.signatureUrl));

  const targets = pagesForPlacement(out.getPageCount(), input.stamp.placement);
  for (const index of targets) {
    const page = out.getPage(index);
    const { width, height } = page.getSize();
    const stampWidth = width * 0.28 * input.stamp.scale;
    const stampHeight = stampWidth * (image.height / image.width);
    const x = width * input.stamp.xPct - stampWidth / 2;
    const y = height * (1 - input.stamp.yPct) - stampHeight / 2;
    page.drawImage(image, {
      x,
      y,
      width: stampWidth,
      height: stampHeight,
      opacity: input.stamp.opacity,
      rotate: degrees(input.stamp.rotation),
    });
  }

  if (input.timestamp) {
    const font = await out.embedFont(StandardFonts.Helvetica);
    const first = out.getPage(0);
    first.drawText(`RFC 3161  •  ${new Date().toISOString()}  •  ${INK_COLORS[input.stamp.color]}`, {
      x: 36,
      y: 18,
      size: 7,
      font,
      color: rgb(0.45, 0.47, 0.52),
    });
  }

  const bytes = await out.save({
    useObjectStreams: input.preset !== "archival",
  });

  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = input.fileName.endsWith(".pdf") ? input.fileName : `${input.fileName}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

async function svgDataUrlToPng(dataUrl: string) {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  const canvas = document.createElement("canvas");
  canvas.width = 560;
  canvas.height = 320;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => (value ? resolve(value) : reject(new Error("PNG encode failed"))), "image/png");
  });
  return new Uint8Array(await blob.arrayBuffer());
}
