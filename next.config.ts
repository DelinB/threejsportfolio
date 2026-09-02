import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    /* Placeholder project images (picsum) — same source as the
       original site. Swap to local images under /public in real
       production and remove these patterns. */
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum-photos.com" },
      { protocol: "https", hostname: "fastly.picsum-photos.appspot.com" },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
