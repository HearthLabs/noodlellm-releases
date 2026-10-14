"use client";

import { useCallback, useEffect, useState } from "react";
import { call } from "@/lib/portal";
import { dollars } from "@/lib/creators";
import type { PortalModel } from "./types";
import { Card, Notice, StatusBadge, bytes, input, primary, secondary } from "./ui";

interface Queued extends PortalModel {
  creators: { handle: string; display_name: string; review_state: string; payouts_enabled: boolean } | null;
}

interface Balance {
  creator_id: string;
  handle: string;
  payout_method: string | null;
  payout_email: string | null;
  sales: number;
  owed_cents: number;
}

/**
 * The review queue and the manual payouts, for the addresses in ADMIN_EMAILS. The server
 * checks that list on every call; hiding this tab from everyone else is only tidiness.
 */
export default function Admin() {
  const [models, setModels] = useState<Queued[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<{ kind: "error" | "ok"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [q, b] = await Promise.all([
        call<{ models: Queued[] }>("admin-review", { action: "list" }),
        call<{ balances: Balance[] }>("admin-review", { action: "balances" }),
      ]);
      setModels(q.models);
      setBalances(b.balances);
    } catch (e) {
      setMsg({ kind: "error", text: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function run(body: Record<string, unknown>, done: string) {
    setBusy(true);
    setMsg(null);
    try {
      await call("admin-review", body);
      setMsg({ kind: "ok", text: done });
      await load();
    } catch (e) {
      setMsg({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  async function download(fileId: string) {
    try {
      const { url } = await call<{ url: string }>("admin-review", { action: "file_url", file_id: fileId });
      window.location.href = url;
    } catch (e) {
      setMsg({ kind: "error", text: (e as Error).message });
    }
  }

  const waiting = models.filter((m) => m.status === "submitted");
  const live = models.filter((m) => m.status === "approved");

  return (
    <div className="space-y-6">
      {msg && <Notice kind={msg.kind}>{msg.text}</Notice>}

      <Card title={`Waiting for review (${waiting.length})`}>
        {waiting.length === 0 && <p className="text-sm text-ink-faint">Nothing to review.</p>}
        <div className="space-y-6">
          {waiting.map((m) => (
            <div key={m.id} className="rounded-md border border-edge bg-surface-0 p-4">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">{m.name}</h3>
                <span className="text-sm text-ink-faint">
                  by {m.creators?.display_name} (@{m.creators?.handle}
                  {m.creators?.review_state === "pending" ? ", first listing" : ""})
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-dim">{m.tagline}</p>
              <p className="mt-2 text-xs text-ink-faint">
                {m.license} · {m.kind === "lora" ? "adapter" : "full model"} · {m.price_cents ? `${dollars(m.price_cents)}${m.practice_price_cents ? ` (practice ${dollars(m.practice_price_cents)})` : ""}` : "free"}
                {m.price_cents > 0 && !m.creators?.payouts_enabled && " · paid by hand"}
              </p>
              <details className="mt-3 text-sm text-ink-dim">
                <summary className="cursor-pointer text-ink-faint">Description</summary>
                <pre className="mt-2 whitespace-pre-wrap font-sans">{m.description_md}</pre>
              </details>
              <ul className="mt-3 space-y-1 text-sm">
                {m.model_files.map((f) => (
                  <li key={f.id} className="flex flex-wrap items-center gap-3 text-ink-dim">
                    <span>
                      {f.quantization} · {bytes(f.size_bytes)} · {f.min_vram_mb} MB graphics memory · {f.context_length} tokens
                    </span>
                    <button className="text-accent hover:underline" onClick={() => void download(f.id)}>
                      Download to test
                    </button>
                    <code className="text-xs text-ink-faint">{f.sha256.slice(0, 16)}…</code>
                  </li>
                ))}
              </ul>
              <textarea
                className={`${input} mt-3`}
                rows={2}
                placeholder="Note to the creator (needed to send it back)"
                value={notes[m.id] ?? ""}
                onChange={(e) => setNotes({ ...notes, [m.id]: e.target.value })}
              />
              <div className="mt-3 flex gap-2">
                <button className={primary} disabled={busy} onClick={() => void run({ action: "approve", model_id: m.id }, `${m.name} is live.`)}>
                  Approve and publish
                </button>
                <button
                  className={secondary}
                  disabled={busy}
                  onClick={() => void run({ action: "reject", model_id: m.id, note: notes[m.id] }, `${m.name} went back to its creator.`)}
                >
                  Send back
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Owed to creators paid by hand">
        {balances.length === 0 && <p className="text-sm text-ink-faint">Nobody is owed anything.</p>}
        <div className="space-y-3">
          {balances.map((b) => (
            <BalanceRow key={b.creator_id} b={b} busy={busy} onPaid={(reference) => void run({ action: "mark_paid", creator_id: b.creator_id, reference }, `Marked @${b.handle} paid.`)} />
          ))}
        </div>
      </Card>

      <Card
        title={`Live creator models (${live.length})`}
        aside={
          <button className={secondary} disabled={busy} onClick={() => void run({ action: "publish_catalog" }, "Store catalogue republished.")}>
            Republish catalogue
          </button>
        }
      >
        <ul className="space-y-2 text-sm">
          {live.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center gap-3">
              <StatusBadge status={m.status} />
              <span>{m.name}</span>
              <span className="text-ink-faint">@{m.creators?.handle}</span>
              <button
                className="text-xs text-red-300 hover:underline"
                disabled={busy}
                onClick={() => {
                  const note = prompt(`Why is ${m.name} coming down? The creator sees this.`);
                  if (note) void run({ action: "remove", model_id: m.id, note }, `${m.name} is out of the store.`);
                }}
              >
                Take down
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function BalanceRow({ b, busy, onPaid }: { b: Balance; busy: boolean; onPaid: (reference: string) => void }) {
  const [reference, setReference] = useState("");
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md border border-edge bg-surface-0 p-3 text-sm">
      <span className="font-medium">@{b.handle}</span>
      <span className="text-ink-dim">
        {dollars(b.owed_cents)} from {b.sales} sale{b.sales === 1 ? "" : "s"} · {b.payout_method} {b.payout_email}
      </span>
      <input className={`${input} max-w-56`} placeholder="Payment reference" value={reference} onChange={(e) => setReference(e.target.value)} />
      <button className={secondary} disabled={busy || !reference.trim()} onClick={() => onPaid(reference.trim())}>
        Mark paid
      </button>
    </div>
  );
}
