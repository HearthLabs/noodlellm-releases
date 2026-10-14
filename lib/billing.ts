/**
 * Talks to the Supabase edge functions in supabase/functions/ -- a plain fetch, not the
 * supabase-js SDK, because this is a static export with nothing else that needs it, and one
 * more dependency is not worth it for two endpoints.
 *
 * `NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL` is unset until a Supabase project exists (see
 * BUILD_PLAN.md's "Blocked on you"), and `checkoutEnabled()` is what the Pricing page checks
 * before showing a live button instead of the current "you cannot buy this yet" state --
 * see that page's own doc comment on why a button that goes nowhere is worse than none.
 */

export type Plan = "founding" | "standard" | "practice";
export type Interval = "month" | "year";

/**
 * Every price on the site, in dollars per billing period: the one place to change them.
 * Must match supabase/functions/_shared/plans.ts, which is what Stripe actually charges --
 * nothing enforces the two stay in sync, so change both together.
 */
export const PRICES: Record<Plan, Record<Interval, number>> = {
  founding: { month: 8, year: 80 },
  standard: { month: 29, year: 300 },
  practice: { month: 200, year: 2000 },
};

function functionsUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;
  return url && url.length > 0 ? url.replace(/\/$/, "") : null;
}

export function checkoutEnabled(): boolean {
  return functionsUrl() !== null;
}

/** Starts a Stripe Checkout session and returns the URL to send the browser to. */
export async function startCheckout(plan: Plan, interval: Interval = "month"): Promise<string> {
  const base = functionsUrl();
  if (!base) throw new Error("Checkout is not configured yet");

  const res = await fetch(`${base}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, interval }),
  });
  const body = await res.json();
  if (!res.ok || !body.url) throw new Error(body.error ?? `Checkout failed (${res.status})`);
  return body.url as string;
}

/** Trades a completed Checkout session for the buyer's licence token. May need a retry or
 * two right after redirect, while the webhook is still catching up -- see session-license's
 * own doc comment. */
export async function fetchSessionLicense(
  sessionId: string,
): Promise<{ token: string; plan: string }> {
  const base = functionsUrl();
  if (!base) throw new Error("Checkout is not configured yet");

  const res = await fetch(`${base}/session-license`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error ?? `Could not fetch the licence (${res.status})`);
  return body;
}

/** Starts a Stripe Checkout for one paid creator model and returns where to send the browser.
 * The server decides the price and the creator's share; the page only names the model. */
export async function startModelCheckout(modelId: string, tier: "personal" | "practice" = "personal"): Promise<string> {
  const base = functionsUrl();
  if (!base) throw new Error("Checkout is not configured yet");
  const res = await fetch(`${base}/model-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model_id: modelId, tier }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.url) throw new Error(body.error ?? `Checkout failed (${res.status})`);
  return body.url as string;
}
