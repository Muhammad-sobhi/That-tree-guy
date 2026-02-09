import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "ready-ally-thattreeguy-134e425d.koyeb.app",
        pathname: "/storage/**",
      },
    ],
  },
  // This solves the CORS "blocked by policy" errors
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ready-ally-thattreeguy-134e425d.koyeb.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;