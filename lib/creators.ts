/**
 * The creator portal's fixed lists. LICENCES and GOOD_FOR mirror
 * supabase/functions/_shared/marketplace.ts, which is what the server actually accepts:
 * change both together.
 */

export const PLATFORM_FEE_PERCENT = 25;

/** Computers one model purchase works on, per tier. Mirrors TIER_DEVICES in marketplace.ts. */
export const TIER_DEVICES = { personal: 3, practice: 15 } as const;
/** The practice price the portal suggests, as a multiple of the personal price. */
export const PRACTICE_MULTIPLE = 5;

export const LICENCES: { id: string; label: string }[] = [
  { id: "Apache-2.0", label: "Apache 2.0" },
  { id: "MIT", label: "MIT" },
  { id: "BSD-3-Clause", label: "BSD 3-Clause" },
  { id: "CC-BY-4.0", label: "Creative Commons BY 4.0" },
  { id: "Llama-3.1", label: "Llama 3.1 Community Licence" },
  { id: "Llama-3.2", label: "Llama 3.2 Community Licence" },
  { id: "Llama-3.3", label: "Llama 3.3 Community Licence" },
  { id: "Gemma", label: "Gemma Terms of Use" },
  { id: "custom", label: "My own licence (a model I trained myself)" },
];

export const GOOD_FOR: { id: string; label: string }[] = [
  { id: "allround", label: "All-round" },
  { id: "code", label: "Code" },
  { id: "writing", label: "Writing" },
  { id: "reasoning", label: "Reasoning" },
  { id: "instructions", label: "Following instructions" },
  { id: "speed", label: "Speed" },
  { id: "longchats", label: "Long conversations" },
];

export const PAYOUT_METHODS: { id: string; label: string; note: string }[] = [
  { id: "stripe", label: "Stripe", note: "Paid automatically at each sale, to your bank account. Stripe asks for your identity, bank and tax details on its own form." },
  { id: "paypal", label: "PayPal", note: "Paid monthly, by hand, for countries Stripe cannot pay out to." },
  { id: "payoneer", label: "Payoneer", note: "Paid monthly, by hand, for countries Stripe cannot pay out to." },
  { id: "wise", label: "Wise", note: "Paid monthly, by hand, for countries Stripe cannot pay out to." },
];

export const TAX_FORMS: { id: string; label: string }[] = [
  { id: "w9", label: "W-9 (US person or US company)" },
  { id: "w8ben", label: "W-8BEN (individual outside the US)" },
  { id: "w8bene", label: "W-8BEN-E (company outside the US)" },
];

/** ISO 3166 country codes; the portal shows each in the reader's language with Intl. */
export const COUNTRIES = "AD AE AF AG AI AL AM AO AR AT AU AW AZ BA BB BD BE BF BG BH BI BJ BM BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR CU CV CY CZ DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FM FR GA GB GD GE GH GI GM GN GQ GR GT GW GY HK HN HR HT HU ID IE IL IN IQ IR IS IT JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MH MK ML MM MN MO MR MT MU MV MW MX MY MZ NA NE NG NI NL NO NP NR NZ OM PA PE PG PH PK PL PR PS PT PW PY QA RO RS RU RW SA SB SC SD SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VN VU WS YE ZA ZM ZW".split(" ");

export function dollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
