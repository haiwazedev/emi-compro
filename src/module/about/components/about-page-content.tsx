import { AboutHero } from "./about-hero";
import { CompanyProfile } from "./company-profile";
import { Direction } from "./direction";
import { Leadership } from "./leadership";
import { OurHistory } from "./our-history";

export function AboutPageContent() {
  return (
    <>
      <AboutHero />
      <CompanyProfile />
      <OurHistory />
      <Direction />
      <Leadership />
    </>
  );
}
