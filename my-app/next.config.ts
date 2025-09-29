import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["image-cdn.hypb.st"], // <-- add the host of your external image
  },
};

export default nextConfig;
