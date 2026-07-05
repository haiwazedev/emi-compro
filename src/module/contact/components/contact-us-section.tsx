import { Mail, Send } from "lucide-react";

import { WhatsAppIcon } from "@/module/contact/components/whatsapp-icon";
import { Button } from "@/shared/ui/button";
import { contactContent } from "@/module/contact/content/contact";

export function ContactUsSection() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="contact-grid scroll-mt-20 bg-contact-background px-6 py-20 text-contact-foreground sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      id="contact"
    >
      <div className="mx-auto flex max-w-7xl justify-center">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="grid size-20 place-items-center rounded-2xl bg-contact-icon-background text-contact-icon-foreground"
          >
            <Send className="size-8" strokeWidth={2} />
          </div>

          <h2
            className="mt-6 font-display text-5xl leading-none text-contact-foreground"
            id="contact-heading"
          >
            <span className="block">{contactContent.title}</span>
            <span className="block bg-linear-to-r from-contact-subtitle-from via-contact-subtitle-via to-contact-subtitle-to bg-clip-text italic text-transparent">
              {contactContent.subtitle}
            </span>
          </h2>

          <p className="mt-4 max-w-xl font-sans text-sm leading-8 text-contact-muted">
            {contactContent.description}
          </p>

          <div className="mt-6 flex w-full flex-col items-stretch gap-4 lg:w-auto lg:flex-row lg:items-center lg:justify-center">
            <Button
              asChild
              className="min-h-14 rounded-full bg-contact-whatsapp px-8 text-sm font-bold text-contact-whatsapp-foreground shadow-none hover:bg-contact-whatsapp-hover lg:w-auto"
              size="lg"
            >
              <a
                aria-label="Contact PLN EMI by WhatsApp"
                href={contactContent.whatsappHref}
              >
                <WhatsAppIcon className="size-5 mr-1" />
                WhatsApp Us
              </a>
            </Button>

            <Button
              asChild
              className="min-h-14 rounded-full border-contact-email-border bg-contact-email-background px-8 text-sm font-bold text-contact-email-foreground shadow-none hover:border-contact-email-border-hover hover:bg-contact-email-background-hover hover:text-contact-email-foreground focus-visible:ring-contact-email-border/45 lg:w-auto"
              size="lg"
              variant="outline"
            >
              <a
                aria-label="Email PLN EMI marketing"
                href={`mailto:${contactContent.email}`}
              >
                <Mail className="size-5 mr-1" />
                Email Us
              </a>
            </Button>
          </div>

          <span className="mt-6 font-sans text-xs text-contact-muted-soft">
            {contactContent.email}
          </span>
        </div>
      </div>
    </section>
  );
}
