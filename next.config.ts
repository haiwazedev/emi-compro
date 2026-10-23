import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { getRequiredApiBaseUrl } from "./src/shared/lib/api-config";

const apiUrl = getRequiredApiBaseUrl();

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
