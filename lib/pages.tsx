import type { Metadata } from "next";
import { SITE } from "./site";
import { alternates, strings, type Locale } from "./i18n";
import Home from "@/components/pages/Home";
import Download from "@/components/pages/Download";
import SubscribeSuccess from "@/components/pages/SubscribeSuccess";
import Pricing from "@/components/pages/Pricing";
import Legal from "@/components/pages/Legal";
import { Individuals, Practices } from "@/components/pages/Audience";
import { AUDIENCES } from "@/components/pages/Home";

/**
 * Every page, once, for any language.
 *
 * English and the other four are separate route trees -- English keeps the addresses it
 * always had, the rest live under a prefix -- and each route file is a two-line wrapper
 * around what is here. A page changed in one place is changed in all five.
 */

export function layoutMetadata(locale: Locale): Metadata {
  const t = strings(locale).meta;
  const title = `${SITE.name} — ${t.tagline}`;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: `%s — ${SITE.name}` },
    description: t.description,
    alternates: alternates(locale, "/"),
    openGraph: { type: "website", siteName: SITE.name, title, description: t.description, locale },
    twitter: { card: "summary_large_image" },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.svg", type: "image/svg+xml" }],
      apple: "/apple-touch-icon.png",
    },
  };
}

export const homePage = (locale: Locale) => <Home locale={locale} />;

export function downloadMetadata(locale: Locale): Metadata {
  const t = strings(locale).meta;
  return {
    title: t.downloadTitle,
    description: t.downloadDescription(SITE.name),
    alternates: alternates(locale, "/download"),
  };
}
export const downloadPage = (locale: Locale) => <Download locale={locale} />;

export function subscribeSuccessMetadata(locale: Locale): Metadata {
  const t = strings(locale).subscribeSuccess;
  return {
    title: t.title,
    // Never indexed: this page only means anything with a session id in the URL, right
    // after a real payment.
    robots: { index: false, follow: false },
    alternates: alternates(locale, "/subscribe/success"),
  };
}
export const subscribeSuccessPage = (locale: Locale) => <SubscribeSuccess locale={locale} />;

export function pricingMetadata(locale: Locale): Metadata {
  const t = strings(locale).meta;
  return {
    title: t.pricingTitle,
    description: t.pricingDescription(SITE.name),
    alternates: alternates(locale, "/pricing"),
  };
}
export const pricingPage = (locale: Locale) => <Pricing locale={locale} />;

/**
 * The pages the homepage's question leads to. Their titles and descriptions are the
 * cards' own words, so a search result says the same thing the card does.
 */
function audienceMetadata(locale: Locale, index: number): Metadata {
  const choice = strings(locale).home.chooser[index];
  return { title: choice.t, description: choice.b, alternates: alternates(locale, AUDIENCES[index]) };
}
export const individualsMetadata = (locale: Locale) => audienceMetadata(locale, 0);
export const practicesMetadata = (locale: Locale) => audienceMetadata(locale, 1);
export const individualsPage = (locale: Locale) => <Individuals locale={locale} />;
export const practicesPage = (locale: Locale) => <Practices locale={locale} />;

/** The Terms and the Privacy Statement: English only, so no locale (see Legal). */
export const termsMetadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms for using Noodle LLM, its free trial and its subscriptions.",
  alternates: { canonical: "/terms" },
};
export const privacyMetadata: Metadata = {
  title: "Privacy Statement",
  description: "What Noodle LLM collects to run your subscription, and what never leaves your computer.",
  alternates: { canonical: "/privacy" },
};
export const termsPage = () => <Legal doc="terms" />;
export const privacyPage = () => <Legal doc="privacy" />;
export const creatorAgreementMetadata: Metadata = {
  title: "Creator Agreement",
  description: "The terms for listing and selling a model in the Noodle LLM store.",
  alternates: { canonical: "/creator-agreement" },
};
export const creatorAgreementPage = () => <Legal doc="creator-agreement" />;
