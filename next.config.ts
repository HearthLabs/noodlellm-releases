import type { NextConfig } from "next";

const config: NextConfig = {
  // A static export: plain HTML on a CDN, no server to run or pay for. The site is a
  // catalogue that changes when we publish, not per visitor, so nothing here needs a server.
  output: "export",

  // Next's image optimiser needs a server. The screenshots are already sized for the page.
  images: { unoptimized: true },
};

export default config;
