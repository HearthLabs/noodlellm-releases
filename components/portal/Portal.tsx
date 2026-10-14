"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { call, currentSession, paidModelsOpen, portalEnabled, requestCode, signOut, verifyCode } from "@/lib/portal";
import type { Account } from "./types";
import { Card, Field, Notice, input, primary, secondary } from "./ui";
import Profile from "./Profile";
import Listings from "./Listings";
import Sales from "./Sales";
import Admin from "./Admin";

type Tab = "listings" | "profile" | "sales" | "review";

/**
 * The creator portal: sign in with an emailed code, then manage your profile and payouts,
 * your listings and their files, and your sales. Admins also get the review queue.
 *
 * A client component on a static page. Everything it shows comes from the portal's edge
 * functions at runtime, so nothing about any creator is baked into the site's HTML.
 */
export default function Portal() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("listings");

  const reload = useCallback(async () => {
    try {
      setAccount(await call<Account>("creator-profile", { action: "get" }));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    if (!portalEnabled()) {
      setReady(true);
      return;
    }
    void (async () => {
      const s = await currentSession();
      setSignedIn(Boolean(s));
      if (s) await reload();
      setReady(true);
    })();
    // Coming back from Stripe's onboarding form: show the payout settings it changed.
    const q = new URLSearchParams(window.location.search);
    if (q.get("stripe")) setTab("profile");
  }, [reload]);

  if (!ready) return <Shell><p className="text-ink-dim">Loading…</p></Shell>;

  if (!portalEnabled()) {
    return (
      <Shell>
        <Card>
          <p className="text-ink-dim">
            The creator portal is not open yet. If you would like to list a model on Noodle LLM, write to{" "}
            <a className="text-accent hover:underline" href="mailto:info@noodletechnology.com">info@noodletechnology.com</a> and we will let you know
            when it opens.
          </p>
        </Card>
      </Shell>
    );
  }

  if (!signedIn) {
    return (
      <Shell>
        <SignIn
          onSignedIn={async () => {
            setSignedIn(true);
            await reload();
          }}
        />
      </Shell>
    );
  }

  const hasProfile = Boolean(account?.creator);
  const paid = paidModelsOpen();
  const tabs: [Tab, string][] = [
    ["listings", "Your models"],
    ["profile", paid ? "Profile and payouts" : "Profile"],
    ...(paid ? ([["sales", "Sales"]] as [Tab, string][]) : []),
    ...(account?.is_admin ? ([["review", "Review"]] as [Tab, string][]) : []),
  ];
  const shown: Tab = hasProfile ? tab : "profile";

  return (
    <Shell
      right={
        <div className="flex items-center gap-3 text-sm text-ink-faint">
          <span>{account?.email}</span>
          <button
            className="hover:text-ink"
            onClick={() => {
              signOut();
              setSignedIn(false);
              setAccount(null);
            }}
          >
            Sign out
          </button>
        </div>
      }
    >
      {error && <Notice kind="error">{error}</Notice>}
      {account && (
        <>
          {hasProfile ? (
            <nav className="mb-6 flex gap-1 border-b border-edge">
              {tabs.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`-mb-px border-b-2 px-4 py-2 text-sm ${
                    shown === id ? "border-accent text-ink" : "border-transparent text-ink-dim hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          ) : (
            <div className="mb-6">
              <Notice kind="info">
                {paid
                  ? "Welcome. Start by telling buyers who you are and how you would like to be paid. You can list models as soon as this is saved."
                  : "Welcome. Start by telling people who you are. You can list models as soon as this is saved."}
              </Notice>
            </div>
          )}
          {shown === "profile" && <Profile account={account} onSaved={reload} />}
          {shown === "listings" && <Listings account={account} onChanged={reload} />}
          {shown === "sales" && paid && <Sales account={account} />}
          {shown === "review" && account.is_admin && <Admin />}
        </>
      )}
    </Shell>
  );
}

function Shell({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Creator portal</h1>
          <p className="mt-1 text-ink-dim">
            {paidModelsOpen()
              ? "List your model in the Noodle LLM store. You keep 75% of every sale."
              : "List your model in the Noodle LLM store, free. Its files stay on Hugging Face."}{" "}
            <Link href="/creator-agreement" className="text-accent hover:underline">Creator Agreement</Link>
          </p>
        </div>
        {right}
      </header>
      <div className="space-y-6">{children}</div>
    </main>
  );
}

function SignIn({ onSignedIn }: { onSignedIn: () => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title="Sign in">
      <p className="mb-4 text-sm text-ink-dim">
        We email you a 6-digit code; there is no password to remember. A new email address gets a new creator account.
      </p>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void run(async () => {
            if (!sent) {
              await requestCode(email);
              setSent(true);
            } else {
              await verifyCode(email, code);
              await onSignedIn();
            }
          });
        }}
      >
        <Field label="Email">
          <input className={input} type="email" required value={email} disabled={sent} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        {sent && (
          <Field label="Code from the email" hint="It can take a minute to arrive. Check your spam folder if it does not.">
            <input
              className={input}
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Field>
        )}
        {error && <Notice kind="error">{error}</Notice>}
        <div className="flex gap-3">
          <button className={primary} disabled={busy}>
            {busy ? "One moment…" : sent ? "Sign in" : "Email me a code"}
          </button>
          {sent && (
            <button
              type="button"
              className={secondary}
              onClick={() => {
                setSent(false);
                setCode("");
              }}
            >
              Use a different email
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}
