import { CommitmentCard } from "@/module/commitment/components/commitment-card";
import { commitmentItems } from "@/module/commitment/content/commitment";
import { SectionContainer } from "@/shared/components/section-container";
import { SectionIntro } from "@/shared/components/section-intro";

export function CommitmentSection() {
  return (
    <SectionContainer
      aria-labelledby="commitment-heading"
      className="py-16 sm:py-20 lg:py-24"
      id="commitment"
      variant="default"
    >
      <SectionIntro
        accent="Commitment"
        action={{ href: "#commitment", label: "Document Library" }}
        description="Certifications, corporate policies, and sustainability reports — the documents behind our promises, available for download."
        eyebrow="COMMITMENT"
        headingId="commitment-heading"
        theme="light"
        title="Our"
      />

      <ul
        aria-label="PLN EMI commitment resources"
        className="-m-2 mt-10 flex flex-wrap lg:mt-12"
      >
        {commitmentItems.map((item) => (
          <li className="flex w-full p-2 lg:w-1/3" key={item.id}>
            <CommitmentCard item={item} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
