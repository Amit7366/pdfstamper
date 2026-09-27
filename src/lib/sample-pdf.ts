import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const SECTIONS = [
  {
    title: "COMMERCIAL REAL ESTATE LEASE AGREEMENT",
    subtitle: "Standard Legal Form LF-2025  •  PAGE 1 / 4  •  Ref: NY-CRE-88941",
    body: [
      'THIS COMMERCIAL LEASE AGREEMENT (the "Agreement") is entered into this 14th day of February, 2025, by and between VANGUARD PACIFIC PROPERTIES LLC, with principal offices located at 452 5th Avenue, New York, NY ("Landlord"), and APEX GLOBAL VENTURES INC., organized and existing under the laws of Delaware ("Tenant").',
      "1. Demised Premises. Landlord hereby leases to Tenant Suite 1400, Hudson Yards Commercial Tower, commonly designated as the Premises.",
      "2. Term and Commencement. The Initial Term shall commence on March 1, 2025 and expire at midnight on February 28, 2030.",
      "3. Base Rent. Tenant shall pay an annual base rental rate of $870,000.00 in equal monthly installments.",
      "4. Legal Bindings. Both parties execute this obligation under full authority granted by their respective boards.",
    ],
  },
  {
    title: "SECTION II: COVENANTS & INSURANCE LIABILITIES",
    subtitle: "PAGE 2 / 4  •  Ref: NY-CRE-88941",
    body: [
      "5. Comprehensive Casualty Insurance. Tenant shall maintain Commercial General Liability Insurance covering operations throughout the Initial Term.",
      "6. Structural Alterations. Tenant shall make no structural alterations without prior written consent of Landlord.",
      "7. Indemnification. Tenant agrees to defend, indemnify, and hold harmless Landlord to the maximum extent permitted by New York law.",
      "8. Environmental Hazards. Neither party shall introduce hazardous contaminants upon the Premises.",
    ],
  },
  {
    title: "SECTION III: RIDER ATTACHMENTS",
    subtitle: "PAGE 3 / 4  •  Ref: NY-CRE-88941",
    body: [
      "Rider A. Parking allocation of twelve reserved stalls in Hudson Yards Garage Level P2.",
      "Rider B. After-hours HVAC billed at actual cost plus 8% administrative fee.",
      "Rider C. Signage limited to building-standard suite identification.",
      "Rider D. Restoration of Premises to broom-clean condition at surrender.",
    ],
  },
  {
    title: "SECTION IV: SIGNATURE SIGNOFF",
    subtitle: "PAGE 4 / 4  •  Ref: NY-CRE-88941",
    body: [
      "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.",
      "LANDLORD: Vanguard Pacific Properties LLC",
      "TENANT: Apex Global Ventures Inc.",
      "Name: Johnathan Doe, Chief Legal Officer",
      "Confidential & Proprietary Commercial Record",
    ],
  },
];

export async function createSampleLeasePdf() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const ink = rgb(0.08, 0.1, 0.18);

  for (const section of SECTIONS) {
    const page = doc.addPage([612, 792]);
    let y = 720;
    page.drawText(section.title, { x: 54, y, size: 14, font: bold, color: ink });
    y -= 22;
    page.drawText(section.subtitle, { x: 54, y, size: 9, font, color: rgb(0.35, 0.38, 0.45) });
    y -= 28;
    for (const paragraph of section.body) {
      const words = paragraph.split(" ");
      let line = "";
      for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(next, 11) > 500) {
          page.drawText(line, { x: 54, y, size: 11, font, color: ink });
          y -= 16;
          line = word;
        } else {
          line = next;
        }
      }
      if (line) {
        page.drawText(line, { x: 54, y, size: 11, font, color: ink });
        y -= 22;
      }
    }
  }

  return doc.save();
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
