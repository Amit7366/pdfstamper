"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PDFDocument } from "pdf-lib";
import { isolateSignatureInk, rasterizeToPng } from "@/lib/isolate-signature";
import { formatBytes, createSampleLeasePdf } from "@/lib/sample-pdf";
import { createSealDataUrl, INK_COLORS, type InkColor } from "@/lib/stamp";

export type PlacementMode = "all" | "first" | "last" | "custom";
export type ExportPreset = "web" | "print" | "archival";

export type StampConfig = {
  xPct: number;
  yPct: number;
  opacity: number;
  scale: number;
  rotation: number;
  color: InkColor;
  placement: PlacementMode;
  autoIsolate: boolean;
  batchLock: boolean;
};

export type StudioDocument = {
  name: string;
  bytes: Uint8Array;
  pageCount: number;
  sizeLabel: string;
};

type StudioContextValue = {
  pdfDoc: StudioDocument | null;
  signatureUrl: string;
  signatureName: string;
  signatureBusy: boolean;
  isDemoSeal: boolean;
  stamp: StampConfig;
  zoom: number;
  page: number;
  exportOpen: boolean;
  exportPreset: ExportPreset;
  fileName: string;
  flatten: boolean;
  timestamp: boolean;
  setStamp: (patch: Partial<StampConfig>) => void;
  setZoom: (value: number) => void;
  setPage: (value: number) => void;
  setExportOpen: (open: boolean) => void;
  setExportPreset: (preset: ExportPreset) => void;
  setFileName: (name: string) => void;
  setFlatten: (value: boolean) => void;
  setTimestamp: (value: boolean) => void;
  loadPdfFile: (file: File) => Promise<void>;
  loadSignatureFile: (file: File) => Promise<void>;
  loadSampleContract: () => Promise<void>;
  loadDemoSeal: () => void;
  resetStamp: () => void;
};

const defaultStamp: StampConfig = {
  xPct: 0.62,
  yPct: 0.72,
  opacity: 1,
  scale: 0.78,
  rotation: -4,
  color: "royal",
  placement: "all",
  autoIsolate: true,
  batchLock: true,
};

const StudioContext = createContext<StudioContextValue | undefined>(undefined);

async function pageCountFromBytes(bytes: Uint8Array) {
  const doc = await PDFDocument.load(bytes);
  return doc.getPageCount();
}

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [pdfDoc, setPdfDoc] = useState<StudioDocument | null>(null);
  const [signatureUrl, setSignatureUrl] = useState(createSealDataUrl());
  const [signatureOriginalUrl, setSignatureOriginalUrl] = useState("");
  const [signatureName, setSignatureName] = useState("JohnDoe_Official_Seal.png");
  const [signatureBusy, setSignatureBusy] = useState(false);
  const [isDemoSeal, setIsDemoSeal] = useState(true);
  const [stamp, setStampState] = useState<StampConfig>(defaultStamp);
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportPreset, setExportPreset] = useState<ExportPreset>("print");
  const [fileName, setFileName] = useState("Commercial_Lease_Agreement_2025_Signed.pdf");
  const [flatten, setFlatten] = useState(true);
  const [timestamp, setTimestamp] = useState(true);

  const setStamp = useCallback((patch: Partial<StampConfig>) => {
    setStampState((current) => ({ ...current, ...patch }));
  }, []);

  const loadPdfFile = useCallback(async (file: File) => {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const count = await pageCountFromBytes(bytes);
    setPdfDoc({
      name: file.name,
      bytes,
      pageCount: count,
      sizeLabel: formatBytes(file.size),
    });
    setFileName(file.name.replace(/\.pdf$/i, "") + "_Signed.pdf");
    setPage(1);
  }, []);

  const loadSignatureFile = useCallback(async (file: File) => {
    const reader = new FileReader();
    const original = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    setIsDemoSeal(false);
    setSignatureName(file.name);
    setSignatureOriginalUrl(original);
  }, []);

  const loadSampleContract = useCallback(async () => {
    const bytes = await createSampleLeasePdf();
    setPdfDoc({
      name: "Commercial_Lease_Agreement_2025.pdf",
      bytes,
      pageCount: 4,
      sizeLabel: formatBytes(bytes.byteLength),
    });
    setFileName("Commercial_Lease_Agreement_2025_Signed.pdf");
    setPage(1);
  }, []);

  const loadDemoSeal = useCallback(() => {
    setIsDemoSeal(true);
    setSignatureOriginalUrl("");
    setSignatureName("JohnDoe_Official_Seal.png");
    setSignatureUrl(createSealDataUrl(INK_COLORS[stamp.color]));
  }, [stamp.color]);

  useEffect(() => {
    if (isDemoSeal) {
      setSignatureUrl(createSealDataUrl(INK_COLORS[stamp.color]));
      return;
    }
    if (!signatureOriginalUrl) return;

    let cancelled = false;
    setSignatureBusy(true);

    void (async () => {
      try {
        const next = stamp.autoIsolate
          ? await isolateSignatureInk(signatureOriginalUrl, INK_COLORS[stamp.color])
          : await rasterizeToPng(signatureOriginalUrl);
        if (!cancelled) setSignatureUrl(next);
      } catch {
        if (!cancelled) setSignatureUrl(signatureOriginalUrl);
      } finally {
        if (!cancelled) setSignatureBusy(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isDemoSeal, signatureOriginalUrl, stamp.autoIsolate, stamp.color]);

  const resetStamp = useCallback(() => {
    setStampState(defaultStamp);
  }, []);

  const value = useMemo(
    () => ({
      pdfDoc,
      signatureUrl,
      signatureName,
      signatureBusy,
      isDemoSeal,
      stamp,
      zoom,
      page,
      exportOpen,
      exportPreset,
      fileName,
      flatten,
      timestamp,
      setStamp,
      setZoom,
      setPage,
      setExportOpen,
      setExportPreset,
      setFileName,
      setFlatten,
      setTimestamp,
      loadPdfFile,
      loadSignatureFile,
      loadSampleContract,
      loadDemoSeal,
      resetStamp,
    }),
    [
      pdfDoc,
      signatureUrl,
      signatureName,
      signatureBusy,
      isDemoSeal,
      stamp,
      zoom,
      page,
      exportOpen,
      exportPreset,
      fileName,
      flatten,
      timestamp,
      setStamp,
      loadPdfFile,
      loadSignatureFile,
      loadSampleContract,
      loadDemoSeal,
      resetStamp,
    ]
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) throw new Error("useStudio must be used within StudioProvider");
  return context;
}
