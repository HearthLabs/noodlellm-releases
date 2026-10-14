"use client";

import { useState } from "react";
import { checkoutEnabled, startModelCheckout } from "@/lib/billing";

/**
 * Buy for a paid creator model. Renders nothing until checkout is configured, like
 * SubscribeButton, and the model page then says the price without offering a dead button.
 */
export default function BuyModelButton({
  modelId,
  tier,
  label,
  openingLabel,
  errorLabel,
}: {
  modelId: string;
  tier: "personal" | "practice";
  label: string;
  openingLabel: string;
  errorLabel: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!checkoutEnabled()) return null;

  async function go() {
    setBusy(true);
    setError(null);
    try {
      window.location.href = await startModelCheckout(modelId, tier);
    } catch {
      setError(errorLabel);
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => void go()}
        disabled={busy}
        className={`inline-block rounded-md px-5 py-2.5 font-medium disabled:opacity-60 ${tier === "personal" ? "bg-accent text-surface-0 hover:brightness-110" : "border border-edge text-ink hover:bg-surface-2"}`}
      >
        {busy ? openingLabel : label}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </>
  );
}
