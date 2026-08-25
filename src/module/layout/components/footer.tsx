import { AtSign, Globe2, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FooterNavGroup } from "@/module/layout/components/footer-nav-group";
import type { FooterSocialIcon } from "@/module/layout/content/footer";
import { footerContent } from "@/module/layout/content/footer";
import { sectionContainerRailClassName } from "@/shared/components/section-container";

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
      className="bg-primary text-foreground/80 py-6 sm:py-10 lg:py-12"
      id="footer"
    >
      <div className={sectionContainerRailClassName}>
        <div className="flex flex-col items-center text-center">
          <Link
            aria-label="Danantara Indonesia home"
            className="focus-visible:ring-secondary/50 inline-flex rounded-sm focus-visible:ring-2 focus-visible:outline-none"
            href="/"
          >
            <Image
              alt="Danantara Indonesia"
              className="h-9 w-auto sm:h-10 lg:h-11"
              height={1073}
              sizes="(min-width: 1024px) 170px, 145px"
              src="/danantara_logo.png"
              width={4090}
            />
          </Link>

          <address className="text-foreground/80 mt-5 max-w-4xl text-xs leading-5 not-italic sm:text-sm sm:leading-6">
            <p className="text-accent font-bold">{footerContent.companyName}</p>
            <p>{footerContent.address}</p>
            <p>
              <span className="text-accent font-bold">Email:</span>{" "}
              {footerContent.emailAddresses.map((email, index) => (
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
              {" · "}
              <span className="text-accent font-bold">Telp:</span>{" "}
              <a
                className="hover:text-secondary focus-visible:ring-secondary/50 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
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

        <div className="border-foreground/20 mt-12 flex flex-col gap-5 border-t pt-5 sm:mt-16 sm:pt-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="text-foreground/60 text-xs leading-5 sm:text-sm">
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
                  className="border-foreground/20 bg-background text-accent hover:border-secondary hover:bg-primary hover:text-accent focus-visible:ring-secondary/50 flex size-8 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none sm:size-10"
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
