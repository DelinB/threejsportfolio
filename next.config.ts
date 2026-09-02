import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum-photos.com",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum-photos.appspot.com",
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;