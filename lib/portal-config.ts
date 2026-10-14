/**
 * Whether the creator portal is switched on in this build, kept apart from lib/portal.ts so
 * server-rendered pages can ask without pulling in the upload code. See lib/portal.ts for the
 * two variables.
 */
export function config(): { url: string; anon: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && anon ? { url, anon } : null;
}

export function portalEnabled(): boolean {
  return config() !== null;
}

/**
 * Whether creators can charge for models. Off at launch: listings are free and their files
 * stay on Hugging Face. Set NEXT_PUBLIC_PAID_MODELS=on at build time, together with
 * PAID_MODELS=on in the Supabase function secrets, to open paid listings.
 */
export function paidModelsOpen(): boolean {
  return process.env.NEXT_PUBLIC_PAID_MODELS === "on";
}
