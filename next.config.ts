import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["rickandmortyapi.com"],
  },
};

export default nextConfig;
