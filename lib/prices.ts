/** Every price on the site. The desktop app and the payment backend each keep their own
 * copy (apps/desktop/src/lib/prices.ts and supabase/functions/_shared/plans.ts in noodlellm):
 * change all three together. */

export type Plan = "founding" | "standard" | "practice";
export type Interval = "month" | "year";

export const PRICES: Record<Plan, Record<Interval, number>> = {
  founding: { month: 8, year: 80 },
  standard: { month: 29, year: 300 },
  practice: { month: 200, year: 2000 },
};
