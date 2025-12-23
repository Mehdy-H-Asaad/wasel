import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://wasel-black.vercel.app/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
