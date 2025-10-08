import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["image-cdn.hypb.st", "www.highsnobiety.com", "www.boboandchichi.com"], // <-- add the host of your external image
  },
};

export default nextConfig;
