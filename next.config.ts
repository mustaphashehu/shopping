import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['m.media-amazon.com', 'lh3.googleusercontent.com'], // Add allowed image domain here
  },
};

export default nextConfig;
