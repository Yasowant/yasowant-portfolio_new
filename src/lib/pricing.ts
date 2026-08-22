/**
 * Regional pricing
 * ----------------
 * Prices are shown in the visitor's local currency based on where the site is
 * opened. Detection is done client-side (timezone + browser locale), with a
 * manual switcher so anyone can change it. Edit the numbers below to tune your
 * rates for each market.
 */

export type RegionCode = "IN" | "GB" | "US" | "EU" | "AU" | "CA" | "AE" | "SG";

export interface Region {
  code: RegionCode;
  label: string;
  flag: string;
  currency: string; // ISO 4217
  locale: string; // used by Intl.NumberFormat
}

export const REGIONS: Region[] = [
  { code: "IN", label: "India", flag: "🇮🇳", currency: "INR", locale: "en-IN" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧", currency: "GBP", locale: "en-GB" },
  { code: "US", label: "United States", flag: "🇺🇸", currency: "USD", locale: "en-US" },
  { code: "EU", label: "Europe", flag: "🇪🇺", currency: "EUR", locale: "de-DE" },
  { code: "AU", label: "Australia", flag: "🇦🇺", currency: "AUD", locale: "en-AU" },
  { code: "CA", label: "Canada", flag: "🇨🇦", currency: "CAD", locale: "en-CA" },
  { code: "AE", label: "UAE", flag: "🇦🇪", currency: "AED", locale: "en-AE" },
  { code: "SG", label: "Singapore", flag: "🇸🇬", currency: "SGD", locale: "en-SG" },
];

/** Fallback for visitors from any country not listed above. */
export const DEFAULT_REGION: RegionCode = "US";

export type ServiceKey =
  | "fullstack"
  | "api"
  | "frontend"
  | "devops"
  | "consultation"
  | "mvp";

/**
 * Best price per service, per region (numbers only — formatting is automatic).
 * `hourly: true` renders as "X/hour", otherwise as "From X".
 */
export const PRICES: Record<ServiceKey, Record<RegionCode, number>> = {
  //              IN      GB     US     EU     AU     CA     AE     SG
  fullstack:   { IN: 40000, GB: 1500, US: 1900, EU: 1750, AU: 2900, CA: 2600, AE: 7000, SG: 2600 },
  api:         { IN: 25000, GB: 950,  US: 1200, EU: 1100, AU: 1800, CA: 1650, AE: 4400, SG: 1650 },
  frontend:    { IN: 30000, GB: 1150, US: 1450, EU: 1350, AU: 2200, CA: 2000, AE: 5300, SG: 2000 },
  devops:      { IN: 35000, GB: 1300, US: 1650, EU: 1500, AU: 2500, CA: 2250, AE: 6000, SG: 2250 },
  consultation:{ IN: 1500,  GB: 60,   US: 75,   EU: 70,   AU: 115,  CA: 100,  AE: 275,  SG: 100 },
  mvp:         { IN: 65000, GB: 2400, US: 3000, EU: 2800, AU: 4600, CA: 4100, AE: 11000, SG: 4100 },
};

export const HOURLY_SERVICES: ServiceKey[] = ["consultation"];

/* ----------------------------- detection ----------------------------- */

const TZ_MAP: Array<[RegExp, RegionCode]> = [
  [/^Asia\/(Kolkata|Calcutta)/, "IN"],
  [/^Europe\/(London|Belfast|Guernsey|Jersey|Isle_of_Man)/, "GB"],
  [/^Asia\/(Dubai|Muscat|Riyadh|Qatar|Bahrain|Kuwait)/, "AE"],
  [/^Asia\/Singapore/, "SG"],
  [/^Australia\//, "AU"],
  [/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal)/, "CA"],
  [/^America\//, "US"],
  [/^Pacific\/Honolulu/, "US"],
  [/^Europe\//, "EU"],
];

const LOCALE_MAP: Record<string, RegionCode> = {
  IN: "IN", GB: "GB", UK: "GB", US: "US", AU: "AU", CA: "CA", AE: "AE", SG: "SG",
  DE: "EU", FR: "EU", ES: "EU", IT: "EU", NL: "EU", BE: "EU", AT: "EU", PT: "EU",
  IE: "EU", FI: "EU", GR: "EU",
};

export function detectRegion(): RegionCode {
  if (typeof window === "undefined") return DEFAULT_REGION;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    for (const [re, code] of TZ_MAP) if (re.test(tz)) return code;
  } catch {
    /* ignore */
  }
  try {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const l of langs) {
      const country = l.split(/[-_]/)[1]?.toUpperCase();
      if (country && LOCALE_MAP[country]) return LOCALE_MAP[country];
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_REGION;
}

export function getRegion(code: RegionCode): Region {
  return REGIONS.find((r) => r.code === code) ?? REGIONS[0];
}

export function formatPrice(service: ServiceKey, code: RegionCode): string {
  const region = getRegion(code);
  const amount = PRICES[service][code];
  const formatted = new Intl.NumberFormat(region.locale, {
    style: "currency",
    currency: region.currency,
    maximumFractionDigits: 0,
  }).format(amount);
  return HOURLY_SERVICES.includes(service) ? `${formatted}/hour` : `From ${formatted}`;
}
