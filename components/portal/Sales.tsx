"use client";

import { dollars } from "@/lib/creators";
import type { Account } from "./types";
import { Card } from "./ui";

const STATUS: Record<string, string> = {
  paid_by_stripe: "Paid to you by Stripe",
  owed: "Waiting for the monthly payout",
  paid: "Paid out",
  reversed: "Refunded to the buyer",
};

/** Every sale of your models, your share of each, and what is still owed. */
export default function Sales({ account }: { account: Account }) {
  const names = new Map(account.models.map((m) => [m.id, m.name]));
  const live = account.sales.filter((s) => s.payout_status !== "reversed");
  const earned = live.reduce((n, s) => n + s.creator_share_cents, 0);
  const owed = account.sales.filter((s) => s.payout_status === "owed").reduce((n, s) => n + s.creator_share_cents, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Sales" value={String(live.length)} />
        <Stat label="Your share, all time" value={dollars(earned)} />
        <Stat label="Still to be paid out" value={dollars(owed)} />
      </div>
      <Card title="Recent sales">
        {account.sales.length === 0 ? (
          <p className="text-sm text-ink-faint">No sales yet. Free downloads are not counted here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-ink-faint">
                <tr>
                  <th className="py-2">Date</th>
                  <th className="py-2">Model</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Your share</th>
                  <th className="py-2 pl-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge">
                {account.sales.map((s, i) => (
                  <tr key={i} className={s.payout_status === "reversed" ? "text-ink-faint line-through" : "text-ink-dim"}>
                    <td className="py-2">{new Date(s.created_at).toLocaleDateString("en")}</td>
                    <td className="py-2">{names.get(s.model_id) ?? "A removed model"}</td>
                    <td className="py-2 text-right">{dollars(s.gross_cents)}</td>
                    <td className="py-2 text-right">{dollars(s.creator_share_cents)}</td>
                    <td className="py-2 pl-4 no-underline">{STATUS[s.payout_status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-4 text-xs text-ink-faint">
          Prices are in US dollars. Stripe pays your share at each sale; PayPal, Payoneer and Wise payouts go out in the first week of
          each month. Noodle LLM keeps {account.platform_fee_percent}%.
        </p>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-edge bg-surface-1 p-4">
      <p className="text-xs uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
