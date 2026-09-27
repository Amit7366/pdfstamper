export const INK_COLORS = {
  royal: "#004ac6",
  carbon: "#131b2e",
  navy: "#1e3a8a",
  seal: "#ba1a1a",
} as const;

export type InkColor = keyof typeof INK_COLORS;

export function createSealDataUrl(color: string = INK_COLORS.royal) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="160" viewBox="0 0 280 160" fill="none">
    <rect x="8" y="8" width="264" height="144" rx="12" stroke="${color}" stroke-width="4"/>
    <rect x="18" y="18" width="244" height="124" rx="8" stroke="${color}" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="140" y="58" text-anchor="middle" fill="${color}" font-family="Inter, Arial" font-size="14" font-weight="700" letter-spacing="3">VERIFIED</text>
    <text x="140" y="88" text-anchor="middle" fill="${color}" font-family="Inter, Arial" font-size="22" font-weight="800">LEGAL SEAL</text>
    <text x="140" y="114" text-anchor="middle" fill="${color}" font-family="Inter, Arial" font-size="11">★ 2025 ★</text>
    <path d="M48 128 C80 108, 120 138, 160 118 C190 104, 220 122, 236 112" stroke="${color}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
