import { Mail, Send } from "lucide-react";

import { WhatsAppIcon } from "@/module/contact/components/whatsapp-icon";
import { contactContent } from "@/module/contact/content/contact";
import { SectionContainer } from "@/shared/components/section-container";
import { Button } from "@/shared/ui/button";

export function ContactUsSection() {
  return (
    <SectionContainer
      aria-labelledby="contact-heading"
      className="pb-16 pt-14 text-background lg:pb-20"
      id="contact"
      variant="inverse"
    >
      <div className="flex justify-center">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="flex size-14 items-center justify-center rounded-2xl bg-secondary/20 text-secondary"
          >
            <Send className="size-6" strokeWidth={2} />
          </div>

          <h2
            className="mt-6 max-w-xs font-sans text-2xl font-bold leading-tight tracking-tight text-background lg:max-w-xl lg:text-4xl"
            id="contact-heading"
          >
            <span className="block">{contactContent.title}</span>
            <span className="block text-secondary">
              {contactContent.subtitle}
            </span>
          </h2>

          <p className="mt-4 max-w-md font-sans text-xs leading-5 text-primary/80 lg:max-w-xl">
            {contactContent.description}
          </p>

          <div className="mt-7 flex flex-row items-center justify-center gap-3">
            <Button
              asChild
              className="h-10 rounded-full bg-secondary px-5 text-xs font-bold text-background shadow-none hover:bg-secondary/85"
              size="lg"
            >
              <a
                aria-label="Contact PLN EMI by WhatsApp"
                href={contactContent.whatsappHref}
              >
                <WhatsAppIcon className="mr-1 size-4" />
                WhatsApp Us
              </a>
            </Button>

            <Button
              asChild
              className="h-10 rounded-full border-primary/25 bg-background/8 px-5 text-xs font-bold text-background shadow-none hover:border-primary/40 hover:bg-background/14 hover:text-background focus-visible:ring-primary/45"
              size="lg"
              variant="outline"
            >
              <a
                aria-label="Email PLN EMI marketing"
                href={`mailto:${contactContent.email}`}
              >
                <Mail className="mr-1 size-4" />
                Email Us
              </a>
            </Button>
          </div>

          <span className="mt-6 font-sans text-xs text-primary/55">
            {contactContent.emailAddresses.join(" · ")}
          </span>
        </div>
      </div>
    </SectionContainer>
  );
}
