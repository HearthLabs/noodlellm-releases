"use client";

import { useState } from "react";
import { call, paidModelsOpen, uploadFile, type UploadProgress } from "@/lib/portal";
import { GOOD_FOR, LICENCES, PRACTICE_MULTIPLE, TIER_DEVICES, dollars } from "@/lib/creators";
import type { Account, PortalModel } from "./types";
import { Card, Field, Notice, StatusBadge, bytes, input, primary, secondary } from "./ui";

/** Your listings, and the editor for one. */
export default function Listings({ account, onChanged }: { account: Account; onChanged: () => Promise<void> }) {
  const [editing, setEditing] = useState<PortalModel | "new" | null>(null);
  const [msg, setMsg] = useState<{ kind: "error" | "ok"; text: string } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  if (editing) {
    return (
      <Editor
        model={editing === "new" ? null : editing}
        onDone={async (text) => {
          setEditing(null);
          if (text) setMsg({ kind: "ok", text });
          await onChanged();
        }}
      />
    );
  }

  async function act(model: PortalModel, action: "submit" | "withdraw") {
    if (action === "withdraw" && model.published && !confirm("This takes the model out of the store until it is reviewed again. Continue?")) return;
    setBusy(model.id);
    setMsg(null);
    try {
      await call("creator-model", { action, model_id: model.id });
      setMsg({
        kind: "ok",
        text: action === "submit" ? "Sent for review. Its status here changes when it is live, or if anything needs changing." : "Withdrawn. You can edit it now.",
      });
      await onChanged();
    } catch (e) {
      setMsg({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-dim">
          {account.models.length ? `${account.models.length} model${account.models.length === 1 ? "" : "s"}` : "No models yet."}
        </p>
        <button className={primary} onClick={() => setEditing("new")}>
          Add a model
        </button>
      </div>
      {msg && <Notice kind={msg.kind}>{msg.text}</Notice>}
      {account.models.map((m) => {
        const missing = m.model_files.filter((f) => !f.uploaded).length;
        const editable = m.status === "draft" || m.status === "rejected";
        return (
          <Card key={m.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium">{m.name}</h3>
                  <StatusBadge status={m.status} />
                </div>
                <p className="mt-1 text-sm text-ink-dim">{m.tagline || "No summary yet"}</p>
                <p className="mt-2 text-xs text-ink-faint">
                  {m.price_cents ? `${dollars(m.price_cents)}${m.practice_price_cents ? `, practice ${dollars(m.practice_price_cents)}` : ""}` : "Free"} · {m.model_files.length} file{m.model_files.length === 1 ? "" : "s"}
                  {missing > 0 && ` · ${missing} still to upload or link`}
                  {m.published && (
                    <>
                      {" · "}
                      <a className="text-accent hover:underline" href={`/models/${m.slug}`}>
                        View in the store
                      </a>
                    </>
                  )}
                </p>
                {m.review_note && (m.status === "rejected" || m.status === "removed") && (
                  <p className="mt-3 rounded-md border border-red-500/40 px-3 py-2 text-sm text-red-300">Reviewer: {m.review_note}</p>
                )}
              </div>
              <div className="flex gap-2">
                {editable && (
                  <>
                    <button className={secondary} onClick={() => setEditing(m)}>
                      Edit
                    </button>
                    <button className={primary} disabled={busy === m.id || missing > 0} onClick={() => void act(m, "submit")}>
                      Submit for review
                    </button>
                  </>
                )}
                {(m.status === "submitted" || m.status === "approved") && (
                  <button className={secondary} disabled={busy === m.id} onClick={() => void act(m, "withdraw")}>
                    {m.status === "approved" ? "Withdraw to edit" : "Withdraw"}
                  </button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

interface FileDraft {
  id?: string;
  version: string;
  quantization: string;
  size_bytes: number;
  min_vram_gb: string;
  min_ram_gb: string;
  context_length: string;
  uploaded: boolean;
  frozen: boolean;
  /** A free model's file on Hugging Face: whatever was pasted, pinned by the server on save. */
  link: string;
  local?: File;
}

const gbToMb = (s: string) => Math.round(Number(s) * 1024);
const mbToGb = (n: number) => String(Math.round((n / 1024) * 10) / 10);

function Editor({ model, onDone }: { model: PortalModel | null; onDone: (msg?: string) => Promise<void> }) {
  const [name, setName] = useState(model?.name ?? "");
  const [slug, setSlug] = useState(model?.slug ?? "");
  const [tagline, setTagline] = useState(model?.tagline ?? "");
  const [description, setDescription] = useState(model?.description_md ?? "");
  const [kind, setKind] = useState<"base" | "lora">(model?.kind ?? "base");
  const [baseSlug, setBaseSlug] = useState("");
  const [license, setLicense] = useState(model?.license ?? "");
  const [released, setReleased] = useState(model?.released_at ?? "");
  // Paid listings open later (lib/portal-config.ts); until then every model is free, and a
  // draft priced before that is shown as free so it can still be listed.
  const paidOpen = paidModelsOpen();
  const [paid, setPaid] = useState(paidOpen && (model?.price_cents ?? 0) > 0);
  const [price, setPrice] = useState(model?.price_cents ? (model.price_cents / 100).toFixed(2) : "");
  // Empty means "five times the personal price", worked out when saving, so the suggestion
  // follows the personal price as it is typed until the creator sets their own.
  const [practicePrice, setPracticePrice] = useState(
    model?.practice_price_cents ? (model.practice_price_cents / 100).toFixed(2) : "",
  );
  const suggestedPractice = price ? (Number(price) * PRACTICE_MULTIPLE).toFixed(2) : "";
  const [goodFor, setGoodFor] = useState<string[]>(model?.good_for ?? []);
  const [files, setFiles] = useState<FileDraft[]>(
    model?.model_files.map((f) => ({
      id: f.id,
      version: f.version,
      quantization: f.quantization,
      size_bytes: f.size_bytes,
      min_vram_gb: mbToGb(f.min_vram_mb),
      min_ram_gb: mbToGb(f.min_ram_mb),
      context_length: String(f.context_length),
      uploaded: f.uploaded,
      frozen: Boolean(f.published_at),
      link: f.source_url ?? "",
    })) ?? [],
  );
  const [progress, setProgress] = useState<{ name: string; p: UploadProgress } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setFile = (i: number, patch: Partial<FileDraft>) => setFiles((fs) => fs.map((f, j) => (j === i ? { ...f, ...patch } : f)));

  function pick(i: number, local: File | undefined) {
    if (!local) return;
    if (!local.name.toLowerCase().endsWith(".gguf")) {
      setError("Model files must be in GGUF format (a .gguf file).");
      return;
    }
    setError(null);
    // A different file is a different upload, even into the same slot.
    setFile(i, { local, size_bytes: local.size, uploaded: false });
  }

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const quants = files.map((f) => f.quantization.trim());
      if (new Set(quants).size !== quants.length) throw new Error("Give each file a different version name.");
      if (paid && files.some((f) => !f.id && !f.local)) throw new Error("Choose a .gguf file for each version.");
      if (!paid && files.some((f) => !f.link.trim())) throw new Error("Paste the Hugging Face link for each version.");

      const { model: saved } = await call<{ model: PortalModel }>("creator-model", {
        action: "save",
        model: {
          id: model?.id,
          slug,
          name,
          tagline,
          description_md: description,
          kind,
          base_model_slug: kind === "lora" ? baseSlug || undefined : undefined,
          base_model_id: kind === "lora" ? model?.base_model_id : undefined,
          license,
          released_at: released || null,
          price_cents: paid ? Math.round(Number(price) * 100) : 0,
          practice_price_cents: paid ? Math.round(Number(practicePrice || suggestedPractice) * 100) : null,
          good_for: goodFor,
          files: files.map((f) => ({
            id: f.id,
            version: f.version || "1.0.0",
            quantization: f.quantization.trim(),
            size_bytes: f.size_bytes,
            source_url: paid ? undefined : f.link.trim(),
            min_vram_mb: gbToMb(f.min_vram_gb),
            min_ram_mb: gbToMb(f.min_ram_gb),
            context_length: Number(f.context_length),
          })),
        },
      });

      // Version names are unique within a listing, so they match each chosen file to the row
      // the server created for it.
      for (const f of files) {
        if (!paid || !f.local) continue;
        const row = saved.model_files.find((r) => r.quantization === f.quantization.trim());
        if (!row) continue;
        await uploadFile(row.id, f.local, (p) => setProgress({ name: f.local!.name, p }));
      }
      setProgress(null);
      await onDone(
        paid && files.some((f) => f.local)
          ? "Saved and uploaded. Submit it for review when you are ready."
          : "Saved. Submit it for review when you are ready.",
      );
    } catch (e) {
      setError((e as Error).message);
      setProgress(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void save();
      }}
    >
      <button type="button" className="text-sm text-ink-dim hover:text-ink" onClick={() => void onDone()} disabled={busy}>
        ← Back to your models
      </button>

      <Card title={model ? `Edit ${model.name}` : "Add a model"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input
              className={input}
              required
              maxLength={100}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!model) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 63));
              }}
            />
          </Field>
          <Field label="Web address" hint={`noodlellm.com/models/${slug || "…"}`}>
            <input className={input} required value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} />
          </Field>
        </div>
        <div className="mt-4 space-y-4">
          <Field label="One-line summary" hint="Shown on the store card. Say what it is good for, in plain words.">
            <input className={input} maxLength={140} value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </Field>
          <Field
            label="Description"
            hint="Markdown. What it was trained for, what it does well and badly, and an example of what to ask it. Write for someone who has never heard of a quantization."
          >
            <textarea className={input} rows={8} maxLength={8000} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
          <div>
            <span className="mb-2 block text-sm font-medium">Good for</span>
            <div className="flex flex-wrap gap-2">
              {GOOD_FOR.map((g) => {
                const on = goodFor.includes(g.id);
                return (
                  <button
                    type="button"
                    key={g.id}
                    onClick={() => setGoodFor(on ? goodFor.filter((x) => x !== g.id) : [...goodFor, g.id])}
                    className={`rounded-full border px-3 py-1 text-sm ${on ? "border-accent text-ink" : "border-edge text-ink-dim"}`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      <Card title={paidOpen ? "Rights and price" : "Rights"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Licence" hint="The licence of the weights you are listing. A fine-tune keeps its base model's licence.">
            <select className={input} required value={license} onChange={(e) => setLicense(e.target.value)}>
              <option value="">Pick one</option>
              {LICENCES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Released on" hint="When you finished this model. Optional.">
            <input className={input} type="date" value={released} onChange={(e) => setReleased(e.target.value)} />
          </Field>
          <Field label="Type">
            <select className={input} value={kind} onChange={(e) => setKind(e.target.value as "base" | "lora")}>
              <option value="base">A complete model</option>
              <option value="lora">An adapter (LoRA) for a model in the store</option>
            </select>
          </Field>
          {kind === "lora" && (
            <Field
              label="Runs on"
              hint={model?.base_model_id ? "Leave empty to keep the model it runs on now." : "The web address of the store model it adapts, like qwen2.5-7b-instruct."}
            >
              <input className={input} required={!model?.base_model_id} value={baseSlug} onChange={(e) => setBaseSlug(e.target.value)} />
            </Field>
          )}
          {paidOpen && (
          <Field
            label="Personal price"
            hint={paid ? `For one person, on up to ${TIER_DEVICES.personal} computers. Between $1 and $1,000, in US dollars. You keep 75%.` : "Anyone can download it."}
          >
            <div className="flex gap-2">
              <select className={input} value={paid ? "paid" : "free"} onChange={(e) => setPaid(e.target.value === "paid")}>
                <option value="free">Free</option>
                <option value="paid">One-off price</option>
              </select>
              {paid && (
                <input
                  className={input}
                  type="number"
                  min="1"
                  max="1000"
                  step="0.01"
                  required
                  placeholder="9.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              )}
            </div>
          </Field>
          )}
          {paid && (
            <Field
              label="Practice price"
              hint={`For a firm or practice, on up to ${TIER_DEVICES.practice} computers. We suggest ${PRACTICE_MULTIPLE} times the personal price; set your own if your model is worth more to a business.`}
            >
              <input
                className={input}
                type="number"
                min={price || "1"}
                max="10000"
                step="0.01"
                placeholder={suggestedPractice || "49.95"}
                value={practicePrice}
                onChange={(e) => setPracticePrice(e.target.value)}
              />
            </Field>
          )}
        </div>
        {!paidOpen && (
          <p className="mt-4 text-sm text-ink-dim">
            Listings are free for now: anyone can install your model, and its files stay on your Hugging Face page. Paid listings
            open later, and we will email you when they do.
          </p>
        )}
        {license && license !== "Apache-2.0" && license !== "MIT" && license !== "BSD-3-Clause" && paid && (
          <p className="mt-4 text-xs text-ink-faint">
            Check that this licence lets you charge for the weights. Llama and Gemma derivatives can usually be sold, with their notice
            and use policy attached; the reviewer will check.
          </p>
        )}
      </Card>

      <Card
        title="Files"
        aside={
          <button
            type="button"
            className={secondary}
            onClick={() =>
              setFiles([
                ...files,
                { version: "1.0.0", quantization: "", size_bytes: 0, min_vram_gb: "", min_ram_gb: "", context_length: "8192", uploaded: false, frozen: false, link: "" },
              ])
            }
          >
            Add a file
          </button>
        }
      >
        <p className="mb-4 text-sm text-ink-dim">
          {paid
            ? "Upload one .gguf file per version, such as a smaller Q4_K_M and a sharper Q8_0."
            : "Link one .gguf file per version on Hugging Face, such as a smaller Q4_K_M and a sharper Q8_0. The repository has to be public and not gated. We record the exact file you link, so later changes on Hugging Face do not reach the store until you add a new version."}{" "}
          The memory figures decide whether the store tells a
          buyer it will run on their PC, so measure them if you can; the store marks them as not yet measured by us.
        </p>
        {files.length === 0 && <p className="text-sm text-ink-faint">No files yet.</p>}
        <div className="space-y-4">
          {files.map((f, i) =>
            f.frozen ? (
              <div key={f.id} className="rounded-md border border-edge bg-surface-0 p-4 text-sm text-ink-dim">
                <span className="font-medium text-ink">{f.quantization}</span> · release {f.version} · {bytes(f.size_bytes)} ·{" "}
                {f.min_vram_gb} GB graphics memory
                <p className="mt-1 text-xs text-ink-faint">
                  This file has been in the store, so it stays exactly as it is for the people who have it. To improve it, add a new
                  file with a new version name.
                </p>
              </div>
            ) : (
            <div key={f.id ?? `new-${i}`} className="rounded-md border border-edge bg-surface-0 p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Version name" hint="Usually the quantization, like Q4_K_M.">
                  <input className={input} required maxLength={20} value={f.quantization} onChange={(e) => setFile(i, { quantization: e.target.value })} />
                </Field>
                <Field label="Graphics memory needed (GB)">
                  <input className={input} type="number" min="0.1" step="0.1" required value={f.min_vram_gb} onChange={(e) => setFile(i, { min_vram_gb: e.target.value })} />
                </Field>
                <Field label="RAM needed (GB)">
                  <input className={input} type="number" min="0.1" step="0.1" required value={f.min_ram_gb} onChange={(e) => setFile(i, { min_ram_gb: e.target.value })} />
                </Field>
                <Field label="Context length (tokens)">
                  <input className={input} type="number" min="512" step="1" required value={f.context_length} onChange={(e) => setFile(i, { context_length: e.target.value })} />
                </Field>
                <Field label="Release number">
                  <input className={input} maxLength={20} value={f.version} onChange={(e) => setFile(i, { version: e.target.value })} />
                </Field>
                {paid ? (
                  <Field label="File" hint={f.local ? `${f.local.name}, ${bytes(f.size_bytes)}` : f.uploaded && !f.link ? `Uploaded, ${bytes(f.size_bytes)}` : "Not uploaded yet"}>
                    <input type="file" accept=".gguf" className="block w-full text-sm text-ink-dim" onChange={(e) => pick(i, e.target.files?.[0])} />
                  </Field>
                ) : (
                  <div className="sm:col-span-3">
                    <Field
                      label="Link on Hugging Face"
                      hint={f.uploaded && f.link ? `Linked, ${bytes(f.size_bytes)}` : "The file's page, like https://huggingface.co/you/your-model/blob/main/your-model-Q4_K_M.gguf"}
                    >
                      <input
                        className={input}
                        type="url"
                        required
                        placeholder="https://huggingface.co/…/….gguf"
                        value={f.link}
                        onChange={(e) => setFile(i, { link: e.target.value })}
                      />
                    </Field>
                  </div>
                )}
              </div>
              <button type="button" className="mt-3 text-xs text-red-300 hover:underline" onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                Remove this file
              </button>
            </div>
            ),
          )}
        </div>
      </Card>

      {progress && (
        <Card>
          <p className="text-sm text-ink-dim">
            {progress.p.phase === "hashing" ? "Checking" : progress.p.phase === "uploading" ? "Uploading" : "Finishing"} {progress.name}…{" "}
            {Math.floor((progress.p.done / Math.max(progress.p.total, 1)) * 100)}%
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full bg-accent transition-all" style={{ width: `${(progress.p.done / Math.max(progress.p.total, 1)) * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-ink-faint">Keep this tab open until it finishes.</p>
        </Card>
      )}
      {error && <Notice kind="error">{error}</Notice>}
      <div className="flex gap-3">
        <button className={primary} disabled={busy}>
          {busy ? "Saving…" : paid && files.some((f) => f.local) ? "Save and upload" : "Save draft"}
        </button>
        <button type="button" className={secondary} disabled={busy} onClick={() => void onDone()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
