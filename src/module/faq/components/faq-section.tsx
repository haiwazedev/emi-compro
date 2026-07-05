import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { SectionHeading } from "@/shared/components/section-heading";
import { faqs } from "@/module/faq/content/faq";

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="scroll-mt-20 bg-faq-background px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      id="faq"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <SectionHeading
          className="max-w-4xl text-center"
          eyebrow="FAQ"
          eyebrowClassName="text-sm font-bold uppercase tracking-widest text-faq-accent"
          headingId="faq-heading"
          subtitle="Questions"
          subtitleClassName="text-faq-accent"
          title="Frequently Asked"
          titleClassName="mt-5 font-display text-4xl leading-none text-faq-foreground"
        >
          <p className="mt-6 font-sans text-sm italic text-faq-accent">
            Hover and scroll to see more questions
          </p>
        </SectionHeading>

        <div
          aria-label="FAQ questions"
          className="faq-scrollbar mt-12 max-h-[50vh] w-full max-w-3xl overflow-y-scroll border-3 border-faq-panel-border bg-faq-background p-4 outline-none focus-visible:ring-3 focus-visible:ring-faq-accent/35 sm:mt-16 sm:p-6"
          role="region"
          tabIndex={0}
        >
          <Accordion className="space-y-4" collapsible type="single">
            {faqs.map((item) => (
              <AccordionItem
                className="rounded-lg border border-faq-card-border bg-faq-card pl-5 pr-3 shadow-none"
                key={item.id}
                value={item.id}
              >
                <AccordionTrigger className="min-h-8 items-center font-sans text-sm font-bold leading-snug text-faq-foreground no-underline hover:no-underline [&_svg]:size-5 [&_svg]:text-faq-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-6 font-sans text-sm leading-6 text-faq-muted">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
