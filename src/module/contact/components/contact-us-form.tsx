"use client";

import {
  ArrowRight,
  AtSign,
  Clock,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Play,
  type LucideIcon,
} from "lucide-react";
import * as React from "react";

import {
  contactPageContent,
  type ContactDetail,
  type ContactDetailIcon,
  type ContactSocialIcon,
} from "@/module/contact/content/contact";
import { SectionContainer } from "@/shared/components/section-container";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";

const detailIcons: Record<ContactDetailIcon, LucideIcon> = {
  office: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

const controlClassName =
  "border-foreground/15 bg-primary/60 text-accent placeholder:text-foreground/45 focus-visible:border-secondary/70 focus-visible:ring-secondary/40 w-full rounded-xl border px-3 text-xs outline-none transition focus-visible:ring-2";

function ContactDetailItem({ detail }: { detail: ContactDetail }) {
  const Icon = detailIcons[detail.icon];

  return (
    <li className="border-foreground/10 flex gap-3 border-b py-4 first:pt-0 last:border-b-0 last:pb-0">
      <span
        aria-hidden="true"
        className="bg-primary text-secondary flex size-8 shrink-0 items-center justify-center rounded-lg"
      >
        <Icon className="size-4" strokeWidth={1.8} />
      </span>

      <div className="min-w-0">
        <p className="text-secondary text-[0.65rem] font-bold tracking-[0.12em] uppercase">
          {detail.label}
        </p>
        <p className="text-foreground/70 mt-1 text-xs leading-5 whitespace-pre-line">
          {detail.value}
        </p>
      </div>
    </li>
  );
}

function SocialIcon({ icon }: { icon: ContactSocialIcon }) {
  switch (icon) {
    case "website":
      return <Globe2 aria-hidden="true" className="size-3.5" />;
    case "linkedin":
      return (
        <span aria-hidden="true" className="text-xs font-bold">
          in
        </span>
      );
    case "x":
      return (
        <span aria-hidden="true" className="text-xs font-medium">
          𝕏
        </span>
      );
    case "email":
      return <AtSign aria-hidden="true" className="size-3.5" />;
    case "youtube":
      return (
        <Play aria-hidden="true" className="size-3.5" fill="currentColor" />
      );
  }
}

function RequiredIndicator() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="sr-only"> required</span>
    </>
  );
}

export function ContactUsForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const formContent = contactPageContent.form;
  const defaultSubject = formContent.subjectOptions[0];
  const [selectedSubject, setSelectedSubject] = React.useState(defaultSubject);
  const [formTitleStart, ...formTitleAccent] = formContent.title.split(" ");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSelectedSubject(defaultSubject);
    setIsSubmitted(true);
  }

  return (
    <SectionContainer
      aria-labelledby="contact-form-heading"
      className="py-12 sm:py-16 lg:py-20"
      id="contact-form"
      variant="default"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <section className="border-foreground/10 bg-background shadow-foreground/10 flex min-w-0 flex-1 flex-col rounded-2xl border p-6 shadow-lg sm:p-7 lg:basis-1/2">
          <h2 className="sr-only" id="contact-details-heading">
            Contact details
          </h2>

          <ul aria-label="PLN EMI contact details" className="flex flex-col">
            {contactPageContent.details.map((detail) => (
              <ContactDetailItem detail={detail} key={detail.label} />
            ))}
          </ul>

          <div
            aria-label="PLN EMI head office location"
            className="bg-primary relative isolate mt-5 min-h-40 flex-1 overflow-hidden rounded-xl p-3"
          >
            <div
              aria-hidden="true"
              className="from-background/75 via-primary to-secondary/20 absolute inset-0 bg-linear-to-br"
            />
            <div
              aria-hidden="true"
              className="border-background/50 absolute top-5 left-8 size-24 rounded-full border"
            />
            <div
              aria-hidden="true"
              className="border-background/40 absolute right-5 bottom-8 size-16 rounded-full border"
            />
            <MapPin
              aria-hidden="true"
              className="text-secondary absolute inset-0 m-auto size-8 drop-shadow-sm"
              fill="currentColor"
              strokeWidth={1.5}
            />
            <span className="text-accent bg-background absolute inset-x-3 bottom-3 w-fit rounded-lg px-3 py-2 text-[0.65rem] font-bold shadow-sm">
              {contactPageContent.mapLabel}
            </span>
          </div>

          <ul
            aria-label="Social and contact links"
            className="mt-4 flex items-center gap-2"
          >
            {contactPageContent.socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  aria-label={link.label}
                  className="border-foreground/15 text-secondary hover:border-secondary hover:bg-primary focus-visible:ring-secondary/50 flex size-8 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  href={link.href}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-foreground/10 bg-background shadow-foreground/10 min-w-0 flex-1 rounded-2xl border p-6 shadow-lg sm:p-7 lg:basis-1/2">
          <h2
            className="text-accent font-sans text-2xl leading-tight font-bold tracking-tight sm:text-3xl"
            id="contact-form-heading"
          >
            {formTitleStart}{" "}
            <span className="text-secondary">{formTitleAccent.join(" ")}</span>
          </h2>

          <p className="text-foreground/65 mt-3 max-w-xl text-xs leading-5 sm:text-sm sm:leading-6">
            {formContent.description}
          </p>

          {isSubmitted ? (
            <p
              aria-live="polite"
              className="border-accent-2/20 bg-accent-2/10 text-accent-2 mt-5 rounded-xl border px-4 py-3 text-xs leading-5"
              role="status"
            >
              {formContent.successMessage}
            </p>
          ) : null}

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Label
                  className="text-accent text-xs font-bold"
                  htmlFor="full-name"
                >
                  {formContent.fields.fullName.label}
                  <RequiredIndicator />
                </Label>
                <Input
                  autoComplete="name"
                  className={cn(controlClassName, "h-11 text-xs md:text-xs")}
                  id="full-name"
                  name="fullName"
                  placeholder={formContent.fields.fullName.placeholder}
                  required
                  type="text"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Label
                  className="text-accent text-xs font-bold"
                  htmlFor="email"
                >
                  {formContent.fields.email.label}
                  <RequiredIndicator />
                </Label>
                <Input
                  autoComplete="email"
                  className={cn(controlClassName, "h-11 text-xs md:text-xs")}
                  id="email"
                  name="email"
                  placeholder={formContent.fields.email.placeholder}
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Label
                  className="text-accent text-xs font-bold"
                  htmlFor="company"
                >
                  {formContent.fields.company.label}
                </Label>
                <Input
                  autoComplete="organization"
                  className={cn(controlClassName, "h-11 text-xs md:text-xs")}
                  id="company"
                  name="company"
                  placeholder={formContent.fields.company.placeholder}
                  type="text"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Label
                  className="text-accent text-xs font-bold"
                  htmlFor="phone"
                >
                  {formContent.fields.phone.label}
                </Label>
                <Input
                  autoComplete="tel"
                  className={cn(controlClassName, "h-11 text-xs md:text-xs")}
                  id="phone"
                  name="phone"
                  placeholder={formContent.fields.phone.placeholder}
                  type="tel"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                className="text-accent text-xs font-bold"
                htmlFor="subject"
              >
                {formContent.fields.subject.label}
                <RequiredIndicator />
              </Label>
              <Select
                name="subject"
                onValueChange={setSelectedSubject}
                required
                value={selectedSubject}
              >
                <SelectTrigger
                  className={cn(
                    controlClassName,
                    "text-xs data-[size=default]:h-11",
                  )}
                  id="subject"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-foreground/10 bg-background text-accent">
                  {formContent.subjectOptions.map((subject) => (
                    <SelectItem
                      className="focus:bg-primary focus:text-accent"
                      key={subject}
                      value={subject}
                    >
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                className="text-accent text-xs font-bold"
                htmlFor="message"
              >
                {formContent.fields.message.label}
                <RequiredIndicator />
              </Label>
              <Textarea
                className={cn(controlClassName, "min-h-28 resize-y py-3")}
                id="message"
                name="message"
                placeholder={formContent.fields.message.placeholder}
                required
              />
            </div>

            <Button
              className="bg-accent text-background hover:bg-accent/85 focus-visible:ring-secondary/50 mt-1 h-10 w-full rounded-full text-xs font-bold"
              type="submit"
            >
              {formContent.submitLabel}
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Button>

            <p className="text-foreground/55 text-[0.65rem] leading-4">
              {formContent.disclaimer}
            </p>
          </form>
        </section>
      </div>
    </SectionContainer>
  );
}
