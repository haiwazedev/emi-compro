import { commitmentDocuments } from "@/module/commitment/content/commitment-documents";
import { SectionContainer } from "@/shared/components/section-container";
import { CommitmentDocumentCard } from "./commitment-document-card";

export function CommitmentBrowser() {
  return (
    <SectionContainer
      aria-labelledby="commitment-browser-heading"
      className="py-12 sm:py-16 lg:py-20"
      id="commitment-browser"
      variant="default"
    >
      <h2 className="sr-only" id="commitment-browser-heading">
        Commitment documents
      </h2>

      <ul
        aria-label="PLN EMI commitment documents"
        className="-m-3 flex flex-wrap"
      >
        {commitmentDocuments.map((document) => (
          <li className="w-full p-3 lg:w-1/2" key={document.id}>
            <CommitmentDocumentCard document={document} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
