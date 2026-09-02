import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/brandkit", destination: "/mediakit", permanent: true }];
  },
  images: {
    domains: ["image-cdn.hypb.st", "www.highsnobiety.com", "skysportswear.com", "www.boboandchichi.com", "cdn.dtlaprint.com", "static.vecteezy.com", "510skateboarding.com", "losangelesapparel.net"], // <-- add the host of your external image
  },
};

export default nextConfig;
