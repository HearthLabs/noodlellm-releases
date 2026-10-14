"use client";

import { useState } from "react";
import { checkoutEnabled, startCheckout, type Plan } from "@/lib/billing";

/**
 * The one live button on the pricing page. Everywhere `checkoutEnabled()` is false --
 * meaning `NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL` is unset, true until a Supabase project
 * exists -- this renders nothing, and Pricing.tsx falls back to the plain "you cannot buy
 * this yet" state it already has. See lib/billing.ts's doc comment.
 */
export default function SubscribeButton({
  plan,
  label,
  openingLabel,
  errorLabel,
  className,
}: {
  plan: Plan;
  label: string;
  openingLabel: string;
  errorLabel: string;
  className: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!checkoutEnabled()) return null;

  async function go() {
    setBusy(true);
    setError(null);
    try {
      window.location.href = await startCheckout(plan);
    } catch {
      setError(errorLabel);
      setBusy(false);
    }
  }

  return (
    <div className="mt-5">
      <button onClick={() => void go()} disabled={busy} className={className}>
        {busy ? openingLabel : label}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
