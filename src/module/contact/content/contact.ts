export const contactContent = {
  title: "Ready to Start Your",
  subtitle: "Sustainability Journey?",
  description:
    "Connect with our team of experts. We're here to help you navigate energy efficiency, compliance, and climate action.",
};

export type ContactDetailIcon = "office" | "phone" | "email" | "hours";

export type ContactDetail = {
  icon: ContactDetailIcon;
  label: string;
  value: string;
};

export type ContactSocialLink = {
  iconUrl: string | null;
  id: number;
  label: string;
  href: string;
};

export type CompanyLocationCoordinates = {
  latitude: number;
  longitude: number;
};

export type PublicSiteSettings = {
  address: string | null;
  companyName: string | null;
  danantaraLogoUrl: string | null;
  details: ContactDetail[];
  emailAddresses: string[];
  mapCoordinates: CompanyLocationCoordinates | null;
  mapLabel: string | null;
  phone: string | null;
  phoneHref: string | null;
  plnLogoUrl: string | null;
  primaryEmail: string | null;
  socialLinks: ContactSocialLink[];
  whatsappHref: string | null;
};

export type PublicSiteLogos = Pick<
  PublicSiteSettings,
  "danantaraLogoUrl" | "plnLogoUrl"
>;

export type InboxSubject = {
  id: number;
  name: string;
};

export type ContactFaqItem = {
  id: number;
  question: string;
  answerHtml: string;
};

export const contactPageContent = {
  hero: {
    breadcrumb: "Home / Contact Us",
    title: "Hubungi",
    titleAccent: "Kami",
    description:
      "Connect with our team of experts. We're here to help you navigate energy efficiency, compliance, and climate action.",
  },
  form: {
    title: "Send Us a Message",
    description:
      "Fill in the form and our team will reach back out to you within 1–2 working days.",
    fields: {
      fullName: { label: "Full Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "name@company.com" },
      company: { label: "Company", placeholder: "Company name" },
      phone: { label: "Phone", placeholder: "6281234567890" },
      subject: { label: "Subject" },
      message: { label: "Message", placeholder: "Tell us about your needs..." },
    },
    submitLabel: "Send Message",
    submittingLabel: "Sending...",
    subjectPlaceholder: "Select a subject",
    subjectLoadErrorMessage:
      "Unable to load message subjects. Please try again.",
    subjectEmptyMessage: "No message subjects are currently available.",
    subjectReloadLabel: "Reload page",
    submitErrorMessage: "We could not send your message. Please try again.",
    disclaimer:
      "By submitting, you agree to be contacted by EMI regarding your inquiry. Your data is handled in our privacy policy.",
    successMessage:
      "Thanks for reaching out. Our team will get back to you within 1–2 working days.",
  },
};
