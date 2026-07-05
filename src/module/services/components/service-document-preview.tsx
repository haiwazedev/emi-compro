import type { ServiceDocument } from "@/module/services/content/services";

type ServiceDocumentPreviewProps = {
  document: ServiceDocument;
};

export function ServiceDocumentPreview({
  document,
}: ServiceDocumentPreviewProps) {
  return (
    <article className="max-h-[min(28rem,70vh)] p-6 font-sans">
      <h4 className="text-xl font-bold leading-7 text-services-foreground">
        {document.title}
      </h4>
      <p className="mt-3 text-base font-semibold leading-7 text-services-foreground">
        {document.summary}
      </p>
      <div className="mt-5 space-y-4 text-sm leading-7 text-services-muted">
        {document.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
