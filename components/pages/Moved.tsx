/**
 * Where a page that no longer exists used to be. The site is static, so there is no server
 * to send a redirect; the browser follows this refresh instead, and anyone with an old link
 * lands on the page that now carries what it said.
 */
export default function Moved({ to }: { to: string }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <a href={to} className="text-accent underline underline-offset-4">
        {to}
      </a>
    </main>
  );
}
