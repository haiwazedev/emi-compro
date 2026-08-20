import { Mail, Send } from "lucide-react";

import { WhatsAppIcon } from "@/module/contact/components/whatsapp-icon";
import { contactContent } from "@/module/contact/content/contact";
import { Button } from "@/shared/ui/button";

export function ContactUsSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="scroll-mt-20 bg-contact-background px-4 pb-16 pt-14 text-contact-foreground sm:px-6 lg:px-10 lg:pb-20"
      id="contact"
    >
      <div className="mx-auto flex max-w-7xl justify-center">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="flex size-14 items-center justify-center rounded-2xl bg-contact-icon-background text-contact-icon-foreground"
          >
            <Send className="size-6" strokeWidth={2} />
          </div>

          <h2
            className="mt-6 max-w-xs font-sans text-2xl font-bold leading-tight tracking-tight text-contact-foreground lg:max-w-xl lg:text-4xl"
            id="contact-heading"
          >
            <span className="block">{contactContent.title}</span>
            <span className="block text-contact-subtitle">
              {contactContent.subtitle}
            </span>
          </h2>

          <p className="mt-4 max-w-md font-sans text-xs leading-5 text-contact-muted lg:max-w-xl">
            {contactContent.description}
          </p>

          <div className="mt-7 flex flex-row items-center justify-center gap-3">
            <Button
              asChild
              className="h-10 rounded-full bg-contact-whatsapp px-5 text-xs font-bold text-contact-whatsapp-foreground shadow-none hover:bg-contact-whatsapp-hover"
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
              className="h-10 rounded-full border-contact-email-border bg-contact-email-background px-5 text-xs font-bold text-contact-email-foreground shadow-none hover:border-contact-email-border-hover hover:bg-contact-email-background-hover hover:text-contact-email-foreground focus-visible:ring-contact-email-border/45"
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

          <span className="mt-6 font-sans text-xs text-contact-muted-soft">
            {contactContent.emailAddresses.join(" · ")}
          </span>
        </div>
      </div>
    </section>
  );
}
