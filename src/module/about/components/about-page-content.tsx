import type { ManagementData } from "@/module/about/lib/management-api";
import type { AboutSiteContentData } from "@/module/about/lib/about-content-api";

import { AboutHero } from "./about-hero";
import { CompanyProfile } from "./company-profile";
import { Direction } from "./direction";
import { Management } from "./management";
import { OurHistory } from "./our-history";

type AboutPageContentProps = {
  contentData: AboutSiteContentData | null;
  contentError: boolean;
  managementData: ManagementData | null;
  managementError: boolean;
};

export function AboutPageContent({
  contentData,
  contentError,
  managementData,
  managementError,
}: AboutPageContentProps) {
  return (
    <>
      <AboutHero />
      <CompanyProfile
        error={contentError}
        pictureUrl={contentData?.companyPictureUrl ?? null}
        profileContent={contentData?.profileContent ?? null}
      />
      <OurHistory error={contentError} items={contentData?.history ?? []} />
      <Direction
        error={contentError}
        mission={contentData?.mission ?? []}
        vision={contentData?.vision ?? null}
      />
      <Management data={managementData} error={managementError} />
    </>
  );
}
