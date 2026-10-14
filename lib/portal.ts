/**
 * The creator portal's link to Supabase: signing in with an emailed code, calling the portal's
 * edge functions, and uploading model files straight to storage.
 *
 * Plain fetch against Supabase Auth's REST endpoints rather than supabase-js, for the same
 * reason lib/billing.ts gives: a static export with a handful of calls does not need the SDK.
 *
 * Needs two build-time variables, both public by design (Supabase's anon key is meant to ship
 * to browsers; row-level security and the functions' own checks are what protect data):
 *   NEXT_PUBLIC_SUPABASE_URL       https://<project>.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY  the project's anon key
 * Without them `portalEnabled()` is false and the portal says it is not open yet.
 */
import { createSHA256 } from "hash-wasm";
import { config, portalEnabled } from "./portal-config";

export { paidModelsOpen, portalEnabled } from "./portal-config";

const SESSION_KEY = "noodlellm.portal.session";

interface Session {
  access_token: string;
  refresh_token: string;
  /** Epoch milliseconds. */
  expires_at: number;
  email: string;
}


function need() {
  const c = config();
  if (!c) throw new Error("The creator portal is not configured yet");
  return c;
}

function load(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function save(s: Session | null) {
  try {
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // Private windows can refuse storage; the session then lasts until the page closes.
  }
}

async function auth(path: string, body: unknown) {
  const { url, anon } = need();
  const res = await fetch(`${url}/auth/v1/${path}`, {
    method: "POST",
    headers: { apikey: anon, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.msg ?? json.error_description ?? json.error ?? `Sign-in failed (${res.status})`);
  return json;
}

function fromTokens(json: { access_token: string; refresh_token: string; expires_in: number; user?: { email?: string } }, email: string): Session {
  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_at: Date.now() + json.expires_in * 1000,
    email: json.user?.email ?? email,
  };
}

/** Emails a 6-digit code. Creates the account on first use: anyone can become a creator. */
export async function requestCode(email: string): Promise<void> {
  await auth("otp", { email: email.trim().toLowerCase(), create_user: true });
}

export async function verifyCode(email: string, code: string): Promise<Session> {
  const e = email.trim().toLowerCase();
  const s = fromTokens(await auth("verify", { type: "email", email: e, token: code.trim() }), e);
  save(s);
  return s;
}

export function signOut() {
  save(null);
}

/** The signed-in session, refreshed if it is about to expire. Null when signed out. */
export async function currentSession(): Promise<Session | null> {
  const s = load();
  if (!s) return null;
  if (s.expires_at - Date.now() > 60_000) return s;
  try {
    const fresh = fromTokens(await auth("token?grant_type=refresh_token", { refresh_token: s.refresh_token }), s.email);
    save(fresh);
    return fresh;
  } catch {
    save(null);
    return null;
  }
}

/** Calls one of the portal's edge functions as the signed-in creator. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function call<T = any>(fn: string, body: unknown): Promise<T> {
  const { url, anon } = need();
  const s = await currentSession();
  const res = await fetch(`${url}/functions/v1/${fn}`, {
    method: "POST",
    headers: {
      apikey: anon,
      "Content-Type": "application/json",
      ...(s ? { Authorization: `Bearer ${s.access_token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
  return json as T;
}

/** The public functions URL, for the Buy button on model pages (no sign-in involved). */
export function functionsBase(): string | null {
  const c = config();
  return c ? `${c.url}/functions/v1` : null;
}

export interface UploadProgress {
  phase: "hashing" | "uploading" | "finishing";
  done: number;
  total: number;
}

const HASH_CHUNK = 16 * 1024 * 1024;

/** SHA-256 of a local file, read in chunks so a 20 GB model never sits in memory whole. The
 * app checks every download against this, so it is the contract with every buyer. */
async function sha256(file: File, progress: (p: UploadProgress) => void): Promise<string> {
  const hasher = await createSHA256();
  hasher.init();
  for (let off = 0; off < file.size; off += HASH_CHUNK) {
    const chunk = new Uint8Array(await file.slice(off, off + HASH_CHUNK).arrayBuffer());
    hasher.update(chunk);
    progress({ phase: "hashing", done: Math.min(off + HASH_CHUNK, file.size), total: file.size });
  }
  return hasher.digest("hex");
}

/**
 * Hashes a file, then uploads it in parts straight to storage through signed URLs, a few at
 * a time. The bucket's CORS rules must allow PUT from this site and expose the ETag header
 * (CREATORS.md), or every part fails.
 */
export async function uploadFile(fileId: string, file: File, progress: (p: UploadProgress) => void): Promise<void> {
  const hash = await sha256(file, progress);
  const start = await call<{ upload_id: string; part_bytes: number; urls: string[] }>("creator-model", {
    action: "upload_start",
    file_id: fileId,
  });

  const parts: { part: number; etag: string }[] = [];
  let sent = 0;
  let next = 0;
  async function worker() {
    while (next < start.urls.length) {
      const i = next++;
      const blob = file.slice(i * start.part_bytes, (i + 1) * start.part_bytes);
      let etag: string | null = null;
      for (let attempt = 0; attempt < 3 && !etag; attempt++) {
        const res = await fetch(start.urls[i], { method: "PUT", body: blob }).catch(() => null);
        if (res?.ok) etag = res.headers.get("ETag");
      }
      if (!etag) throw new Error(`Part ${i + 1} of the upload failed. Check your connection and try again.`);
      parts.push({ part: i + 1, etag });
      sent += blob.size;
      progress({ phase: "uploading", done: sent, total: file.size });
    }
  }
  await Promise.all([worker(), worker(), worker()]);

  progress({ phase: "finishing", done: file.size, total: file.size });
  await call("creator-model", { action: "upload_complete", file_id: fileId, upload_id: start.upload_id, parts, sha256: hash });
}
