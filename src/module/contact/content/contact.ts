export const contactContent = {
  email: "pemasaran@emipersero.co.id",
  emailAddresses: ["emi@pln.co.id", "pemasaran@emipersero.co.id"],
  // TODO: Replace with the official PLN EMI wa.me number once it is confirmed.
  whatsappHref: "#contact",
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

export type ContactSocialIcon =
  "website" | "linkedin" | "x" | "email" | "youtube";

export type ContactSocialLink = {
  icon: ContactSocialIcon;
  label: string;
  href: string;
};

export type ContactFaqItem = {
  question: string;
  answer: string;
};

export const contactPageContent = {
  hero: {
    breadcrumb: "Home / Contact Us",
    title: "Hubungi",
    titleAccent: "Kami",
    description:
      "Connect with our team of experts. We're here to help you navigate energy efficiency, compliance, and climate action.",
  },
  details: [
    {
      icon: "office",
      label: "HEAD OFFICE",
      value:
        "Menara Sentraya Lt. 17, Unit A4 & B5, Jl. Iskandarsyah Raya No.1A, Melawai, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12160",
    },
    {
      icon: "phone",
      label: "PHONE / WHATSAPP",
      value: "021–27881925 · WA 0821–1779–291 (Corp. Marketing PLN EMI)",
    },
    {
      icon: "email",
      label: "EMAIL",
      value: "emi@pln.co.id\npemasaran@emipersero.co.id",
    },
    {
      icon: "hours",
      label: "OFFICE HOURS",
      value: "Monday – Friday, 08.00 – 17.00 WIB",
    },
  ] satisfies readonly ContactDetail[],
  mapLabel: "Menara Sentraya, Jakarta Selatan",
  socialLinks: [
    { icon: "website", label: "Company website", href: "#footer" },
    { icon: "linkedin", label: "LinkedIn", href: "#footer" },
    { icon: "x", label: "X", href: "#footer" },
    { icon: "email", label: "Email", href: "mailto:emi@pln.co.id" },
    { icon: "youtube", label: "YouTube", href: "#footer" },
  ] satisfies readonly ContactSocialLink[],
  form: {
    title: "Send Us a Message",
    description:
      "Fill in the form and our team will reach back out to you within 1–2 working days.",
    fields: {
      fullName: { label: "Full Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "name@company.com" },
      company: { label: "Company", placeholder: "Company name" },
      phone: { label: "Phone", placeholder: "+62 ..." },
      subject: { label: "Subject" },
      message: { label: "Message", placeholder: "Tell us about your needs..." },
    },
    subjectOptions: [
      "General Inquiry",
      "Services",
      "Media & Information",
      "Partnerships",
    ],
    submitLabel: "Send Message",
    disclaimer:
      "By submitting, you agree to be contacted by EMI regarding your inquiry. Your data is handled in our privacy policy.",
    successMessage:
      "Thanks for reaching out. Our team will get back to you within 1–2 working days.",
  },
  faqs: [
    {
      question: "Apa itu REC dan SPE? — What is REC and SPE?",
      answer:
        "REC and SPE are environmental instruments that can help organizations document renewable energy use and emissions-reduction activity. Our team can help identify the right instrument for your goals.",
    },
    {
      question: "Apa hubungannya REC dan SPE dengan GHG Accounting?",
      answer:
        "REC and SPE can support the evidence and disclosures used in a broader GHG accounting process. The right approach depends on your reporting boundary and claim requirements.",
    },
    {
      question: "Berapa harga 1 unit REC dan 1 unit SPE?",
      answer:
        "Pricing depends on certificate type, volume, source, and delivery requirements. Contact our team for a quotation tailored to your needs.",
    },
    {
      question: "Bagaimana skema pembelian REC atau SPE di PLN EMI?",
      answer:
        "Share your requirements with us and our team will guide you through the required documents, quantity, and procurement steps.",
    },
  ] satisfies readonly ContactFaqItem[],
};
