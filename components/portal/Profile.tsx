"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { call, paidModelsOpen } from "@/lib/portal";
import { COUNTRIES, PAYOUT_METHODS, TAX_FORMS } from "@/lib/creators";
import type { Account } from "./types";
import { Card, Field, Notice, input, primary, secondary } from "./ui";

/** Your public profile, your private payout and tax details, and the Creator Agreement. */
export default function Profile({ account, onSaved }: { account: Account; onSaved: () => Promise<void> }) {
  const c = account.creator;
  const p = account.private;
  const [handle, setHandle] = useState(c?.handle ?? "");
  const [displayName, setDisplayName] = useState(c?.display_name ?? "");
  const [bio, setBio] = useState(c?.bio ?? "");
  const [legalName, setLegalName] = useState(p?.legal_name ?? "");
  const [country, setCountry] = useState(p?.country ?? "");
  const [contactEmail, setContactEmail] = useState(p?.contact_email ?? account.email);
  const [method, setMethod] = useState(p?.payout_method ?? "stripe");
  const [payoutEmail, setPayoutEmail] = useState(p?.payout_email ?? "");
  const [taxForm, setTaxForm] = useState(p?.tax_form ?? "");
  const accepted = p?.agreement_version === account.agreement_version;
  const [accept, setAccept] = useState(accepted);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "error" | "ok"; text: string } | null>(null);

  const countries = useMemo(() => {
    let names: Intl.DisplayNames | null = null;
    try {
      names = new Intl.DisplayNames(["en"], { type: "region" });
    } catch {
      // Very old browsers: fall back to the bare codes.
    }
    return COUNTRIES.map((code) => ({ code, name: names?.of(code) ?? code })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      await call("creator-profile", {
        action: "save",
        profile: { handle, display_name: displayName, bio },
        private: {
          legal_name: legalName,
          country,
          contact_email: contactEmail,
          payout_method: method,
          payout_email: payoutEmail,
          tax_form: taxForm || null,
        },
        accept_agreement: accept && !accepted,
      });
      await onSaved();
      setMsg({ kind: "ok", text: "Saved." });
    } catch (e) {
      setMsg({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  async function connectStripe() {
    setBusy(true);
    setMsg(null);
    try {
      const { url } = await call<{ url: string }>("creator-connect", {});
      window.location.href = url;
    } catch (e) {
      setMsg({ kind: "error", text: (e as Error).message });
      setBusy(false);
    }
  }

  const methodNote = PAYOUT_METHODS.find((m) => m.id === method)?.note;

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void save();
      }}
    >
      <Card title="What buyers see">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Display name" hint="Your name or your studio's.">
            <input className={input} required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </Field>
          <Field label="Handle" hint={`Your page will be noodlellm.com/creators/${handle || "your-handle"}`}>
            <input
              className={input}
              required
              pattern="[a-z0-9][a-z0-9\-]{1,38}"
              value={handle}
              onChange={(e) => setHandle(e.target.value.toLowerCase())}
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="About you" hint="A few sentences. Up to 500 characters.">
            <textarea className={input} rows={3} maxLength={500} value={bio} onChange={(e) => setBio(e.target.value)} />
          </Field>
        </div>
      </Card>

      {paidModelsOpen() && (
      <Card title="How you get paid">
        <p className="mb-4 text-sm text-ink-dim">
          Private: only you and Noodle LLM see this. You keep {100 - account.platform_fee_percent}% of each sale; Noodle LLM keeps{" "}
          {account.platform_fee_percent}%, which covers card fees and hosting. Free models need none of this.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Legal name" hint="As it appears on your tax form or company registration.">
            <input className={input} value={legalName} onChange={(e) => setLegalName(e.target.value)} />
          </Field>
          <Field label="Country">
            <select className={input} value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Pick a country</option>
              {countries.map((x) => (
                <option key={x.code} value={x.code}>
                  {x.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Contact email" hint="Where we send review results and payout notices.">
            <input className={input} type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </Field>
          <Field label="Paid through" hint={methodNote}>
            <select className={input} value={method} onChange={(e) => setMethod(e.target.value as typeof method)}>
              {PAYOUT_METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {method === "stripe" ? (
          <div className="mt-5 rounded-md border border-edge bg-surface-0 p-4">
            {c?.payouts_enabled ? (
              <p className="text-sm text-emerald-300">Stripe is set up. Your share of each sale goes to your bank automatically.</p>
            ) : (
              <>
                <p className="text-sm text-ink-dim">
                  {c?.stripe_account_id
                    ? "Stripe still needs a few details before it can pay you."
                    : "Stripe collects your identity, bank account and tax form on its own secure page. We never see your bank details."}
                </p>
                <button type="button" className={`${secondary} mt-3`} disabled={busy || !c} onClick={() => void connectStripe()}>
                  {c?.stripe_account_id ? "Finish Stripe setup" : "Set up payouts with Stripe"}
                </button>
                {!c && <p className="mt-2 text-xs text-ink-faint">Save this page once first.</p>}
              </>
            )}
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label={`${PAYOUT_METHODS.find((m) => m.id === method)?.label} account email`}>
              <input className={input} type="email" required value={payoutEmail} onChange={(e) => setPayoutEmail(e.target.value)} />
            </Field>
            <Field
              label="Tax form"
              hint="Which US tax form applies to you. We will ask you for the signed form before your first payout."
            >
              <select className={input} value={taxForm} onChange={(e) => setTaxForm(e.target.value as typeof taxForm)}>
                <option value="">Pick one</option>
                {TAX_FORMS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}
      </Card>
      )}

      <Card title="Creator Agreement">
        {accepted ? (
          <p className="text-sm text-ink-dim">
            You accepted the current{" "}
            <Link href="/creator-agreement" className="text-accent hover:underline">Creator Agreement</Link> on{" "}
            {new Date(p!.agreement_accepted_at!).toLocaleDateString("en")}.
          </p>
        ) : (
          <label className="flex items-start gap-3 text-sm text-ink-dim">
            <input type="checkbox" className="mt-1" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
            <span>
              I have read and accept the{" "}
              <Link href="/creator-agreement" target="_blank" className="text-accent hover:underline">Creator Agreement</Link>. I own
              the rights to the models I list, or their licence lets me share{paidModelsOpen() ? " and sell" : ""} them.
              {p?.agreement_version && " (The agreement has changed since you last accepted it.)"}
            </span>
          </label>
        )}
      </Card>

      {msg && <Notice kind={msg.kind}>{msg.text}</Notice>}
      <button className={primary} disabled={busy}>
        {busy ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
