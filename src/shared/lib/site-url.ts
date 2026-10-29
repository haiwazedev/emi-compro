import "server-only";

export function getSiteOrigin() {
  const configuredSiteUrl = process.env.SITE_URL?.trim();

  if (!configuredSiteUrl) {
    throw new Error("SITE_URL must be set to the public site origin.");
  }

  let siteUrl: URL;

  try {
    siteUrl = new URL(configuredSiteUrl);
  } catch {
    throw new Error("SITE_URL must be a valid absolute HTTP or HTTPS origin.");
  }

  if (
    !["http:", "https:"].includes(siteUrl.protocol) ||
    siteUrl.username ||
    siteUrl.password ||
    siteUrl.pathname !== "/" ||
    siteUrl.search ||
    siteUrl.hash
  ) {
    throw new Error(
      "SITE_URL must be an HTTP or HTTPS origin without credentials, a path, a query, or a fragment.",
    );
  }

  return siteUrl.origin;
}
