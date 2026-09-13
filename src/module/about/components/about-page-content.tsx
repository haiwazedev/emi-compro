import { AboutHero } from "./about-hero";
import { CompanyProfile } from "./company-profile";
import { Direction } from "./direction";
import { Management } from "./management";
import { OurHistory } from "./our-history";

export function AboutPageContent() {
  return (
    <>
      <AboutHero />
      <CompanyProfile />
      <OurHistory />
      <Direction />
      <Management />
    </>
  );
}
