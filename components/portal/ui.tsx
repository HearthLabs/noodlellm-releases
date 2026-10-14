"use client";

import type { ReactNode } from "react";

/** The portal's few form pieces, so every page of it looks the same. */

export const input =
  "w-full rounded-md border border-edge bg-surface-0 px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none";
export const primary =
  "rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface-0 hover:brightness-110 disabled:opacity-50";
export const secondary =
  "rounded-md border border-edge px-4 py-2 text-sm text-ink-dim hover:text-ink disabled:opacity-50";

export function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

export function Card({ title, children, aside }: { title?: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="rounded-lg border border-edge bg-surface-1 p-5">
      {(title || aside) && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="text-lg font-medium">{title}</h2>}
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}

export function Notice({ kind, children }: { kind: "error" | "ok" | "info"; children: ReactNode }) {
  const tone =
    kind === "error" ? "border-red-500/40 text-red-300" : kind === "ok" ? "border-emerald-500/40 text-emerald-300" : "border-edge text-ink-dim";
  return <p className={`rounded-md border px-3 py-2 text-sm ${tone}`}>{children}</p>;
}

const STATUS: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draft", tone: "bg-surface-2 text-ink-dim" },
  submitted: { label: "Waiting for review", tone: "bg-amber-500/15 text-amber-300" },
  approved: { label: "Live in the store", tone: "bg-emerald-500/15 text-emerald-300" },
  rejected: { label: "Needs changes", tone: "bg-red-500/15 text-red-300" },
  removed: { label: "Removed", tone: "bg-red-500/15 text-red-300" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? STATUS.draft;
  return <span className={`rounded-full px-2.5 py-0.5 text-xs ${s.tone}`}>{s.label}</span>;
}

export function bytes(n: number): string {
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(2)} GB`;
  if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(0)} MB`;
  return `${n} bytes`;
}
