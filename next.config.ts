import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in the home dir was making
  // Next.js infer the wrong root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
