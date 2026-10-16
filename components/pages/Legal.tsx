import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";

export type LegalDoc = "terms" | "privacy" | "creator-agreement";

/**
 * The Terms and the Privacy Statement, read from `content/legal/*.md` at build time.
 *
 * English only, at one address each: the English text is the one that binds, so there are no
 * translated copies under /de, /ja and the rest. Every language's footer links here.
 */
export function legalText(doc: LegalDoc): string {
  return fs.readFileSync(path.join(process.cwd(), "content/legal", `${doc}.md`), "utf-8");
}

const link = "text-ink underline underline-offset-4 hover:text-accent";

const components: Components = {
  h1: ({ children }) => <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 className="pt-6 text-lg font-medium text-ink">{children}</h2>,
  strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
  ul: ({ children }) => <ul className="list-disc space-y-1.5 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-1.5 pl-5">{children}</ol>,
  // Site-relative links (the Terms pointing at /privacy) stay inside the static site.
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href} className={link}>
        {children}
      </Link>
    ) : (
      <a href={href} className={link}>
        {children}
      </a>
    ),
};

export default function Legal({ doc }: { doc: LegalDoc }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <article className="space-y-4 leading-relaxed text-ink-dim">
        <ReactMarkdown components={components}>{legalText(doc)}</ReactMarkdown>
      </article>
    </main>
  );
}
