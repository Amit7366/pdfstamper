function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const n = Number.parseInt(value, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read signature image"));
    image.src = src;
  });
}

function median(values: number[]) {
  if (!values.length) return 245;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? 245;
}

function drawToCanvas(image: HTMLImageElement, maxDim = 1800) {
  const scale = Math.min(1, maxDim / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas unavailable");
  context.drawImage(image, 0, 0, width, height);
  return { canvas, context, width, height };
}

function canvasToPng(canvas: HTMLCanvasElement) {
  return canvas.toDataURL("image/png");
}

function samplePaperColor(data: Uint8ClampedArray, width: number, height: number) {
  const border = Math.max(2, Math.round(Math.min(width, height) * 0.05));
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];

  const take = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    if (data[i + 3] < 12) return;
    rs.push(data[i]);
    gs.push(data[i + 1]);
    bs.push(data[i + 2]);
  };

  for (let x = 0; x < width; x += 2) {
    for (let y = 0; y < border; y += 1) {
      take(x, y);
      take(x, height - 1 - y);
    }
  }
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < border; x += 1) {
      take(x, y);
      take(width - 1 - x, y);
    }
  }

  const r = median(rs);
  const g = median(gs);
  const b = median(bs);
  return { r, g, b, lum: 0.299 * r + 0.587 * g + 0.114 * b };
}

function cropToInk(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, pad = 10) {
  const { width, height } = canvas;
  const { data } = context.getImageData(0, 0, width, height);
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] < 18) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < 0 || maxY < 0) return canvas;

  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  if (cropW >= width && cropH >= height) return canvas;

  const cropped = document.createElement("canvas");
  cropped.width = cropW;
  cropped.height = cropH;
  const cropCtx = cropped.getContext("2d");
  if (!cropCtx) return canvas;
  cropCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
  return cropped;
}

export async function rasterizeToPng(dataUrl: string) {
  const image = await loadImage(dataUrl);
  const { canvas } = drawToCanvas(image);
  return canvasToPng(canvas);
}

export async function isolateSignatureInk(dataUrl: string, tintHex: string) {
  const image = await loadImage(dataUrl);
  const { canvas, context, width, height } = drawToCanvas(image);
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  const paper = samplePaperColor(data, width, height);
  const [tr, tg, tb] = hexToRgb(tintHex);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 8) {
      data[i + 3] = 0;
      continue;
    }

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    const darker = Math.max(paper.r - r, paper.g - g, paper.b - b) / 255;
    const dist = Math.hypot(r - paper.r, g - paper.g, b - paper.b) / 441;

    let ink = 0;
    ink = Math.max(ink, smoothstep(0.07, 0.3, darker));
    ink = Math.max(ink, smoothstep(0.12, 0.38, dist) * smoothstep(0.05, 0.22, darker));
    ink = Math.max(ink, smoothstep(16, 52, chroma) * smoothstep(230, 150, lum));
    ink *= smoothstep(252, 210, lum);

    data[i] = tr;
    data[i + 1] = tg;
    data[i + 2] = tb;
    data[i + 3] = Math.round(ink * a);
  }

  context.putImageData(imageData, 0, 0);
  return canvasToPng(cropToInk(canvas, context));
}
