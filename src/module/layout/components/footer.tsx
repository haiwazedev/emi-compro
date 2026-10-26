import { Globe2 } from "lucide-react";
import Image from "next/image";
import Link from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { getCommitmentCategories } from "@/module/commitment/lib/commitments-api";
import type { PublicSiteSettings } from "@/module/contact/content/contact";
import { getPublicSiteSettings } from "@/module/contact/lib/contact-api";
import { FooterNavGroup } from "@/module/layout/components/footer-nav-group";
import { footerContent } from "@/module/layout/content/footer";
import { getServiceDivisionFooterLinks } from "@/module/services/lib/services-api";
import { sectionContainerRailClassName } from "@/shared/components/section-container";
import { getCopyKey } from "@/i18n/keys";
import type { Locale } from "@/i18n/routing";

function SocialIcon({ iconUrl }: { iconUrl: string | null }) {
  if (iconUrl) {
    return (
      <Image
        alt=""
        aria-hidden="true"
        className="size-3.5 object-contain sm:size-4"
        height={16}
        src={iconUrl}
        unoptimized
        width={16}
      />
    );
  }

  return <Globe2 aria-hidden="true" className="size-3.5 sm:size-4" />;
}

export async function Footer({
  settings,
}: {
  settings?: PublicSiteSettings | null;
}) {
  const locale = await getLocale();
  const translate = await getTranslations({ locale, namespace: "copy" });
  const copy = (source: string) => translate(getCopyKey(source));
  const [siteSettings, commitmentCategories, serviceLinks] = await Promise.all([
    settings === undefined
      ? getPublicSiteSettings(locale as Locale).catch(() => null)
      : Promise.resolve(settings),
    getCommitmentCategories().catch(() => []),
    getServiceDivisionFooterLinks(locale as Locale).catch(() => []),
  ]);
  const serviceGroup =
    serviceLinks.length > 0
      ? [
          {
            id: "services",
            title: "Services",
            links: serviceLinks.map((link) => ({
              ...link,
              translateLabel: false,
            })),
          },
        ]
      : [];
  const commitmentGroup =
    commitmentCategories.length > 0
      ? [
          {
            id: "commitment",
            title: "Commitment",
            links: commitmentCategories.map((category) => ({
              label: category.name,
              href: `/commitments?category=${encodeURIComponent(category.slug)}#commitment-browser`,
              translateLabel: false,
            })),
          },
        ]
      : [];
  const footerNavGroups = footerContent.navGroups.flatMap((group) => [
    group,
    ...(group.id === "company" ? serviceGroup : []),
  ]);
  footerNavGroups.push(...commitmentGroup);
  const currentYear = new Intl.DateTimeFormat(locale, {
    year: "numeric",
  }).format(new Date());
  const emailAddresses = siteSettings?.emailAddresses ?? [];
  const companyName = siteSettings?.companyName;
  const address = siteSettings?.address;
  const phone = siteSettings?.phone;
  const phoneHref = siteSettings?.phoneHref;
  const socialLinks = siteSettings?.socialLinks ?? [];
  const hasEmailAddresses = emailAddresses.length > 0;
  const hasPhone = Boolean(phone);
  const hasCompanyDetails = Boolean(
    companyName || address || hasEmailAddresses || hasPhone,
  );

  return (
    <footer
      aria-label={copy("Site footer")}
      className="bg-primary text-foreground/80 py-6 sm:py-10 lg:py-12"
      id="footer"
    >
      <div className={sectionContainerRailClassName}>
        <div className="flex flex-col items-center text-center">
          <Link
            aria-label={copy("Danantara Indonesia home")}
            className="focus-visible:ring-secondary/50 inline-flex rounded-sm focus-visible:ring-2 focus-visible:outline-none"
            href="/"
          >
            <Image
              alt={copy("Danantara Indonesia")}
              className="h-9 w-auto sm:h-10 lg:h-11"
              height={1073}
              sizes="(min-width: 1024px) 170px, 145px"
              src="/danantara_logo.png"
              width={4090}
            />
          </Link>

          {hasCompanyDetails ? (
            <address className="text-foreground/80 mt-5 max-w-4xl text-xs leading-5 not-italic sm:text-sm sm:leading-6">
              {companyName ? (
                <p className="text-accent font-bold">{companyName}</p>
              ) : null}
              {address ? <p>{address}</p> : null}
              {hasEmailAddresses || hasPhone ? (
                <p>
                  {hasEmailAddresses ? (
                    <>
                      <span className="text-accent font-bold">
                        {copy("Email:")}
                      </span>{" "}
                      {emailAddresses.map((email, index) => (
                        <span key={email}>
                          {index > 0 && " · "}
                          <a
                            className="hover:text-secondary focus-visible:ring-secondary/50 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                            href={`mailto:${email}`}
                          >
                            {email}
                          </a>
                        </span>
                      ))}
                    </>
                  ) : null}
                  {hasEmailAddresses && hasPhone ? " · " : null}
                  {hasPhone ? (
                    <>
                      <span className="text-accent font-bold">
                        {copy("Telp:")}
                      </span>{" "}
                      {phoneHref ? (
                        <a
                          className="hover:text-secondary focus-visible:ring-secondary/50 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                          href={phoneHref}
                        >
                          {phone}
                        </a>
                      ) : (
                        phone
                      )}
                    </>
                  ) : null}
                </p>
              ) : null}
            </address>
          ) : null}
        </div>

        <nav aria-label={copy("Footer navigation")} className="mt-12 lg:mt-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            {footerNavGroups.map((group) => (
              <FooterNavGroup group={group} key={group.id} />
            ))}
          </div>
        </nav>

        <div className="border-foreground/20 mt-12 flex flex-col gap-5 border-t pt-5 sm:mt-16 sm:pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="text-foreground/60 text-xs leading-5 sm:text-sm">
            © {currentYear}
            {companyName ? ` ${companyName}` : ""}.{" "}
            {copy("All rights reserved.")}
          </p>

          {socialLinks.length > 0 ? (
            <ul
              aria-label={copy("Social and contact links")}
              className="flex items-center gap-2"
            >
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    aria-label={link.label}
                    className="border-foreground/20 bg-background text-accent hover:border-secondary hover:bg-primary hover:text-accent focus-visible:ring-secondary/50 flex size-8 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none sm:size-10"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SocialIcon iconUrl={link.iconUrl} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
