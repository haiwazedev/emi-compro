import { contactPageContent } from "@/module/contact/content/contact";
import { SectionContainer } from "@/shared/components/section-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";

export function FAQ() {
  return (
    <SectionContainer
      aria-labelledby="faq-heading"
      className="py-14 sm:py-20 lg:py-24"
      id="faq"
      variant="muted"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-secondary text-xs font-bold tracking-[0.18em] uppercase">
            FAQ
          </p>
          <h2
            className="text-accent mt-4 font-sans text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
            id="faq-heading"
          >
            Frequently Asked <span className="text-secondary">Questions</span>
          </h2>
        </div>

        <Accordion className="mt-8 gap-3 sm:mt-10" collapsible type="single">
          {contactPageContent.faqs.map((faq, index) => (
            <AccordionItem
              className="border-foreground/10 bg-background rounded-xl border shadow-sm not-last:border-b-0"
              key={faq.question}
              value={`faq-${index}`}
            >
              <AccordionTrigger className="text-accent focus-visible:border-secondary focus-visible:ring-secondary/50 rounded-xl px-4 py-4 text-xs leading-5 font-bold hover:no-underline sm:px-5 sm:py-5 sm:text-sm">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="border-foreground/10 text-foreground/70 border-t px-4 pt-4 pb-4 text-xs leading-6 sm:px-5 sm:text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionContainer>
  );
}
