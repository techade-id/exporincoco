import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  async rewrites() {
    return [{ source: "/uploads/:name", destination: "/api/media/:name" }];
  },
};

export default nextConfig;
