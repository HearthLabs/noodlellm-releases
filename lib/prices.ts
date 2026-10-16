/** Every price on the site. The desktop app and the payment backend each keep their own
 * copy (apps/desktop/src/lib/prices.ts and supabase/functions/_shared/plans.ts in noodlellm):
 * change all three together. */

export type Plan = "founding" | "standard" | "practice";
export type Interval = "month" | "year" | "once";

export const PRICES: Record<Plan, Partial<Record<Interval, number>>> = {
  // Founding is monthly or a lifetime licence bought once; there is no yearly founding rate.
  founding: { month: 8, once: 100 },
  standard: { month: 29, year: 300 },
  practice: { month: 200, year: 2000 },
};
