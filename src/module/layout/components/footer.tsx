import { AtSign, Globe2, Play } from "lucide-react";
import Image from "next/image";

import { FooterNavGroup } from "@/module/layout/components/footer-nav-group";
import type { FooterSocialIcon } from "@/module/layout/content/footer";
import { footerContent } from "@/module/layout/content/footer";

function SocialIcon({ icon }: { icon: FooterSocialIcon }) {
  const iconClassName = "size-3.5 sm:size-4";

  switch (icon) {
    case "website":
      return <Globe2 aria-hidden="true" className={iconClassName} />;
    case "linkedin":
      return (
        <span aria-hidden="true" className="text-xs font-bold sm:text-sm">
          in
        </span>
      );
    case "x":
      return (
        <span aria-hidden="true" className="text-xs font-medium sm:text-sm">
          𝕏
        </span>
      );
    case "email":
      return <AtSign aria-hidden="true" className={iconClassName} />;
    case "youtube":
      return (
        <Play
          aria-hidden="true"
          className={iconClassName}
          fill="currentColor"
        />
      );
  }
}

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-footer-background px-6 py-6 text-footer-foreground sm:py-10 lg:px-10 lg:py-12"
      id="footer"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <a
            aria-label="Danantara Indonesia home"
            className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-link-hover/50"
            href="#home"
          >
            <Image
              alt="Danantara Indonesia"
              className="h-9 w-auto sm:h-10 lg:h-11"
              height={1073}
              sizes="(min-width: 1024px) 170px, 145px"
              src="/danantara_logo.png"
              width={4090}
            />
          </a>

          <address className="mt-5 max-w-4xl not-italic text-xs leading-5 text-footer-foreground sm:text-sm sm:leading-6">
            <p className="font-bold text-footer-foreground-strong">
              {footerContent.companyName}
            </p>
            <p>{footerContent.address}</p>
            <p>
              <span className="font-bold text-footer-foreground-strong">
                Email:
              </span>{" "}
              {footerContent.emailAddresses.map((email, index) => (
                <span key={email}>
                  {index > 0 && " · "}
                  <a
                    className="rounded-sm transition-colors hover:text-footer-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-link-hover/50"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                </span>
              ))}
              {" · "}
              <span className="font-bold text-footer-foreground-strong">
                Telp:
              </span>{" "}
              <a
                className="rounded-sm transition-colors hover:text-footer-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-link-hover/50"
                href={footerContent.phoneHref}
              >
                {footerContent.phone}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Footer navigation" className="mt-12 lg:mt-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
            {footerContent.navGroups.map((group) => (
              <FooterNavGroup group={group} key={group.id} />
            ))}
          </div>
        </nav>

        <div className="mt-12 flex flex-col gap-5 border-t border-footer-divider pt-5 sm:mt-16 sm:pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="text-xs leading-5 text-footer-muted sm:text-sm">
            {footerContent.copyright}
          </p>

          <ul
            aria-label="Social and contact links"
            className="flex items-center gap-2"
          >
            {footerContent.socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  aria-label={link.label}
                  className="flex size-8 items-center justify-center rounded-full border border-footer-social-border bg-footer-social-background text-footer-social-foreground transition-colors hover:border-footer-link-hover hover:bg-footer-social-hover hover:text-footer-social-hover-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-link-hover/50 sm:size-10"
                  href={link.href}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
