import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { getRequiredApiBaseUrl } from "./src/shared/lib/api-config";

const apiUrl = getRequiredApiBaseUrl();

const nextConfig: NextConfig = {
  output: "standalone",
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

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
