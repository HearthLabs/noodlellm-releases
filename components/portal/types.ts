/** What creator-profile's "get" returns. Mirrors the tables in supabase/migrations. */

export interface PortalFile {
  id: string;
  version: string;
  quantization: string;
  size_bytes: number;
  min_vram_mb: number;
  min_ram_mb: number;
  context_length: number;
  uploaded: boolean;
  sha256: string;
  /** A free listing's file on Hugging Face, pinned to a commit. Null for an upload. */
  source_url: string | null;
  /** Set once the file has been in the store; it can never change after that. */
  published_at: string | null;
}

export interface PortalModel {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description_md: string | null;
  kind: "base" | "lora";
  base_model_id: string | null;
  license: string;
  released_at: string | null;
  price_cents: number;
  practice_price_cents: number | null;
  good_for: string[];
  status: "draft" | "submitted" | "approved" | "rejected" | "removed";
  review_note: string | null;
  published: boolean;
  model_files: PortalFile[];
}

export interface Creator {
  id: string;
  handle: string;
  display_name: string;
  bio: string | null;
  stripe_account_id: string | null;
  payouts_enabled: boolean;
  review_state: string;
}

export interface CreatorPrivate {
  legal_name: string | null;
  country: string | null;
  contact_email: string | null;
  payout_method: "stripe" | "paypal" | "payoneer" | "wise";
  payout_email: string | null;
  tax_form: "w9" | "w8ben" | "w8bene" | null;
  agreement_version: string | null;
  agreement_accepted_at: string | null;
}

export interface Sale {
  gross_cents: number;
  creator_share_cents: number;
  payout_status: "paid_by_stripe" | "owed" | "paid" | "reversed";
  created_at: string;
  model_id: string;
}

export interface Account {
  email: string;
  is_admin: boolean;
  agreement_version: string;
  platform_fee_percent: number;
  creator: Creator | null;
  private: CreatorPrivate | null;
  models: PortalModel[];
  sales: Sale[];
}
