import type { ManagementData } from "@/module/about/lib/management-api";

import { AboutHero } from "./about-hero";
import { CompanyProfile } from "./company-profile";
import { Direction } from "./direction";
import { Management } from "./management";
import { OurHistory } from "./our-history";

type AboutPageContentProps = {
  managementData: ManagementData | null;
  managementError: boolean;
};

export function AboutPageContent({
  managementData,
  managementError,
}: AboutPageContentProps) {
  return (
    <>
      <AboutHero />
      <CompanyProfile />
      <OurHistory />
      <Direction />
      <Management data={managementData} error={managementError} />
    </>
  );
}
