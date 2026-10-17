import type { NextConfig } from "next";

import { getRequiredApiBaseUrl } from "./src/shared/lib/api-config";

const apiUrl = getRequiredApiBaseUrl();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: apiUrl.hostname,
        pathname: "/public/**",
        port: apiUrl.port,
        protocol: apiUrl.protocol === "https:" ? "https" : "http",
      },
    ],
  },
};

export default nextConfig;
