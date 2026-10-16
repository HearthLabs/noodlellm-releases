import type { Metadata } from "next";
import { SITE } from "./site";
import { alternates, href, strings, type Locale } from "./i18n";
import Home from "@/components/pages/Home";
import Moved from "@/components/pages/Moved";
import SubscribeSuccess from "@/components/pages/SubscribeSuccess";
import Pricing from "@/components/pages/Pricing";
import Legal from "@/components/pages/Legal";

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
 * Addresses that used to be pages: Download, Individuals, Practices, Licences and the
 * Creator Agreement. Each now sends its visitor to the page that carries what it said, and
 * asks search engines to drop it.
 */
export const movedMetadata: Metadata = { robots: { index: false, follow: true } };
export const movedPage = (to: string) => <Moved to={to} />;
export const homeFor = (locale: Locale) => href(locale, "/");
export const pricingFor = (locale: Locale) => href(locale, "/pricing");


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
