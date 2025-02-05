import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gps-drawing-app.s3.ap-northeast-2.amazonaws.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
