import type { SVGProps } from "react";
import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

const contactEmail = "pemasaran@emipersero.co.id";
// TODO: Replace with the official PLN EMI wa.me number once it is confirmed.
const whatsappHref = "#contact";

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2a9.91 9.91 0 0 0-8.6 14.85L2 22l5.3-1.39a9.88 9.88 0 0 0 4.73 1.2h.01a9.94 9.94 0 0 0 7.01-16.9ZM12.04 20.15h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.24 8.24 0 1 1 7 3.88Zm4.51-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04s.88 2.37 1 2.53c.12.17 1.73 2.64 4.19 3.7.59.25 1.04.41 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.17-.47-.29Z" />
    </svg>
  );
}

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
            <span className="block">Ready to Start Your</span>
            <span className="block bg-linear-to-r from-contact-subtitle-from via-contact-subtitle-via to-contact-subtitle-to bg-clip-text italic text-transparent">
              Sustainability Journey?
            </span>
          </h2>

          <p className="mt-4 max-w-xl font-sans text-sm leading-8 text-contact-muted">
            Connect with our team of experts. We&apos;re here to help you
            navigate energy efficiency, compliance, and climate action.
          </p>

          <div className="mt-6 flex w-full flex-col items-stretch gap-4 lg:w-auto lg:flex-row lg:items-center lg:justify-center">
            <Button
              asChild
              className="min-h-14 rounded-full bg-contact-whatsapp px-8 text-sm font-bold text-contact-whatsapp-foreground shadow-none hover:bg-contact-whatsapp-hover lg:w-auto"
              size="lg"
            >
              <a aria-label="Contact PLN EMI by WhatsApp" href={whatsappHref}>
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
                href={`mailto:${contactEmail}`}
              >
                <Mail className="size-5 mr-1" />
                Email Us
              </a>
            </Button>
          </div>

          <span className="mt-6 font-sans text-xs text-contact-muted-soft">
            {contactEmail}
          </span>
        </div>
      </div>
    </section>
  );
}
