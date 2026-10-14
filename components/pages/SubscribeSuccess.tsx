"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSessionLicense } from "@/lib/billing";
import { href, strings, type Locale } from "@/lib/i18n";

/**
 * Where Stripe Checkout redirects a buyer back to. Trades the session id in the URL for a
 * signed licence token -- see session-license's doc comment on why that needs no sign-in
 * step -- and shows it to paste into the app's Settings -> Account. A `noodlellm://` deep link
 * that does this in one click is the natural next step (TODO.md), sharing the install-link
 * handler the app already has; copy-paste is what ships tonight.
 */
export default function SubscribeSuccess({ locale }: { locale: Locale }) {
  const t = strings(locale).subscribeSuccess;
  const [state, setState] = useState<
    { kind: "loading" } | { kind: "ready"; token: string } | { kind: "error"; message: string }
  >({ kind: "loading" });
  const [copied, setCopied] = useState(false);
  // A creator model bought on its page comes back here too, marked kind=model by
  // model-checkout, and gets a purchase's wording rather than a subscription's.
  const [bought, setBought] = useState(false);
  useEffect(() => {
    setBought(new URLSearchParams(window.location.search).get("kind") === "model");
  }, []);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      setState({ kind: "error", message: t.errorBody });
      return;
    }

    let cancelled = false;
    (async () => {
      // session-license retries internally for a few seconds while the webhook catches up,
      // so one call is normally enough; this outer retry covers it still not being ready.
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const { token } = await fetchSessionLicense(sessionId);
          if (!cancelled) setState({ kind: "ready", token });
          return;
        } catch (e) {
          if (attempt === 2 && !cancelled) {
            setState({ kind: "error", message: e instanceof Error ? e.message : t.errorBody });
          }
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function copy(token: string) {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the token is still selectable text on the page.
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{bought ? t.boughtTitle : t.title}</h1>

      {state.kind === "loading" && (
        <div className="mt-8 rounded-lg border border-edge bg-surface-1 p-6">
          <p className="text-sm font-medium">{t.processing}</p>
          <p className="mt-1.5 text-xs text-ink-dim">{t.processingBody}</p>
        </div>
      )}

      {state.kind === "error" && (
        <div className="mt-8 rounded-lg border border-edge bg-surface-1 p-6">
          <p className="text-sm font-medium text-amber-300">{t.errorTitle}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-dim">{state.message}</p>
        </div>
      )}

      {state.kind === "ready" && (
        <div className="mt-8 rounded-lg border border-edge bg-surface-1 p-6">
          <p className="text-sm font-medium">{t.tokenLabel}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-dim">{bought ? t.boughtBody : t.tokenBody}</p>
          {/* noodlellm://license/<token> -- the app already registers this scheme for
              noodlellm://install links, so opening it here activates the subscription in one
              click when the app is installed. The copy-paste box below is the fallback for
              everyone else: a browser with no app to hand off to, or the scheme not yet
              registered. */}
          <a
            href={`noodlellm://license/${state.token}`}
            className="mt-3 block rounded-md bg-accent px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            {t.openInApp}
          </a>
          <div className="mt-3 flex gap-2">
            <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-md border border-edge bg-surface-2 px-3 py-2 text-xs">
              {state.token}
            </code>
            <button
              onClick={() => void copy(state.token)}
              className="shrink-0 rounded-md border border-edge px-3 py-2 text-xs text-ink-dim hover:bg-surface-2 hover:text-ink"
            >
              {copied ? t.copied : t.copyButton}
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-faint">{bought ? t.boughtManage : t.manageBody}</p>
        </div>
      )}

      <p className="mt-8 text-sm text-ink-dim">
        <Link href={href(locale, "/")} className="text-ink underline underline-offset-4 hover:text-accent">
          {t.backHome}
        </Link>
      </p>
    </main>
  );
}
