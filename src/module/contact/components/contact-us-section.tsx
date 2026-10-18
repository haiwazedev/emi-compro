import { Mail, Send } from "lucide-react";

import { WhatsAppIcon } from "@/module/contact/components/whatsapp-icon";
import { contactContent } from "@/module/contact/content/contact";
import { SectionContainer } from "@/shared/components/section-container";
import { Button } from "@/shared/ui/button";
import { useCopy } from "@/i18n/use-copy";

export function ContactUsSection() {
  const copy = useCopy();

  return (
    <SectionContainer
      aria-labelledby="contact-heading"
      className="text-background pt-14 pb-16 lg:pb-20"
      id="contact"
      variant="inverse"
    >
      <div className="flex justify-center">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="bg-secondary/20 text-secondary flex size-14 items-center justify-center rounded-2xl"
          >
            <Send className="size-6" strokeWidth={2} />
          </div>

          <h2
            className="text-background mt-6 max-w-xs font-sans text-2xl leading-tight font-bold tracking-tight lg:max-w-xl lg:text-4xl"
            id="contact-heading"
          >
            <span className="block">{copy(contactContent.title)}</span>
            <span className="text-secondary block">
              {copy(contactContent.subtitle)}
            </span>
          </h2>

          <p className="text-primary/80 mt-4 max-w-md font-sans text-xs leading-5 lg:max-w-xl">
            {copy(contactContent.description)}
          </p>

          <div className="mt-7 flex flex-row items-center justify-center gap-3">
            <Button
              asChild
              className="bg-accent-2 text-background hover:bg-accent-2/85 focus-visible:ring-accent-2/50 h-10 rounded-full px-5 text-xs font-bold shadow-none"
              size="lg"
            >
              <a
                aria-label={copy("Contact PLN EMI by WhatsApp")}
                href={contactContent.whatsappHref}
              >
                <WhatsAppIcon className="mr-1 size-4" />
                {copy("WhatsApp Us")}
              </a>
            </Button>

            <Button
              asChild
              className="border-primary/25 bg-background/8 text-background hover:border-primary/40 hover:bg-background/14 hover:text-background focus-visible:ring-primary/45 h-10 rounded-full px-5 text-xs font-bold shadow-none"
              size="lg"
              variant="outline"
            >
              <a
                aria-label={copy("Email PLN EMI marketing")}
                href={`mailto:${contactContent.email}`}
              >
                <Mail className="mr-1 size-4" />
                {copy("Email Us")}
              </a>
            </Button>
          </div>

          <span className="text-primary/55 mt-6 font-sans text-xs">
            {contactContent.emailAddresses.join(" · ")}
          </span>
        </div>
      </div>
    </SectionContainer>
  );
}
